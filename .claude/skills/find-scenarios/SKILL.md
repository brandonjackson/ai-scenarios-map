---
name: find-scenarios
description: Search for published AI-and-economy scenarios that aren't on the map yet, check them against data/scenarios.csv, and add the good ones as rows with coordinates, policy stance and likelihood. Use when asked to find, discover, scout or add more scenarios or scenario literature.
---

# Find new scenarios

Goal: grow `data/scenarios.csv` with credible published scenarios about how AI changes work, incomes and public finances, without duplicating what is already there. The user may give a focus (a region, a year, an author, "policy-on only"); otherwise search broadly for the last ~12 months.

## 1. See what's already covered

```bash
node scripts/scenario-catalogue.mjs list
```

Read the list before searching. Note which reports are covered, which ones have several sub-scenarios (`type` = `framework`), and which recent publishers are missing.

## 2. Search

Run several web searches in parallel. Good angles:

- Scenario sets from governments, central banks and intergovernmental bodies (OECD, IMF, World Bank, ILO, UN, EU JRC, national foresight units)
- Think tanks and labs (Brookings, RAND, CSET, IFS, Resolution Foundation, Ada Lovelace, frontier AI labs' policy teams)
- Academic papers modelling AI and labour/inequality/fiscal outcomes (NBER, SSRN, arXiv econ)
- Consultancies (McKinsey, PwC, Deloitte, BCG) when they describe distinct futures, not just a single sizing number
- Long-form essays and narrative forecasts that lay out a concrete economic future (in the style of AI 2027, The Intelligence Curse, Machines of Loving Grace)

Only include a source if it **describes a future**: what happens to jobs, who gets the gains, what happens to public finances or the social contract. Skip news coverage, adoption surveys and pure capability forecasts. Prefer the primary source over press coverage.

## 3. Drop duplicates

Write the shortlist to a scratch JSON file — `[{ "title", "url", "author", "id" }]` — and run:

```bash
node scripts/scenario-catalogue.mjs check <file.json>
```

- **DUPLICATE** — already on the map. Drop it, unless the match is "same URL" and the report contains sub-scenarios that aren't on the map yet; those are legitimate additions.
- **CHECK** — same site and author. Confirm it's a different publication before keeping it.
- **NEW** — keep.

## 4. Decide — don't ask

Making the call is the job. Sort every candidate into **add**, **hold** or **skip** yourself and carry on; the user reviews the result in the diff. Ask only if the user asked to approve a shortlist first.

**Add** when all of these hold:
- It describes a distinct future for jobs, who gains, or public finances — not a forecast number, survey or critique of other scenarios.
- It's from a credible author or institution, or it's a widely discussed essay that people bring to workshops.
- It adds something the map lacks: a new publisher type, region, mechanism or quadrant. A scenario that restates one already on the map (same mechanism, same conclusion) isn't worth a row.
- You've read enough of the primary source to place it on at least one axis pair and write the summary honestly. A press release or one-line description is not enough.

**Dig before you hold.** If the primary page is thin (press release, landing page, gated), search for the detail before giving up: the PDF by exact title (`"<title>" filetype:pdf`), the publisher's other pages for it (report, summary, webinar, blog), the authors' own posts, working-paper or preprint versions, and secondary coverage that quotes the scenarios at length. Note in `analysis.md` which source the detail came from.

**Hold** only when that search still doesn't yield enough to place the scenario and write its summary. Don't write a row; list it in the final report with what's missing and where you looked.

**Skip** everything else, with a one-line reason.

For a framework, decide on the whole set: add all of its sub-scenarios or none, so the map doesn't show half a framework.

## 5. Add rows to `data/scenarios.csv`

Read the source (full text where you can) before rating it. Columns:

| Column | Rule |
| --- | --- |
| `id` | short kebab-case, unique; sub-scenarios share a prefix (`wef-stalled`, `wef-copilot`) |
| `title`, `author` | as published; organisation in brackets after names if useful |
| `year`, `date` | `date` is `YYYY-MM-DD`, or `YYYY-MM` / `YYYY` when that's all that's known |
| `type` | `single`, or `framework` for one of several scenarios from the same source |
| `framework` | for `framework` rows: `Author — Framework name` (e.g. `Brynjolfsson — Turing Trap`); empty otherwise |
| `tags` | shorthand used in the CSV: `AUG`/`REP` (augmentation/replacement), `DIFF`/`CONC` (diffuse/concentrated gains), with qualifiers like `Strong`, `Mild`, `(warns)`, `(prescribes)` |
| `desc` | 1–3 plain sentences describing the future, not the paper |
| `url` | primary source |
| `x_labor` | `-1` gains concentrated → `+1` gains diffuse |
| `y_labor` | `-1` strong augmentation → `+1` strong replacement |
| `x_fiscal` | `-1` fewer good jobs → `+1` more good jobs |
| `y_fiscal` | `-1` weaker public finances → `+1` stronger public finances |
| `policy` | `off` (no deliberate policy), `on` (depends on deliberate policy) or `mixed` |
| `likelihood` | `improbable`, `possible`, `plausible`, `probable` or `happening` (hints in `data/likelihood.json`) |
| `likelihood_reason` | one sentence grounded in current evidence |

Calibrate coordinates against similar existing rows rather than rating in isolation. Leave an axis pair blank if the source says nothing about it. Quote fields containing commas.

## 6. Policies, folders and scores

- For `on` or `mixed` scenarios, add rows to `data/scenario-policies.csv` (`scenario,policy,evidence`) using slugs from `data/policy-atlas/policies.json`. If it names no atlas policy, add one row with an empty `policy` and say what levers it does name.
- Run `npm run scenarios:folders` to create `scenarios/<id>/`.
- Write `scenarios/<id>/summary.md` (≤500 words, the scenario read through the five promises: hard work pays, affordable essentials, reliable safety net, responsive government, time for what matters) and `analysis.md` (Policy on or off? / Big assumptions / What must be true / Tensions and weak points / Scoring notes). Follow `scenarios/autor/` as the model. Say if the source couldn't be read in full.
- Add draft scores to `goals/social-contract/scores.csv`: one row per criterion (`work`, `essentials`, `safety-net`, `government`, `time`), score 1–5 for the worst-off group, empty `policy` column, one-sentence reason.
- Add the scenario to the index table in `scenarios/README.md`.
- Re-run `npm run scenarios:folders` so the README picks up the scores.

## 7. Check

```bash
npm run data:csv2json
```

```bash
npm run goals:check
```

```bash
npm run scenarios:check-policies
```

All three must pass. Then report three lists — **added** (with coordinates, policy, likelihood), **held** (what's missing to add it) and **skipped** (one-line reason each) — and commit if the user wants.
