/**
 * Validate every goal in goals/ against the goal format and the scenario and
 * policy ids it references. Runs before `npm run dev` / `npm run build`.
 * Run: node scripts/check-goals.mjs
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseCsv } from '../src/lib/csv.js';
import { validateGoal } from '../src/lib/goals.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const goalsDir = join(root, 'goals');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf-8'));

const scenarioIds = new Set(parseCsv(readFileSync(join(root, 'data', 'scenarios.csv'), 'utf-8')).map((s) => s.id));
const policySlugs = new Set(readJson(join(root, 'data', 'policy-atlas', 'policies.json')).policies.map((p) => p.slug));

const ids = readdirSync(goalsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
let failed = false;

const { default: defaultId } = readJson(join(goalsDir, 'config.json'));
if (!ids.includes(defaultId)) {
  console.error(`goals/config.json: default goal "${defaultId}" has no goals/${defaultId}/goal.json`);
  failed = true;
}

for (const id of ids) {
  const goalPath = join(goalsDir, id, 'goal.json');
  if (!existsSync(goalPath)) continue;
  const goal = readJson(goalPath);
  const scoresPath = join(goalsDir, id, 'scores.csv');
  const rows = existsSync(scoresPath) ? parseCsv(readFileSync(scoresPath, 'utf-8')) : [];
  const errors = validateGoal(goal, rows, { scenarioIds, policySlugs });
  if (goal.id !== id) errors.push(`id "${goal.id}" must match its folder name "${id}"`);
  if (errors.length) {
    failed = true;
    console.error(`goals/${id}:\n  ${errors.join('\n  ')}`);
  } else {
    const scenarios = new Set(rows.map((r) => r.scenario)).size;
    console.log(`Goal "${goal.name}": ${goal.criteria.length} criteria, ${scenarios} scenarios assessed`);
  }
}

if (failed) process.exit(1);
