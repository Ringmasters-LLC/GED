import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import { ContractMap } from './contracts';

const DATA_DIR = path.resolve(process.cwd(), 'data/canonical');
const UPDATED_AT = new Date().toISOString().split('T')[0];

const SOURCES = {
  CLDR_CODE_MAPPINGS:
    'https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-core/supplemental/codeMappings.json',
  CLDR_TERRITORIES_EN:
    'https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-localenames-full/main/en/territories.json',
  LIBPHONENUMBER_XML:
    'https://raw.githubusercontent.com/google/libphonenumber/master/resources/PhoneNumberMetadata.xml',
};

async function fetchJson(url: string) {
  const res = await fetch(url);
  return res.json();
}

async function fetchText(url: string) {
  const res = await fetch(url);
  return res.text();
}

function loadCanonical(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'));
}

function saveCanonical(filename: string, data: any) {
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2) + '\n');
}

async function refresh() {
  console.log('Refreshing data from upstream sources...');

  // 1. Fetch Upstream
  const [cldrCodes, cldrNames, phoneXml] = await Promise.all([
    fetchJson(SOURCES.CLDR_CODE_MAPPINGS),
    fetchJson(SOURCES.CLDR_TERRITORIES_EN),
    fetchText(SOURCES.LIBPHONENUMBER_XML),
  ]);

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
  const phoneObj = parser.parse(phoneXml);
  const territories = phoneObj.phoneNumberMetadata.territories.territory;

  // 2. Map Phone Codes
  const phoneMap = new Map();
  for (const t of territories) {
    const iso2 = t.id;
    const code = t.countryCode;
    if (iso2 && code) {
      if (!phoneMap.has(iso2)) phoneMap.set(iso2, []);
      if (!phoneMap.get(iso2).includes(String(code))) {
        phoneMap.get(iso2).push(String(code));
      }
    }
  }

  // 3. Update Countries
  const countries = loadCanonical('countries.json');
  const codeMappings = cldrCodes.supplemental.codeMappings;
  const nameMappings = cldrNames.main.en.localeDisplayNames.territories;

  const updatedCountries = countries.map((c: any) => {
    const upstream = codeMappings[c.iso2];
    const name = nameMappings[c.iso2] || c.name;
    return {
      ...c,
      name,
      iso3: upstream?._alpha3 || c.iso3,
      numeric: upstream?._numeric || c.numeric,
      updatedAt: UPDATED_AT,
    };
  });
  saveCanonical('countries.json', updatedCountries);
  console.log('Updated countries.json');

  // 4. Update Phone Codes
  const phoneCodes = loadCanonical('phone-codes.json');
  const updatedPhoneCodes = phoneCodes.map((p: any) => {
    return {
      ...p,
      callingCodes: phoneMap.get(p.iso2) || p.callingCodes,
      updatedAt: UPDATED_AT,
    };
  });
  saveCanonical('phone-codes.json', updatedPhoneCodes);
  console.log('Updated phone-codes.json');

  console.log('\nData refresh complete.');
}

refresh().catch((err) => {
  console.error('Refresh failed:', err);
  process.exit(1);
});
