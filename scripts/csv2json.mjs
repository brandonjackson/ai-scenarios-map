/**
 * Merge scenarios.csv (catalogue) + assessments.csv (derived ratings) → scenarios.json
 * Run: node scripts/csv2json.mjs
 *
 * This is the canonical data pipeline:
 * 1. Edit data/scenarios.csv (what each scenario is) and data/assessments.csv
 *    (tags, coordinates, policy, likelihood — written by the assess-scenarios skill)
 * 2. Run this script (or just `npm run dev` / `npm run build` — it runs automatically)
 * 3. The app reads scenarios.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadScenarios } from './lib/scenarios.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const { scenarios: rows, errors: loadErrors } = loadScenarios();

const NUMERIC_FIELDS = ['year', 'x_labor', 'y_labor', 'x_fiscal', 'y_fiscal'];
const LIKELIHOODS = JSON.parse(readFileSync(join(dataDir, 'likelihood.json'), 'utf-8')).scale.map((l) => l.key);

const scenarios = [];
const errors = [...loadErrors];
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
  if (obj.policy && !['off', 'on', 'mixed'].includes(obj.policy)) {
    errors.push(`${obj.id}: unknown policy "${obj.policy}" (use off, on or mixed)`);
  }
  if (obj.assessed && !/^\d{4}-\d{2}-\d{2}$/.test(obj.assessed)) {
    errors.push(`${obj.id}: assessed "${obj.assessed}" must be YYYY-MM-DD`);
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

const unassessed = scenarios.filter((s) => !s.policy && !s.likelihood).map((s) => s.id);
console.log(`Converted ${scenarios.length} scenarios from CSV → JSON`);
if (unassessed.length) console.log(`Not yet assessed: ${unassessed.join(', ')}`);
