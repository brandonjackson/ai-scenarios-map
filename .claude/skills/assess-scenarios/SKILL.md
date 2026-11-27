---
name: assess-scenarios
description: Run the rating pipeline over scenario extracts — tags, map coordinates, policy stance, likelihood, Policy Atlas links, goal scores, summary.md and analysis.md — writing data/assessments.csv and the other derived files. Use when asked to assess, rate, score, re-rate, re-run or refresh scenarios, after find-scenarios adds or re-extracts them, or when a new analysis, axis or goal should be applied across the map.
---

# Assess scenarios

The map has three layers. This skill owns the third.

1. **Source** — `sources/<slug>/` (find-scenarios)
2. **Extract** — `scenarios/<id>/extract.md`, plus the catalogue row in `data/scenarios.csv` (find-scenarios)
3. **Assessment** — everything derived from the extract under today's frameworks (this skill):
   - `data/assessments.csv` — tags, map coordinates, policy stance, likelihood, `assessed` date
   - `data/scenario-policies.csv` — Policy Atlas policies an `on`/`mixed` scenario depends on
   - `goals/<goal>/scores.csv` — scores against each goal
   - `scenarios/<id>/summary.md`, `scenarios/<id>/analysis.md`

Assessments are read **only from the extract**, so they can be thrown away and re-run whenever the frameworks change, without re-reading sources. The analyses and their rules are in [analyses.md](analyses.md).

## 1. Decide the scope

Work out which **scenarios** and which **analyses** (ids from `analyses.md`: `rating`, `map`, `links`, `goal:<id>`, `summary`, `analysis`).

- The user names them → use those. "All" means every scenario with an extract.
- The user names nothing (or find-scenarios handed over new ids) → see what's missing or stale:

  ```bash
  node scripts/assessment-status.mjs --todo
  ```

  `·` is missing, `!` is stale (the extract was committed after the assessment), `!?` means the goal's scores file predates the extract — check whether that scenario's rows were rescored. Run every missing or stale analysis for scenarios that have an extract.

Scenarios without an extract (`extract` = `·`) are not assessed: their existing assessments stay as they are. Say in the report that they need find-scenarios to extract them first. Don't build an extract here.

Respect dependencies (the *Needs* column in `analyses.md`): `rating` before `links`; `rating`, `map` and `goal:social-contract` before `analysis`.

Don't ask for confirmation of the scope; state it and carry on.

## 2. Snapshot the current values

Before writing anything, save the current rows of `data/assessments.csv` and the in-scope goal scores to a scratch file. Step 6 reports what changed against them.

## 3. Assess

Read `analyses.md` in full. Then, for each scenario, read its `extract.md` and produce every in-scope analysis by the rules there.

- **One or two scenarios:** do it yourself.
- **More:** fan out to subagents, about 4–6 scenarios each, grouping a framework's sub-scenarios together so they are rated relative to one another. Give each subagent: the path to `analyses.md`, the scenario ids and extract paths, which analyses to run, and the current `data/assessments.csv` for calibration. Subagents **write per-scenario files directly** (`summary.md`, `analysis.md`) but **return shared-file values as JSON** — never let them edit a shared CSV:

  ```json
  {
    "id": "imf-baseline",
    "assessment": { "tags": "…", "x_labor": 0.1, "y_labor": 0.2, "x_fiscal": -0.1, "y_fiscal": -0.2, "policy": "off", "likelihood": "plausible", "likelihood_reason": "…" },
    "links": [{ "policy": "<slug or empty>", "evidence": "…" }],
    "scores": { "social-contract": [{ "criterion": "work", "score": 2, "reason": "…" }] },
    "extract_gaps": ["…"]
  }
  ```

  Include only the keys for analyses in scope.

If an extract lacks what an analysis needs, don't go to the source. Rate from what is there and list the gap.

## 4. Write the shared files

Merge the results yourself:

- `data/assessments.csv` — replace only the in-scope columns of each in-scope row (add the row if missing); set `assessed` to today. Keep row order the same as `data/scenarios.csv`. Quote fields containing commas.
- `data/scenario-policies.csv` — replace all rows for each in-scope scenario.
- `goals/<goal>/scores.csv` — replace the scenario's baseline rows (empty `policy`); leave policy-variant rows.
- `scenarios/README.md` index — see *Index* in `analyses.md`.

When a whole analysis has been re-run across many scenarios, do a calibration pass: sort the scenarios by each new value and check the ordering reads sensibly; fix outliers.

## 5. Regenerate and check

```bash
npm run scenarios:folders
```

```bash
npm run data:csv2json
```

```bash
npm run goals:check
```

```bash
npm run scenarios:check-policies
```

All must pass. Then `node scripts/assessment-status.mjs <ids…>` should show the in-scope analyses as done.

## 6. Report

- **Scope:** scenarios and analyses run; scenarios skipped for lack of an extract.
- **Changes:** for re-runs, a table of what moved against the snapshot (policy, likelihood, coordinates moving more than 0.25, scores changing by 2 or more) with one line on why. For new scenarios, the values set.
- **Extract gaps:** what the extracts couldn't support, by scenario — candidates for re-extraction with find-scenarios.

Commit if the user wants.

## Adding a new analysis

To rate every scenario on something new (a new axis pair, a new goal, a new per-scenario write-up):

1. Decide where it is stored:
   - **New columns** (a new axis pair, a new single rating) → add the columns to `data/assessments.csv` (empty for every row). For an axis pair, also add it to `data/axes.json`; `assessment-status.mjs` picks it up for the `map` column. For other numeric columns, add them to `NUMERIC_FIELDS` in `scripts/csv2json.mjs`.
   - **A new goal function** → a new folder in `goals/` (see `goals/README.md`). Status and checks pick it up automatically.
   - **A new per-scenario file** → `scenarios/<id>/<name>.md`; add it to `scripts/assessment-status.mjs` alongside `summary` and `analysis`.
2. Add a section for it to `analyses.md`: output, what each value means, which extract sections it reads, how to calibrate.
3. Check that the extract template (`.claude/skills/find-scenarios/extract-template.md`) captures what the analysis needs. If not, extend the template too, and note that older extracts may need re-extracting.
4. Run this skill with the new analysis id across all scenarios.

To try a different method **without overwriting** the current one (e.g. compare two likelihood rubrics), store it as new columns or a new goal, not over the old values, and compare.
