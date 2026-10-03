# AI Scenario Literature Map

An interactive site mapping AI scenario literature across multiple analytical dimensions, alongside a catalogue of policy responses.

## Site Structure

A left nav is shared across all pages (hash routes, so deep links work on GitHub Pages):

- **Overview** (`#/`) — the interactive 2×2 scatter plot
- **Scenarios** (`#/scenarios`) — searchable list, filterable by type and policy stance; each scenario has a detail page (`#/scenarios/<id>`) with tabs for an overview (position on every axis pair, goal assessments), its social contract summary (with draft scores beside each promise) and its assumptions analysis, read from `scenarios/<id>/`
- **Goals** (`#/goals`) — goal functions that scenarios are assessed against; each goal has a detail page (`#/goals/<id>`) with its criteria, scale and a scorecard of assessed scenarios. Scenario pages show their assessment under each goal.
- **Policies** (`#/policies`) — the Windfall Policy Atlas, filterable by category, horizon and who it affects; each policy has a detail page (`#/policies/<slug>`)

## Data Model

All source data lives in `data/`:

- **`scenarios.csv`** — The canonical database. Each row is a source or framework sub-scenario. Coordinate columns use a `[-1, +1]` range. Empty cells = not rated for that axis.
- **`scenarios.json`** — Same data as JSON (generated from CSV or vice versa).
- **`axes.json`** — Defines available axis pairs (what fields to plot, labels, orientation).
- **`ai_scenario_literature.xlsx`** — Editable spreadsheet version with colour coding and a README sheet.

## Goals

A **goal function** is a yardstick for judging scenarios: a set of criteria, a scoring scale, and a rule for combining criterion scores into one headline rating. Goals live in `goals/`, one folder per goal:

```
goals/
  config.json              ← { "default": "<goal id>" }
  social-contract/
    goal.json              ← criteria, scale, rules, aggregation
    scores.csv             ← scenario,policy,criterion,score,reason
```

The default goal is **The Social Contract** (Windfall Trust): five promises — hard work pays, affordable essentials, reliable safety net, responsive government, time for what matters — each scored 1–5 for the worst-off group, averaged, and capped by the weakest-link rule (the headline rating can sit at most one point above the weakest promise).

To add your own goal, copy `goals/social-contract/`, edit it, and see [`goals/README.md`](goals/README.md) for the full format. `npm run goals:check` validates every goal (it also runs before `dev` and `build`).

## Scenario folders

Every scenario has a folder in `scenarios/<id>/` for context about it: a generated `README.md` (metadata, map position, draft scores), a `summary.md` reading the scenario through the five promises of the social contract, an `analysis.md` of its big assumptions (policy on or off, what must be true), and any notes or sources you add. See [`scenarios/README.md`](scenarios/README.md) for the index.

### Adding a new scenario

Add a row to `scenarios.csv` with at minimum: `id`, `title`, `author`, `year`, `type`, `desc`, `url`, and coordinates for at least one axis pair. Set `policy` to `off`, `on` or `mixed` once you know whether the scenario assumes policy is absent, depends on deliberate policy, or has both versions. Empty coordinate cells are fine — the visualisation only shows scenarios that have data for the selected axes. Then run `npm run scenarios:folders` to create its folder.

### Adding a new axis pair

1. Add two columns to `scenarios.csv` (e.g., `x_inequality`, `y_inequality`)
2. Rate each scenario on the new dimensions (leave blank if can't assess)
3. Add an entry to `axes.json` describing the new axis pair
4. The UI will automatically pick up the new axis

### Coordinate conventions

All coordinates are in `[-1, +1]`:
- **x**: left (`-1`) to right (`+1`)  
- **y**: meaning depends on `yInvert` in `axes.json`:
  - `yInvert: false` → negative y = top of chart (e.g., augmentation at top)
  - `yInvert: true` → positive y = top of chart (e.g., stronger finances at top)

## Project Structure

```
data/
  scenarios.csv          ← canonical data source
  scenarios.json         ← JSON mirror
  axes.json              ← axis pair definitions
  ai_scenario_literature.xlsx  ← spreadsheet for editing
goals/                   ← goal functions (see goals/README.md)
scenarios/               ← one folder of context per scenario (see scenarios/README.md)
scripts/
  csv2json.mjs           ← scenarios.csv → scenarios.json
  check-goals.mjs        ← validates goals/
  scenario-folders.mjs   ← creates scenarios/<id>/ and regenerates each README.md
src/
  App.jsx                ← layout shell + route table
  router.js              ← tiny hash router
  data.js                ← shared data imports + helpers
  goals.js               ← loads every goals/*/ folder
  lib/goals.js           ← scoring + validation (pure, shared with scripts)
  styles.css             ← site-wide styles (layout, nav, cards)
  components/Sidebar.jsx ← left nav
  pages/
    Overview.jsx         ← scatter plot (data-driven)
    Scenarios.jsx        ← scenario list + detail
    Goals.jsx            ← goal list + detail (scorecard)
    Policies.jsx         ← policy list + detail
index.html               ← entry point
public/
  (static assets)
package.json
vite.config.js
```

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# Output in dist/ — deploy to any static host (Vercel, Netlify, GitHub Pages)
```

## Tech Stack

- React 18 + Vite
- No component library — pure SVG rendering
- Data loaded from JSON at build time (or fetched at runtime for dynamic updates)
