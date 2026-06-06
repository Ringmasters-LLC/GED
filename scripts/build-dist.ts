import fs from 'fs';
import path from 'path';
import { globSync } from 'fast-glob';
import Database from 'better-sqlite3';
import { Parser } from 'json2csv';
import { ContractMap } from './contracts';

const canonicalDir = path.resolve(process.cwd(), 'data/canonical');
const distDir = path.resolve(process.cwd(), 'dist');

// Ensure dist folders
const formats = ['json', 'tsv', 'csv', 'txt', 'md', 'sql', 'sqlite'];
for (const fmt of formats) {
  const dir = path.join(distDir, fmt);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const dataFiles = globSync('*.json', { cwd: canonicalDir });

const dbPath = path.join(distDir, 'sqlite', 'global-entry-data.sqlite');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const db = new Database(dbPath);

for (const file of dataFiles) {
  const basename = path.basename(file, '.json');
  const rawData = JSON.parse(fs.readFileSync(path.join(canonicalDir, file), 'utf8'));

  if (!Array.isArray(rawData)) continue;

  const schema = ContractMap[file];
  if (!schema) {
    console.error(`Warning: No Zod contract found for ${file}, skipping dist generation.`);
    continue;
  }

  const result = schema.safeParse(rawData);
  if (!result.success) {
    console.error(`Build error: ${file} failed Zod validation.`);
    console.error(JSON.stringify(result.error.flatten(), null, 2));
    process.exit(1);
  }

  const data = result.data;

  // 1. JSON
  fs.writeFileSync(path.join(distDir, 'json', file), JSON.stringify(data, null, 2) + '\n');

  // If array is empty, continue
  if (data.length === 0) continue;

  const keys = Object.keys(data[0]);

  // Transform data to flat strings for CSV/TSV
  const flatData = data.map((row: any) => {
    const flat: any = {};
    for (const key of keys) {
      if (typeof row[key] === 'object' && row[key] !== null) {
        flat[key] = JSON.stringify(row[key]);
      } else {
        flat[key] = row[key];
      }
    }
    return flat;
  });

  // 2. CSV
  try {
    const csvParser = new Parser();
    const csv = csvParser.parse(flatData);
    fs.writeFileSync(path.join(distDir, 'csv', `${basename}.csv`), csv + '\n');
  } catch (e) {
    console.error(`CSV generation failed for ${file}`, e);
  }

  // 3. TSV
  try {
    const tsvParser = new Parser({ delimiter: '\t', quote: '' });
    const tsv = tsvParser.parse(flatData);
    fs.writeFileSync(path.join(distDir, 'tsv', `${basename}.tsv`), tsv + '\n');
  } catch (e) {
    console.error(`TSV generation failed for ${file}`, e);
  }

  // 4. TXT (simple list of primary keys)
  const pkField = keys.includes('iso2')
    ? 'iso2'
    : keys.includes('code')
      ? 'code'
      : keys.includes('id')
        ? 'id'
        : keys.includes('locale')
          ? 'locale'
          : keys[0];
  const txt = data.map((r: any) => r[pkField]).join('\n');
  fs.writeFileSync(path.join(distDir, 'txt', `${basename}.txt`), txt + '\n');

  // 5. MD
  let md = `# ${basename}\n\nGenerated from canonical data.\n\n`;
  md += `| ${keys.join(' | ')} |\n`;
  md += `|${keys.map(() => '---').join('|')}|\n`;
  for (const row of flatData) {
    md += `| ${keys.map((k) => (row[k] === undefined || row[k] === null ? '' : String(row[k]).replace(/\\|/g, '&#124;'))).join(' | ')} |\n`;
  }
  fs.writeFileSync(path.join(distDir, 'md', `${basename}.md`), md);

  // 6. SQL
  const tableName = basename.replace(/-/g, '_');
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
  sql += keys.map((k) => `  "${k}" TEXT`).join(',\n');
  sql += `\n);\n\n`;

  for (const row of flatData) {
    const values = keys.map((k) => {
      if (row[k] === undefined || row[k] === null) return 'NULL';
      return `'${String(row[k]).replace(/'/g, "''")}'`;
    });
    sql += `INSERT INTO ${tableName} (${keys.map((k) => `"${k}"`).join(', ')}) VALUES (${values.join(', ')});\n`;
  }
  fs.writeFileSync(path.join(distDir, 'sql', `${basename}.sql`), sql);

  // 7. SQLite
  const createSql = `CREATE TABLE IF NOT EXISTS ${tableName} (${keys.map((k) => `"${k}" TEXT`).join(', ')})`;
  db.exec(createSql);
  const placeholders = keys.map(() => '?').join(', ');
  const stmt = db.prepare(
    `INSERT INTO ${tableName} (${keys.map((k) => `"${k}"`).join(', ')}) VALUES (${placeholders})`,
  );

  db.transaction(() => {
    for (const row of flatData) {
      const vals = keys.map((k) =>
        row[k] === undefined || row[k] === null ? null : String(row[k]),
      );
      stmt.run(...vals);
    }
  })();
}

db.close();
console.log('Dist outputs generated.');
