# Windfall Policy Atlas (scraped)

Structured data from the [Windfall Trust Policy Atlas](https://windfalltrust.org/policy-atlas) — 47 policy proposals for responding to AI-driven economic disruption.

## Files

- `policies.json` — full structured records (summary, core mechanism, pros, cons, precedents, all tags, related prev/next)
- `policies.csv` — flat one-row-per-policy view of slugs + tags, suitable for joining onto the scenarios map
- `build-csv.mjs` — regenerates the CSV from the JSON

## Schema

Each policy has these tag dimensions (multi-valued):

| Field | Values |
|---|---|
| `risk_horizon` | Near Term, Medium Term, Long Term |
| `governance` | Subnational, National, International |
| `rate_of_disruption` | Gradual, All Scenarios, Rapid |
| `who_it_affects` | Workers, Households, Small Businesses, Creators & IP Holders, Global South, AI Developers, Firms, AI Infrastructure Providers, Public Institutions |
| `decision_maker` | Legislators, Regulatory Agencies, Multilateral Bodies, Courts, Private Actors |
| `category` | one of the 5 top-level Atlas categories |

## Categories (top-level)

| Slug | Count |
|---|---|
| `public-and-social-investments` | 9 |
| `labor-market-adaptation` | 9 |
| `wealth-capture` | 11 |
| `regulation-and-market-design` | 15 |
| `global-coordination` | 3 |

## Source

- Scraped: 2026-06-24
- Source: https://windfalltrust.org/policy-atlas
