import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('./policies.json', import.meta.url)));

const esc = (v) => {
  if (v == null) return '';
  const s = Array.isArray(v) ? v.join('|') : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const headers = [
  'slug', 'title', 'category', 'url', 'summary',
  'risk_horizon', 'governance', 'rate_of_disruption',
  'who_it_affects', 'decision_maker', 'policy_category'
];

const rows = [headers.join(',')];
for (const p of data.policies) {
  rows.push(headers.map((h) => esc(p[h])).join(','));
}

writeFileSync(new URL('./policies.csv', import.meta.url), rows.join('\n') + '\n');
console.log(`Wrote ${data.policies.length} rows to policies.csv`);
