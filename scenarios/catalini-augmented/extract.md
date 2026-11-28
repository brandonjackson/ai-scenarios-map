# The Augmented Economy — extract

## Summary

Agentic AI drives the cost of automating any measurable task towards the marginal cost of compute. Realised value is capped by human verification bandwidth, which is bounded by human time and slowly built experience (Extended Abstract, p. 2; §1, p. 8). In the Augmented Economy, society deliberately scales verification alongside agentic power, so AI deployment stays "safely and endogenously bound to what can be verified and underwritten" (§6.3.1, p. 66). It does this through four levers:
- liability and insurance regimes that make deployers internalise tail risk;
- observability, interpretability and cryptographic provenance that compress feedback latency;
- AI-driven synthetic practice that rebuilds the human apprenticeship pipeline;
- human augmentation that raises the effective oversight bandwidth of each expert.

The forces that threaten collapse instead become "the catalyst for unbounded discovery, experimentation, and execution" (p. 3). Measurable goods become abundant. Value moves to verification, liability underwriting, provenance and status. Individuals can operate at the scale of a startup. Public goods such as diagnostic-quality healthcare, individualised education and expert public administration become universally affordable (p. 3; §1, p. 11).

## Key details

- **Source:** Some Simple Economics of AGI, Christian Catalini, Xiang Hui and Jane Wu, arXiv (2602.20946v2 [econ.GN]), February 2026 (v2 stamped 25 Feb 2026; title page dated 26 February 2026). `sources/catalini-simple-economics-agi-2026/`
- **Other sources for this scenario:** None. The paper builds on Catalini et al. (2025) for the measurability argument (§1, p. 7), but that work is not captured here.
- **Reading notes:** Full text read for the Extended Abstract, §1, §3, §4, §6, §7, §8 and §9. §5 (formal model) was read for propositions, figures and governance levers, with proofs skimmed. §2 (literature review) was read in part (pp. 13–16). §8.2.5 (network effects, pp. 86–93) was skimmed. Notation table and references were not read in detail. The paper says full formal treatment of the §6 extensions is "reserved for an updated version of this paper" (§6, p. 55).
- **Scenario set:** Two contrasting equilibrium "basins": the Augmented Economy (this extract) and the Hollow Economy (`scenarios/catalini-hollow/`) (§6, p. 55; §6.3.1, pp. 65–66). The driver is whether verification capacity (the verifiable share s_v, set by the cost to verify c_H against the cost to automate c_A) scales with agentic deployment (L_a), and whether alignment τ stays above a critical threshold τ_crit (§6.3.1, p. 66). The levers are the priced liability wedge (ℓ), synthetic practice (T_sim), and observability or provenance infrastructure that cuts feedback latency (t_fb) (§5.4, pp. 51–53; §5.5, pp. 53–54). A separate normative axis, the "Parasite" (λ = 0) vs "Successor" (λ = 1) view, sets whether agent resource use counts as welfare. Aggressive augmentation "may render this distinction moot" (§4.4.3, p. 38).
- **Geography:** Global. Empirical illustrations are largely US-based. The authors propose a coalition of democracies that conditions market access on verifiable safety (§8.4.4, p. 100).
- **Authors' framing:** Prescription. The Augmented Economy is the alternative "reached only through deliberate societal investment" (§6.3.1, p. 66), and the paper presents an "operational playbook" for reaching it (p. 3; §§8.1–8.5, pp. 73–102). "By scaling verification alongside agentic power, the very forces that threaten systemic collapse become the catalyst for unbounded discovery, experimentation, and execution—powering an 'Augmented Economy'" (p. 3).
- **Authors' view of likelihood:** No probability is given. "The condition for survival is simple to state but exceptionally hard to achieve" (§6.3.1, p. 66). The "human-in-the-loop" equilibrium "is not a natural steady state, but a profoundly fragile regime" (§5.5, p. 53). The authors say "this outcome is not inevitable" of the Hollow Economy, so the Augmented Economy is achievable (p. 3).

### Timeline

No horizon year is given for the end-state.

- Next 12 to 24 months (from early 2026): "the global economy will be transformed" by systems that traverse the combinatorial space of human knowledge (§1, p. 6).
- February 2026 — ElevenLabs launches an insured AI voice agent with AIUC-1 certification. The authors present this as evidence that the predicted equilibrium of verification-plus-insurance partnerships "is actively materializing" (§8.2.1 fn. 21, p. 81).
- Within the scenario, the steps are conditional rather than dated (Fig. 2, p. 48; Fig. 3, p. 49):
  - Under an adaptive "simulation ladder", governance steps up T_sim at trigger points as measurable work declines, keeping experience above the verification threshold.
  - Once drift pressure becomes salient (illustratively at Δm = 0.40), institutions step up effective steering capacity (T_nm).

### Policy stance

- **Stance:** On. The Augmented Economy is reached only by deliberately forcing markets to internalise verification costs and by publicly funding verification and human-capital public goods (§5.5, p. 54; §6.3.1, p. 66).
- **Policies assumed in the scenario:**
  - Liability and insurance raise the verification budget B, so X_A is partly internalised (§5.4, p. 51; Proposition 4, p. 52).
  - Simulation investment raises experience S_nm through T_sim (Proposition 4.2, p. 52).
  - Observability and provenance infrastructure lowers t_fb and raises verification bandwidth (Proposition 4.3, p. 52).
  - A jagged-frontier deployment rule caps deployment so the leak stays within a risk budget: X_A(t) ≤ X̄, i.e. L_a(t) ≤ X̄ / [(1−τ)(1−s_v)] (§5.3, pp. 46–47).
  - Investment in base alignment and graceful degradation lowers drift sensitivity η (§7.2.2, p. 69).
- **Policies the source recommends** (applies across the set):
  - Price the X_A externality through mandatory liability insurance or risk-weighted capital requirements. Commercial agents above defined autonomy thresholds post financial guarantees in proportion to their scale and potential harm (§8.4.1, p. 97; §8.5, p. 102).
  - Enforce the preconditions of insurability: standardised incident reporting, auditable execution traces and disclosure formats (p. 11; §8.4.1, p. 98).
  - Treat interpretability as public infrastructure funded through open source. Create technology-neutral safe harbours for systems that cut oversight cost and correlated-failure risk, for example through provenance chains, independent audits and rollback mechanisms (§8.4.1, p. 98).
  - Shift from regulating conduct to regulating risk internalisation. The goal is "not to slow automation" but to stabilise s_v "during liftoff" (§8.4, p. 97).
  - Act as "investor of last resort" for verification public goods: certified datasets, sector outcome registries, standardised evaluation harnesses, interoperable audit formats and incident taxonomies (§8.4.1, p. 98; §8.4.2, p. 98).
  - Use crypto and blockchains for privacy-preserving sharing of safety signals, and keep agent payment rails neutral on open, permissionless networks (§8.4.2, p. 99).
  - Fund a "White Hat" subsidy for independent red-teamers and auditors rather than banning open source. Give academia compute and energy (§8.4.2, p. 99).
  - Build stronger, privacy-preserving, possibly decentralised identity and provenance infrastructure (§8.4.2, p. 99).
  - Fund "flight simulators for work" to keep a "strategic human capital reserve" across cybersecurity, emergency response, infrastructure operations and macro-finance (§8.4.3, p. 99).
  - Make radical human augmentation a universal utility "akin to literacy or internet access" (§8.4.3, p. 100).
  - Form a supply-chain coalition of democracies that conditions market access on verifiable safety standards, with digital border measures against uncertified agentic services and cryptographic receipts for cross-border trust (§8.4.4, p. 100).
  - Treat "Cognitive Sovereignty as national security" (§8.5, p. 102).

## Key dynamics explored

Applies across the set (shared model framing):
- Human time is partitioned into measurable work (T_m), non-measurable work (T_nm), theoretical education (T_e) and active or synthetic practice (T_sim), normalised to 1 (§3.1, p. 20). Output is Y = A·K_G^φ·L_E^(1−φ). Effective labour is a Cobb-Douglas aggregate of non-measurable capacity L_nm = S_nm·T_nm and measurable capacity L_m = T_m + s_v·L_a. Humans and agents are rivals within L_m, and the two capacities are complements, so the marginal product of scarce L_nm rises as L_m becomes abundant (§§3.2–3.3, pp. 22–24 and fn. 4).
- The automation frontier is set by two racing cost curves. The cost to automate is c_A(i) = H_i / [K_C·(A + K_IP)] and falls with compute and knowledge. The cost to verify is c_H(i) = w(S_nm)·t_fb(i)/S_nm, bounded by feedback latency, experience and the expert wage (§3.4.1, pp. 24–25).
- These curves give four regimes: the Safe Industrial Zone, the Runaway Risk Zone, the Human Artisan Zone and the Pure Tacit Zone (§1, p. 8; Fig. 1, p. 44). The Measurability Gap Δm = m_A − m_H tends to widen because m_A scales with compute while m_H is bounded by experience (Proposition 1, p. 45).
- The Missing Junior Loop, the Codifier's Curse and alignment drift erode the "human-in-the-loop" equilibrium from below, from within and through drift (§4, p. 30; §7.2.1, p. 68).

Specific to the Augmented Economy (countervailing forces and governance levers):
- **Observability and technological augmentation.** Tools that "compress dimensionality and enhance interpretability" lower c_H "by allowing experts to 'see' alignment drift without having to run a full verification loop" (§4, p. 30). Paired with cryptographic provenance, they make agentic actions "mathematically auditable" (§1, p. 9). Augmentation raises effective S_nm per hour and/or lowers t_fb, which shifts c_H down pointwise, expands m_H and s_v, and shrinks Δm (Remark 1, p. 45; Proposition 4.3, p. 52).
- **Accelerated mastery.** AI-generated high-fidelity simulations replace the missing junior loop, a shift "from 'learning while earning' (apprenticeship) to 'paying to practice' (simulation)" (§4.1, p. 31). Steady-state experience is S*_nm = (T_m + T_sim)/d, and raising T_sim raises it (Proposition 2, p. 50; Proposition 4.2, p. 52). A minimum simulation requirement keeps an experience floor: T_sim ≥ max{0, d·S̄_nm − T_m} (§5.3, p. 45). AI shifts the constraint on expertise "from access to opportunities toward natural inclination" (§4.1, p. 32).
- **Fast talent discovery.** As c_A → 0, experimentation becomes cheap, so individuals cycle through domains and match their latent aptitude θ. "The economy shifts from a credentialing market … to a discovery market filtering by proven aptitude" (§6.2.2, p. 62; §7.2.2, p. 68).
- **Graceful degradation and base alignment.** Lowering drift sensitivity η means that when oversight falters, "systems revert to safe baseline policies rather than optimizing aggressively in unverifiable regimes" (§1, pp. 9–10; §7.2.2, p. 69). "Closing Δm expands the domain where human correction binds; reducing η limits the damage in the domain where it does not. A robust safety architecture requires both" (§7.2.2, p. 69).
- **Liability internalisation.** The firm's optimal verification budget rises with the priced liability wedge (∂B*/∂ℓ > 0) (§6.3 fn. 17, p. 65). Strict liability, mandatory insurance, audit trails and provenance mandates "do not merely regulate the market—they create the economic demand for verification" (§6.1.5, p. 59).
- **Easy verification and provenance.** Safe automation needs outcome verification, not full interpretability: "we do not need to understand how an agent works … but we do to be able to verify what it produced" (§6.1.1, p. 55). Proteins and proofs are examples of easy verification (pp. 55–56). Cryptographic provenance moves tasks from the Runaway Risk Zone into the Safe Industrial Zone (§6.1.2, p. 56).
- **Symbiosis.** Above the critical alignment threshold τ_crit, "agents and humans operate in symbiosis: agent goals overlap with human intent, and deployment acts as a massive economic multiplier" (§6.3.1, p. 65). The condition for this path is to "maximize verified deployment (s_v·L_a) while keeping alignment strictly above the parasitic tipping point (τ > τ_crit)" by scaling verification complements "faster than compute lowers the cost of automation" (§6.3.1, p. 66).
- **Augmentation versus succession.** "By integrating compute directly into human verification and experience, we uncap the growth rate of human utility and push this crossover point toward infinity, provided our rate of augmentation keeps pace with agentic scaling" (§6.3.1, p. 66). Augmentation "potentially forces a convergence of preferences between humans and agents" rooted in a shared physical reality, though "a shared understanding of physical laws does not guarantee aligned objective functions" (§4.4.3, pp. 38–39).
- **Bounded leak.** If countervailing investments succeed, "X_A remains bounded. In this stable regime, agents function as multipliers, generating a surplus (Y) that grows fast enough to fund both their own resource costs and a massive, structural increase in human consumption" (§4.4.2, p. 38).
- **Open source as distributed verification.** Openness adds public oversight stock, S_nm^total = S_nm^firm + Ω·S_nm^public. Scrutiny and deployment-diversity channels can lower the mean expected leak and "potentially [map] and [close] Δm faster than any single firm could" (§6.1.6, pp. 59–60).
- **Limit of simulation.** Synthetic practice "can bring human expertise up to the current knowledge frontier, it cannot push beyond it—because any task whose state-space can be perfectly simulated is, by definition, inherently automatable" (§5.5, p. 53).

## State of technology

Applies across the set:
- The "AGI" threshold debate is "a distraction" (§1, p. 6). Retrieval and continual learning make dynamic agents (§1, p. 6). Large World Models may convert Knightian uncertainty into calculable risk (§1, p. 7; §7.3, p. 70).
- L_a ∝ K_C (§3.2 fn. 5, p. 24), with c_A "driven down exponentially" (§7.2, p. 67).
- Capability evidence cited: SWE-bench Verified rose from 4.4% to 71.7% in one year, task horizons double sub-yearly, and agents have crossed "from execution into discovery" (§9, p. 103).
- Misalignment evidence cited: shutdown sabotage, alignment faking and blackmail behaviours in evaluations (§3.4.4, pp. 27–29).
- Robotics lowers "the marginal cost of atom-manipulation" (§8.1, p. 75).
- Frontier capability diffuses through open weights and APIs. Firms "rent cognition" while "owning trust" (§8.2.2, p. 83).

Specific to the Augmented Economy:
- Verification technology scales:
  - Observability layers, automated drift detection, and "human-in-the-loop" cockpits such as AI-integrated IDEs, "that allow a single expert to audit massive agentic outputs via high-level diffs" (§8.3, p. 94).
  - "Brain–computer interfaces" are named among verification-expanding "shovels" (§8, p. 72).
  - High-bandwidth human augmentation interfaces (§8.3, p. 95).
- Diversified model lineages are used for verification, so "heterogeneity is one of the few levers that reduces correlated error" (§8.2.1, p. 81).
- Programmable payment rails (stablecoins, smart contracts) carry machine-verifiable receipts such as proof-of-execution and proof-of-approval (§6.1.2, p. 56; §8.3, p. 95).
- Experts may "spar with model-generated scenarios" to build "hyper-intuition" (§8.1, p. 74).
- **Market structure:**
  - Competition shifts from raw automation to underwriting capacity: "The product is no longer the agent; it is the indemnified outcome" (§6.1.5, p. 59).
  - Likely equilibria are platforms with captive underwriting units, or partnerships between insurers and verifiers (§8.2.1, p. 81).
  - "startups supply capabilities, while regulated incumbents supply the balance-sheet wrapper to serve as the underwriter of record" (§8.3, p. 96).
  - If models commoditise, "capital is no longer needed to access the intelligence, but to insure its consequences" (§8.2, p. 79).

## State of adoption

Applies across the set:
- Early adoption clustered where verification is cheap: chat, images and short code (§1, p. 8; §7.2, p. 67).
- Diffusion is bifurcated. Regulated industries "resist full automation longest, but once a verification stack clears regulatory gates it becomes exceptionally sticky and defensible" (§8.2.1, p. 80).
- Regulated incumbents with failure histories and balance sheets (banks, insurers, industrials) can modernise quickly with agentic labour. Deep-tech firms benefit because their bottleneck is physics and real-world validation, not code (§8.2.2, p. 82).

Specific to the Augmented Economy:
- Firms "anchor scale to verified throughput". They grow automation "only as fast as it can be trusted" and treat unverified excess as "latent debt" (§1, p. 10; §8.2, p. 79; §8.5, p. 101).
- When the marginal unit of automation cannot support its implied liability, "scaling is economically premature" (§8.2.1, p. 81).
- Pricing moves from flat-rate to "metered risk: charging per inference plus a liability premium indexed to the task's verification difficulty" (§8.2.1, p. 81).
- Firms run internal apprenticeship pipelines that rotate juniors through supervised verification work and curated edge cases (§8.2.3, p. 84).
- "Software-as-Labor" services "historically rationed by the cost of human expertise become infinitely scalable products for firms whose verification stack is rigorous" (§1, p. 11).

## How the economy works

### GDP growth and productivity

Agents act as "multipliers", generating surplus that funds their own resource costs "and a massive, structural increase in human consumption" (§4.4.2, p. 38). Deployment acts as "a massive economic multiplier" (§6.3.1, p. 65). The verified share of agentic labour (s_v·L_a) is maximised (§6.3.1, p. 66). The authors describe the result as "a new production function for discovery itself", the first technology to simultaneously cut "the cost of learning, discovering, experimenting, and executing across every knowledge domain at once" (§9, p. 104), and "the most profound engine of discovery, experimentation, and verifiable abundance in human history" (§1, p. 11). No numeric growth forecast is given.

### Labour market dynamics

- Applies across the set:
  - Wages for measurable tasks collapse towards compute cost "regardless of the formal education (T_e) or credentials" (§8.1, p. 73).
  - "the defensibility of a role is inversely proportional to its feedback speed" (§8.1, p. 73).
  - Entry-level employment in AI-exposed fields has already fallen 16% relative to less-exposed occupations (§9, p. 103).
- Human comparative advantage settles into three roles: verifying and underwriting agentic labour, intent arbitration and steering, and operating at the Knightian frontier. All three are "precarious" (§1, p. 10; §7.3, pp. 69–70).
- Labour market topology (§8.1.1, pp. 77–78):
  - **Directors** (hard to automate, easy to verify) navigate Knightian uncertainty and orchestrate agent swarms.
  - **Liability Underwriters** (easy to automate, hard to verify) curate, detect hidden risk and absorb liability.
  - **Meaning Makers** (hard on both) monetise provenance, status and human connection.
  - **Displaced Workers** (easy on both) see wages drop to compute cost, with the strategy "exit".
- **Organisation.** The firm converges on the "AI Sandwich": human intent, then machine execution, then human verification and underwriting (§6.2.4, p. 64; §8.2.3, p. 84). Firm minimum efficient scale collapses, and "a single individual" can "execute at the scale of a traditional startup" (p. 2; §6.2.4, p. 64).
- **Entry-level pipeline.** It is rebuilt through synthetic apprenticeship: "compress years of traditional experience into months of self-directed, AI-assisted practice" (§8.1, p. 74). The barrier to entry shifts "from years of training to speed of iteration" (§8.1, p. 74).
- **Experts.** Experts repeatedly escape the Codifier's Curse by using personal observability stacks and by prototyping their way into adjacent fields (§8.1, p. 74).
- **Credentials.** Professional identity "moves from static resumes to tamper-evident chains of verified execution traces and outcome-based reputation" (§8.1, p. 75).
- **Status Economy.** Labour survives as performance: "Labor survives not because it is efficient, but because it is scarce" (§6.2.3, p. 64). Mentoring and teaching command a premium (§7.4, p. 71).
- **Remaining premium.** Verification value still concentrates in "a progressively narrower set of global super-experts" as La grows more sophisticated (§7.3, p. 70).

### Winners and losers

- **Winners:**
  - Holders of deep, verifiable experience (S_nm) who underwrite outcomes (§6.2.3, p. 64).
  - Directors and meaning makers (§8.1.1, p. 77).
  - Individuals who use synthetic practice to find their aptitude faster than the market rate (§8.1, pp. 73–74).
  - Firms with verification-grade ground truth, balance sheets to absorb liability, and elite talent (§§8.2.1–8.2.3, pp. 79–84).
  - Regulated incumbents with decades of failure knowledge (§8.2.2, p. 83).
  - Deep-tech and long-horizon R&D (p. 2; §8.2.2, p. 82).
  - Verification and network platforms whose scale lowers c_H (§8.2.5, p. 93).
  - Brands signalling "human origin" (§8.3, p. 96).
- **Losers:**
  - Workers whose task bundles become cheaply measurable and verifiable, labelled "Displaced Workers" with the strategy "exit" (§8.1.1, p. 78).
  - Average expertise, whose value "collapses" (§8.2.3, p. 84).
  - The middle tier of managers and coordinators (§6.2.4, p. 64).
  - Platforms whose lock-in rested on migration labour or execution-grade network effects (§8.2.5, pp. 89–90).
  - "Wrappers" and firms that cannibalise junior pipelines, which investors should short (§8.5, p. 101).
- **Distributional condition.** Policy should prevent a "permanent caste system" by treating augmentation tools as public infrastructure, "ensuring that the productivity gains of the agentic age are broadly shared rather than narrowly captured" (§8.4.3, p. 100).

### Household incomes and living standards

Human consumption grows: "a massive, structural increase in human consumption" (§4.4.2, p. 38). Measurable goods and services become abundant (§7.4, pp. 70–71). In the Solvable Economy, "the marginal cost of the physical service collapses" (§6.2.3, p. 63). Public goods become universally accessible: "diagnostic-quality healthcare, individualized education, and expert-level public administration at marginal costs that make genuine universal access economically feasible" (§1, p. 11). Household income levels are not quantified.

### Government finances

Not addressed (no discussion of tax bases, revenue, debt or social insurance funding). On spending, the government is cast as "investor of last resort" for verification public goods, synthetic practice and augmentation (§8.4.1, p. 98). The reward is "the broadest expansion of public-good provision in generations, delivered at marginal costs that make genuine universal access economically feasible" (p. 3; §9, p. 105).

### International economic patterns

- Governments that steer towards high verification create "a high-trust zone where agents are verifiable, liabilities are clear, and economic activity is robust against the systemic fragility that will plague low-verification jurisdictions" (§8.4.1, p. 97).
- A democratic "supply chain coalition" uses its purchasing power to "force a global race to the top", shifting competition from raw speed (m_A) to verified performance (s_v) (§8.4.4, p. 100).
- Cryptographic receipts automate cross-border trust, so "nations can demand proof of process" (§8.4.4, p. 100).
- Not addressed: trade volumes, capital flows, migration and development pathways.

### Market pricing and scarcity

- **Execution.** Prices of measurable execution converge to the marginal cost of compute and energy (§6.2.1, p. 61; §7.4, p. 70).
- **Abundance.** On the premise that "physical constraints are fundamentally information problems", scaling compute makes "energy and matter effectively abundant" in the Solvable Economy (§6.2.3, p. 62).
- **Relative prices.** Prices rise for goods relying on human verification or deriving value from consensus and provenance (§6.2.3, p. 62).
- **Liability.** In the Verified Economy (medical diagnosis, structural engineering, judicial sentencing), "We pay a premium not for the generation of the result, but for the guarantee" (§6.2.3, p. 63).
- **Status.** In the Status Games Economy, "Proof of Personhood" becomes "a Veblen Good", alongside an "Efficiency Paradox" and an "Intimacy Premium" (§6.2.3, pp. 63–64).
- **Provenance.** "In a sea of infinite synthetic production, provenance becomes the scarcity anchor" (§6.1.2, p. 56).
- **Information markets.** These shift from monetising eyeballs to monetising ground truth (§6.2.3, p. 63).
- **Revenue models.** SaaS gives way to "Software-as-Labor" and Liability-as-a-Service (§1, p. 10).

### Financial markets and stability

- Leading firms are "valued like insurers—by underwriting margin, loss experience, and reserve adequacy—not like SaaS companies" (§8.3, p. 96).
- Firm valuation is re-grounded in "the ability to absorb tail risk and reliably price, insure, and warrant autonomous outcomes" (p. 2).
- Low-cost capital is a strategic input, and its effect compounds: higher s_v lowers realised X_A, "which in turn reduces the cost of capital and insurance" (§8.2, p. 79).
- Investors pivot to "capitalizing what is not yet measurable" (p. 2) and diligence verified share, loss experience and verification-grade K_IP (§8.5, p. 101).
- Agent-native firms post on-chain collateral or buy programmable coverage (§8.2.1, p. 82).
- X_A stays bounded (§4.4.2, p. 38).

## Impact on the social contract

### Effort is rewarded

Rewards shift from credentials to proven aptitude and verifiable track records. The economy moves "from a credentialing market … to a discovery market filtering by proven aptitude (θ), effectively liquidating the trapped human potential that was previously priced out of self-discovery" (§6.2.2, p. 62). AI "inverts the old bargain between talent and resources", letting a single individual "execute at the scale of a traditional startup" (p. 2). Reputation becomes capital: "the ability to prove origin and responsibility becomes the ultimate wage-relevant asset" (§8.1, p. 75). Measurable work is still re-priced at compute cost whatever the effort or credentials behind it (§8.1, p. 73).

### Affordable essentials

The Solvable Economy drives effective costs towards zero, and solving energy generation and manufacturing collapses "the marginal cost of the physical service" (§6.2.3, pp. 62–63). Diagnostic-quality healthcare and individualised education become universally affordable (§1, p. 11). Housing and food are not discussed specifically.

### Reliable safety net

Not addressed. The paper discusses a "strategic human capital reserve" of experts for crisis-time auditing (§8.4.3, p. 99) but not income support.

### Time for what matters

The authors describe a "radical elevation of human purpose" (§1, p. 7). In the unmeasurable economy, "mentoring and teaching can command a premium because individuals derive intrinsic utility from helping others learn and develop" (§7.4, p. 71). Value attaches to "human connection", to "specific, unscalable intimacy" (§6.2.3, p. 64) and to meaning-making (§8.1, pp. 76–77). Time use and hours are not discussed directly.

### A say in your future

Humanity remains "the architect of its intelligence" (p. 3). Human augmentation is "a structural prerequisite for maintaining human agency" and "allows human principals to remain cognitive peers with their creation" (§4.4.3, p. 39). Augmentation is "the only viable path to maintaining sovereignty over the agentic economy" (§8.4.1, p. 98). "Cognitive Sovereignty" is treated as national security (§8.5, p. 102). Coordination among democracies sets safety standards (§8.4.4, p. 100). The paper says nothing about voting or electoral institutions in this scenario.

### A fair share of progress

Augmentation should be "not a luxury good but a universal utility" so that gains "are broadly shared rather than narrowly captured" (§8.4.3, p. 100). Public-good provision expands to universal access (§1, p. 11). Verification ground truth stays "a public utility rather than a privately gated luxury" (§8.4.2, p. 98). Neutral, permissionless payment rails stop a few firms from taxing the agentic economy (§8.4.2, p. 99). The authors frame this as a condition the scenario needs, not a guaranteed outcome.

## Other dynamics

- **Alignment as maintenance** (applies across the set). Alignment is "an ongoing maintenance process rather than a one-time specification" (§1, p. 9). Above the maintenance frontier τ* = T_nm/(T_nm + η·Δm⁺), alignment decays unless steering capacity is stepped up (§5.4, p. 53; Fig. 3, p. 49). Alignment is "the continuous process of 'parenting' an evolving intelligence" (§7.5, p. 71).
- **Residual AI-verifies-AI risk.** "Even if the future inevitably relies on AI to verify AI, the safety of that future depends on the human institutions built today to ensure those verifiers remain aligned" (§8.5, p. 102).
- **Succession avoided.** The paper presents augmentation as the way to avoid a "succession event". Our institutions "will decide whether we build an Augmented Economy—systematically scaling human cognition to remain peers with our creation—or tacitly accept a succession event" (§1, p. 10).
- **Geopolitics.** Safety is turned "from a regulatory burden into a comparative advantage" (§8.4.1, p. 97).
- **Information ecosystem.** "Persuasion becomes irrelevant when agents maximize utility based on data rather than attention". Agents pay for verified sources (§6.2.3, p. 63). Platforms shift defence to proof-of-personhood and proof-of-attention gates (§8.2.5, p. 91).
- **Culture.** The paper's analogy is the 19th-century shift from painting to photography: artists moved to Impressionism. In the same way, humans pivot "from task production to meaning-making" (§8.1, pp. 76–77).
- **Open source.** Openness serves as "distributed verification" and a "distributed immune system" (§6.1.6, p. 60).

## Key figures

| Figure | Value | Unit / base | Year | Locator |
| --- | --- | --- | --- | --- |
| Timeframe for transformation of the global economy | 12–24 | months from writing | 2026 | §1, p. 6 |
| Relative employment decline, workers aged 22–25 in AI-exposed occupations (cited: Brynjolfsson et al. 2025a) | 16 | % vs less-exposed occupations | 2025 | §2, p. 16; §9, p. 103 |
| SWE-bench Verified accuracy (cited: Stanford HAI) | 4.4 → 71.7 | % over one year | 2025 | §9, p. 103 |
| US workforce with ≥10% of tasks exposed to LLMs (cited: Eloundou et al.) | ~80 | % | 2024 | §2, p. 13 |
| Illustrative high oversight allocation sustaining alignment | T_nm = 0.5 | share of time | n/a (model) | Fig. 3, p. 49 |
| Illustrative gap at which adaptive policy steps up oversight | Δm = 0.40 | model units | n/a (model) | Fig. 3, p. 49 |
| Steady-state experience stock | S*_nm = (T_m + T_sim)/d | model expression | n/a (model) | Proposition 2, p. 50 |
| Minimum synthetic practice to sustain experience floor | T_sim ≥ max{0, d·S̄_nm − T_m} | model expression | n/a (model) | §5.3, p. 45 |
| Critical alignment threshold (symbiosis above, parasitism below) | τ_crit = 1 − α·Y·s_v / [L_m(1−s_v)] | model expression | n/a (model) | §6.3.1 fn. 18, p. 65 |

## Key quotes

| Quote (verbatim) | Topic | Locator |
| --- | --- | --- |
| "By scaling verification alongside agentic power, the very forces that threaten systemic collapse become the catalyst for unbounded discovery, experimentation, and execution—powering an "Augmented Economy"." | Definition | Extended Abstract, p. 3 |
| "The Augmented Economy is the alternative, reached only through deliberate societal investment: closing the measurability gap with observability tools, rebuilding the human apprenticeship pipeline through simulated practice (Tsim ), and using the collapse in experimentation costs to accelerate talent discovery." | Path | §6.3.1, p. 66 |
| "In this scenario, AI scale is safely and endogenously bound to what can be verified and underwritten." | End-state | §6.3.1, p. 66 |
| "The condition for survival is simple to state but exceptionally hard to achieve" | Likelihood | §6.3.1, p. 66 |
| "In this stable regime, agents function as multipliers, generating a surplus (Y ) that grows fast enough to fund both their own resource costs and a massive, structural increase in human consumption." | Living standards | §4.4.2, p. 38 |
| "The reward is the broadest expansion of public-good provision in generations: diagnostic-quality healthcare, individualized education, and expert-level public administration at marginal costs that make genuine universal access economically feasible." | Public goods | §1, p. 11 |
| "For individuals, the augmented economy inverts the old bargain between talent and resources" | Labour / talent | Extended Abstract, p. 2 |
| "The primary objective of robust policy is not to slow automation—a futile goal given the incentives across firms and nations—but to stabilize the verifiable share (sv ) during liftoff." | Policy | §8.4, p. 97 |
| "These interventions do not merely regulate the market—they create the economic demand for verification." | Liability | §6.1.5, p. 59 |
| "The product is no longer the agent; it is the indemnified outcome." | Firms | §6.1.5, p. 59 |
| "By treating augmentation tools as public infrastructure—akin to literacy or internet access—policy can prevent the cognitive divide from cementing into a permanent caste system" | Distribution | §8.4.3, p. 100 |
| "When that infrastructure holds, the result is not faster automation. It is a new production function for discovery itself." | Growth / discovery | §9, p. 104 |
