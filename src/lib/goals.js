// Pure goal-function logic, shared by the app (src/goals.js) and the
// validator (scripts/check-goals.mjs). See goals/README.md for the format.

const ROUNDING = { floor: Math.floor, round: Math.round, ceil: Math.ceil };

// Group scores.csv rows into { [scenarioId]: { baseline, policies: { [slug]: entry } } },
// where an entry is { [criterionId]: { score, reason } }.
export function indexScores(rows) {
  const out = {};
  for (const r of rows) {
    if (!r.scenario || !r.criterion || r.score === "") continue;
    const s = (out[r.scenario] ||= { baseline: {}, policies: {} });
    const entry = r.policy ? (s.policies[r.policy] ||= {}) : s.baseline;
    entry[r.criterion] = { score: Number(r.score), reason: r.reason || "" };
  }
  return out;
}

// Group policies.csv rows into { [policySlug]: [{ criterion, reason }] }:
// which criteria each policy is meant to strengthen.
export function indexPolicyCriteria(rows) {
  const out = {};
  for (const r of rows) {
    if (!r.policy || !r.criterion) continue;
    (out[r.policy] ||= []).push({ criterion: r.criterion, reason: r.reason || "" });
  }
  return out;
}

// Turn one set of criterion scores into an assessment: the (weighted)
// average, the weakest criterion, and the headline rating.
export function assess(goal, entry) {
  if (!entry) return null;
  const agg = goal.aggregation || {};
  const scored = goal.criteria.filter((c) => entry[c.id]);
  if (!scored.length) return null;
  const complete = scored.length === goal.criteria.length;

  const totalWeight = scored.reduce((n, c) => n + (c.weight ?? 1), 0);
  const average = scored.reduce((n, c) => n + entry[c.id].score * (c.weight ?? 1), 0) / totalWeight;
  const min = Math.min(...scored.map((c) => entry[c.id].score));

  let rating = null;
  let capped = false;
  if (complete) {
    const roundFn = ROUNDING[agg.rounding] || Math.round;
    // Nudge before rounding so 2.9999… from float weights doesn't floor to 2.
    rating = roundFn(average + 1e-9);
    if (agg.weakestLink != null && rating > min + agg.weakestLink) {
      rating = min + agg.weakestLink;
      capped = true;
    }
    const values = goal.scale.map((s) => s.value);
    rating = Math.max(Math.min(...values), Math.min(Math.max(...values), rating));
  }
  return { scores: entry, average, min, rating, complete, capped };
}

export const scaleLabel = (goal, value) => goal.scale.find((s) => s.value === value)?.label || "";

// Plain-language description of how the headline rating is computed.
export function describeAggregation(goal) {
  const agg = goal.aggregation || {};
  const weighted = goal.criteria.some((c) => c.weight != null && c.weight !== 1);
  const parts = [`Rating = ${agg.rounding || "round"}(${weighted ? "weighted " : ""}average of ${goal.criteria.length} criteria)`];
  if (agg.weakestLink != null) parts.push(`capped at weakest criterion + ${agg.weakestLink}`);
  return parts.join(", ");
}

// Returns a list of human-readable problems; empty means the goal is valid.
export function validateGoal(goal, rows, { scenarioIds, policySlugs, policyRows = [] } = {}) {
  const errors = [];
  const req = (cond, msg) => { if (!cond) errors.push(msg); };
  req(goal.id, "missing id");
  req(goal.name, "missing name");
  req(Array.isArray(goal.criteria) && goal.criteria.length, "criteria must be a non-empty array");
  req(Array.isArray(goal.scale) && goal.scale.length, "scale must be a non-empty array");
  if (errors.length) return errors;

  const critIds = new Set();
  for (const c of goal.criteria) {
    req(c.id && c.name, `criterion ${JSON.stringify(c)} needs id and name`);
    req(!critIds.has(c.id), `duplicate criterion id "${c.id}"`);
    critIds.add(c.id);
  }
  const values = new Set(goal.scale.map((s) => s.value));
  for (const s of goal.scale) req(Number.isFinite(s.value) && s.label, `scale entry ${JSON.stringify(s)} needs numeric value and label`);
  const rounding = goal.aggregation?.rounding;
  req(!rounding || ROUNDING[rounding], `aggregation.rounding must be floor, round or ceil (got "${rounding}")`);

  const seen = new Set();
  rows.forEach((r, i) => {
    const where = `scores.csv row ${i + 2}`;
    req(r.scenario, `${where}: missing scenario`);
    req(critIds.has(r.criterion), `${where}: unknown criterion "${r.criterion}"`);
    req(values.has(Number(r.score)), `${where}: score "${r.score}" is not on the scale`);
    if (scenarioIds && r.scenario) req(scenarioIds.has(r.scenario), `${where}: unknown scenario "${r.scenario}"`);
    if (policySlugs && r.policy) req(policySlugs.has(r.policy), `${where}: unknown policy "${r.policy}"`);
    const key = `${r.scenario}|${r.policy}|${r.criterion}`;
    req(!seen.has(key), `${where}: duplicate score for ${key}`);
    seen.add(key);
  });

  const mapped = new Set();
  policyRows.forEach((r, i) => {
    const where = `policies.csv row ${i + 2}`;
    req(r.policy, `${where}: missing policy`);
    req(critIds.has(r.criterion), `${where}: unknown criterion "${r.criterion}"`);
    if (policySlugs && r.policy) req(policySlugs.has(r.policy), `${where}: unknown policy "${r.policy}"`);
    const key = `${r.policy}|${r.criterion}`;
    req(!mapped.has(key), `${where}: duplicate mapping for ${key}`);
    mapped.add(key);
  });
  return errors;
}
