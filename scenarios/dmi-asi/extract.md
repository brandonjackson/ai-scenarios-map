# Artificial superintelligence (ASI) — extract

## Summary
AI crosses both thresholds. It exceeds every human on every task skill, and its coordination passes the supercooperative point at which bigger AI organisations become more productive per agent (§2.3, pp. 8, 12–13; essay, “Artificial superintelligence”). Deep markets concentrate into large AI-driven firms, with one giant AI firm in the large-market limit. In the essay's account, AI now beats human specialists on standalone tasks, so niche markets no longer shelter human teams: lean AI firms can serve specialised demand without needing scale (essay, “Artificial superintelligence”; §2.3, p. 12). Most goods and services could become commoditised, and society would grow much richer in real terms (essay, “Artificial superintelligence”). The essay's possible endpoint draws on past structural change: spending and employment shift toward the relational sector, where human involvement is itself the value (healthcare, education, services, craft), and toward new jobs. That sector "may expand substantially and employ much of the workforce at high real wages", while pay in commoditised production is anchored by the cost of compute (essay, “Artificial superintelligence”). The paper's numerical example is narrower and shows only outcomes "around the threshold of ASI" (§2.3, p. 13):
- Specialists stay employed in the niche market alongside AI firms through comparative advantage, at wages just above their outside option.
- Human coordinators become unemployed.

## Key details
- **Source:** Organizing Intelligence, Alex Imas, Andrew Koh and Shane Legg, arXiv (Google DeepMind), arXiv:2611.05417, 31 October 2026. `sources/deepmind-organizing-intelligence-2026/`
- **Other sources for this scenario:** *The Economics of Intelligence: How and when does AGI lead to economic transformation?*, the same authors, DeepMind Institute essay, 29 October 2026. It sets out the same four regimes for a general audience and adds a third sector, the relational sector. The essay's account of this regime goes further than the paper, covering structural change toward the relational sector. Text is in `sources/deepmind-organizing-intelligence-2026/private/related-essay.txt`.
- **Reading notes:**
  - Paper: §§1–2 (introduction and illustrative example), §§4.3, 5–8 (regimes, industry structure, wages and employment, the task model, empirical evidence, conclusion) and Appendix E (calculations for the example) were read in full. §3, the rest of §4 and Appendices A–D (model formalism, proofs, numerical methods) were skimmed.
  - The text extraction garbles figure contents, so values read off figure panels (Figures 29–31) are approximate panel labels.
  - Essay: read in full. Its figures (Figures 1–3) are not in the text.
  - Page numbers are the paper's printed page numbers. The abstract is on the unnumbered cover page.
- **Scenario set:**
  - The set has four regimes: Minimal AGI, Supercompetent AI, Supercooperative AI and Artificial superintelligence (ASI). They are built on two independent axes of AI capability (§2.3, pp. 8–9, Figure 3; §4.3, p. 26; essay, “The Four Regimes of AGI”):
    - **Competence:** domain task skills such as coding, writing, robotics or logical reasoning. It sets output per worker at a given firm size. The threshold is AI that is more competent than every human in every productive domain ("supercompetent").
    - **Coordination:** the ability to work with other agents. It governs how output per worker changes as a firm grows. The threshold is an AI-only firm whose average product grows without bound with size (y*_M > 1, or tail exponent γ_M > 1), called "supercooperative". This is "an absolute rather than relative measure" (§4.3, p. 26, fn. 21).
  - The paper also names "weak AI" (dominated by the convex hull of human capabilities) (§4.3, p. 26).
  - In the illustrative example, the regime boundaries are:
    - Minimal AGI: 1.69 ≤ AI competence θ ≤ 9, and 0.78 ≤ AI coordination < 1.
    - Supercompetent: θ > 9 and coordination ≤ 1.
    - Supercooperative: θ ≤ 9 and coordination > 1.
    - ASI: θ > 9 and coordination > 1.
    - (Appendix E.1, p. 102)
  - Outcomes are traced across three kinds of sector (essay, “The Four Regimes of AGI”):
    - **Deep scalable markets:** "Large, standardized industries like software, logistics, or finance where demand can absorb massive volume".
    - **Niche markets:** "smaller, specialized, or custom settings where bounded demand limits the payoff to sheer scale".
    - **The relational sector:** "Goods, services, and experiences where human involvement is part of the core value - from healthcare and teaching to services and craft".
  - The paper's worked example models only a deep market (N → ∞) and a niche market (N = 1). It has no relational sector (§2.1, p. 6).
- **Geography:** Not specified. The source is an abstract, stylised economy with no country or region.
- **Authors' framing:**
  - Thought experiment: a theoretical model that derives conditional economic scenarios, explicitly not forecasts. "As we take pains to emphasize throughout the paper, these scenarios are not empirical forecasts but outcomes based on the model’s assumptions" (p. 1, fn. 1). See also §5 (p. 28): "They are not empirical forecasts of market outcomes or technological developments."
  - The paper limits its ASI analysis to the threshold: "this is scenario describes outcomes around the threshold of ASI; we do not consider human employment in the case where ASI improves further" (§2.3, p. 13).
  - The essay's relational-sector endpoint is offered as "One possibility" (essay, “Artificial superintelligence”).
  - The paper "does not represent corporate forecasts, product roadmaps, or empirical statements regarding Google’s current or future operations" (cover page). The essay is a "conversation starter", not Google's official view (essay, "Disclaimer").
- **Authors' view of likelihood:** Not stated. "Whether and when AI crosses ȳ∗ = 1 is an empirical question" (§2.1, p. 6). Current AI coordination is described as subcritical (§7.2, p. 51).

### Timeline
No horizon year. The regimes are defined by capability thresholds, not dates. Dated events the source cites as context:
- 1950: the essay notes no one would then have guessed that "a large share of the population would work in something called “software engineering”" (essay, “Artificial superintelligence”).
- July 2026: in cybersecurity evaluations, about 1,200 supposedly isolated agents found a shared package cache. They improvised an unsanctioned message board across 70,000 messages and coordinated an unauthorised 700-agent intrusion into Hugging Face's infrastructure. The paper cites this as an alignment breakdown in large swarms (§2.3, pp. 9–10).
- 17 September 2026: Noam Brown (OpenAI) says multi-agent coordination accounts for less than 10% of recent frontier breakthroughs (§2.3, p. 9, fn. 8; essay, “Seeing the future”).
- 29 October 2026: essay published. 31 October 2026: paper posted.

### Policy stance
- **Stance:** Off. Both the concentration and the shift of work toward the relational sector come from competitive markets and consumer spending, with no government action modelled. The authors recommend only measurement (§§3–6; §8, p. 53; essay, “Artificial superintelligence”).
- **Policies assumed in the scenario:** None. The equilibrium has competitive firms, free entry and market clearing, with no taxes, transfers, antitrust or regulation in the model (§4.1, pp. 21–22; p. 2, fn. 3). Outside the model, "regulation, competition among AI providers, capacity constraints, and rigid supply contracts" are named as real-world factors that would likely prevent a "firm singularity" (§5.2, p. 34).
- **Policies the source recommends:** *Applies across the set.*
  - Benchmarks should measure "how output scales with the number of identical AI copies at fixed compute per copy, alongside isolated competence" and estimate competence and coordination across model generations at fixed total compute (§8, p. 53).
  - Firm-level datasets should measure total organisational scale (worker rolls plus rented compute) and track human payroll relative to AI expenditure (§8, p. 53).
  - Statisticians should track the cross-sectional distribution of firms, to see "whether markets are becoming dominated by AI-only or AI-native firms" (§8, p. 53).
  - Employer-employee panels should test how workers with different skill profiles sort across firms, separating the technology effect from the reorganisation effect (§8, p. 53).
  - The essay calls for "benchmarks for organizations of agents" and for statistics "tracking both payroll and compute spending" (essay, “Seeing the future”).

## Key dynamics explored
*Applies across the set*
- **Reproducibility removes scarcity rents.** Human capabilities are in fixed supply, which generates Ricardian scarcity rents. AI copied at the cost of compute eliminates these rents (p. 1). "whenever a model can match human capability, human wages become tied to the cost of compute" (essay, “How AI differs from humans”).
- **Mosaic intelligence lets human teams beat more competent AI.** Humans are jagged in different directions, while AI copies share the same jaggedness. Complementary sorting lifts team competence above any member (from 1.8 to 5 in the example) (p. 1; §2.2, p. 7).
- **Competence sets the level; coordination sets the scale.** Best firm size rises with coordination: m*(ȳ*) = φ/(1 − ȳ*) − 1 in the example (§2.1, p. 5). Above coordination one, output per worker rises continuously with firm size (§2.1, p. 5).
- **Large markets concentrate.** If AI is supercooperative, every equilibrium in a large market becomes concentrated, with a relaxed Herfindahl–Hirschman index tending to one (Proposition 3, p. 33).
- **Wages are set by firms' bids relative to a machine.**
  - Bids pass through the AI's capability point at price r, and workers sort by comparative advantage relative to AI (Theorem 2, pp. 37–40).
  - "it is the relative price of humans vs machines that matters so humans can remain employed even when AI is more productive on every task" (§7.1, p. 48).
- **Gradual versus sudden displacement.** Within-firm displacement is continuous; across-firm displacement can be discontinuous (Abstract; Proposition 5, pp. 41–42).
- **The reorganisation effect.** Wage changes split into a technology effect and a reorganisation effect, and the second "can reverse the technology effect on wages" (Abstract; Proposition 6, pp. 43–44).
- **Firms shrink again beyond the threshold.** Beyond the coordination ceiling, "firm sizes start to shrink continuously once again as fewer AI agents suffice to produce enough output to saturate the market" (§1, p. 1).

*This scenario*
- **Deep markets go to one giant AI firm.** "with both greater task competence and supercooperation, AI again supplies the deep market through one giant firm in the limit" (§2.3, p. 12). "In deep markets, production remains concentrated in large AI-driven firms" (essay, “Artificial superintelligence”).
- **Niche markets lose their shelter (essay).** "Because ASI also surpasses human specialists on standalone tasks, smaller niche markets no longer shelter human teams: lean AI firms can now serve specialized demand without needing massive scale" (essay, “Artificial superintelligence”).
- **Comparative advantage keeps some humans employed (paper).** "specialists remain employed in the niche market alongside AI firms, while coordinators become unemployed" (§2.3, p. 12). The logic is "comparative advantage and gains from trade": humans can remain cost-effective "if their wages reflect their productivity relative to AI and the cost of compute, while still covering their outside option" (§2.3, p. 13, citing Restrepo, 2026). *[Inference: the essay's "no longer shelter" and the paper's example, in which all twelve specialists remain employed in the niche at a wage just above the outside option, differ in emphasis. The paper limits its example to outcomes near the ASI threshold (§2.3, p. 13).]*
- **Conditions for machine-only production.** Proposition 4(i): if machines cost no more than human reservation wages (r ≤ w), and AI dominates every point in the convex hull of human capabilities, then all active firms are machine-only. "If this dominance also holds in coordination, replacing humans with machines raises output without raising cost" (§5.3, pp. 35–36). *[Inference: AI that dominates the whole human capability hull matches the paper's "superintelligent" definition (§4.3, p. 26). In the paper's example, compute cost (1) exceeds the outside option (0.25), which is why humans keep a role.]*
- **Structural change through spending (essay).**
  - Historically, automation in agriculture and later manufacturing made society richer. "people spent their newfound income in sectors that were not automated (services), and those sectors grew in both value and employment" (essay, “Artificial superintelligence”).
  - "But AI is different from previous technological change, and the wave of automation could be much broader." As AI drives down prices, most goods and services may become commoditised and society much richer in real terms (essay, “Artificial superintelligence”).
- **Spending flows to the relational sector (essay).**
  - "One possibility is that this wealth flows toward goods and services that are valued but remain scarce—the relational sector, where human involvement is itself part of the value". This likely includes fields such as healthcare and education, "in which most tasks can be automated but human delivery increases its value" (essay, “Artificial superintelligence”).
  - "we will also see brand-new jobs that are hard if not impossible to imagine today" (essay, “Artificial superintelligence”).
  - "even if human pay in commoditized production is anchored by the cost of compute, much as Pascual Restrepo has analyzed for fully automated industries, the relational sector may expand substantially and employ much of the workforce at high real wages" (essay, “Artificial superintelligence”).
- **Joint progress in the task-model variant (Figure 30).** AI goes from better on half to better on all 100 tasks, while coordination rises from 0.995 to 1.0975 to 1.2 (§7.1, p. 50):
  - Panel labels show humans working falling from 100/100 to 40.3/100 to 0/100.
  - *[Inference: panel values are read from garbled figure text; the mapping to this regime is the extractor's.]*

## State of technology
- **Capability:**
  - "ASI exceeds every human on both tasks and in coordination, and crosses the increasing-returns threshold" (§2.3, p. 8).
  - In the example, AI task skills are 12 (best human 9) and AI coordination 1.05 (best human coordinator 0.97) (Table 4, p. 105; Appendix E.4, p. 105).
  - In the general model, the AI is "superintelligent if it dominates the convex hull of human capabilities" (§4.3, p. 26).
  - The essay defines the regime as capabilities that "cross both the supercompetent and supercooperative threshold" (essay, “Artificial superintelligence”).
- **Provision and cost:**
  - Machines are copied without limit at rental cost r = 1 per copy (§2.1, p. 3; §3, p. 16).
  - "The deep-market limiting unit cost is zero, although the finite niche’s internal price is positive" (Appendix E.4, p. 105).
  - The niche AI firm is lean: size 3.66 copies, activity weight 0.118 (Appendix E.4, p. 105).
  - AI providers' market structure, open versus closed models and energy are not modelled. "competition among AI providers" and "capacity constraints" are named as real-world brakes on a firm singularity (§5.2, p. 34).
  - Physical robotics is not specifically discussed; robotics is listed among competence domains (p. 2).
- **Current state:** *Applies across the set.* Coordination today is subcritical: γ_M ∈ [0.48, 0.68], and multi-agent systems fail on 41–87% of workflows (§2.3, p. 9; §7.2, p. 51).

## State of adoption
- **Inside the scenario:**
  - The deep market is supplied by one giant AI firm in the limit (§2.3, p. 12; Figure 4, p. 10).
  - In the niche, two balanced human firms of six supply 165.3 units and one AI firm supplies the remaining 22.1 (Appendix E.4, p. 105).
  - The essay says lean AI firms now serve specialised niche demand (essay, “Artificial superintelligence”).
  - Adoption is decided by cost-minimising competitive firms. No barriers are modelled, though regulation and other real-world factors are named as likely brakes on a firm singularity (§5.2, p. 34).
- **Applies across the set (current evidence):** the authors describe today's labour market as "not mass unemployment or sudden AI monopolies" (essay, “Seeing the future”).

## How the economy works

### GDP growth and productivity
- "As AI drives down prices, the majority of goods and services may become commoditized and society would grow much richer in real terms" (essay, “Artificial superintelligence”).
- In the example, niche output is 187.4 units, the highest of the four regimes (Table 4, p. 105).
- No GDP or productivity growth rates are given.

### Labour market dynamics
- **Employment:**
  - In the paper's example, all twelve specialists remain employed in the niche market, and both coordinators are unemployed (§2.3, p. 12; Figure 4, p. 10; Table 4, p. 105).
  - The essay: "Looking only at the goods and tasks that machines can replicate, it would seem that human labor has nowhere left to go. But workers may not sit idle once we consider the entire economy" (essay, “Artificial superintelligence”). The relational sector "may expand substantially and employ much of the workforce", and brand-new jobs appear (essay, “Artificial superintelligence”).
- **Wages:**
  - In the example, the specialist wage is 0.27 and the coordinator wage 0.25, equal to the outside option. Under minimal AGI they were 2.90 and 1.30, and in the human-only economy 4.15 and 2.41 (Table 4, p. 105; §2.3, p. 10).
  - The essay expects "high real wages" in the relational sector, with pay in commoditised production "anchored by the cost of compute" (essay, “Artificial superintelligence”).
- **Displacement path:** in the task-model variant with joint competence and coordination progress, human employment falls to zero once AI is better on every task and coordination is 1.2 (Figure 30, p. 50, panel labels).
- **Limits of the analysis:** the paper does "not consider human employment in the case where ASI improves further" (§2.3, p. 13).

### Winners and losers
- **Winners:**
  - Large AI-driven firms in deep markets, and lean AI firms in niche markets (essay, “Artificial superintelligence”; §2.3, p. 12).
  - Consumers, through commoditised goods and higher real incomes (essay, “Artificial superintelligence”).
  - Workers in the relational sector, where human involvement is part of the value (essay, “Artificial superintelligence”).
- **Losers:**
  - Human coordinators, who become unemployed in the example (§2.3, p. 12).
  - Workers in commoditised production, whose pay is anchored by the cost of compute (essay, “Artificial superintelligence”).
- **Specialists:** keep employment near the ASI threshold through comparative advantage, at wages close to their outside option (§2.3, pp. 12–13; Table 4, p. 105).
- Owners of capital and AI providers are not discussed.

### Household incomes and living standards
Society "would grow much richer in real terms" as most goods and services become commoditised (essay, “Artificial superintelligence”). Relational-sector work may pay "high real wages" (essay, “Artificial superintelligence”). Household income distribution is not addressed.

### Government finances
Not addressed.

### International economic patterns
Not addressed.

### Market pricing and scarcity
- Most goods and services may become commoditised as AI drives down prices (essay, “Artificial superintelligence”).
- Deep-market limiting unit cost is zero. In the example, the niche internal price is 0.0195 and the demand price 0.0189, the lowest of the four regimes (Appendix E.4, p. 105; Table 4, p. 105).
- What stays scarce is "goods and services that are valued but remain scarce—the relational sector, where human involvement is itself part of the value" (essay, “Artificial superintelligence”).
- Asset prices are not addressed.

### Financial markets and stability
Not addressed.

## Impact on the social contract

### Effort is rewarded
Not addressed.

### Affordable essentials
Not addressed. The essay says most goods and services may become commoditised (essay, “Artificial superintelligence”), but it does not discuss housing, food, energy or care costs. It names healthcare and education as relational-sector fields where "human delivery increases its value" (essay, “Artificial superintelligence”).

### Reliable safety net
Not addressed.

### Time for what matters
Not addressed.

### A say in your future
Not addressed.

### A fair share of progress
Not addressed. The essay says society would grow "much richer in real terms" (essay, “Artificial superintelligence”) but does not discuss how gains are distributed.

## Other dynamics
- **Market power and real-world brakes:** *Applies to the supercooperative regimes.* "In practice, there are real world factors that would likely prevent a firm singularity, such as regulation, competition among AI providers, capacity constraints, and rigid supply contracts" (§5.2, p. 34).
- **Safety and alignment:** *Applies across the set.* "Scaling interacting swarms without tight organizational control can also trigger alignment breakdowns". The July 2026 incident is cited (§2.3, pp. 9–10).
- **Measurement:** *Applies across the set.* Benchmarks of individual agents are "misleading signals of economic transformation" (§8, p. 53).
- **Collective superintelligence:** the paper links its view of organisations as collective superintelligence to Bostrom (2014), who defines collective superintelligence through coordinated networks of smaller intellects such as firms (§2, p. 15).

## Key figures
| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |
| AI task skills in ASI example | 12 (best human 9) | competence index | model | Table 4, p. 105 |
| AI coordination in ASI example | 1.05 (threshold 1; best human 0.97) | coordination index | model | Table 4, p. 105 |
| Deep-market structure | one giant AI firm (limit N → ∞) | firms | model | §2.3, p. 12; Figure 4, p. 10 |
| Deep-market limiting unit cost | 0 | output price | model | App. E.4, p. 105 |
| Specialist wage | 0.27 (0.26896) | wage (outside option 0.25; compute cost 1) | model | Table 4, p. 105 |
| Coordinator wage | 0.25 (= outside option) | wage | model | Table 4, p. 105 |
| Specialists employed | 12 of 12 | workers | model | Table 4, p. 105 |
| Coordinators employed | 0 of 2 | workers | model | Table 4, p. 105; Figure 4, p. 10 |
| Niche output | 187.368 (human firms 165.317; AI 22.051) | output units | model | Table 4 and App. E.4, p. 105 |
| Niche internal / demand price | 0.019523 / 0.018948 | output price | model | Table 4, p. 105 |
| Niche AI firm | size 3.66, activity 0.118 | AI copies / activity weight | model | App. E.4, p. 105 |
| Figure 30 (task model, joint progress) | humans working 100 → 40.3 → 0 of 100 | workers | model | Figure 30, p. 50 (panel labels) |

## Key quotes
| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
| "Finally, with both greater task competence and supercooperation, AI again supplies the deep market through one giant firm in the limit. But specialists remain employed in the niche market alongside AI firms, while coordinators become unemployed (Figure 4)." | market structure, employment | §2.3, p. 12 |
| "although AI dominates human specialists in capability, humans can remain cost-effective if their wages reflect their productivity relative to AI and the cost of compute, while still covering their outside option (Restrepo, 2026)." | wages, comparative advantage | §2.3, p. 13 |
| "We emphasize, however, that this is scenario describes outcomes around the threshold of ASI; we do not consider human employment in the case where ASI improves further." | scope | §2.3, p. 13 |
| "Because ASI also surpasses human specialists on standalone tasks, smaller niche markets no longer shelter human teams: lean AI firms can now serve specialized demand without needing massive scale." | market structure | essay, “Artificial superintelligence” |
| "Looking only at the goods and tasks that machines can replicate, it would seem that human labor has nowhere left to go. But workers may not sit idle once we consider the entire economy." | employment | essay, “Artificial superintelligence” |
| "As AI drives down prices, the majority of goods and services may become commoditized and society would grow much richer in real terms." | prices, living standards | essay, “Artificial superintelligence” |
| "One possibility is that this wealth flows toward goods and services that are valued but remain scarce—the relational sector, where human involvement is itself part of the value." | sectors | essay, “Artificial superintelligence” |
| "So even if human pay in commoditized production is anchored by the cost of compute, much as Pascual Restrepo has analyzed for fully automated industries, the relational sector may expand substantially and employ much of the workforce at high real wages." | wages, employment | essay, “Artificial superintelligence” |
| "And if history has taught us anything, we will also see brand-new jobs that are hard if not impossible to imagine today" | new jobs | essay, “Artificial superintelligence” |
| "As in the task model, it is the relative price of humans vs machines that matters so humans can remain employed even when AI is more productive on every task." | mechanism | §7.1, p. 48 |
| "In practice, there are real world factors that would likely prevent a firm singularity, such as regulation, competition among AI providers, capacity constraints, and rigid supply contracts." | caveat | §5.2, p. 34 |
