// Reads the scenario catalogue (data/scenarios.csv: what each scenario is and
// where it comes from) and the assessments (data/assessments.csv: tags, map
// coordinates, policy stance and likelihood derived from each extract), and
// merges them by id. A catalogue row with no assessment row is unassessed: its
// assessment fields are empty.
import { readFileSync } from "node:fs";
import { parseCsv } from "../../src/lib/csv.js";

const root = new URL("../../", import.meta.url);
const read = (p) => parseCsv(readFileSync(new URL(p, root), "utf8"));

export const catalogue = () => read("data/scenarios.csv");
export const assessments = () => read("data/assessments.csv");

// Returns { scenarios, errors }.
export function loadScenarios() {
  const cat = catalogue();
  const asm = assessments();
  const errors = [];
  const ids = new Set();
  for (const s of cat) {
    if (ids.has(s.id)) errors.push(`data/scenarios.csv: duplicate id "${s.id}"`);
    ids.add(s.id);
  }
  const byId = {};
  for (const a of asm) {
    if (!ids.has(a.id)) errors.push(`data/assessments.csv: "${a.id}" is not in data/scenarios.csv`);
    if (byId[a.id]) errors.push(`data/assessments.csv: duplicate id "${a.id}"`);
    byId[a.id] = a;
  }
  const blank = Object.fromEntries(Object.keys(asm[0] || {}).map((k) => [k, ""]));
  const scenarios = cat.map((s) => ({ ...s, ...blank, ...(byId[s.id] || {}), id: s.id }));
  return { scenarios, errors };
}
