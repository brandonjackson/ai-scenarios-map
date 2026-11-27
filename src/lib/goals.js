// Pure goal-function logic, shared by the app (src/goals.js) and the
// validator (scripts/check-goals.mjs). See goals/README.md for the format.

const ROUNDING = { floor: Math.floor, round: Math.round, ceil: Math.ceil };

// How a score or coordinate was arrived at. A blank score means the source
// doesn't address the criterion; it is shown as "not addressed" and left out
// of averages rather than defaulted to the midpoint.
export const BASES = ["stated", "inferred"];

// Group scores.csv rows into { [scenarioId]: { baseline, policies: { [slug]: entry } } },
// where an entry is { [criterionId]: { score, reason, basis } }. score is null
// when the criterion is not addressed.
export function indexScores(rows) {
  const out = {};
  for (const r of rows) {
    if (!r.scenario || !r.criterion) continue;
    const s = (out[r.scenario] ||= { baseline: {}, policies: {} });
    const entry = r.policy ? (s.policies[r.policy] ||= {}) : s.baseline;
    const score = r.score === "" ? null : Number(r.score);
    entry[r.criterion] = { score, reason: r.reason || "", basis: score == null ? "" : r.basis || "" };
  }
  return out;
}

// True when a criterion entry carries a score (not "not addressed").
export const isScored = (s) => s != null && s.score != null;

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
// average over the criteria the source addresses, the weakest of them, and
// the headline rating. A rating needs every criterion to have a row and at
// least aggregation.minScored of them (default: all) to carry a score.
export function assess(goal, entry) {
  if (!entry) return null;
  const agg = goal.aggregation || {};
  const covered = goal.criteria.filter((c) => entry[c.id]);
  if (!covered.length) return null;
  const scored = covered.filter((c) => isScored(entry[c.id]));
  const notAddressed = covered.filter((c) => !isScored(entry[c.id])).map((c) => c.id);
  const complete = covered.length === goal.criteria.length;
  const minScored = agg.minScored ?? goal.criteria.length;
  if (!scored.length) {
    return { scores: entry, average: null, min: null, rating: null, complete, capped: false, scored: 0, notAddressed };
  }

  const totalWeight = scored.reduce((n, c) => n + (c.weight ?? 1), 0);
  const average = scored.reduce((n, c) => n + entry[c.id].score * (c.weight ?? 1), 0) / totalWeight;
  const min = Math.min(...scored.map((c) => entry[c.id].score));

  let rating = null;
  let capped = false;
  if (complete && scored.length >= minScored) {
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
  return { scores: entry, average, min, rating, complete, capped, scored: scored.length, notAddressed };
}

export const scaleLabel = (goal, value) => goal.scale.find((s) => s.value === value)?.label || "";

// Plain-language description of how the headline rating is computed.
export function describeAggregation(goal) {
  const agg = goal.aggregation || {};
  const weighted = goal.criteria.some((c) => c.weight != null && c.weight !== 1);
  const n = goal.criteria.length;
  const parts = [`Rating = ${agg.rounding || "round"}(${weighted ? "weighted " : ""}average of the criteria addressed)`];
  if (agg.weakestLink != null) parts.push(`capped at weakest criterion + ${agg.weakestLink}`);
  if (agg.minScored != null && agg.minScored < n) parts.push(`given only when at least ${agg.minScored} of ${n} are addressed`);
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
  const minScored = goal.aggregation?.minScored;
  req(minScored == null || (Number.isInteger(minScored) && minScored >= 1 && minScored <= goal.criteria.length),
    `aggregation.minScored must be a whole number from 1 to ${goal.criteria.length}`);

  const seen = new Set();
  rows.forEach((r, i) => {
    const where = `scores.csv row ${i + 2}`;
    req(r.scenario, `${where}: missing scenario`);
    req(critIds.has(r.criterion), `${where}: unknown criterion "${r.criterion}"`);
    if (r.score === "") {
      req(r.reason, `${where}: a blank (not addressed) score still needs a reason`);
      req(!r.basis, `${where}: a blank (not addressed) score takes no basis`);
    } else {
      req(values.has(Number(r.score)), `${where}: score "${r.score}" is not on the scale`);
      req(!r.basis || BASES.includes(r.basis), `${where}: basis "${r.basis}" must be ${BASES.join(" or ")}`);
    }
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
