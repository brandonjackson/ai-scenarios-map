# AI Scenario Literature Map

An interactive 2×2 scatter plot mapping AI scenario literature across multiple analytical dimensions.

## Data Model

All source data lives in `data/`:

- **`scenarios.csv`** — The canonical database. Each row is a source or framework sub-scenario. Coordinate columns use a `[-1, +1]` range. Empty cells = not rated for that axis.
- **`scenarios.json`** — Same data as JSON (generated from CSV or vice versa).
- **`axes.json`** — Defines available axis pairs (what fields to plot, labels, orientation).
- **`ai_scenario_literature.xlsx`** — Editable spreadsheet version with colour coding and a README sheet.

### Adding a new scenario

Add a row to `scenarios.csv` with at minimum: `id`, `title`, `author`, `year`, `type`, `desc`, `url`, and coordinates for at least one axis pair. Empty coordinate cells are fine — the visualisation only shows scenarios that have data for the selected axes.

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
src/
  App.jsx                ← main React component (data-driven)
  index.html             ← entry point
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
