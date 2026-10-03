# Scenarios

One folder per scenario in [`data/scenarios.csv`](../data/scenarios.csv), named by its `id`. Each folder is the place to keep context about that scenario: notes, excerpts, source PDFs (where licensing allows), interview notes, scoring debates.

```
scenarios/
  <id>/
    README.md     ← generated: metadata, map position, draft social-contract scores
    summary.md    ← the scenario read through the five promises of the social contract (≤500 words)
    analysis.md   ← big assumptions: policy on or off? what must be true for it to happen?
    …             ← anything else you want to keep alongside it
```

`README.md` is regenerated from the CSV and `goals/social-contract/scores.csv` by `npm run scenarios:folders`, which also creates folders for new scenarios. Don't hand-edit it. Every other file in a folder is hand-written and the script leaves it alone.

## How the summaries and analyses were made

Each source was read (full text where accessible) and summarised under the five promises in [`goals/social-contract/goal.json`](../goals/social-contract/goal.json): *hard work pays*, *affordable essentials*, *reliable safety net*, *responsive government*, *time for what matters*. Each analysis covers:

- **Policy on or off?** Does the future described assume active policy, its absence, or a specific (often partial) policy?
- **Big assumptions** about capability, adoption, markets and politics.
- **What must be true** for the scenario to happen.
- **Tensions and weak points**, including mismatches between the source and how the map describes it.
- **Scoring notes** comparing the draft scores with the text.

Sources that couldn't be read directly are marked in their folder: the IMF article (Korinek; read via Korinek & Suh, NBER w32255), the TBI report (read via press coverage), and CFG (read via an AI summary of the page). The Windfall Trust Radar scenarios have no public source yet.

## Index

| Scenario | Policy stance | Summary | Analysis |
| --- | --- | --- | --- |
| Turing Transformation (Agrawal, Gans & Goldfarb) | Off: market mechanism | [summary](turing-transform/summary.md) | [analysis](turing-transform/analysis.md) |
| Antiqua et Nova (Vatican) | Prescriptive: moral programme | [summary](pope-leo/summary.md) | [analysis](pope-leo/analysis.md) |
| Rebuild Middle-Class Jobs (Autor) | On: needs design, training, scope-of-practice reform | [summary](autor/summary.md) | [analysis](autor/analysis.md) |
| AI as Normal Technology (Narayanan & Kapoor) | Light: slow by default, resilience policy prescribed | [summary](normal-tech/summary.md) | [analysis](normal-tech/analysis.md) |
| Techno-Optimist Manifesto (Andreessen) | Off, as a principle | [summary](techno-optimist/summary.md) | [analysis](techno-optimist/analysis.md) |
| Impact of AI on Labour Market (TBI) | Light-touch on | [summary](tbi/summary.md) | [analysis](tbi/analysis.md) |
| d/acc (Buterin) | Prescriptive: steer which technology gets built | [summary](dacc/summary.md) | [analysis](dacc/analysis.md) |
| The Turing Trap (Brynjolfsson) | Off leads to the trap; on (tax, training) avoids it | [summary](turing-trap/summary.md) | [analysis](turing-trap/analysis.md) |
| Simple Macroeconomics of AI (Acemoglu) | Off for the estimate | [summary](acemoglu/summary.md) | [analysis](acemoglu/analysis.md) |
| Reverse Centaur's Guide (Doctorow) | Off now; sectoral bargaining prescribed | [summary](doctorow/summary.md) | [analysis](doctorow/analysis.md) |
| The New McKinsey (Chiang) | Off: the missing policy is the point | [summary](chiang/summary.md) | [analysis](chiang/analysis.md) |
| Work Transformed (ILO) | Evidence plus on agenda | [summary](ilo/summary.md) | [analysis](ilo/analysis.md) |
| Gradual Disempowerment (Kulveit et al.) | Off; policy only a stopgap | [summary](gradual-disemp/summary.md) | [analysis](gradual-disemp/analysis.md) |
| Keep the Future Human (Aguirre) | Warns of off; prescribes strong on | [summary](keep-future-human/summary.md) | [analysis](keep-future-human/analysis.md) |
| The Intelligence Curse (Drago & Laine) | Off is the curse; technology plus democracy is the cure | [summary](intelligence-curse/summary.md) | [analysis](intelligence-curse/analysis.md) |
| Something Big Is Happening (Shumer) | Off, individualised | [summary](shumer/summary.md) | [analysis](shumer/analysis.md) |
| Machines of Loving Grace (Amodei) | On, "if everything goes right" | [summary](loving-grace/summary.md) | [analysis](loving-grace/analysis.md) |
| Moore's Law for Everything (Altman) | Strongly on (American Equity Fund) | [summary](moores-law/summary.md) | [analysis](moores-law/analysis.md) |
| 2028 Global Intelligence Crisis (Citrini) | Off, then too late | [summary](citrini/summary.md) | [analysis](citrini/analysis.md) |
| Situational Awareness (Aschenbrenner) | On for security, off for the social contract | [summary](sit-awareness/summary.md) | [analysis](sit-awareness/analysis.md) |
| AI 2027 (Kokotajlo et al.) | Off (race); improvised centralisation (slowdown) | [summary](ai-2027/summary.md) | [analysis](ai-2027/analysis.md) |
| Promethean Fire (Toloui) | On: the policy target | [summary](toloui-prometheus/summary.md) | [analysis](toloui-prometheus/analysis.md) |
| Copilot Empire (Toloui) | Two versions: off (rents) or on (antitrust) | [summary](toloui-copilot/summary.md) | [analysis](toloui-copilot/analysis.md) |
| Disruption Swarm (Toloui) | Off for the transition | [summary](toloui-swarm/summary.md) | [analysis](toloui-swarm/analysis.md) |
| Titan's Dominion (Toloui) | Off or captured | [summary](toloui-titans/summary.md) | [analysis](toloui-titans/analysis.md) |
| AI Augments Workers (Korinek) | Off: business as usual | [summary](korinek-aug/summary.md) | [analysis](korinek-aug/analysis.md) |
| Full AGI Scenario (Korinek) | Off: warning baseline | [summary](korinek-agi/summary.md) | [analysis](korinek-agi/analysis.md) |
| Plateau (CFG) | Off: the technical ceiling does the work | [summary](cfg-plateau/summary.md) | [analysis](cfg-plateau/analysis.md) |
| Centralized Takeoff (CFG) | Both: endings range from off to treaty | [summary](cfg-central/summary.md) | [analysis](cfg-central/analysis.md) |
| Decentralized Takeoff (CFG) | Off until a crisis forces bans | [summary](cfg-decentral/summary.md) | [analysis](cfg-decentral/analysis.md) |
| Steady Progress (DSIT) | Off by design | [summary](dsit-steady/summary.md) | [analysis](dsit-steady/analysis.md) |
| Rapid Transformation (DSIT) | Off by design | [summary](dsit-rapid/summary.md) | [analysis](dsit-rapid/analysis.md) |
| Lost Generation (Windfall) | Off: policy can't see the problem | [summary](wf-lost-generation/summary.md) | [analysis](wf-lost-generation/analysis.md) |
| High Substitution (Windfall) | Off | [summary](wf-high-substitution/summary.md) | [analysis](wf-high-substitution/analysis.md) |
| Disempowered Abundance (Windfall) | Partly on: material redistribution without political redistribution | [summary](wf-disempowered-abundance/summary.md) | [analysis](wf-disempowered-abundance/analysis.md) |

## Data issues found while reading

These are recorded in the relevant `analysis.md`. They haven't been changed in `data/scenarios.csv`.

- **`autor`**: the URL (`nber.org/papers/w32890`) points to "Pensioners Without Borders", not Autor. The right paper is NBER w32140, "Applying AI to Rebuild Middle Class Jobs" (2024). The CSV title doesn't match either.
- **`pope-leo`**: *Antiqua et Nova* (28 Jan 2025) was issued by two Vatican dicasteries under **Pope Francis**, not Leo XIV.
- **`toloui-*`**: the essay cites July 2025 sources and is dated 11 December, so it's probably 2025, not 2024.
- **`cfg-central`, `cfg-decentral`**: CFG's report has no scenarios with these names. Its scenarios are Plateau, Big AI, Diplomacy and Arms Race.
- **`dsit-steady`, `dsit-rapid`**: DSIT's AI 2030 scenarios are Unpredictable Advanced AI, AI Disrupts the Workforce, AI 'Wild West', Advanced AI on a Knife's Edge and AI Disappoints. The closest matches are AI Disappoints and AI Disrupts the Workforce. DSIT also deliberately left out benign scenarios.
- **`chiang`**: the map says Chiang argues AI is "technically overhyped". The essay makes no capability claim; its argument is about whom AI serves.
- **`turing-trap`**: draft scores are all 3s. The essay describes a fork, which is better scored as separate policy-off and policy-on rows.
