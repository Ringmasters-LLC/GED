import fs from 'fs';
import path from 'path';
import { globSync } from 'fast-glob';

const dataDir = path.resolve(process.cwd(), 'data/canonical');
const dataFiles = globSync('*.json', { cwd: dataDir });

for (const file of dataFiles) {
  const dataPath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  if (Array.isArray(data)) {
    data.sort((a, b) => {
      const pkA = a.iso2 || a.code || a.id || a.locale;
      const pkB = b.iso2 || b.code || b.id || b.locale;
      if (pkA < pkB) return -1;
      if (pkA > pkB) return 1;
      return 0;
    });
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Sorted ${file}`);
  }
}
