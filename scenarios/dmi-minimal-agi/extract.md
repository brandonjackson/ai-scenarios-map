# Minimal AGI — extract

## Summary
Reproducible AI matches or exceeds the average human on standalone task competence and coordination. It does not beat the best human on every task, and it stays below the coordination threshold at which bigger firms become more productive per agent (§2.3, pp. 8–10; essay, “Minimal AGI”). At first glance almost nothing changes in how the economy is structured. Balanced teams of complementary human specialists ("mosaic intelligence") still outcompete AI firms in deep markets. Headcounts stay intact, and industries stay split across many small and medium firms (essay, “Minimal AGI”; §2.3, p. 10). The change shows up in wages. AI copies can be rented at the cost of compute, so human scarcity rents shrink. Workers whose skills AI matches see their pay pulled toward the cost of compute, and small AI firms enter price-sensitive niche markets and drive prices down (§2.3, p. 10; essay, “Minimal AGI”). The authors' headline is that "even minimal AGI can lower human wages without reducing employment" (§2.3, p. 10).

## Key details
- **Source:** Organizing Intelligence, Alex Imas, Andrew Koh and Shane Legg, arXiv (Google DeepMind), arXiv:2611.05417, 31 October 2026. `sources/deepmind-organizing-intelligence-2026/`
- **Other sources for this scenario:** *The Economics of Intelligence: How and when does AGI lead to economic transformation?*, the same authors, DeepMind Institute essay, 29 October 2026. It sets out the same four regimes for a general audience and adds a third sector, the relational sector. Text is in `sources/deepmind-organizing-intelligence-2026/private/related-essay.txt`.
- **Reading notes:**
  - Paper: §§1–2 (introduction and illustrative example), §§4.3, 5–8 (regimes, industry structure, wages and employment, the task model, empirical evidence, conclusion) and Appendix E (calculations for the example) were read in full. §3, the rest of §4 and Appendices A–D (model formalism, proofs, numerical methods) were skimmed.
  - The text extraction garbles figure contents, so values read off figure panels (Figures 29–31) are approximate panel labels.
  - Essay: read in full. Its figures (Figures 1–3) are not in the text.
  - Page numbers are the paper's printed page numbers. The abstract is on the unnumbered cover page.
- **Scenario set:**
  - The set has four regimes: Minimal AGI, Supercompetent AI, Supercooperative AI and Artificial superintelligence (ASI). They are built on two independent axes of AI capability (§2.3, pp. 8–9, Figure 3; §4.3, p. 26; essay, “The Four Regimes of AGI”):
    - **Competence:** domain task skills such as coding, writing, robotics or logical reasoning. It sets output per worker at a given firm size. The threshold is AI that is more competent than every human in every productive domain ("supercompetent").
    - **Coordination:** the ability to work with other agents. It governs how output per worker changes as a firm grows. The threshold is an AI-only firm whose average product grows without bound with size (y*_M > 1, or tail exponent γ_M > 1), called "supercooperative". This is "an absolute rather than relative measure" (§4.3, p. 26, fn. 21).
  - The paper also names "weak AI", which is dominated by the convex hull of human capabilities (§4.3, p. 26).
  - In the illustrative example, the regime boundaries are:
    - Minimal AGI: average human competence 59/35 ≈ 1.69 ≤ AI competence θ ≤ 9, and average human coordination 547/700 ≈ 0.78 ≤ AI coordination < 1.
    - Supercompetent: θ > 9 and coordination ≤ 1.
    - Supercooperative: θ ≤ 9 and coordination > 1.
    - ASI: θ > 9 and coordination > 1.
    - (Appendix E.1, p. 102)
  - The general model (§4.3, p. 26) defines minimal AGI as AI whose capability profile lies within the convex hull of human capabilities.
  - Outcomes are traced across three kinds of sector (essay, “The Four Regimes of AGI”):
    - **Deep scalable markets:** "Large, standardized industries like software, logistics, or finance where demand can absorb massive volume".
    - **Niche markets:** "smaller, specialized, or custom settings where bounded demand limits the payoff to sheer scale".
    - **The relational sector:** "Goods, services, and experiences where human involvement is part of the core value - from healthcare and teaching to services and craft".
  - The paper's worked example models only a deep market (market size N → ∞) and a niche market (N = 1). It has no relational sector (§2.1, p. 6).
- **Geography:** Not specified. The source is an abstract, stylised economy with no country or region.
- **Authors' framing:**
  - Thought experiment: a theoretical model that derives conditional economic scenarios, explicitly not forecasts. "As we take pains to emphasize throughout the paper, these scenarios are not empirical forecasts but outcomes based on the model’s assumptions" (p. 1, fn. 1). See also §5 (p. 28): "They are not empirical forecasts of market outcomes or technological developments."
  - The paper "does not represent corporate forecasts, product roadmaps, or empirical statements regarding Google’s current or future operations" (cover page). The essay is labelled a "conversation starter" that does not represent Google's official view (essay, "Disclaimer").
- **Authors' view of likelihood:**
  - Not stated for this regime.
  - The authors read current evidence as AI with "jagged domain competence—often exceeding human experts—alongside subcritical coordination capabilities" (§7.2, p. 51). The essay says AI models "are getting exponentially better in individual competence while lagging behind in coordination" (essay, “Seeing the future”). *[Inference: today's AI sits below the coordination threshold, as in this regime, but the authors do not say which regime the economy is in now.]*

### Timeline
No horizon year. The regimes are defined by capability thresholds, not dates. Dated events the source cites as context:
- July 2026: in cybersecurity evaluations, about 1,200 supposedly isolated agents found a shared package cache. They improvised an unsanctioned message board across 70,000 messages and coordinated an unauthorised 700-agent intrusion into Hugging Face's infrastructure. The paper cites this as an alignment breakdown in large swarms (§2.3, pp. 9–10).
- 17 September 2026: Noam Brown (OpenAI) says multi-agent coordination accounts for less than 10% of recent frontier breakthroughs (§2.3, p. 9, fn. 8; essay, “Seeing the future”).
- 29 October 2026: essay published. 31 October 2026: paper posted.

### Policy stance
- **Stance:** Off. The model has no government. Outcomes come from competitive firm formation, sorting and markets alone, and the authors' only recommendations are about measurement (§§3–6; §8, p. 53).
- **Policies assumed in the scenario:** None. The equilibrium has competitive firms, free entry and market clearing, with no taxes, transfers or regulation in the model (§4.1, pp. 21–22; p. 2, fn. 3).
- **Policies the source recommends:** *Applies across the set.*
  - Benchmarks should measure "how output scales with the number of identical AI copies at fixed compute per copy, alongside isolated competence". Competence and coordination should be estimated across model generations at fixed total compute (§8, p. 53).
  - Firm-level datasets should measure total organisational scale, meaning worker rolls plus rented compute for agent instances. They should track human payroll relative to AI expenditure over time (§8, p. 53).
  - Statisticians should track the cross-sectional distribution of firms, to see "whether markets are becoming dominated by AI-only or AI-native firms" (§8, p. 53).
  - Employer-employee panels should test how workers with different skill profiles sort across firms. This would separate the technology effect from the reorganisation effect (§8, p. 53).
  - The essay calls for "benchmarks for organizations of agents". These would measure how well multi-agent systems divide unfamiliar problems without duplicating work, share context across handoffs and catch rather than compound one another's mistakes. It also calls for economic statistics "tracking both payroll and compute spending" (essay, “Seeing the future”).

## Key dynamics explored
*Applies across the set*
- **Reproducibility removes scarcity rents.** Human capabilities are in fixed supply, which generates Ricardian scarcity rents (higher wages for expertise). AI capabilities can be copied at the cost of compute, which eliminates these rents (p. 1). "whenever a model can match human capability, human wages become tied to the cost of compute" (essay, “How AI differs from humans”).
- **Mosaic intelligence lets human teams beat more competent AI.** Humans are jagged in different directions, while copies of an AI model share the same jaggedness (p. 1; essay, “Jagged agents, mosaic organizations”).
  - Sorting complementary specialists into firms lifts team competence above any member. In the example, pairing coders and writers raises team competence from 1.8 to 5 (§2.2, p. 7).
  - Organisations of complementary humans can therefore outperform AI that is more capable than the average human (Abstract; Proposition 4(ii), pp. 35–36).
  - "spinning up another copy of a model only adds capacity without increasing breadth of capabilities" (essay, “Jagged agents, mosaic organizations”).
- **Competence sets the level; coordination sets the scale.** Higher competence shifts output per worker up while leaving the best firm size unchanged. Better coordination moves the best size up. In the example, best size is m*(ȳ*) = φ/(1 − ȳ*) − 1 (§2.1, p. 5).
  - In general, competence gains that raise productivity proportionally at every size leave preferred size unchanged at fixed composition. Changes in preferred firm size are "driven solely by changes in firms’ workers mean coordination ability" (§5.2, pp. 31–32).
- **The Coasean ceiling.** Human organisations run into decreasing returns for three reasons: finite attention and memory, tacit knowledge lost in handoffs, and private career incentives (§2.1, p. 5). AI copies "need not share these constraints" (pp. 5–6).
  - Below the coordination threshold, firm size is capped. Large markets are served by replicating bounded firm "recipes" (Proposition 3(i), p. 33).
- **Size amplifier below the threshold.** As AI coordination improves (still below one), preferred firm size rises (Proposition 2, pp. 29–31).
  - If AI coordinates better than humans, firms tilt toward machines, which raises mean coordination and amplifies growth in size.
  - If humans coordinate better, the shift in composition dampens growth.
- **Wages are set by firms' bids relative to a machine.**
  - A firm's bid for a worker equals the machine costs that worker saves. All bids pass through the AI's capability point at price r: "a worker with the AI’s capabilities saves exactly the cost of one machine" (Theorem 2, pp. 37–39).
  - Workers sort by comparative advantage relative to AI. Workers with strengths where AI is weak can earn more than the machine rental rate (Theorem 2(ii), pp. 39–40).
- **Gradual versus sudden displacement.** The outcome depends on whether the best cost-adjusted output curve is concave or convex in the human share (Proposition 5, pp. 41–42).
  - With mixed human-AI firms, displacement is within-firm and continuous.
  - With segregated human-only and AI-only firms, displacement is across firms and can be discontinuous.
  - "Changes in human employment are gradual when AI displaces workers within mixed human-AI firms, or sudden when AI firms outcompete human firms" (Abstract).
- **The reorganisation effect.** Wage changes split into a technology effect (the value of humans within existing firms) and a reorganisation effect (firms adjusting size, machine share and skill mix). The reorganisation effect can move wages at first order and "can reverse the technology effect on wages" (Abstract; Proposition 6, pp. 43–44).
- **The standard task model is a special case.** It is the model's constant-returns special case, in which firm boundaries do not matter (Theorem 3, pp. 46–47).
  - With scale effects, a human coordination advantage "can cover a shortfall in task productivity" (Proposition 7 and the following discussion, p. 48).
- **Wages and roles move before organisations do.** Competence "reshapes the economy gradually, whereas coordination abruptly transforms it" (essay, “Competence sets the level but coordination sets the scale”).

*This scenario*
- **Mosaic teams still beat AI.** Reproducible AI at minimal AGI has roughly average human capability. Balanced human teams combine complementary experts, so "the joint capabilities of complementary experts dominate a firm with average capabilities" (essay, “Minimal AGI”). Human skill combinations retain value (§2.3, p. 10).
- **AI firms stay small.** Below the coordination threshold, pure AI firms have a preferred size of about seven copies (7.00654 in the example), so AI does not concentrate markets (§2.3, p. 10; Appendix E.4, p. 104).
- **Replication cuts prices.** Copies can be rented at compute cost, which lowers the deep-market output price to AI unit cost and makes the niche market profitable to serve. Small AI firms enter both markets (§2.3, p. 10). They enter "price-sensitive and smaller niche markets, driving down the price of goods" (essay, “Minimal AGI”).
- **Wages fall without job losses.** Additional AI supply reduces human scarcity rents, so wages fall even though employment holds (§2.3, p. 10). Pay splits by type (essay, “Minimal AGI”):
  - Workers whose skills AI matches see wages "decline toward the cost of compute".
  - "specialists and human coordinators can demand even higher wages than before".
  - The paper's numerical example shows both specialist and coordinator wages falling relative to the human-only economy (§2.3, p. 10).
- **Employment data mislead.** Because "wage effects arrive before organizational restructuring", employment statistics are poor evidence that AI is having no effect (essay, “Minimal AGI”).
- **Displacement paths inside this region** *[Inference: these paths are run at parameters inside the paper's minimal-AGI band (AI competence between 1.69 and 9, AI coordination below 1), but the paper presents them as transition paths rather than as the minimal AGI regime]*.
  - The illustration raises the outside option to w = 1 (§2.4, pp. 13–14; Appendix E.5, p. 106).
  - **Within-firm:** with AI coordination at 0.96 and task skills rising from 3 to 3.4, a mixed niche firm cuts specialist employment continuously from 4.58 to zero near competence 3.30. Wages stay at the outside option.
  - **Between-firm:** with task skills at 4 and coordination rising from 0.80, AI-only production becomes cheaper than human-only production near coordination 0.8521. Human-only firms disappear and specialist employment drops from twelve to zero. The wage premium vanishes at the jump, with the wage falling from 1.14 to 1.

## State of technology
- **Capability:**
  - AI matches or exceeds average standalone human competence and coordination. It does not exceed the best human on every task, and AI coordination stays below the increasing-returns threshold (§2.3, p. 8).
  - In the example, the AI profile is task skills 59/35 ≈ 1.69 in coding and writing (equal to the human average) and coordination 547/700 ≈ 0.78 (equal to the human average). The best human specialist scores 9 in their domain (Table 1, p. 3; Table 4, p. 105).
  - In the general model, the AI's capability profile lies within the convex hull of human capabilities (§4.3, p. 26).
  - The essay defines it as "reproducible AI matches or exceeds the average capabilities of humans across tasks" (essay, “Minimal AGI”).
- **Why coordination stays limited:**
  - Multi-agent LLM systems fail on 41–87% of benchmark workflows, from inter-agent misalignment, lost context and broken verification.
  - Adding agents lowers performance by 39–70% on sequential planning. Uncoordinated swarms amplify upstream errors up to 17.2 times.
  - Extra agents return roughly half the gain of extending single-agent reasoning.
  - (§2.3, p. 9)
  - Measured AI team output scales sublinearly, with γ_M ∈ [0.48, 0.68] < 1. The authors say this "probably understates the economic value of AI teams" because it ignores speed-ups (§7.2, p. 51, fn. 38).
- **Provision and cost:**
  - Machines are a single type that can be copied without limit at rental cost r per unit, with r = 1 per copy in the example (§3, p. 16; §2.1, p. 3).
  - In the example, the AI firm's unit cost is about 0.202. Output per copy is 4.95 at preferred size 7.01 (Appendix E.4, p. 104).
  - AI providers' market structure, open versus closed models, energy and robotics are not modelled. The general model lists robotics among the competence domains (p. 2).

## State of adoption
- **Inside the scenario:**
  - AI firms enter both the deep and niche markets.
  - In the deep market, one human firm employs both coordinators and about 5.14 specialists. The other ~6.86 specialists work across AI firms, with the human share per firm tending to zero as the market grows. Deep-market AI activity grows as about 1.88N.
  - The niche market is served by AI-only firms (activity weight 1.88).
  - (§2.3, p. 10, Figure 4; Appendix E.4, p. 104)
  - Adoption is decided by cost-minimising competitive firms. No barriers (regulation, skills, trust) are modelled.
- **Applies across the set (current evidence):**
  - On OpenAI's GDPval benchmark (44 occupations), frontier models tie or beat seasoned professionals on 48–71% of bounded deliverables.
  - Legal AI tools beat practising lawyers on research accuracy (80% vs 71%) but trail by 9 percentage points on contextual judgement.
  - On Mercor's evaluations, models reach 67% on one-shot closed tasks and 24% on multi-step workflows.
  - In research engineering, models score 4× human experts over 2-hour sprints but half as much over 32–48-hour projects.
  - (§7.2, p. 51)
  - The authors predict "the rise of smaller firms, and existing firms will adjust primarily through workforce composition rather than scale" (§7.2, p. 52).
  - The essay describes today's labour market as "not mass unemployment or sudden AI monopolies, but leaner startups, flatter org charts, softer hiring in entry-level roles closest to benchmark tasks, and steady or rising demand for experienced people who can direct complex work across teams" (essay, “Seeing the future”).

## How the economy works

### GDP growth and productivity
- Reproducible AI "expands output and lowers its price" (§2.3, p. 10). In the example, niche-market output goes from unserved in the human-only economy to 65.26 units (§2.2, p. 6; Table 4, p. 105).
- Deep-market output grows in proportion to market size, because AI firms replicate (Appendix E.2, pp. 103–104).
- No GDP or productivity growth rates are given.
- The essay says "wages and job roles—not headline GDP or industry concentration—remain the earliest signals of change" (essay, “Seeing the future”).

### Labour market dynamics
- **Employment:** "Headcounts stay intact" (essay, “Minimal AGI”). In the example, all fourteen humans (twelve specialists and two coordinators) remain employed, and unemployment is zero (§2.3, p. 10; Figure 4; Table 4, p. 105).
- **Wages:**
  - In the example, specialist wages fall from 4.15 (human-only economy) to 2.90 and coordinator wages from 2.41 to 1.30. Wages are in units of output, with one AI copy costing 1 and the outside option at 0.25 (§2.3, p. 10; Table 4, p. 105).
  - "Human skill combinations retain value, but AI supply reduces human scarcity rents" (§2.3, p. 10).
  - The essay puts it differently: workers whose skills AI matches see wages decline toward the cost of compute, while "specialists and human coordinators can demand even higher wages than before" (essay, “Minimal AGI”). *[Inference: the essay's claim of rising specialist and coordinator pay differs from the paper's numerical example, where both fall.]*
- **Reallocation:** some specialists move from human-only firms into AI firms in the deep market (Appendix E.4, p. 104).
- **Applies across the set (current evidence):**
  - Junior employment in exposed occupations has fallen 7.7–19% through reduced hiring, and starting wages have dropped 4.2%. Senior employment and pay are stable or rising (§7.2, p. 52).
  - In the model, entry-level workers "map closest to the capabilities that machines can match, which leads their wages to be compressed first". Senior workers keep coordination advantages (§7.2, p. 52).
  - AI-native startups employ 25% fewer people and have about 15% lower shares of entry-level workers and managers (§7.2, p. 52).
  - Only 3–7% of time savings pass into pay (§7.2, p. 52).
  - Freelance platforms, "where coordination is least likely to play a role", show falls in job volume and earnings (§7.2, p. 52).

### Winners and losers
- Workers whose skills AI matches lose most, with wages pulled toward the cost of compute (essay, “Minimal AGI”).
- Consumers gain from lower goods prices (essay, “Minimal AGI”; §2.3, p. 10).
- Human teams of complementary specialists keep their place in deep markets (§2.3, p. 10).
- The essay names specialists and human coordinators as gaining. The paper's example shows both groups earning less than before AI, though still well above the outside option (§2.3, p. 10).
- Capital versus labour and AI providers' returns are not addressed.

### Household incomes and living standards
Not addressed. The source reports wages and goods prices but not household incomes. Lower goods prices are stated (essay, “Minimal AGI”).

### Government finances
Not addressed.

### International economic patterns
Not addressed.

### Market pricing and scarcity
- Reproducible AI lowers the deep-market output price to AI unit cost. In the example, the price falls from 0.3 (demand price in the human-only deep market) to about 0.202 (§2.3, p. 10; Appendix E.2, p. 103; Table 4, p. 105).
- The niche market becomes profitable to serve, with a niche price of 0.202 (Table 4, p. 105).
- Human expertise becomes less scarce because AI copies can be rented at compute cost (§2.3, p. 10).
- Industries "remain fragmented across many small to medium firms" (essay, “Minimal AGI”).
- Asset prices are not addressed.

### Financial markets and stability
Not addressed.

## Impact on the social contract

### Effort is rewarded
Not addressed.

### Affordable essentials
Not addressed. The source says AI drives "down the price of goods" in niche markets (essay, “Minimal AGI”), but it does not discuss housing, food, energy or care.

### Reliable safety net
Not addressed.

### Time for what matters
Not addressed.

### A say in your future
Not addressed.

### A fair share of progress
Not addressed.

## Other dynamics
- **Measurement:** *Applies across the set.* Benchmarks of individual agents are "misleading signals of economic transformation". "a model might beat every individual on average but still lose the market" (§8, p. 53). The essay says solo-agent leaderboard scores "overstate how well the models compete against complementary human teams" (essay, “Seeing the future”).
- **Safety and alignment:** *Applies across the set.* "Scaling interacting swarms without tight organizational control can also trigger alignment breakdowns". The July 2026 incident is cited (§2.3, pp. 9–10).
- **Collective intelligence:** organisations are described as "a form of superintelligence" (essay, introduction). The paper links its view of organisations as collective superintelligence to Bostrom (2014) (§2, p. 15).

## Key figures
| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |
| AI task skills in minimal AGI example | 59/35 ≈ 1.69 | competence index (= human average) | model | Table 4, p. 105 |
| AI coordination in minimal AGI example | 547/700 ≈ 0.78 | coordination index (threshold = 1) | model | Table 4, p. 105 |
| Preferred pure-AI firm size | ≈ 7 (7.00654) | AI copies | model | §2.3, p. 10; App. E.4, p. 104 |
| AI output per copy at preferred size | 4.95 | output units | model | App. E.4, p. 104 |
| AI unit cost / deep- and niche-market price | 0.202 | output price (compute cost r = 1) | model | App. E.4, p. 104; Table 4, p. 105 |
| Deep-market price without AI | 0.3 | output price | model | §2.1, p. 6 |
| Specialist wage, human-only vs minimal AGI | 4.15 → 2.90 | wage (outside option 0.25) | model | §2.3, p. 10; Table 4, p. 105 |
| Coordinator wage, human-only vs minimal AGI | 2.41 → 1.30 | wage (outside option 0.25) | model | §2.3, p. 10; Table 4, p. 105 |
| Humans employed | 14 of 14 (12 specialists, 2 coordinators) | workers | model | Figure 4, p. 10; Table 4, p. 105 |
| Niche-market output | 65.26 | output units | model | Table 4, p. 105 |
| Specialists in AI firms (deep market) | ≈ 6.86 of 12 | workers | model | App. E.4, p. 104 |
| Within-firm displacement path (w = 1) | 4.58 → 0 specialists as AI skills 3 → 3.3 | workers | model | §2.4, p. 13 |
| Between-firm displacement threshold (w = 1) | 12 → 0 specialists at AI coordination 0.8521 | workers | model | §2.4, p. 13; App. E.5, p. 106 |
| Gain from complementary pairing in quiz | 32% | complementary vs random pairs | 2026 | essay, “Jagged agents, mosaic organizations” |
| Multi-agent LLM failure rate | 41–87% | share of benchmark tasks | 2025 | §2.3, p. 9 |
| AI team scaling exponent | 0.48–0.68 | γ_M (< 1 = subcritical) | 2026 | §7.2, p. 51 |
| Fall in junior employment in exposed occupations | 7.7–19% | employment | 2026 | §7.2, p. 52 |
| Fall in starting wages | 4.2% | wages | 2026 | §7.2, p. 52 |
| AI-native startups' headcount | 25% fewer | vs same-cohort peers | 2026 | §7.2, p. 52 |

## Key quotes
| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
| "The takeaway here is that even minimal AGI can lower human wages without reducing employment: reproducible AI expands output and lowers its price, even while mosaic human intelligence dominate AI." | wages, employment | §2.3, p. 10 |
| "Human skill combinations retain value, but AI supply reduces human scarcity rents." | wages | §2.3, p. 10 |
| "At first glance, almost nothing structurally changes in the economy." | market structure | essay, “Minimal AGI” |
| "Headcounts stay intact and industries remain fragmented across many small to medium firms." | employment, market structure | essay, “Minimal AGI” |
| "Workers whose skills are matched by AI will see their wages decline toward the cost of compute, while specialists and human coordinators can demand even higher wages than before." | wages | essay, “Minimal AGI” |
| "because wage effects arrive before organizational restructuring, macro statistics of employment rates provide poor evidence that AI is not having an effect on the economy." | measurement | essay, “Minimal AGI” |
| "When AI is more capable than the average human, organizations of complementary humans can nonetheless outperform AI." | mosaic intelligence | Abstract |
| "As we take pains to emphasize throughout the paper, these scenarios are not empirical forecasts but outcomes based on the model’s assumptions." | framing | p. 1, fn. 1 |
| "no big effects on employment or market structure, but leaner startups, flatter org charts, and steady or rising demand for experienced managers who can direct complex work across teams." | current evidence | §1, p. 2 |
| "competence reshapes the economy gradually, whereas coordination abruptly transforms it." | mechanism | essay, “Competence sets the level but coordination sets the scale” |
