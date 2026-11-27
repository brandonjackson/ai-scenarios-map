# Analyses

Each analysis turns a scenario's `extract.md` into one derived output. They are independent of one another except where *Needs* says otherwise, so any one can be re-run on its own.

**Input for every analysis:** `scenarios/<id>/extract.md` and the scenario's catalogue row in `data/scenarios.csv`. Don't go back to the source or use what you remember about it. If the extract lacks something an analysis needs, note it in the report as an extract gap and score from what is there (or leave the field blank where the rules allow).

**Calibration:** before rating, read the current values of the same analysis for similar scenarios (same framework, same speed of change, same policy stance) so scales stay consistent across the map.

| id | Output | Needs |
| --- | --- | --- |
| `rating` | `data/assessments.csv`: `tags`, `policy`, `likelihood`, `likelihood_reason`, `assessed` | |
| `map` | `data/assessments.csv`: coordinate columns for every axis pair in `data/axes.json` | |
| `links` | `data/scenario-policies.csv` | `rating` (policy stance) |
| `goal:<goal-id>` | `goals/<goal-id>/scores.csv` | |
| `summary` | `scenarios/<id>/summary.md` | |
| `analysis` | `scenarios/<id>/analysis.md` | `rating`, `map`, `goal:social-contract` (it comments on them) |

---

## `rating`

One row per scenario in `data/assessments.csv`, keyed by `id`. Quote fields containing commas.

| Column | Rule |
| --- | --- |
| `tags` | `AUG`/`REP` (augmentation/replacement), `DIFF`/`CONC` (diffuse/concentrated gains), with qualifiers like `Strong`, `Mild`, `(warns)`, `(prescribes)`. Comma-separated. |
| `policy` | `off` if the future happens without deliberate new policy (even if the authors recommend some), `on` if it depends on policy being enacted, `mixed` if the scenario itself contains both. Read *Policy stance* in the extract. |
| `likelihood` | `improbable`, `possible`, `plausible`, `probable` or `happening`; hints in `data/likelihood.json`. How likely the scenario's core dynamics are over its own horizon, given current evidence. A judgement, not a forecast; the authors' own view is an input, not the answer. |
| `likelihood_reason` | One sentence grounded in current evidence. |
| `assessed` | Today's date, `YYYY-MM-DD`, whenever any column in the row is (re)written by `rating` or `map`. |

If you re-rate many scenarios' likelihood, update `reviewed` in `data/likelihood.json` to today.

## `map`

Coordinates in `[-1, +1]`, two decimals at most. Leave an axis pair blank (both cells) if the extract has nothing to place it on.

| Column | −1 | +1 | Read from |
| --- | --- | --- | --- |
| `x_labor` | gains concentrated | gains diffuse | *Winners and losers*, *Household incomes* |
| `y_labor` | strong augmentation | strong replacement | *Labour market dynamics*, *State of technology* |
| `x_fiscal` | fewer good jobs | more good jobs | *Labour market dynamics* |
| `y_fiscal` | weaker public finances | stronger public finances | *Government finances* |

Place a scenario relative to its neighbours: list the five existing scenarios nearest your proposed point and check the ordering makes sense. Sub-scenarios of one framework should sit where the framework's own axes put them relative to each other.

When a new axis pair is added to `data/axes.json`, this analysis grows two columns; add them here with their poles and the extract sections they read from.

## `links`

For `on` or `mixed` scenarios only: rows in `data/scenario-policies.csv` (`scenario,policy,evidence`), one per Policy Atlas policy the scenario depends on, using slugs from `data/policy-atlas/policies.json`. `evidence` is one sentence from the extract's *Policies assumed in the scenario*. Policies the source only recommends don't count. If it names no atlas policy, add one row with an empty `policy` and name the levers it does use. On a re-run, replace all of the scenario's rows.

## `goal:<goal-id>`

One row per criterion in `goals/<goal-id>/goal.json`, in `goals/<goal-id>/scores.csv` (`scenario,policy,criterion,score,reason`), empty `policy` column. Use the goal's own `scale`, `anchors` and `rules`. For the default goal, `social-contract`:

- Score 1–5 for the **worst-off group** the extract names, not the average.
- Read the matching *Impact on the social contract* section first, then the economy sections that bear on it.
- Score 3 where the extract says `Not addressed.` and nothing elsewhere bears on the criterion; say so in the reason.
- `reason` is one sentence citing what in the extract drives the score.

Policy-variant rows (non-empty `policy`) are hypothetical rescoring; leave them alone unless asked.

A new goal is a new folder in `goals/` (see `goals/README.md`); this analysis then runs for it with no further changes here, unless the goal needs extra instructions — put those in its `goal.json` `rules`.

## `summary`

`scenarios/<id>/summary.md`, ≤500 words: the scenario read through the promises in `goals/social-contract/goal.json`. Structure (model: `scenarios/imf-baseline/summary.md`): `# <title> — summary`; an italic paragraph on the source (publication, date, authors, how it was read); a **The scenario.** paragraph on what happens; then one `##` per promise saying what the scenario implies for it, quoting the extract where it helps. Write `Not addressed.` under a promise the extract is silent on rather than inventing an impact.

## `analysis`

`scenarios/<id>/analysis.md`, from the extract and the scenario's current `rating`, `map` and social-contract scores. Sections, in this order (model: `scenarios/imf-baseline/analysis.md`):

- `## Policy on or off?` — the stance in bold, then why.
- `## Big assumptions` — numbered: capability, adoption, markets, politics.
- `## What must be true for this to occur` — bullets.
- `## Tensions and weak points` — internal contradictions, mismatches between the source and how the map describes it, close neighbours on the map.
- `## Scoring notes` — the draft scores (e.g. 2/3/3/3/3) and why each departs from 3.

## Index

After `summary` or `analysis` runs for a new scenario, add it to the index table at the end of `scenarios/README.md` (title, a short policy-stance phrase, links). On a re-run, update the stance phrase if `policy` changed.
