import { marked } from "marked";

// Hand-written context for each scenario lives in scenarios/<id>/ (see
// scenarios/README.md). summary.md reads the scenario through the social
// contract's five promises; analysis.md covers its assumptions.
const files = import.meta.glob("../scenarios/*/{summary,analysis}.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const notes = {};
for (const [path, text] of Object.entries(files)) {
  const [, id, kind] = path.match(/scenarios\/([^/]+)\/(summary|analysis)\.md$/);
  (notes[id] ||= {})[kind] = text;
}

export const scenarioNotes = (id) => notes[id] || {};

// Splits a note into its lead (text before the first "## ") and its
// "## " sections, dropping the "# " title the page already shows.
export function splitSections(md) {
  const body = md.replace(/^# .*\n+/, "");
  const [lead, ...rest] = body.split(/^## /m);
  return {
    lead: lead.trim(),
    sections: rest.map((chunk) => {
      const nl = chunk.indexOf("\n");
      return { heading: chunk.slice(0, nl).trim(), body: chunk.slice(nl + 1).trim() };
    }),
  };
}

// Notes are first-party repository content, so rendering them as HTML is safe.
export const renderMarkdown = (md) => ({ __html: marked.parse(md) });

export const POLICY_STANCES = {
  off: { label: "Policy off", hint: "Assumes policy is absent, lagging or captured" },
  on: { label: "Policy on", hint: "Depends on deliberate policy or prescribes it" },
  mixed: { label: "Mixed", hint: "Policy-off and policy-on versions, or on for some promises only" },
};
