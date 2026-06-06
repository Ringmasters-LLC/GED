import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { globSync } from 'fast-glob';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schemasDir = path.resolve(process.cwd(), 'schemas');
const dataDir = path.resolve(process.cwd(), 'data/canonical');

let hasErrors = false;

// 1. Load schemas
const schemaFiles = globSync('*.schema.json', { cwd: schemasDir });
for (const file of schemaFiles) {
  const schemaPath = path.join(schemasDir, file);
  const schemaStr = fs.readFileSync(schemaPath, 'utf8');
  try {
    const schema = JSON.parse(schemaStr);
    ajv.addSchema(schema, file);
    console.log(`Loaded schema: ${file}`);
  } catch (err: any) {
    console.error(`Failed to parse schema ${file}:`, err.message);
    hasErrors = true;
  }
}

// 2. Validate data
const dataFiles = globSync('*.json', { cwd: dataDir });
for (const file of dataFiles) {
  const dataPath = path.join(dataDir, file);
  const dataStr = fs.readFileSync(dataPath, 'utf8');
  let data;
  try {
    data = JSON.parse(dataStr);
  } catch (err: any) {
    console.error(`Failed to parse data ${file}:`, err.message);
    hasErrors = true;
    continue;
  }

  // Derive schema name from data file name. E.g., address-formats.json -> address-format.schema.json
  // For plural to singular, we just define an explicit mapping if needed, or simple rules.
  let schemaName = file.replace('.json', '.schema.json');
  if (file === 'countries.json') schemaName = 'country.schema.json';
  if (file === 'phone-codes.json') schemaName = 'phone.schema.json';
  if (file === 'postal-rules.json') schemaName = 'postal-rule.schema.json';
  if (file === 'currencies.json') schemaName = 'currency.schema.json';
  if (file === 'languages.json') schemaName = 'language.schema.json';
  if (file === 'timezone-defaults.json') schemaName = 'timezone.schema.json';
  if (file === 'address-formats.json') schemaName = 'address-format.schema.json';
  if (file === 'name-formats.json') schemaName = 'name-format.schema.json';
  if (file === 'locale-writing.json') schemaName = 'locale-writing.schema.json';
  if (file === 'country-locales.json') schemaName = 'country-locale.schema.json';
  if (file === 'administrative-levels.json') schemaName = 'administrative-level.schema.json';
  if (file === 'address-components.json') schemaName = 'address-component.schema.json';
  if (file === 'currency-behavior.json') schemaName = 'currency-behavior.schema.json';
  if (file === 'measurement-systems.json') schemaName = 'measurement-system.schema.json';
  if (file === 'date-time-formats.json') schemaName = 'date-time-format.schema.json';
  if (file === 'market-behavior.json') schemaName = 'market-behavior.schema.json';
  if (file === 'localized-country-names.json') schemaName = 'localized-country-name.schema.json';
  if (file === 'country-display-order.json') schemaName = 'country-display-order.schema.json';
  if (file === 'territory-types.json') schemaName = 'territory-type.schema.json';
  if (file === 'entry-profiles.json') schemaName = 'entry-profile.schema.json';

  const validate = ajv.getSchema(schemaName);
  if (!validate) {
    console.error(`Warning: No schema found for ${file} (expected ${schemaName})`);
    continue;
  }

  const valid = validate(data);
  if (!valid) {
    console.error(`Validation failed for ${file}:`);
    console.error(ajv.errorsText(validate.errors));
    hasErrors = true;
  } else {
    console.log(`Validated: ${file}`);
  }
}

// 3. Custom validations (uniqueness, provenance, postal regex, deterministic sort, LF, UTF-8)
for (const file of dataFiles) {
  const dataPath = path.join(dataDir, file);
  const dataRaw = fs.readFileSync(dataPath);
  
  // LF & UTF-8
  if (dataRaw.includes(Buffer.from('\\r\\n', 'utf-8'))) {
    console.error(`Error: ${file} contains CRLF line endings.`);
    hasErrors = true;
  }
  // Try utf-8
  try {
    const text = dataRaw.toString('utf-8');
    if (text.includes('\\uFFFD')) { // Replacement character
       console.error(`Error: ${file} may not be valid UTF-8.`);
       hasErrors = true;
    }
  } catch (e) {
    console.error(`Error: ${file} is not valid UTF-8.`);
    hasErrors = true;
  }

  const data = JSON.parse(dataRaw.toString('utf-8'));
  
  if (Array.isArray(data)) {
    // Uniqueness of primary key (usually iso2 or code)
    const keys = new Set();
    let hasSourcesField = false;

    // Check deterministic sort by stringifying and comparing to a sorted stringified version?
    // We can just verify if the array is sorted by its primary key.

    for (const row of data) {
      if (row.sources !== undefined) hasSourcesField = true;

      // Provenance validation
      if (hasSourcesField && (!Array.isArray(row.sources) || row.sources.length === 0)) {
        console.error(`Provenance validation failed in ${file}: row is missing sources.`);
        hasErrors = true;
      }

      const pk = row.iso2 || row.code || row.id || row.locale;
      if (pk) {
        if (keys.has(pk)) {
          console.error(`Uniqueness validation failed in ${file}: Duplicate primary key ${pk}`);
          hasErrors = true;
        }
        keys.add(pk);
      }

      // Postal regex validation
      if (file === 'postal-rules.json' && row.regex) {
        try {
          new RegExp(row.regex);
        } catch (e: any) {
           console.error(`Regex validation failed in ${file} for ${row.iso2}: ${e.message}`);
           hasErrors = true;
        }
        if (row.examples && Array.isArray(row.examples)) {
          const re = new RegExp(row.regex);
          for (const ex of row.examples) {
            if (!re.test(ex)) {
              console.error(`Example validation failed in ${file} for ${row.iso2}: "${ex}" does not match ${row.regex}`);
              hasErrors = true;
            }
          }
        }
      }
    }

    if (keys.size > 0) {
      // Check sorting
      const originalKeys = data.map((r: any) => r.iso2 || r.code || r.id || r.locale).filter(Boolean);
      const sortedKeys = [...originalKeys].sort();
      let sorted = true;
      for (let i=0; i<originalKeys.length; i++) {
        if (originalKeys[i] !== sortedKeys[i]) {
          sorted = false;
          break;
        }
      }
      if (!sorted) {
        console.error(`Sort validation failed in ${file}: File is not deterministically sorted by primary key.`);
        hasErrors = true;
      }
    }
  }
}

if (hasErrors) {
  console.error('\\nValidation failed.');
  process.exit(1);
} else {
  console.log('\\nAll validations passed.');
}
