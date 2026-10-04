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
import { parseCsv } from '../src/lib/csv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const rows = parseCsv(readFileSync(join(dataDir, 'scenarios.csv'), 'utf-8'));

const NUMERIC_FIELDS = ['year', 'x_labor', 'y_labor', 'x_fiscal', 'y_fiscal'];
const LIKELIHOODS = JSON.parse(readFileSync(join(dataDir, 'likelihood.json'), 'utf-8')).scale.map((l) => l.key);

const scenarios = [];
const errors = [];
for (const row of rows) {
  const obj = {};
  for (const [h, val] of Object.entries(row)) {
    if (NUMERIC_FIELDS.includes(h)) {
      obj[h] = val === '' || val === 'null' || val === 'undefined' ? null : Number(val);
    } else {
      obj[h] = val;
    }
  }
  if (!obj.id) continue;
  if (obj.likelihood && !LIKELIHOODS.includes(obj.likelihood)) {
    errors.push(`${obj.id}: unknown likelihood "${obj.likelihood}" (use ${LIKELIHOODS.join(', ')})`);
  }
  if (obj.date && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(obj.date)) {
    errors.push(`${obj.id}: date "${obj.date}" must be YYYY, YYYY-MM or YYYY-MM-DD`);
  } else if (obj.date && obj.year != null && !obj.date.startsWith(String(obj.year))) {
    errors.push(`${obj.id}: date ${obj.date} does not match year ${obj.year}`);
  }
  scenarios.push(obj);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

writeFileSync(
  join(dataDir, 'scenarios.json'),
  JSON.stringify(scenarios, null, 2)
);

console.log(`Converted ${scenarios.length} scenarios from CSV → JSON`);
