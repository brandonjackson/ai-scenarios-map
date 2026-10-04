import config from "../goals/config.json";
import { parseCsv } from "./lib/csv.js";
import { assess, indexScores, indexPolicyCriteria } from "./lib/goals.js";

// Every goals/<id>/goal.json is a goal function; its scores.csv (optional)
// holds the per-scenario assessments and its policies.csv (optional) maps
// policies to the criteria they serve. New folders are picked up automatically.
const defs = import.meta.glob("../goals/*/goal.json", { eager: true, import: "default" });
const csvs = import.meta.glob("../goals/*/scores.csv", { eager: true, query: "?raw", import: "default" });
const policyCsvs = import.meta.glob("../goals/*/policies.csv", { eager: true, query: "?raw", import: "default" });

export const goals = Object.entries(defs)
  .map(([path, goal]) => {
    const csv = csvs[path.replace(/goal\.json$/, "scores.csv")];
    const policyCsv = policyCsvs[path.replace(/goal\.json$/, "policies.csv")];
    return {
      ...goal,
      assessments: indexScores(csv ? parseCsv(csv) : []),
      policyCriteria: indexPolicyCriteria(policyCsv ? parseCsv(policyCsv) : []),
    };
  })
  .sort((a, b) => (a.id === config.default ? -1 : b.id === config.default ? 1 : a.name.localeCompare(b.name)));

export const defaultGoal = goals.find((g) => g.id === config.default) || goals[0];

export const goalById = (id) => goals.find((g) => g.id === id);

export const assessScenario = (goal, scenarioId, policy) => {
  const a = goal.assessments[scenarioId];
  return assess(goal, policy ? a?.policies[policy] : a?.baseline);
};

// The criteria a policy is mapped to under a goal, as [{ criterion, reason }]
// with criterion resolved to its definition, in the goal's criterion order.
export const criteriaForPolicy = (goal, slug) =>
  goal.criteria.flatMap((c) =>
    (goal.policyCriteria[slug] || []).filter((m) => m.criterion === c.id).map((m) => ({ criterion: c, reason: m.reason }))
  );
