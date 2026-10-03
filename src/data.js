import scenariosData from "../data/scenarios.json";
import axesData from "../data/axes.json";
import atlas from "../data/policy-atlas/policies.json";
import scenarioPoliciesCsv from "../data/scenario-policies.csv?raw";
import { parseCsv } from "./lib/csv.js";

export const scenarios = scenariosData;
export const axes = axesData;
export const policies = atlas.policies;
export const policyCategories = atlas.categories;
export const policySource = { name: atlas.source, url: atlas.source_url, scrapedAt: atlas.scraped_at };

export const hasAxis = (s, a) =>
  s[a.xField] !== null && s[a.xField] !== "" && s[a.yField] !== null && s[a.yField] !== "";

// qLabels are ordered [top-left, top-right, bottom-left, bottom-right].
// "Top" is negative y unless the axis pair sets yInvert.
export function quadrantLabel(s, a) {
  if (!hasAxis(s, a)) return null;
  const right = s[a.xField] >= 0;
  const top = a.yInvert ? s[a.yField] >= 0 : s[a.yField] < 0;
  return a.qLabels[(top ? 0 : 2) + (right ? 1 : 0)].replace("\n", " · ");
}

export const splitTags = (tags) => (tags ? tags.split(", ").filter(Boolean) : []);

// Which Policy Atlas policies each scenario names, with a line of evidence.
// A row with no policy records that the scenario names none.
const scenarioPolicyRows = parseCsv(scenarioPoliciesCsv);
const policyBySlug = Object.fromEntries(atlas.policies.map((p) => [p.slug, p]));

export const policiesForScenario = (id) =>
  scenarioPolicyRows
    .filter((r) => r.scenario === id && r.policy)
    .map((r) => ({ policy: policyBySlug[r.policy], evidence: r.evidence }));

export const policyNoteForScenario = (id) =>
  scenarioPolicyRows.find((r) => r.scenario === id && !r.policy)?.evidence;

export const scenariosForPolicy = (slug) =>
  scenarioPolicyRows
    .filter((r) => r.policy === slug)
    .map((r) => ({ scenario: scenarios.find((s) => s.id === r.scenario), evidence: r.evidence }));
