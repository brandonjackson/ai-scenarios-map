import config from "../goals/config.json";
import { parseCsv } from "./lib/csv.js";
import { assess, indexScores } from "./lib/goals.js";

// Every goals/<id>/goal.json is a goal function; its scores.csv (optional)
// holds the per-scenario assessments. New folders are picked up automatically.
const defs = import.meta.glob("../goals/*/goal.json", { eager: true, import: "default" });
const csvs = import.meta.glob("../goals/*/scores.csv", { eager: true, query: "?raw", import: "default" });

export const goals = Object.entries(defs)
  .map(([path, goal]) => {
    const csv = csvs[path.replace(/goal\.json$/, "scores.csv")];
    return { ...goal, assessments: indexScores(csv ? parseCsv(csv) : []) };
  })
  .sort((a, b) => (a.id === config.default ? -1 : b.id === config.default ? 1 : a.name.localeCompare(b.name)));

export const defaultGoal = goals.find((g) => g.id === config.default) || goals[0];

export const goalById = (id) => goals.find((g) => g.id === id);

export const assessScenario = (goal, scenarioId, policy) => {
  const a = goal.assessments[scenarioId];
  return assess(goal, policy ? a?.policies[policy] : a?.baseline);
};
