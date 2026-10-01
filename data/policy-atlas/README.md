# Windfall Policy Atlas (scraped)

Structured data from the [Windfall Trust Policy Atlas](https://windfalltrust.org/policy-atlas) — 47 policy proposals for responding to AI-driven economic disruption.

## Files

- `policies.json` — full structured records (see schema below)
- `policies.csv` — flat one-row-per-policy view of slugs + tags, suitable for joining onto the scenarios map
- `scrape.mjs` — re-scrapes the live Atlas into `policies.json`
- `build-csv.mjs` — regenerates the CSV from the JSON

## Updating

```sh
npm run data:policy-atlas
```

This fetches every category and policy page, rewrites `policies.json`, and rebuilds the CSV. Pass `--cache <dir>` to `scrape.mjs` to save/reuse the raw HTML.

## Schema

Scraped verbatim from each policy page:

| Field | Notes |
|---|---|
| `title`, `summary`, `tagline` | page heading, one-line summary, and Policy Snapshot subtitle |
| `category` | top-level category slug (from the breadcrumb) |
| `policy_category` | breadcrumb: `[category name, sub-category]` |
| `what_it_is`, `the_challenge` | body paragraphs |
| `precedents`, `mentioned_in` | "Real-world precedents" / "Mentioned in" items |
| `recommended_reading` | `{authors, title, date, description, url}` |
| `related_prev`, `related_next` (+ `_slug`) | previous / next policy links |

Tag dimensions (multi-valued). The three-point scales show every value on the site as a dumbbell chart; only the values marked active are recorded.

| Field | Values |
|---|---|
| `risk_horizon` | Near Term, Medium Term, Long Term |
| `governance` | Subnational, National, International |
| `rate_of_disruption` | Gradual, All Scenarios, Rapid |
| `who_it_affects` | Workers, Households, Small Businesses, Creators & IP Holders, Global South, AI Developers, Firms, AI Infrastructure Providers, Public Institutions |
| `decision_maker` | Legislators, Regulatory Agencies, Multilateral Bodies, Courts, Private Actors |

Editorial fields — `core_mechanism`, `pros`, `cons` — are hand-written summaries rather than page content. `scrape.mjs` carries them over by slug, so they may lag behind edits to the source prose.

## Categories (top-level)

| Slug | Count |
|---|---|
| `public-and-social-investments` | 10 |
| `labor-market-adaptation` | 8 |
| `wealth-capture` | 10 |
| `regulation-and-market-design` | 15 |
| `global-coordination` | 4 |

## Source

- Scraped: 2026-10-01
- Source: https://windfalltrust.org/policy-atlas
