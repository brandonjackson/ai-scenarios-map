# Goals

A goal function is the yardstick scenarios are assessed against. Each goal
is a folder in this directory containing:

- **`goal.json`** — what is being measured and how scores combine.
- **`scores.csv`** — how each scenario (and, optionally, each scenario with a
  policy in place) scores on each criterion.

The site picks up every folder automatically. `config.json` names the
default goal, which is shown on scenario cards and pages:

```json
{ "default": "social-contract" }
```

The default is [`social-contract/`](social-contract/), the Windfall Trust's
working draft of five promises a society makes to its citizens.

## Adding a goal

1. Copy `social-contract/` to `goals/<your-id>/`.
2. Edit `goal.json` — set `id` to the folder name and replace the criteria.
3. Empty `scores.csv` down to its header row, then score scenarios.
4. Run `npm run goals:check` to validate. It also runs before `npm run dev`
   and `npm run build`, so a broken goal fails the build.
5. Optionally make it the default in `config.json`.

## `goal.json`

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Matches the folder name. Used in URLs (`#/goals/<id>`). |
| `name` | yes | Display name. |
| `author`, `status` | | Shown under the title (e.g. "Working draft"). |
| `summary` | | One paragraph shown on the goals list and detail page. |
| `description` | | Longer background, shown on the detail page. |
| `criteria` | yes | What each scenario is scored on (see below). |
| `scale` | yes | The allowed scores: `[{ "value": 1, "label": "…", "meaning": "…" }, …]`. Any numeric range works; colours run red → green from lowest to highest. |
| `rules` | | Plain-language scoring instructions: `[{ "name": "…", "text": "…" }]`. |
| `aggregation` | | How criterion scores become a headline rating (see below). |
| `notes` | | List of caveats or open questions shown at the bottom of the page. |

Each **criterion**:

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Referenced from `scores.csv`. |
| `name` | yes | e.g. "Hard work pays". |
| `short` | | Column heading in the scorecard (e.g. "Work"). |
| `vow` or `description` | | What the criterion promises. |
| `weight` | | Relative weight in the average (default `1`). |
| `threats`, `opportunities` | | Lists of forces pushing the criterion down or up. |
| `anchors` | | What each score looks like for this criterion, keyed by scale value: `{ "1": "…", "3": "…", "5": "…" }`. |

**`aggregation`**:

| Field | Default | Meaning |
| --- | --- | --- |
| `method` | `"mean"` | Weighted mean of criterion scores. |
| `rounding` | `"round"` | `floor`, `round` or `ceil`, applied to the mean to get a whole-number rating. |
| `weakestLink` | none | If set to `n`, the rating can be at most `n` points above the lowest criterion score. |

A headline rating is only given once every criterion is scored. The social
contract uses `floor` rounding and `weakestLink: 1`, so a scenario averaging
2.6 with one promise at 1 is rated 2.

## `scores.csv`

```csv
scenario,policy,criterion,score,reason
wf-lost-generation,,work,2,"Firms stop hiring beginners."
wf-lost-generation,universal-basic-income,work,3,"Hypothetical rescore with a policy in place."
```

- `scenario` — an `id` from `data/scenarios.csv`.
- `policy` — leave blank for the baseline assessment. To test a policy, use
  a `slug` from `data/policy-atlas/policies.json` and rescore the scenario
  with it in place; the goal page shows the change against the baseline.
- `criterion` — a criterion `id` from `goal.json`.
- `score` — a `value` from the goal's `scale`.
- `reason` — one sentence explaining the score. Quote it if it contains commas.

Scenarios with no rows are listed as "not yet assessed".
