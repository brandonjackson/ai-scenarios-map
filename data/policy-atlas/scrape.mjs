// Scrapes the Windfall Trust Policy Atlas into policies.json.
//
//   node data/policy-atlas/scrape.mjs            # fetch live site
//   node data/policy-atlas/scrape.mjs --cache d  # read/write raw HTML in dir d
//
// Editorial fields that aren't on the site (core_mechanism, pros, cons) are
// carried over from the existing policies.json, matched by slug.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const BASE = 'https://windfalltrust.org/policy-atlas';
const OUT = new URL('./policies.json', import.meta.url);

const CATEGORIES = {
  'public-and-social-investments': 'Public & Social Investments',
  'labor-market-adaptation': 'Labor Market Adaptation',
  'wealth-capture': 'Wealth Capture',
  'regulation-and-market-design': 'Regulation & Market Design',
  'global-coordination': 'Global Coordination',
};

const SNAPSHOT_FIELDS = {
  'Risk Horizon': 'risk_horizon',
  'Governance': 'governance',
  'Rate of Disruption': 'rate_of_disruption',
  'Who It Affects': 'who_it_affects',
  'Decision Maker': 'decision_maker',
};

const cacheIdx = process.argv.indexOf('--cache');
const cacheDir = cacheIdx > -1 ? process.argv[cacheIdx + 1] : null;
if (cacheDir) mkdirSync(cacheDir, { recursive: true });

async function get(slug) {
  const file = cacheDir && join(cacheDir, `${slug}.html`);
  if (file && existsSync(file)) return readFileSync(file, 'utf8');
  const res = await fetch(`${BASE}/${slug}`);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const html = await res.text();
  if (file) writeFileSync(file, html);
  return html;
}

// node-html-parser mishandles attribute selectors whose values contain spaces.
const byName = (el, name) => el.querySelectorAll('[data-framer-name]').filter((e) => e.getAttribute('data-framer-name') === name);
const oneByName = (el, name) => byName(el, name)[0] ?? null;

const clean = (s) => s.replace(/\s+/g, ' ').trim();
const text = (el) => clean(el.textContent);
const slugOf = (href) => href.replace(/^.*\//, '').replace(/[?#].*$/, '');

// Rich-text block following an <h5> label such as "What it is:".
function section(root, label) {
  const h = root.querySelectorAll('h5').find((e) => text(e).replace(/:$/, '') === label);
  return h ? h.parentNode.nextElementSibling : null;
}

const paragraphs = (el) => (el ? el.querySelectorAll('p').map(text).filter(Boolean) : []);
// Usually a bulleted list, but some pages use plain paragraphs.
const listItems = (el) => {
  if (!el) return [];
  const lis = el.querySelectorAll('li').map(text).filter(Boolean);
  return lis.length ? lis : paragraphs(el);
};

function parseSnapshot(root) {
  const snap = oneByName(root, 'Policy Snapshot');
  const out = {};
  for (const block of snap.parentNode.querySelectorAll('[data-border="true"]')) {
    const label = block.querySelector('strong');
    const field = label && SNAPSHOT_FIELDS[text(label)];
    if (!field || out[field]) continue;
    // Three-point scales render every value as a dumbbell; only "* Active" ones apply.
    out[field] = block
      .querySelectorAll('a[data-highlight]')
      .filter((a) => !/Inactive$/.test(a.getAttribute('data-framer-name')))
      .map(text);
  }
  return out;
}

function parseReading(root) {
  const h = root.querySelectorAll('h5').find((e) => text(e).startsWith('Recommended Reading'));
  if (!h) return [];
  return h.parentNode.parentNode.querySelectorAll('a').filter((a) => oneByName(a, 'Title')).map((a) => {
    const f = (n) => {
      const el = oneByName(a, n);
      return el ? text(el) : null;
    };
    return { authors: f('Researchers'), title: f('Title'), date: f('Date'), description: f('Description'), url: a.getAttribute('href') };
  });
}

function neighbour(root, name) {
  const a = byName(root, name).find((e) => e.rawTagName === 'a');
  if (!a) return null;
  const ps = a.querySelectorAll('p');
  return { slug: slugOf(a.getAttribute('href')), title: text(ps[ps.length - 1]) };
}

function parsePolicy(slug, html) {
  const root = parse(html);
  const crumb = oneByName(root, 'Breadcrumb').parentNode;
  const level = (n) => oneByName(crumb, `Level ${n}`);
  const catLink = level(2).querySelector('a');
  const sub = level(3) ? text(level(3)).replace(/^›\s*/, '') : null;

  const h1 = root.querySelector('h1');
  const title = text(h1);
  const summary = paragraphs(h1.parentNode.nextElementSibling)[0] ?? null;
  const snapTitle = oneByName(root, 'Policy Snapshot');
  const tagline = paragraphs(snapTitle)[2] ?? null;

  const prev = neighbour(root, 'Previous');
  const next = neighbour(root, 'Next');
  return {
    slug,
    title,
    category: slugOf(catLink.getAttribute('href')),
    url: `${BASE}/${slug}`,
    summary,
    tagline,
    ...parseSnapshot(root),
    policy_category: [text(catLink), sub].filter(Boolean),
    what_it_is: paragraphs(section(root, 'What it is')),
    the_challenge: paragraphs(section(root, 'The challenge')),
    precedents: listItems(section(root, 'Real-world precedents')),
    mentioned_in: listItems(section(root, 'Mentioned in')),
    recommended_reading: parseReading(root),
    related_prev: prev?.title ?? null,
    related_prev_slug: prev?.slug ?? null,
    related_next: next?.title ?? null,
    related_next_slug: next?.slug ?? null,
  };
}

// Discover policies via the category index pages (they also cross-link, so dedupe).
const slugs = new Set();
for (const cat of Object.keys(CATEGORIES)) {
  const root = parse(await get(cat));
  for (const a of root.querySelectorAll('a[href^="./"]')) {
    const s = slugOf(a.getAttribute('href'));
    if (s && !CATEGORIES[s]) slugs.add(s);
  }
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { policies: [] };
const prevBySlug = Object.fromEntries(previous.policies.map((p) => [p.slug, p]));

const policies = [];
for (const slug of slugs) {
  const html = await get(slug);
  // Category pages also link to non-policy pages (filters, intro, ...).
  if (!html.includes('data-framer-name="Policy Snapshot"')) continue;
  const p = parsePolicy(slug, html);
  const old = prevBySlug[slug] ?? {};
  policies.push({
    ...p,
    core_mechanism: old.core_mechanism ?? null,
    pros: old.pros ?? [],
    cons: old.cons ?? [],
  });
}
const catOrder = Object.keys(CATEGORIES);
policies.sort((a, b) => catOrder.indexOf(a.category) - catOrder.indexOf(b.category) || a.title.localeCompare(b.title));

const data = {
  source: 'Windfall Trust Policy Atlas',
  source_url: BASE,
  scraped_at: new Date().toISOString().slice(0, 10),
  schema_notes: {
    risk_horizon: 'Near Term | Medium Term | Long Term (only values marked active on the site)',
    governance: 'Subnational | National | International (only values marked active)',
    rate_of_disruption: 'Gradual | All Scenarios | Rapid (only values marked active)',
    who_it_affects: 'Workers | Households | Small Businesses | Creators & IP Holders | Global South | AI Developers | Firms | AI Infrastructure Providers | Public Institutions',
    decision_maker: 'Legislators | Regulatory Agencies | Multilateral Bodies | Courts | Private Actors',
    categories: Object.values(CATEGORIES).join(' | '),
    editorial_fields: 'core_mechanism, pros, cons are hand-written summaries, not scraped; carried over between scrapes',
  },
  categories: Object.fromEntries(
    Object.entries(CATEGORIES).map(([slug, name]) => [slug, { name, slug, url: `${BASE}/${slug}` }]),
  ),
  policies,
};

writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
const missing = policies.filter((p) => !p.what_it_is.length || !p.title || !p.risk_horizon?.length).map((p) => p.slug);
console.log(`Wrote ${policies.length} policies to policies.json`);
if (missing.length) console.warn(`Incomplete parse: ${missing.join(', ')}`);
