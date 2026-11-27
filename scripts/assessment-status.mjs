// Shows which analyses each scenario has, and which are missing or stale.
//
//   node scripts/assessment-status.mjs            every scenario
//   node scripts/assessment-status.mjs --todo     only scenarios with something missing or stale
//   node scripts/assessment-status.mjs id1 id2    just these scenarios
//
// Columns (✓ done, · missing, ! stale: the extract changed after it was done,
// - not applicable):
//   extract   scenarios/<id>/extract.md exists
//   rating    a row in data/assessments.csv with policy and likelihood set
//             (stale if `assessed` is empty or before the extract's last commit)
//   map       at least one axis pair has coordinates
//   links     data/scenario-policies.csv rows, needed when policy is on or mixed
//   summary   scenarios/<id>/summary.md
//   analysis  scenarios/<id>/analysis.md
//   <goal>    scores for every criterion of goals/<goal>/goal.json
//
// Staleness of summary/analysis compares git commit dates, so commit the
// extract before re-running assessments.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { parseCsv } from "../src/lib/csv.js";
import { loadScenarios } from "./lib/scenarios.mjs";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const args = process.argv.slice(2);
const todoOnly = args.includes("--todo");
const only = args.filter((a) => !a.startsWith("--"));

const { scenarios } = loadScenarios();
const axes = JSON.parse(read("data/axes.json"));
const links = parseCsv(read("data/scenario-policies.csv"));
const goals = readdirSync(new URL("goals/", root), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(new URL(`goals/${d.name}/goal.json`, root)))
  .map((d) => {
    const goal = JSON.parse(read(`goals/${d.name}/goal.json`));
    const file = `goals/${d.name}/scores.csv`;
    const scores = existsSync(new URL(file, root)) ? parseCsv(read(file)) : [];
    return { id: d.name, criteria: goal.criteria.map((c) => c.id), scores };
  });

// Last commit date (YYYY-MM-DD) of every file under scenarios/ and goals/.
const lastCommit = {};
try {
  const log = execSync("git log --format=@%cs --name-only -- scenarios goals", {
    cwd: new URL(".", root),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  let date = "";
  for (const line of log.split("\n")) {
    if (line.startsWith("@")) date = line.slice(1);
    else if (line && !lastCommit[line]) lastCommit[line] = date;
  }
} catch {
  // Not a git checkout: staleness can't be judged.
}

const has = (p) => existsSync(new URL(p, root));
const MARK = { done: "✓", missing: "·", stale: "!", na: "-" };
const fileStatus = (path, extractDate) => {
  if (!has(path)) return "missing";
  if (extractDate && lastCommit[path] && lastCommit[path] < extractDate) return "stale";
  return "done";
};

const goalCols = goals.map((g) => g.id);
const header = ["id", "extract", "rating", "map", "links", "summary", "analysis", ...goalCols];
const out = [];
for (const s of scenarios) {
  if (only.length && !only.includes(s.id)) continue;
  const dir = `scenarios/${s.id}/`;
  const extractDate = lastCommit[`${dir}extract.md`];
  const st = {};
  st.extract = has(`${dir}extract.md`) ? "done" : "missing";
  st.rating = !(s.policy && s.likelihood)
    ? "missing"
    : extractDate && (!s.assessed || s.assessed < extractDate)
      ? "stale"
      : "done";
  st.map = axes.some((a) => s[a.xField] !== "" && s[a.yField] !== "") ? "done" : "missing";
  st.links = !["on", "mixed"].includes(s.policy) ? "na" : links.some((l) => l.scenario === s.id) ? "done" : "missing";
  st.summary = fileStatus(`${dir}summary.md`, extractDate);
  st.analysis = fileStatus(`${dir}analysis.md`, extractDate);
  for (const g of goals) {
    const mine = g.scores.filter((r) => r.scenario === s.id && !r.policy);
    const complete = g.criteria.every((c) => mine.some((r) => r.criterion === c));
    st[g.id] = !complete
      ? "missing"
      : extractDate && lastCommit[`goals/${g.id}/scores.csv`] < extractDate
        ? "stale?"
        : "done";
  }
  const vals = Object.values(st);
  if (todoOnly && !vals.some((v) => v === "missing" || v.startsWith("stale"))) continue;
  out.push([s.id, ...header.slice(1).map((h) => (st[h] === "stale?" ? "!?" : MARK[st[h]]))]);
}

const widths = header.map((h, i) => Math.max(h.length, ...out.map((r) => r[i].length)));
const line = (r) => r.map((v, i) => v.padEnd(widths[i])).join("  ");
console.log(line(header));
out.forEach((r) => console.log(line(r)));
console.log(
  `\n${out.length} scenario(s). ✓ done  · missing  ! stale (extract changed since)  !? goal scores file older than extract (check)  - not applicable`,
);
console.log(`Assessment fields in data/assessments.csv: ${Object.keys(parseCsv(read("data/assessments.csv"))[0] || {}).join(", ")}`);
