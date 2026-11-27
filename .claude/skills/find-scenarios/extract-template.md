# Extraction template

One `extract.md` per scenario, at `scenarios/<id>/extract.md`. It is the durable record of what the source says. Summaries, analyses, map coordinates, scores and any future columns are derived from it, so it must not depend on today's framework.

## Rules

- **Report, don't interpret.** Write what the source says, in its terms. If you must infer, mark it: *[Inference: …]*.
- **Never fill a gap.** If the source is silent on a section, write `Not addressed.` That tells future readers the source was checked, not skipped.
- **Cite as you go.** Put a locator after each claim: `(p. 12)`, `(§3.2)`, `(“Fiscal” section)`. Numbers and quotes always get one.
- **Be complete, not short.** Capture every distinct claim, figure and mechanism the source gives for this scenario. Length is fine; loss is not.
- **Frameworks:** one extract per scenario. Repeat the shared framing in each so every extract stands alone. Put claims the source makes across all its scenarios under *Applies across the set* in the relevant section.
- Read from the full text in `sources/<slug>/`. If only part could be read, say which part under *Reading notes*.

## Template

```markdown
# <Scenario title> — extract

## Summary
3–5 sentences: what happens in this future, in the source's own framing.

## Key details
- **Source:** <title>, <authors>, <publisher>, <date>. `sources/<slug>/`
- **Other sources for this scenario:** <same authors restating it elsewhere, or "None">
- **Reading notes:** <full text / partial (which parts) / coverage only>
- **Scenario set:** <sibling scenarios and the axes or drivers used to build them, or "Standalone">
- **Geography:** <global / country / region>
- **Authors' framing:** <forecast / warning / prescription / thought experiment / planning scenario>, with a quote if possible
- **Authors' view of likelihood:** <their words, or "Not stated">

### Timeline
Horizon year, and dated events in order (`2027 — market correction hits debt-funded AI firms (p. 9)`).

### Policy stance
- **Stance:** on / off / mixed — and why, in one sentence.
- **Policies assumed in the scenario:** what governments do inside the story.
- **Policies the source recommends:** what the authors say should be done (may apply across the set).

## Key dynamics explored
The causal mechanisms the scenario turns on, as a list: *X leads to Y because Z*.

## State of technology
Assumptions about AI's capabilities — intellectual (cognitive tasks, reasoning, agents), physical (robotics), and economic (cost, reliability) — and how it is provided: market structure, number and size of providers, open vs closed, compute and energy constraints, pricing.

## State of adoption
How fast and how widely AI is taken up: which sectors, firm sizes, countries and governments adopt; what speeds or blocks adoption (regulation, skills, infrastructure, trust, returns).

## How the economy works
Describe only what the source includes. Write `Not addressed.` under any heading it doesn't cover.

### GDP growth and productivity
### Labour market dynamics
Employment, unemployment, participation, which occupations and groups, wages, labour share, hours, entry-level effects, reallocation.
### Winners and losers
Across firms, sectors, regions, skill levels, ages, capital vs labour.
### Household incomes and living standards
### Government finances
Tax bases, revenue, spending, debt, social insurance funding.
### International economic patterns
Trade, capital flows, migration, development pathways, cross-country gaps.
### Market pricing and scarcity
Prices of goods and services, cost of essentials, what becomes scarce or abundant, asset prices.
### Financial markets and stability
Valuations, corrections, credit, leverage, systemic risk.

## Impact on the social contract
Describe only what the source includes about each pillar. Don't infer impacts the source doesn't state. Write `Not addressed.` where it is silent.

### Effort is rewarded
Hard work provides a pathway to a better life.
### Affordable essentials
Housing, food, energy and care stay within reach.
### Reliable safety net
If you fall on hard times, you'll be looked after.
### Time for what matters
Room for family, community and meaning.
### A say in your future
Votes matter and collective problems are solved.
### A fair share of progress
Scientific progress benefits everyone.

## Other dynamics
Anything the source covers that the sections above don't: safety and loss of control, geopolitics, culture, health, environment, information ecosystem. `Not addressed.` if none.

## Key figures
| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |

## Key quotes
| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
```
