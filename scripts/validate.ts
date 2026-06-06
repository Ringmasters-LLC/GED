import fs from 'fs';
import path from 'path';
import { globSync } from 'fast-glob';
import { ContractMap } from './contracts';

const dataDir = path.resolve(process.cwd(), 'data/canonical');

let hasErrors = false;

// 1. Validate data using Zod
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

  const schema = ContractMap[file];
  if (!schema) {
    console.error(`Warning: No Zod contract found for ${file}`);
    continue;
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`Zod validation failed for ${file}:`);
    console.error(JSON.stringify(result.error.flatten(), null, 2));
    hasErrors = true;
  } else {
    console.log(`Validated (Zod): ${file}`);
  }
}

// 2. Custom validations (uniqueness, provenance, postal regex, deterministic sort, LF, UTF-8)
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
    if (text.includes('\\uFFFD')) {
      // Replacement character
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
    let hasSourcesField = data.length > 0 && data[0].sources !== undefined;

    for (const row of data) {
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
              console.error(
                `Example validation failed in ${file} for ${row.iso2}: "${ex}" does not match ${row.regex}`,
              );
              hasErrors = true;
            }
          }
        }
      }
    }

    if (keys.size > 0) {
      // Check sorting
      const originalKeys = data
        .map((r: any) => r.iso2 || r.code || r.id || r.locale)
        .filter(Boolean);
      const sortedKeys = [...originalKeys].sort();
      let sorted = true;
      for (let i = 0; i < originalKeys.length; i++) {
        if (originalKeys[i] !== sortedKeys[i]) {
          sorted = false;
          break;
        }
      }
      if (!sorted) {
        console.error(
          `Sort validation failed in ${file}: File is not deterministically sorted by primary key.`,
        );
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
