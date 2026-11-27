---
name: find-scenarios
description: Search for published AI-and-economy scenarios that aren't on the map yet, capture their sources, write a standardised extract for each, and add them to data/scenarios.csv with coordinates, policy stance, likelihood and draft scores. Use when asked to find, discover, scout or add more scenarios or scenario literature.
---

# Find new scenarios

Goal: grow the map with published scenarios about how AI changes work, incomes and public finances, without duplicating what is already there, and keep enough of each source that future columns and scores can be derived without re-reading it. The user may give a focus (a region, a year, an author, "policy-on only"); otherwise search broadly for the last ~12 months.

Each scenario has three layers:

1. **Source** — `sources/<slug>/`: a manifest, and the full text where we can keep it.
2. **Extract** — `scenarios/<id>/extract.md`: everything the source says about this scenario, in a fixed framework-neutral structure ([extract-template.md](extract-template.md)).
3. **Derived** — the CSV row, `summary.md`, `analysis.md`, scores. These follow today's framework and can be regenerated from the extract.

## 1. See what's already covered

```bash
node scripts/scenario-catalogue.mjs list
```

Read the list before searching. Note which sources are covered, which have several sub-scenarios (`type` = `framework`), and which publishers are missing.

## 2. Search

Run several web searches in parallel. Good angles:

- Scenario sets from governments, central banks and intergovernmental bodies (OECD, IMF, World Bank, ILO, UN, EU JRC, national foresight units)
- Think tanks and labs (Brookings, RAND, CSET, IFS, Resolution Foundation, Ada Lovelace, frontier AI labs' policy teams)
- Academic papers modelling AI and labour/inequality/fiscal outcomes (NBER, SSRN, arXiv econ)
- Consultancies (McKinsey, PwC, Deloitte, BCG) when they describe distinct futures
- Essays and narrative forecasts that lay out an economic future (in the style of AI 2027, The Intelligence Curse, Machines of Loving Grace)

## 3. Drop duplicates

Write the candidates to a scratch JSON file — `[{ "title", "url", "author", "id" }]` — and run:

```bash
node scripts/scenario-catalogue.mjs check <file.json>
```

- **DUPLICATE** — already on the map. Drop it, unless the match is "same URL" and the source has sub-scenarios that aren't on the map yet.
- **CHECK** — same site and author. Confirm it's a different publication.
- **NEW** — keep.

## 4. Decide — don't ask

Making the call is the job. Sort every candidate into **add**, **attach**, **hold** or **skip** and carry on; the user reviews the result in the diff. Ask only if the user asked to approve a shortlist first.

- **Add** anything that puts forward its own scenario — a described future for jobs, incomes, who gains, or public finances. Don't judge whether it is speculative, credible or likely: these are scenarios. A similar idea from a different author is a new scenario; add it.
- **Attach** when the same authors restate a scenario already on the map in another venue (a blog, op-ed or summary of their own report). Add it to that scenario's sources (`sources/<slug>/source.json` → `related`) and its extract's *Other sources* line; no new row.
- **Hold** only after you've dug for the text (step 5) and still can't read enough to write the extract. List it in the report with what's missing and where you looked.
- **Skip** anything that offers no scenario of its own: critiques of other scenarios, commentary, surveys, a single forecast number, or pieces that only cite others' scenarios. Give a one-line reason.

For a framework, decide on the whole set: add all of its sub-scenarios or none.

## 5. Capture the source

Download the source itself. **Don't rely on WebFetch for text** — it returns a model's summary of the page, not the page. Use:

```bash
curl -sSL -A "Mozilla/5.0" -o <file> "<url>"
```

then `pdftotext -layout` for PDFs, or strip HTML to text with a small Python script (run Python with `-I`, scripts kept outside the download folder). Check what came back — some sites (the IMF, for one) return an "Access Denied" page to `curl`. If so, use the `web-fetch` agent on the PDF URL: it saves the raw PDF bytes to a local file you can run `pdftotext` on.

**Dig before you hold.** If the page is thin (press release, landing page, gated), search for the PDF by exact title, the publisher's other pages for it, the authors' own posts, preprint versions, and coverage that quotes the scenarios at length.

Save under `sources/<slug>/` (one folder per publication; a framework's sub-scenarios share it):

- `source.json` — always committed:
  ```json
  {
    "slug": "imf-ai-scenario-planning-2026",
    "title": "…", "authors": ["…"], "publisher": "…", "date": "YYYY-MM-DD",
    "url": "…", "archive_url": "https://web.archive.org/web/<timestamp>/<url>",
    "retrieved": "YYYY-MM-DD", "format": "pdf | html",
    "licence": "CC BY 4.0 | OGL v3 | © Publisher, all rights reserved | unknown",
    "fulltext": "committed | private | none",
    "read": "full | partial: … | coverage only",
    "scenarios": ["<id>", "…"],
    "related": [{ "title": "…", "authors": ["…"], "url": "…", "note": "same scenarios restated" }]
  }
  ```
  For `archive_url`, request a snapshot (`curl -sS "https://web.archive.org/save/<url>"`) or look one up (`https://archive.org/wayback/available?url=<url>`); leave it empty if neither works.
- **This is a public repo.** Commit the full text (`fulltext.txt`, and the original PDF if small) **only** if the licence allows redistribution: Creative Commons, Open Government Licence, public domain, or explicit permission. Check the licence on the source itself (arXiv shows it on the abstract page; it is often *not* CC).
- Otherwise put the text in `sources/<slug>/private/` — gitignored — and set `"fulltext": "private"`. Tell the user it exists only in this session's container unless they keep it elsewhere.

## 6. Write the extract

Read [extract-template.md](extract-template.md) and follow it exactly: write `scenarios/<id>/extract.md` for each scenario, from the full text. For several sources or a large framework, write extracts in parallel with subagents, giving each the template path, the text file path and the scenario name.

## 7. Derive the map entry

Everything here comes from the extract. If something you need isn't there, improve the extract first.

Add a row to `data/scenarios.csv`:

| Column | Rule |
| --- | --- |
| `id` | short kebab-case, unique; sub-scenarios share a prefix (`wef-stalled`, `wef-copilot`) |
| `title`, `author` | as published; organisation in brackets after names if useful |
| `year`, `date` | `date` is `YYYY-MM-DD`, or `YYYY-MM` / `YYYY` when that's all that's known |
| `type` | `single`, or `framework` for one of several scenarios from the same source |
| `framework` | for `framework` rows: `Author — Framework name`; empty otherwise |
| `tags` | `AUG`/`REP` (augmentation/replacement), `DIFF`/`CONC` (diffuse/concentrated gains), with qualifiers like `Strong`, `Mild`, `(warns)`, `(prescribes)` |
| `desc` | 1–3 plain sentences describing the future, not the paper |
| `url` | primary source |
| `x_labor` | `-1` gains concentrated → `+1` gains diffuse |
| `y_labor` | `-1` strong augmentation → `+1` strong replacement |
| `x_fiscal` | `-1` fewer good jobs → `+1` more good jobs |
| `y_fiscal` | `-1` weaker public finances → `+1` stronger public finances |
| `policy` | `off`, `on` or `mixed` |
| `likelihood` | `improbable`, `possible`, `plausible`, `probable` or `happening` (hints in `data/likelihood.json`) |
| `likelihood_reason` | one sentence grounded in current evidence |

Calibrate coordinates against similar existing rows. Leave an axis pair blank if the extract has nothing on it. Quote fields containing commas.

Then:

- For `on` or `mixed` scenarios, add rows to `data/scenario-policies.csv` (`scenario,policy,evidence`) using slugs from `data/policy-atlas/policies.json`. If it names no atlas policy, add one row with an empty `policy` and name the levers it does use.
- Run `npm run scenarios:folders` to create `scenarios/<id>/`.
- Write `summary.md` (≤500 words, the scenario read through the promises in `goals/social-contract/goal.json`) and `analysis.md` (Policy on or off? / Big assumptions / What must be true / Tensions and weak points / Scoring notes), both from the extract. Follow `scenarios/autor/` as the model.
- Add draft scores to `goals/social-contract/scores.csv`: one row per criterion in `goal.json`, score 1–5 for the worst-off group, empty `policy` column, one-sentence reason. Score 3 where the extract says `Not addressed.`
- Add the scenario to the index table at the end of `scenarios/README.md`.
- Re-run `npm run scenarios:folders` so the generated README picks up the scores.

## 8. Check

```bash
npm run data:csv2json
```

```bash
npm run goals:check
```

```bash
npm run scenarios:check-policies
```

All three must pass. Then report four lists — **added** (with coordinates, policy, likelihood), **attached** (to which scenario), **held** (what's missing, where you looked) and **skipped** (one-line reason each) — and commit if the user wants.
