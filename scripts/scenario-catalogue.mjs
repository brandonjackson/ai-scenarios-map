// Helps find new scenarios without re-adding ones already on the map.
//
//   node scripts/scenario-catalogue.mjs list
//     One line per scenario in data/scenarios.csv: id | date | author | title | url
//
//   node scripts/scenario-catalogue.mjs check <candidates.json>
//     <candidates.json> is an array of { title, url, author?, id? }.
//     Flags each candidate that matches an existing scenario by URL, id or
//     title, and exits 1 if any candidate is a likely duplicate.
import { readFileSync } from "node:fs";
import { parseCsv } from "../src/lib/csv.js";

const root = new URL("../", import.meta.url);
const rows = parseCsv(readFileSync(new URL("data/scenarios.csv", root), "utf8"));

const normUrl = (u = "") =>
  u
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "")
    .replace(/\.pdf$/, "");
const words = (t = "") =>
  new Set(
    t
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !["the", "and", "for", "how", "with", "from", "into"].includes(w)),
  );
const overlap = (a, b) => {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size);
};

const [cmd, file] = process.argv.slice(2);

if (cmd === "list") {
  for (const s of rows) console.log([s.id, s.date || s.year, s.author, s.title, s.url || "—"].join(" | "));
  console.log(`\n${rows.length} scenarios`);
} else if (cmd === "check" && file) {
  const candidates = JSON.parse(readFileSync(file, "utf8"));
  let dupes = 0;
  for (const c of candidates) {
    const hits = [];
    for (const s of rows) {
      if (c.url && s.url && normUrl(c.url) === normUrl(s.url)) hits.push(`${s.id} (same URL)`);
      else if (c.id && c.id === s.id) hits.push(`${s.id} (same id)`);
      else if (overlap(c.title, s.title) >= 0.75) hits.push(`${s.id} (similar title: "${s.title}")`);
      else if (c.url && s.url && normUrl(c.url).split("/")[0] === normUrl(s.url).split("/")[0] && c.author && s.author && overlap(c.author, s.author) >= 0.5)
        hits.push(`${s.id} (same site and author — check it is a different publication)`);
    }
    const strong = hits.some((h) => !h.includes("check it is"));
    if (strong) dupes++;
    console.log(`${strong ? "DUPLICATE" : hits.length ? "CHECK    " : "NEW      "} ${c.title}${hits.length ? `\n          ↳ ${hits.join("\n          ↳ ")}` : ""}`);
  }
  console.log(`\n${candidates.length - dupes} new or to check, ${dupes} likely duplicates`);
  process.exit(dupes ? 1 : 0);
} else {
  console.error("Usage: node scripts/scenario-catalogue.mjs list | check <candidates.json>");
  process.exit(2);
}
