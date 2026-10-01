import scenariosData from "../data/scenarios.json";
import axesData from "../data/axes.json";
import atlas from "../data/policy-atlas/policies.json";

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
