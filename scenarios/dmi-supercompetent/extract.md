# Supercompetent AI — extract

## Summary
AI outperforms every human expert on every task skill but stays at or below the coordination threshold, so teams of AI agents still face diminishing returns as they grow (§2.3, pp. 8, 10–11; essay, “Supercompetent AI”). Surprisingly, there is still little structural transformation. Coordination still caps how big an organisation can get, so firms become far more productive without getting larger. Headcounts and firm scale likely shrink, and industries stay competitive across many lean firms (essay, “Supercompetent AI”; §2.3, pp. 10–11). Goods and services become cheap and abundant, giving "abundance without concentration" (essay, “Supercompetent AI”). Inside firms, roles flip:
- Pay for standalone specialist work falls, because AI does it at the cost of compute.
- Human coordinators who direct teams of AI agents become relatively more valuable.
- Specialists move into niche markets, while coordinators work with AI in deep markets.
(§2.3, pp. 10–11; essay, “Supercompetent AI”)

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
  - The paper also names "weak AI" (dominated by the convex hull of human capabilities) and "minimal AGI" (within that hull) (§4.3, p. 26).
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
  - The paper "does not represent corporate forecasts, product roadmaps, or empirical statements regarding Google’s current or future operations" (cover page). The essay is labelled a "conversation starter" that does not represent Google's official view (essay, "Disclaimer").
- **Authors' view of likelihood:**
  - Not stated for this regime.
  - The authors say current models "already match or outperform experienced specialists on self-contained deliverables" while coordination lags (essay, “Seeing the future”). They read the evidence as AI with "jagged domain competence—often exceeding human experts—alongside subcritical coordination capabilities" (§7.2, p. 51). *[Inference: they describe the current direction of progress as mostly along the competence axis, toward this regime, but do not say when or whether it is reached.]*

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
  - Firm-level datasets should measure total organisational scale (worker rolls plus rented compute) and track human payroll relative to AI expenditure (§8, p. 53).
  - Statisticians should track the cross-sectional distribution of firms, to see "whether markets are becoming dominated by AI-only or AI-native firms" (§8, p. 53).
  - Employer-employee panels should test how workers with different skill profiles sort across firms, separating the technology effect from the reorganisation effect (§8, p. 53).
  - The essay calls for "benchmarks for organizations of agents", covering division of unfamiliar problems, clean handoffs and error-catching. It also calls for economic statistics "tracking both payroll and compute spending" (essay, “Seeing the future”).

## Key dynamics explored
*Applies across the set*
- **Reproducibility removes scarcity rents.** Human capabilities are in fixed supply, which generates Ricardian scarcity rents. AI capabilities can be copied at the cost of compute, which eliminates these rents (p. 1). "whenever a model can match human capability, human wages become tied to the cost of compute" (essay, “How AI differs from humans”).
- **Mosaic intelligence lets human teams beat more competent AI.** Humans are jagged in different directions, while AI copies share the same jaggedness. Sorting complementary specialists into firms lifts team competence above any member (from 1.8 to 5 in the example) (p. 1; §2.2, p. 7; essay, “Jagged agents, mosaic organizations”).
- **Competence sets the level; coordination sets the scale.** Higher competence shifts output per worker up and leaves best firm size unchanged. Better coordination moves the best size up. In the example, m*(ȳ*) = φ/(1 − ȳ*) − 1 (§2.1, p. 5).
  - Competence gains that raise productivity proportionally at every size "make firms more productive without driving larger firms". Changes in preferred size are driven solely by mean coordination (§5.2, pp. 31–32).
- **The Coasean ceiling.** Human organisations hit decreasing returns because of finite attention and memory, tacit knowledge lost in handoffs, and private career incentives (§2.1, p. 5). Below the coordination threshold, large markets are served by replicating bounded firm recipes, so firms stay small relative to the market (Proposition 3(i), p. 33).
- **Wages are set by firms' bids relative to a machine.**
  - A firm's bid for a worker equals the machine costs that worker saves, and all bids pass through the AI's capability point at price r (Theorem 2, pp. 37–39).
  - Workers sort by comparative advantage relative to AI (Theorem 2(ii), pp. 39–40).
  - A firm bids above the machine rental price exactly when the worker's weighted sum of capability advantages over the AI is positive (p. 40).
- **Gradual versus sudden displacement.** Within-firm displacement in mixed firms is continuous. Across-firm displacement, where firms are segregated into human-only and AI-only, can be discontinuous (Abstract; Proposition 5, pp. 41–42).
- **The reorganisation effect.** Wage changes split into a technology effect and a reorganisation effect, and the second "can reverse the technology effect on wages" (Abstract; Proposition 6, pp. 43–44).
- **The task model is a special case.** It is the constant-returns special case (Theorem 3, pp. 46–47). With scale effects, a human coordination advantage "can cover a shortfall in task productivity" (p. 48).
- **Competence moves the economy gradually.** Competence "reshapes the economy gradually, whereas coordination abruptly transforms it" (essay, “Competence sets the level but coordination sets the scale”).

*This scenario*
- **Coordination still caps firm size.** Output per AI copy rises in proportion to competence, but preferred AI firm size stays at about seven copies (Figure 5(a), pp. 10–11). "Even when no team of human specialists can surpass the model on individual tasks, coordination still caps how big an organization can get without falling apart" (essay, “Supercompetent AI”).
- **Firms get more productive and leaner, not bigger.** Better AI task skills "lower production costs without increasing best AI firm size" (§2.3, p. 11). Firms "become far more productive without getting larger; in fact, headcounts and scale likely shrink" (essay, “Supercompetent AI”). Industries stay competitive across many lean firms (essay, “Supercompetent AI”).
- **Coordination becomes the scarce human skill.** A human coordinator raises the output of increasingly capable AI copies. Coordination therefore becomes valuable relative to task expertise, and coordinators work with AI in the deep market (§2.3, pp. 10–11; Figure 22, p. 40).
  - "Humans can earn more than a ‘supercompent’ AI—that far exceeds humans in every domain d = 1, 2, . . . n—if their coordination advantage is valuable enough" (§6.1, p. 40).
  - "Someone who sets direction and keeps the whole effort aligned multiplies the output of a team of supercompetent AI agents" (essay, “Supercompetent AI”).
- **Specialists retreat to niche markets.** AI handles standalone specialist work at compute cost, so "pay for routine specialist tasks gradually declines" (essay, “Supercompetent AI”). Human specialists form balanced teams in the niche market (§2.3, p. 10).
- **People stay in production in new roles.** "People do not vanish from production; their comparative advantage shifts toward judgment, orchestration, and creating the architecture for effective coordination" (essay, “Supercompetent AI”).
- **Illustration along the competence path (Figure 22).** As AI competence rises from 4 to 12 with AI coordination fixed at 0.2:
  - Human coordinators move from human teams into AI teams.
  - Productive humans leave employment.
  - Coordinators remain employed above their outside wage, and both human wages fall (§6.1, p. 40, fn. 28).
  - *[Inference: this path ends in supercompetent territory (AI task skills above the best human's 6), though its AI coordination is below the minimal-AGI band.]*
- **Competence-only progress in the task-model variant (Figure 29).** AI moves from better on half of 100 tasks to better on all 100, with coordination fixed at 0.4 (§7.1, pp. 49–50):
  - Firm sizes stay indeterminate or atomless.
  - Wages have "the familiar hump shape where first the productivity effect dominates before the displacement effect dominates".
  - Panel labels show humans working falling from 100/100 to 0/100 when AI is better on every task.
  - *[Inference: mapping Figure 29's endpoint to this regime is the extractor's.]*

## State of technology
- **Capability:**
  - AI "exceeds every human on both tasks while remaining below or at that coordination threshold" (§2.3, p. 8).
  - In the example, AI task skills are 12 in both coding and writing, against a best human of 9. AI coordination is 547/700 ≈ 0.78, the human average, and output per AI copy is 35.22 at preferred size 7.01 (§2.3, p. 10; Appendix E.4, pp. 104–105; Table 4, p. 105).
  - In the general model, the AI is more competent than every human in every productive domain: y_d^M > max_i y_d^i (§4.3, p. 26).
  - The essay defines it as AI systems that "outperform every human expert at every capability except coordination" (essay, “Supercompetent AI”).
- **Why coordination stays limited (current evidence):**
  - Multi-agent LLM systems fail on 41–87% of benchmark workflows.
  - Adding agents lowers performance by 39–70% on sequential planning, and swarms amplify upstream errors up to 17.2 times.
  - (§2.3, p. 9)
  - Measured AI team scaling has γ_M ∈ [0.48, 0.68] (§7.2, p. 51).
- **Provision and cost:**
  - Machines are copied without limit at rental cost r, with r = 1 per copy (§3, p. 16; §2.1, p. 3).
  - The deep-market unit cost falls to about 0.028, against 0.202 under minimal AGI (Appendix E.4, p. 105).
  - Provider market structure, open versus closed models, energy and robotics are not modelled. Robotics is listed among possible competence domains (p. 2).

## State of adoption
- **Inside the scenario:**
  - Deep-market production is done by AI firms of about seven copies, with the two human coordinators working across these firms (Figure 4, p. 10; Appendix E.4, p. 105).
  - The niche market employs all twelve specialists in two balanced human firms of six, plus a small AI firm (size 5.18, activity weight 0.087). The preferred deep-market AI recipe does not fit in the niche (Appendix E.4, p. 105).
  - Adoption is decided by cost-minimising competitive firms. No barriers are modelled.
- **Applies across the set (current evidence):**
  - On GDPval (44 occupations), frontier models tie or beat seasoned professionals on 48–71% of bounded deliverables.
  - Legal AI tools beat lawyers on research accuracy (80% vs 71%) but trail by 9 percentage points on contextual judgement.
  - Mercor evaluations show 67% on one-shot tasks against 24% on multi-step workflows.
  - In research engineering, models score 4× human experts over 2-hour sprints but half as much over 32–48-hour projects.
  - (§7.2, p. 51)
  - The authors predict "the rise of smaller firms, and existing firms will adjust primarily through workforce composition rather than scale" (§7.2, p. 52).
  - AI-native startups employ 25% fewer people and have about 15% lower shares of entry-level workers and managers. They run flatter hierarchies (§7.2, p. 52).

## How the economy works

### GDP growth and productivity
- Firms "become far more productive without getting larger" (essay, “Supercompetent AI”).
- In the example, niche output rises to 181.0 units, against 65.3 under minimal AGI. Output per AI copy is 35.22, against 4.95 under minimal AGI (Table 4, p. 105; Appendix E.4, pp. 104–105).
- No GDP or productivity growth rates are given.

### Labour market dynamics
- **Employment:** in the example, all twelve specialists and both coordinators are employed, and unemployment is zero (Figure 4, p. 10; Table 4, p. 105).
- **Wages:**
  - Specialist wages fall to 0.39 and coordinator wages to 0.48. Under minimal AGI they were 2.90 and 1.30, and in the human-only economy 4.15 and 2.41. The outside option is 0.25 (§2.3, p. 11; Table 4, p. 105).
  - "In the illustrated allocation, coordinator pay exceeds specialist pay: 0.48 versus 0.39" (§2.3, p. 11).
  - The coordinator's limiting wage is 1/12 + (0.97 − 0.78)·log(1 + 7.01) ≈ 0.476 (Appendix E.4, p. 105). *[Inference: following Proposition 7 (p. 48), the first term is the coordinator's task skill relative to the AI's (1 vs 12), and the second is the coordinator's coordination advantage over the AI at the machine-only firm size.]*
- **Reallocation:** specialists move to the niche market and coordinators move into AI firms in the deep market (§2.3, pp. 10–11).
- **Headcounts:** the essay says "headcounts and scale likely shrink" (essay, “Supercompetent AI”).
- **Applies across the set (current evidence):**
  - Junior employment in exposed occupations has fallen 7.7–19% and starting wages by 4.2%, while senior employment and pay are stable or rising (§7.2, p. 52).
  - In the model, entry-level workers are closest to machine capabilities and see wages compressed first, while senior workers keep coordination advantages (§7.2, p. 52).

### Winners and losers
- **Relative winners:** human coordinators and managers, who direct AI teams. Their comparative advantage shifts toward "judgment, orchestration, and creating the architecture for effective coordination" (essay, “Supercompetent AI”; §2.3, p. 11).
- **Relative losers:** specialists in routine standalone tasks (essay, “Supercompetent AI”). In the example, both groups' wages fall sharply in absolute terms compared with minimal AGI (Table 4, p. 105).
- **Consumers:** gain from cheap and abundant goods and services (essay, “Supercompetent AI”).
- **Firms:** markets stay competitive and no firm comes to dominate (essay, “Supercompetent AI”).
- Capital versus labour is not addressed.

### Household incomes and living standards
Not addressed. The essay says "goods and services grow cheap and abundant" (essay, “Supercompetent AI”) but does not discuss household incomes.

### Government finances
Not addressed.

### International economic patterns
Not addressed.

### Market pricing and scarcity
- Goods and services become "cheap and abundant" (essay, “Supercompetent AI”).
- In the example:
  - The niche internal price is 0.0286 (demand price 0.0285) and the deep-market price 0.0284. Under minimal AGI the price was 0.202 (Table 4 and Appendix E.4, p. 105).
  - The niche internal price is above the deep-market price because the preferred deep AI recipe does not fit in the niche (Appendix E.4, p. 105).
- What becomes scarce is human coordination: better AI task skills "change which human skills are scarce" (§2.3, p. 11).
- Markets stay unconcentrated, giving "abundance without concentration" (essay, “Supercompetent AI”).
- Asset prices are not addressed.

### Financial markets and stability
Not addressed.

## Impact on the social contract

### Effort is rewarded
Not addressed.

### Affordable essentials
Not addressed. The essay says "goods and services grow cheap and abundant" (essay, “Supercompetent AI”) but does not discuss housing, food, energy or care.

### Reliable safety net
Not addressed.

### Time for what matters
Not addressed.

### A say in your future
Not addressed.

### A fair share of progress
Not addressed.

## Other dynamics
- **Measurement:** *Applies across the set.* Benchmarks of individual competence "can be misleading signals of economic transformation". An economy far from its coordination tipping point "can absorb dramatic gains without substantial reorganization of firms" (§8, p. 53). *[Inference: the authors' warning about absorbing large gains without reorganisation describes this regime's pattern, but they do not name the regime there.]*
- **Safety and alignment:** *Applies across the set.* Scaling interacting swarms without tight organisational control "can also trigger alignment breakdowns". The July 2026 incident is cited (§2.3, pp. 9–10).
- **Collective intelligence:** organisations are described as "a form of superintelligence" (essay, introduction; p. 15).

## Key figures
| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |
| AI task skills in supercompetent example | 12 (best human 9) | competence index | model | §2.3, p. 10; Table 4, p. 105 |
| AI coordination in supercompetent example | 547/700 ≈ 0.78 | coordination index (threshold = 1) | model | Table 4, p. 105 |
| Preferred pure-AI firm size | ≈ 7 (7.00654) | AI copies | model | §2.3, p. 10; App. E.4, p. 105 |
| AI output per copy at preferred size | 35.22 | output units | model | App. E.4, p. 105 |
| Specialist wage | 0.39 (0.39428) | wage (outside option 0.25; compute cost 1) | model | §2.3, p. 11; Table 4, p. 105 |
| Coordinator wage | 0.48 (0.47561) | wage (outside option 0.25) | model | §2.3, p. 11; Table 4, p. 105 |
| Human-only economy wages (specialist / coordinator) | 4.15 / 2.41 | wage | model | §2.2, p. 8 |
| Humans employed | 14 of 14 | workers | model | Figure 4, p. 10; Table 4, p. 105 |
| Niche-market output | 181.005 | output units | model | Table 4, p. 105 |
| Niche internal / demand price | 0.028620 / 0.028493 | output price | model | Table 4, p. 105 |
| Deep-market price | 0.028392 | output price | model | App. E.4, p. 105 |
| AI firm in niche | size 5.18, activity 0.087 | AI copies / activity weight | model | App. E.4, p. 105 |
| Competence-path illustration | AI competence 4 → 12; productive humans exit | competence index | model | Figure 22, p. 40 |
| Frontier models tying or beating professionals (GDPval) | 48–71% | share of bounded deliverables | 2025 | §7.2, p. 51 |
| Mercor expert evaluations | 67% one-shot vs 24% multi-step | task success | 2025–26 | §7.2, p. 51 |

## Key quotes
| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
| "The basic economic takeaway here is that better AI task skills lower production costs without increasing best AI firm size. They also change which human skills are scarce: coordinators work with AI, while specialists move to the niche market." | market structure, wages | §2.3, p. 11 |
| "In the illustrated allocation, coordinator pay exceeds specialist pay: 0.48 versus 0.39" | wages | §2.3, p. 11 |
| "Surprisingly, there is still little structural transformation." | market structure | essay, “Supercompetent AI” |
| "Introducing supercompetent AI means that firms become far more productive without getting larger; in fact, headcounts and scale likely shrink." | firms, employment | essay, “Supercompetent AI” |
| "Industries stay competitive across many lean firms, goods and services grow cheap and abundant, and the economy delivers something counterintuitive: abundance without concentration." | market structure, prices | essay, “Supercompetent AI” |
| "Because AI can handle standalone specialist work at the cost of compute, pay for routine specialist tasks gradually declines." | wages | essay, “Supercompetent AI” |
| "People do not vanish from production; their comparative advantage shifts toward judgment, orchestration, and creating the architecture for effective coordination." | jobs | essay, “Supercompetent AI” |
| "That is, competence gains make firms more productive without driving larger firms, i.e., the direct effect is zero." | mechanism | §5.2, p. 32 |
| "As we take pains to emphasize throughout the paper, these scenarios are not empirical forecasts but outcomes based on the model’s assumptions." | framing | p. 1, fn. 1 |
| "competence reshapes the economy gradually, whereas coordination abruptly transforms it." | mechanism | essay, “Competence sets the level but coordination sets the scale” |
