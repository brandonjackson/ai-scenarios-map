/**
 * Convert scenarios.csv → scenarios.json
 * Run: node scripts/csv2json.mjs
 *
 * This is the canonical data pipeline:
 * 1. Edit scenarios.csv (CSV is the source of truth)
 * 2. Run this script (or just `npm run dev` / `npm run build` — it runs automatically)
 * 3. The app reads scenarios.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const csv = readFileSync(join(dataDir, 'scenarios.csv'), 'utf-8');
const lines = csv.split('\n').filter(l => l.trim());
const headers = lines[0].split(',').map(h => h.trim());

const NUMERIC_FIELDS = ['year', 'x_labor', 'y_labor', 'x_fiscal', 'y_fiscal'];

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
}

const scenarios = [];
for (let i = 1; i < lines.length; i++) {
  const values = parseCsvLine(lines[i]);
  const obj = {};
  headers.forEach((h, idx) => {
    let val = (values[idx] || '').trim();
    if (NUMERIC_FIELDS.includes(h)) {
      if (val === '' || val === 'null' || val === 'undefined') {
        obj[h] = null;
      } else {
        obj[h] = Number(val);
      }
    } else {
      obj[h] = val;
    }
  });
  if (obj.id) scenarios.push(obj);
}

writeFileSync(
  join(dataDir, 'scenarios.json'),
  JSON.stringify(scenarios, null, 2)
);

console.log(`Converted ${scenarios.length} scenarios from CSV → JSON`);
