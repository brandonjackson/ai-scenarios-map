// Validates data/scenario-policies.csv: every scenario id must exist in
// data/scenarios.csv and every policy slug in the Policy Atlas.
// Rows with an empty policy record that a scenario names no atlas policies.
import { readFileSync } from "node:fs";
import { parseCsv } from "../src/lib/csv.js";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");

const ids = new Set(parseCsv(read("data/scenarios.csv")).map((s) => s.id));
const slugs = new Set(JSON.parse(read("data/policy-atlas/policies.json")).policies.map((p) => p.slug));
const rows = parseCsv(read("data/scenario-policies.csv"));

const errors = [];
const seen = new Set();
rows.forEach((r, i) => {
  const at = `data/scenario-policies.csv row ${i + 2}`;
  if (!ids.has(r.scenario)) errors.push(`${at}: unknown scenario "${r.scenario}"`);
  if (r.policy && !slugs.has(r.policy)) errors.push(`${at}: unknown policy "${r.policy}"`);
  if (!r.evidence) errors.push(`${at}: missing evidence`);
  const key = `${r.scenario}/${r.policy}`;
  if (seen.has(key)) errors.push(`${at}: duplicate ${key}`);
  seen.add(key);
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
const tagged = new Set(rows.filter((r) => r.policy).map((r) => r.scenario));
console.log(`Scenario policies: ${rows.filter((r) => r.policy).length} tags across ${tagged.size} scenarios`);
