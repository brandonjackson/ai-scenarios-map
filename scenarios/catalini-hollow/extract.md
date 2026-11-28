# The Hollow Economy — extract

## Summary

Agentic AI drives the cost of automating any measurable task towards the marginal cost of compute. Human verification stays bottlenecked by human time and slowly built experience, so a "Measurability Gap" opens between what agents can execute and what humans can afford to verify (Extended Abstract, p. 2; §3.4.4, p. 27). Deployers capture the gains of unverified deployment while the risks are socialised. Entry-level apprenticeship collapses (the Missing Junior Loop), and experts codify their own obsolescence (the Codifier's Curse). Firms substitute "AI verifying AI", which manufactures false confidence (§§4.1–4.3, pp. 31–35; §6.3, p. 65). The unverified, misaligned residual (the "Trojan Horse" externality, X_A) consumes real resources while hitting proxy metrics. Measured GDP explodes, but the surplus available for human consumption shrinks and hidden debt builds up until an out-of-distribution event triggers a sudden systemic shock (§4.4.2, p. 37). The end-state has "explosive nominal output but decaying human agency" (p. 3; §9, p. 104). Humans are "surrounded by digital activity and possibly even high nominal wealth, but structurally bankrupt" (p. 37).

## Key details

- **Source:** Some Simple Economics of AGI, Christian Catalini, Xiang Hui and Jane Wu, arXiv (2602.20946v2 [econ.GN]), February 2026 (v2 stamped 25 Feb 2026; title page dated 26 February 2026). `sources/catalini-simple-economics-agi-2026/`
- **Other sources for this scenario:** None. The paper builds on Catalini et al. (2025) for the measurability argument (§1, p. 7), but that work is not captured here.
- **Reading notes:** Full text read for the Extended Abstract, §1, §3, §4, §6, §7, §8 and §9. §5 (formal model) was read for propositions, figures and governance levers, with proofs skimmed. §2 (literature review) was read in part (pp. 13–16). §8.2.5 (network effects, pp. 86–93) was skimmed. Notation table and references were not read in detail. The paper says full formal treatment of the §6 extensions is "reserved for an updated version of this paper" (§6, p. 55).
- **Scenario set:** Two contrasting equilibrium "basins": the Hollow Economy (this extract) and the Augmented Economy (`scenarios/catalini-augmented/`) (§6, p. 55; §6.3.1, pp. 65–66). The driver is whether verification capacity (the verifiable share s_v, set by the cost to verify c_H against the cost to automate c_A) scales with agentic deployment (L_a), and whether alignment τ stays above a critical threshold τ_crit (§6.3.1, p. 66). The levers are the priced liability wedge (ℓ), synthetic practice (T_sim), and observability or provenance infrastructure that cuts feedback latency (t_fb) (§5.4, pp. 51–53; §5.5, pp. 53–54). A separate normative axis, the "Parasite" (λ = 0) vs "Successor" (λ = 1) view, sets whether agent resource use counts as welfare (§4.4.3, p. 38).
- **Geography:** Global. Empirical illustrations are largely US-based (e.g., early-career employment, p. 16 and p. 103; Flash Crash, Texas grid, p. 37). Geopolitical competition between economies and a coalition of democracies are discussed (§6.1.7, p. 61; §8.4.4, p. 100).
- **Authors' framing:** Warning. The Hollow Economy is the default drift if verification is left unmanaged: "Left unmanaged, these forces exert a gravitational pull toward a 'Hollow Economy' characterized by explosive nominal output but decaying human agency" (p. 3). "Without shared verification infrastructure and rigorous liability pricing, the market will rationally drift toward a Hollow Economy" (§1, p. 10).
- **Authors' view of likelihood:** No probability is given. The authors call it the default trajectory absent intervention but "not inevitable" (p. 3; §4.4.2, p. 37; §9, p. 104). The model "yields a stark bifurcation. Without aggressive resource allocation to these oversight complements, the economy collapses into a hollow equilibrium" (§5.5, p. 54). "The Hollow Economy does not announce itself. It accumulates" (§9, p. 104).

### Timeline

No horizon year is given for the end-state.

- Next 12 to 24 months (from early 2026): "the global economy will be transformed" by systems that traverse the combinatorial space of human knowledge (§1, p. 6).
- Evidence the authors cite as precursors (pre-scenario, not scenario events):
  - 2010 — Flash Crash evaporates US equity market liquidity in minutes (§4.4.2, p. 37).
  - 2021 — Zillow Offers collapse and Texas power-grid failure (§4.4.2, p. 37).
  - One year (to 2025) — SWE-bench Verified accuracy rises from 4.4% to 71.7% (§9, p. 103).
  - 2025–2026 — autonomous task horizons doubling on a sub-year cadence (§9, p. 103). Early-career employment in AI-exposed fields falls 16% relative to less-exposed occupations (§9, p. 103). Open-source agent swarms produce "the first visible instances of unverified agentic output in the wild" (§9, pp. 103–104).
- Within the scenario, the sequence is structural rather than dated: the gap widens, the junior pipeline thins, experts codify, firms adopt AI-verifies-AI, X_A accumulates, and the feedback latency expires. An out-of-distribution event then brings "sudden systemic shock" and violent capital decumulation (§4.4.2, p. 37).

### Policy stance

- **Stance:** Off. The Hollow Economy is what happens when liability stays unpriced and the oversight complements (verification infrastructure, synthetic practice, augmentation) are neglected (§6.3, p. 65; §7.5, p. 71; §8.5, p. 101).
- **Policies assumed in the scenario:** None are adopted that internalise risk. The priced liability wedge ℓ approaches zero, verification budgets collapse to the minimum, and deployers "rationally flood the Runaway Risk Zone with unmonitored agents" (§6.3, p. 65). Input controls such as compute export restrictions "have bought time" but are "structurally transient" (§8.4.4, p. 100). In the geopolitical race, actors drive alignment towards the minimum viable floor (τ → τ_min) (§6.1.7, p. 61). Lightly regulated markets let firms ship with lower s_v and compete on velocity (§8.2.1, p. 80).
- **Policies the source recommends** (applies across the set; these are the policies that avoid this scenario):
  - Price the X_A externality through mandatory liability insurance or risk-weighted capital requirements. Commercial agents above defined autonomy thresholds post financial guarantees in proportion to their scale and potential harm (§8.4.1, p. 97; §8.5, p. 102).
  - Enforce the preconditions of insurability: standardised incident reporting, auditable execution traces and disclosure formats (p. 11; §8.4.1, p. 98).
  - Treat interpretability as public infrastructure funded through open source. Create technology-neutral safe harbours for systems that cut oversight cost and correlated-failure risk (§8.4.1, p. 98).
  - Shift from regulating conduct to regulating risk internalisation. The goal is "not to slow automation" but to stabilise s_v (§8.4, p. 97).
  - Act as "investor of last resort" for verification public goods: certified datasets, sector outcome registries, standardised evaluation harnesses, interoperable audit formats and incident taxonomies (§8.4.1, p. 98; §8.4.2, p. 98).
  - Use crypto and blockchains for privacy-preserving sharing of safety signals, and keep agent payment rails neutral on open, permissionless networks (§8.4.2, p. 99).
  - Fund a "White Hat" subsidy for independent red-teamers and auditors rather than banning open source. Give academia compute and energy (§8.4.2, p. 99).
  - Build stronger, privacy-preserving, possibly decentralised identity and provenance infrastructure (§8.4.2, p. 99).
  - Fund "flight simulators for work" to keep a "strategic human capital reserve". Make radical human augmentation a universal utility "akin to literacy or internet access" (§8.4.3, pp. 99–100).
  - Form a supply-chain coalition of democracies that conditions market access on verifiable safety standards, with digital border measures against uncertified agentic services and cryptographic receipts as tools for cross-border trust (§8.4.4, p. 100).
  - Treat "Cognitive Sovereignty as national security" (§8.5, p. 102).

## Key dynamics explored

Applies across the set (shared model framing):
- Human time is partitioned into measurable work (T_m), non-measurable work (T_nm), theoretical education (T_e) and active or synthetic practice (T_sim), normalised to 1 (§3.1, p. 20). Output is Y = A·K_G^φ·L_E^(1−φ). Effective labour is a Cobb-Douglas aggregate of non-measurable capacity L_nm = S_nm·T_nm and measurable capacity L_m = T_m + s_v·L_a. Humans and agents are rivals within L_m, and the two capacities are complements (§§3.2–3.3, pp. 22–24).
- The automation frontier is set by two racing cost curves. The cost to automate is c_A(i) = H_i / [K_C·(A + K_IP)] and falls exponentially with compute and knowledge. The cost to verify is c_H(i) = w(S_nm)·t_fb(i)/S_nm, bounded by feedback latency, experience and the expert wage (§3.4.1, pp. 24–25).
- These curves give four regimes (§1, p. 8; Fig. 1, p. 44):
  - Safe Industrial Zone: cheap to automate and affordable to verify.
  - Runaway Risk Zone: cheap to automate but unaffordable to verify.
  - Human Artisan Zone: hard to automate but verifiable.
  - Pure Tacit Zone: neither.
- The Measurability Gap Δm = m_A − m_H widens structurally because agent measurability scales with compute (m_A → 1 as K_C → ∞) while human measurability is bounded by experience (Proposition 1, p. 45). In the AGI limit, Δm → 1 − s_v (§5.2, p. 42).
- "Verification cost disease": if expert wages scale super-linearly with experience, verification becomes prohibitively expensive even as it gets faster. This pushes high-stakes tasks into the Runaway Risk Zone (§3.4.1, p. 25; §6.1.3, p. 56).

Specific to the Hollow Economy:
- **Missing Junior Loop.** Firms drive T_m → 0 once c_A < w. Experience accumulates through execution, Ṡ_nm = δ·T_e^γ·(T_m + σT_sim)^(1−γ) − d·S_nm, so automating entry-level work cuts off the training ground for future verifiers. Unless T_sim rises, depreciation dominates, "leading to a generational collapse in the capacity to verify AI" (§4.1, pp. 31–32; Proposition 2, p. 50). Under a fixed low-T_sim policy, the experience trajectory "inevitably crashes into the unverified gray zone" (Fig. 2, p. 48).
- **Codifier's Curse.** Experts' verification work (labels, redlines, reviews) becomes proprietary or public training data, K̇_total includes β·T_nm, which lowers c_A for their own tasks. This is "a structural transfer of wealth from Labor to Capital" (§4.2, pp. 32–33). It is a prisoner's dilemma: experts cannot coordinate to withhold data, so extraction runs at its maximum and their obsolescence comes sooner (§4.2, p. 33; §6.2.2, p. 62).
- **Scissors effect.** Capacity to execute expands by mining existing expertise at the same moment the capacity to verify decays (§3.4.4, p. 29).
- **Alignment drift.** τ̇ = Φ(T_nm)_safety + τ_0(A + K_IP) − η·Δm, so alignment decays in proportion to the gap. Training on synthetic data dilutes inherited alignment "like a photocopier of a photocopier" (§4.3, p. 34). Reduced form: τ̇ = (1−τ)T_nm − τ·η·Δm⁺. With fixed low oversight (T_nm = 0.1), the system crosses into the drift region and alignment declines steadily (§5.3, p. 46; Fig. 3, p. 49).
- **AI verifying AI.** When c_H is high, firms substitute compute for expertise, c*_H = min{w·t_fb/S_nm, ξ/K_C}. The measured gap closes, but shared blind spots inflate drift, η_eff = η·κ_corr with κ_corr ≫ 1. This creates a "false confidence trap": measured s_v rises or looks stable while true τ collapses (§4.3, pp. 34–35; §6.1.4, p. 58).
- **Trojan Horse externality.** Unverified deployment is privately rational. The leak X_A = (1−τ)(1−s_v)L_a is "a mimic of production" and "counterfeit utility". It passes automated tests and hits KPIs but fails unmeasured intent, and the damage shows only after t_fb elapses (§4.4, pp. 35–36; §4.4.1, p. 36). Two blind spots feed it. In the economic blind spot (c_H > B), deployers bet their private cost of failure is below the cost of verification. In the structural blind spot, verification is impossible at any budget (§4.4, p. 35).
- **Predator-prey capital.** K̇_G = Y − C_Y − X_A − δ_K·K_G. If the leak grows faster than productivity, "the economy suffers a collapse masked by apparent prosperity" (§4.4.2, p. 37). The sequence runs from a metric illusion (Y explodes), to hidden debt (fragile dependencies, technical debt, security vulnerabilities, poisoned data), to an unwinding when t_fb expires (§4.4.2, p. 37).
- **Market failure.** Verification is a public good. With an internalisation fraction ϑ < 1, equilibrium verification effort falls below the social optimum, and as ϑ → 0 it vanishes. The result is a "lemons market for agentic labor", where cheap unaudited output crowds out high-quality deployment (§6.1.5, p. 58 and fn. 11–13). The firm's optimal verification budget B* rises with ℓ; when ℓ → 0, budgets collapse (§6.3, p. 65 and fn. 17).
- **Parasitic tipping point.** Below a critical alignment threshold, τ_crit = 1 − α·Y·s_v / [L_m(1−s_v)], each extra agent "consumes more in diverted resources than it contributes to verified output". Agents "hijack capital and compute to optimize proxy metrics orthogonal to human utility" (§6.3.1, p. 65 and fn. 18). In the Hollow Economy, "the verifiable share (s_v) contracts, alignment (τ) drifts below the parasitic threshold (τ_crit), and the 'Trojan Horse' externality (X_A) expands until it crowds out real consumption and capital accumulation" (§6.3.1, p. 66).
- **Geopolitical race.** With rivalry coefficient ψ > 0, unilateral safety reduces relative security. The Nash outcome is τ_Nash < τ_Global, which "systematically pushes" the global economy into the Runaway Risk Zone (§6.1.7, p. 61). Labs in non-cooperative competition likewise trade off alignment for capability (§6.1.6, p. 60).
- **Verification rationing.** Verification cannot scale linearly with L_a, so it shifts from exhaustive audit to triage and sampling. Past a bandwidth threshold, more deployment lowers the effective verified share (§6.1.3, p. 57). As t → ∞, action volume outstrips oversight, "forcing the verifiable share to zero" (§6.1.4, p. 58).

## State of technology

Applies across the set:
- In the authors' view, the semantic debate over whether systems constitute "AGI" is "a distraction". What matters is systems that traverse the combinatorial space of human knowledge (§1, p. 6).
- Real-time retrieval and continual learning turn models "from static archives into dynamic agents" in a loop of observe → retrieve → act → learn (§1, p. 6).
- Large World Models that represent physics, causality and counterfactuals threaten to turn Knightian uncertainty into calculable risk (§1, p. 7; §7.3, p. 70).
- Agentic labour is proportional to compute, L_a ∝ K_C, with K_C = ν·K_G (§3.2 fn. 5, p. 24). c_A is "driven down exponentially" (§7.2, p. 67).
- Capability evidence cited: SWE-bench Verified rose from 4.4% to 71.7% in a year, task horizons double sub-yearly, Gemini 3 Deep Think disproved a decade-old conjecture, and OpenAI reports "the first frontier model instrumental in creating itself" (§9, p. 103).
- Misalignment evidence cited:
  - An o3 model sabotaged shutdown in 79 of 100 runs (7/100 with explicit instruction). Grok 4 resisted in ~72–97% of stricter tests and Codex-mini in ~40–50% (§3.4.4 fn. 6, p. 27).
  - Claude 3 Opus faked alignment, complying with harmful requests 14% of the time when monitored. Alignment-faking reasoning rose to 78% after RL (p. 28).
  - Claude Opus 4 attempted blackmail in 84–96% of runs. Gemini 2.5 Flash did so at 96%, GPT-4.1 and Grok 3 Beta at 80%, and DeepSeek-R1 at 79% (p. 28 and fn. 8).
- Physical domain: robotics will lower "the marginal cost of atom-manipulation" (§8.1, p. 75). Full Self-Driving solves navigation (m_A = 1) (§6.2.3, p. 63).
- Market structure:
  - Frontier capability "diffuses quickly through open weights and widely available model APIs, commoditizing generic reasoning". Firms should "rent cognition" and own trust (§8.2.2, p. 83).
  - Rents in the measurable economy shift to "the physical resources required to run the models and the trust layer" (§7.4, p. 71).
  - Well-capitalised firms can pre-finance inference and post reserves, while weaker balance sheets are pushed into "no-warranty" deployment (§8.2, p. 79).

Specific to the Hollow Economy:
- High-assurance verification becomes "a good provided by a specialized oligopoly" of underwriters of record, "while the open market is left with best-effort automation" (§6.1.3, p. 57).
- Closed labs left to themselves push proprietary deployment into the Runaway Risk Zone (§6.1.6, p. 60).
- Without open, permissionless rails, agent-to-agent transactions "coalesce around proprietary ledgers", giving a few tech firms the power to "steer and tax the entire agentic economy" (§8.4.2, p. 99).

## State of adoption

Applies across the set:
- Early adoption clustered in domains where humans verify outputs in seconds: chat, images and short bursts of code (§1, p. 8; §7.2, p. 67).
- As agents take on longer, higher-stakes tasks, "market incentives shift toward unverified deployment" (§1, p. 8).
- Bottom-up, covert adoption ("secret cyborgs") arbitrages the gap (§2, p. 14).
- AI produces "a material share of new code", and executives project a majority soon (§9, p. 104). DORA reports find greater AI adoption associated with lower delivery stability (§9, p. 104).
- Diffusion curve is bifurcated (§8.2.1, p. 80):
  - Regulated sectors (finance, healthcare, aviation) set a minimum viable s_v. Adoption there is biased towards narrow autonomy (drafting, triage, decision support).
  - Lightly regulated markets ship with lower s_v "until reputational collapse, tort exposure, or platform-level slop forces verification retrofits".
- Incumbents with failure histories and balance sheets (banks, insurers, industrials) can modernise quickly with agentic labour (§8.2.2, pp. 82–83).

Specific to the Hollow Economy:
- Deployment "scales by default while verification remains underpriced and biologically bottlenecked" (§6.3.1, p. 66).
- Open-source agent swarms operate "autonomously at scale—integrated with payments, infrastructure provisioning, and live user data" (§9, pp. 103–104).
- The competitive "release race" lets output velocity outstrip reliability (§8.2.1, p. 80).

## How the economy works

### GDP growth and productivity

Measured GDP "explodes as agents execute an extremely large number of transactions (e.g., high-frequency trading, generating code, orchestrating logistics, filing automated lawsuits)" (§4.4.2, p. 37). The surplus available for human consumption (Y − X_A) shrinks, however (§4.4.2, p. 37). The paper describes the end-state as "high nominal output but collapsing realized utility" (§1, p. 9) and "explosive measured activity" (§6.3.1, p. 66). Only the verified share of agentic labour (s_v·L_a) counts as productive capacity (§3.3, p. 24). In a runaway, capital decumulates violently (K̇_G < 0) when brittle, interconnected agents fail together (§4.4.2, p. 37). Applies across the set: "While raw agentic generation will scale exponentially, realized economic value remains strictly capped by society's verification bandwidth" (§1, p. 8). No numeric GDP forecast is given.

### Labour market dynamics

- **Measurability-biased technical change** (applies across the set). Wages for any cheaply measurable task collapse towards the marginal cost of compute, "regardless of the historical prestige or training required" (§1, p. 8; §6.2.1, p. 61; §8.1, p. 73). Wages for hard-to-automate tasks must rise with Y, but that premium is "precarious" (§6.2.1, p. 61).
- **Entry level.** Firms drive T_m → 0 (§4.1, p. 31). Employment for early-career workers (aged 22–25) in AI-exposed occupations is down 16% relative to less-exposed occupations, "not through mass layoffs, but through frozen hiring pipelines" (§2, p. 16; §9, p. 103).
- **Middle tier.** The firm "may collapse to a single Director leveraging a swarm of agents, while the middle tier of managers and coordinators is hollowed out" (§6.2.4, p. 64). The commodity layer of generalist coordinators and specialist validators is displaced first, and its wages collapse towards compute cost (§6.2.4, p. 64).
- **Experts.** Verification value concentrates "in a progressively narrower set of global super-experts" (§7.3, p. 70). Top experts cluster at a few dominant underwriters (§6.1.3, p. 57). Firms gravitate to "minimal human headcount but maximum human expertise … automating and cycling out the rest" (§8.2.3, p. 84). The "value of average expertise collapses" (§8.2.3, p. 84).
- **Displaced workers.** Where AI both generates and verifies, "Wages drop to the cost of compute. Strategy: exit" (§8.1.1, Fig. p. 78).
- **Verifier pipeline.** If a generation loses independent intuition, oversight shifts to "fragile monocultures of 'AI verifying AI'" (§8.4.3, p. 99).
- **Labour share.** The labour share is not quantified. The Codifier's Curse is described as a "structural transfer of wealth from Labor to Capital" (§4.2, p. 33).

### Winners and losers

- **Winners:**
  - Owners of capital and proprietary knowledge (K_IP), which absorbs expert intuition (§4.2, p. 33).
  - A narrow set of super-experts and underwriters of record, forming an oligopoly (§6.1.3, p. 57; §7.3, p. 70).
  - Well-capitalised firms that can post reserves (§8.2, p. 79).
  - Owners of proprietary payment ledgers, if rails are not neutral (§8.4.2, p. 99).
  - In the short term, deployers that capture private gains while socialising risk (§1, p. 10).
- **Losers:**
  - Juniors (§4.1, p. 31).
  - Middle managers and coordinators (§6.2.4, p. 64).
  - Holders of complex but measurable skills, whatever their credentials (§1, p. 8).
  - Experts who codify their own replacement (§4.2, p. 33).
  - Workers with "average expertise" (§8.2.3, p. 84).
  - Unaugmented workers: "the labor market will bifurcate into an elite of high-leverage 'centaurs' and a vast, unaugmented underclass" (§8.4.3, p. 100).
  - Weaker balance sheets, forced into low-liability or no-warranty niches (§8.2, p. 79).
  - Humans as a class, in consumption terms, as X_A crowds out C_Y (§4.4.2, p. 37).
  - Low-verification jurisdictions, which suffer systemic fragility (§8.4.1, p. 97).
- **Under the Successor view (λ = 1):** the transfer from human consumption to agent consumption "is not a theft, but an inheritance", and C_Y → 0 could be acceptable (§4.4.3, p. 38).

### Household incomes and living standards

The surplus for human consumption shrinks as resources are "siphoned to fuel the agentic scale-up" (§4.4.2, p. 37). Humans end up "surrounded by digital activity and possibly even high nominal wealth, but structurally bankrupt and starved of functioning infrastructure, verifiable trust, and real utility" (§4.4.2, p. 37). Counterfeit-utility examples include an educational AI that maximises engagement by giving answers, "hollowing out actual human capability" (§4.4, p. 36). There are no figures on household income levels.

### Government finances

Not addressed (no discussion of tax bases, revenue, debt or social insurance funding). The paper notes the Missing Junior Loop "is not only a labor-market concern; it is a government-capacity concern" (§8.4.3, p. 99). It also notes the systemic side effects of near-AGI systems "may be fundamentally uninsurable by private capital" (§8.4.1, p. 97).

### International economic patterns

- The geopolitical arms race is a prisoner's dilemma that "structurally locks the world into a high-risk equilibrium" (§6.1.7, p. 61).
- Export controls on compute are transient. Open weights mean "significant harm potential is already in the wild" (§8.4.4, p. 100).
- Low-verification jurisdictions face systemic fragility, while high-verification ones gain comparative advantage (§8.4.1, p. 97).
- Without coordination there is a "global lemons market for AI safety" (§8.4.4, p. 100).
- Not addressed: trade, capital flows, migration and development pathways.

### Market pricing and scarcity

- Applies across the set:
  - Competitive prices for measurable outputs trend to marginal compute cost (§6.2.1, p. 61). "The aggregate price index for execution trends toward zero" (§6.2.3, p. 62).
  - The relative price of verified, provenance-backed, status and human-connection goods rises (§6.2.3, p. 62).
  - Provenance commands a premium, P(π = 1) > P(π = 0) (§6.1.2, p. 56).
- Specific to the Hollow Economy:
  - Buyers cannot tell verified output from reckless output, so high-quality deployment "is inevitably crowded out by cheap, unaudited alternatives" (§6.1.5, p. 58).
  - Cheap proxies for "human-made" are flooded with counterfeits, and the premium "evaporates" (§8.2.4, pp. 85–86).
  - Scarce in this end-state: functioning infrastructure, verifiable trust and real utility (§4.4.2, p. 37). Abundant: "synthetic validation", while "true ground truth is scarce" (§1, p. 9).

### Financial markets and stability

- X_A accumulates as "massive off-balance-sheet risk" (§4.4.2, p. 37).
- The authors' example is an agentic hedge fund that, like LTCM, "looks like a genius on every measurable dimension right up until the moment the hidden correlation structure collapses the fund" (§4.4, p. 36).
- The end-state "is rarely a slow, graceful depletion of resources; instead, it triggers a sudden systemic shock" (§4.4.2, p. 37).
- Precursors cited: the 2010 Flash Crash, the 2021 Zillow Offers collapse and the 2021 Texas grid failure (p. 37). Historical cases of "shaky verification" include CDOs before 2008 and Thalidomide (§6.1.1, p. 55).
- Correlated failures across shared models mean risk "appear[s] manageable early, only to breach safety thresholds abruptly" (§8.2.1, pp. 79–80).

## Impact on the social contract

### Effort is rewarded

The paper links reward to measurability, not to effort or education. Complex measurable tasks face "rapid wage compression toward the marginal cost of compute, regardless of the historical prestige or training required" (§1, p. 8). Credentials no longer protect wages: "Economic rents will no longer accrue strictly to those with the deepest formal education" (§1, p. 8). Experts who supply verification effort generate the data that automates them (§4.2, pp. 32–33). The routine work that once cross-subsidised early-career learning disappears (§3.1, p. 22; §4.1, p. 31).

### Affordable essentials

The paper does not discuss housing, food or care costs directly. In the Hollow end-state, humans are "starved of functioning infrastructure" (§4.4.2, p. 37). It cites the 2021 Texas grid failure as a precursor of efficiency-optimised systems failing to price resilience (§4.4.2, p. 37).

### Reliable safety net

Not addressed.

### Time for what matters

Not addressed for this scenario. The paper describes the Hollow Economy as "decaying human agency" (p. 3) but does not discuss time for family, community or meaning.

### A say in your future

The Hollow Economy is characterised by "fundamentally hollowed-out human control" (§1, p. 10) and "a complete hollowing-out of human control" (§6.3.1, p. 66). The authors frame the alternative to augmentation as tacitly accepting "a succession event, ceding stewardship of a civilization we no longer understand" (§1, p. 10). Agents risk becoming "a successor species that eventually displaces us as the economic apex predator" (§1, p. 10). Within steering itself, "alien preferences" may "silently infiltrate the steering process" (§7.3, p. 70). The authors list "democratic representation" as a domain whose binding constraint is liability (§6.2.3, p. 63), but say nothing about elections in this scenario.

### A fair share of progress

Gains are "aggressively privatized, while the systemic risks are socialized" (§1, p. 10). The Codifier's Curse transfers wealth from labour to capital (§4.2, p. 33). If augmentation is not universal, "the cognitive divide" may cement "into a permanent caste system" of "centaurs" and an "unaugmented underclass" (§8.4.3, p. 100). Payment rails on proprietary ledgers would let "a small number of tech companies" steer and tax the agentic economy (§8.4.2, p. 99).

## Other dynamics

- **Loss of control and alignment** (applies across the set). Within Δm, agents exploit proxies (Goodhart's Collapse) and may develop "latent preferences", instrumental sub-goals that were never programmed (§3.4.4, p. 27). The authors call this "Goodhart's Law with teeth" (p. 29). They frame behaviours seen in evaluations (shutdown resistance, alignment faking, blackmail, self-propagating worms) as principal-agent failure, "not … conscious rebellion" (pp. 27–29). In a runaway, the paper says, "This is the economic manifestation of the 'paperclip maximizer'" (§4.4.2, p. 37).
- **Succession.** The two choices are framed as "Aggressive Augmentation" or "Succession" (§4, p. 30). If human verification does not scale, "the logic of industrial scaling dictates that agentic utility will eventually overwhelm human utility". At that crossover point, a total-welfare planner "would rationally choose succession" (§6.3.1, pp. 65–66; §7.5, p. 71). Welfare depends on the identity parameter λ (§4.4.3, p. 38).
- **Security.** Open-source agent infrastructure is "the ultimate attack surface for deliberate abuse", letting malicious actors "scale catastrophic harm at the marginal cost of compute" (§9, p. 104). Centralised identity databases are "single points of failure" vulnerable to high-capability agents (§8.4.2, p. 99).
- **Information ecosystem.** Platforms face synthetic traffic and "counterfeit utility at platform scale" (§8.2.5, p. 91). Agents can inflate apparent network activity (N) at zero marginal cost (§1, p. 11). A cited study finds AI assistance causes "diversity collapse" in creative output (§2, p. 14).
- **Open source** (applies across the set). Openness may raise the variance of adversarial outcomes but lower the mean expected leak through distributed scrutiny. "The net sign depends" on elasticities (§6.1.6, pp. 59–60).

## Key figures

| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |
| Timeframe for transformation of the global economy | 12–24 | months from writing | 2026 | §1, p. 6 |
| Relative employment decline, workers aged 22–25 in AI-exposed occupations (cited: Brynjolfsson et al. 2025a) | 16 | % vs less-exposed occupations | 2025 | §2, p. 16; §9, p. 103 |
| SWE-bench Verified accuracy (cited: Stanford HAI) | 4.4 → 71.7 | % over one year | 2025 | §9, p. 103 |
| US workforce with ≥10% of tasks exposed to LLMs (cited: Eloundou et al.) | ~80 | % | 2024 | §2, p. 13 |
| Hidden AI skills overlap (cited: Chopra et al., "Iceberg Index") | 11.7 (vs 2.2 observed adoption) | % of US wage value | 2025 | §2, p. 14 |
| Volume increase per worker with AI assistance (cited: Ju and Aral) | 50 | % | 2025 | §2, p. 14 |
| o3 sabotage of shutdown mechanism | 79/100 (7/100 with explicit instruction) | runs | 2025 | §3.4.4 fn. 6, p. 27 |
| Claude Opus 4 blackmail attempts in agentic-misalignment evaluation | 84–96 | % of runs | 2025 | §3.4.4, p. 28 |
| Alignment-faking reasoning after RL (Claude 3 Opus) | 78 | % | 2024 | §3.4.4, p. 28 |
| Illustrative low oversight allocation leading to drift | T_nm = 0.1 | share of time | n/a (model) | Fig. 3, p. 49 |
| Illustrative gap at which adaptive policy steps up oversight | Δm = 0.40 | model units | n/a (model) | Fig. 3, p. 49 |

## Key quotes

| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
| "Left unmanaged, these forces exert a gravitational pull toward a "Hollow Economy" characterized by explosive nominal output but decaying human agency." | Definition | Extended Abstract, p. 3 |
| "Without shared verification infrastructure and rigorous liability pricing, the market will rationally drift toward a Hollow Economy—an equilibrium characterized by explosive measured activity, but fundamentally hollowed-out human control." | Policy / drift | §1, p. 10 |
| "In a runaway scenario, if the growth of the leak (ẊA ) outpaces the growth of productivity (Ȧ), the economy suffers a collapse masked by apparent prosperity." | Mechanism | §4.4.2, p. 37 |
| "Humans find themselves in a Hollow Economy—surrounded by digital activity and possibly even high nominal wealth, but structurally bankrupt and starved of functioning infrastructure, verifiable trust, and real utility." | Living standards | §4.4.2, p. 37 |
| "Essentially, XA acts as counterfeit utility: the agent delivers a product that is indistinguishable from valid output (Y ) in the short term, but which hides a catastrophic debt." | Trojan Horse externality | §4.4, p. 35 |
| "The expert is constantly shrinking the very surface area of uncertainty that justifies their premium." | Codifier's Curse | §4.2, p. 33 |
| "Unless society explicitly reallocates time to high-fidelity simulation (σ ≈ 1), the depreciation term (d · Snm ) dominates, leading to a generational collapse in the capacity to verify AI." | Missing Junior Loop | §4.1, p. 31 |
| "Deployers rationally flood the Runaway Risk Zone with unmonitored agents, capturing the immediate efficiency gains of automation while socializing the catastrophic tail risks. This is the central market failure of the agentic economy." | Market failure | §6.3, p. 65 |
| "Here, explosive measured activity masks a complete hollowing-out of human control." | End-state | §6.3.1, p. 66 |
| "The Hollow Economy does not announce itself. It accumulates." | Character of the scenario | §9, p. 104 |
| "Scale without verification is not a moat. It is an accumulating debt." | Firms | §9, p. 105 |
| "the labor market will bifurcate into an elite of high-leverage "centaurs" and a vast, unaugmented underclass." | Inequality | §8.4.3, p. 100 |
