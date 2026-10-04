import { useMemo, useState } from "react";
import { policies, policyCategories, policySource, scenariosForPolicy } from "../data.js";
import { defaultGoal as goal, criteriaForPolicy } from "../goals.js";
import { href } from "../router.js";
import { LikelihoodBadge } from "../likelihood.jsx";
import { ScenarioList, ScenarioRow } from "../components/ScenarioList.jsx";

const CATEGORY_KEYS = Object.keys(policyCategories);
const HORIZONS = ["Near Term", "Medium Term", "Long Term"];
const AFFECTED = [...new Set(policies.flatMap((p) => p.who_it_affects))].sort();

const categoryName = (slug) => policyCategories[slug]?.name || slug;
const bySlug = Object.fromEntries(policies.map((p) => [p.slug, p]));
const byTitle = Object.fromEntries(policies.map((p) => [p.title, p]));

function CategoryBadge({ slug }) {
  return (
    <span className="badge badge-cat" data-cat={slug}>
      {categoryName(slug)}
    </span>
  );
}

export function PoliciesList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [horizon, setHorizon] = useState("all");
  const [affected, setAffected] = useState("all");
  const [promise, setPromise] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return policies.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (horizon === "all" || p.risk_horizon.includes(horizon)) &&
        (affected === "all" || p.who_it_affects.includes(affected)) &&
        (promise === "all" || goal.policyCriteria[p.slug]?.some((m) => m.criterion === promise)) &&
        (!q ||
          [p.title, p.summary, p.core_mechanism, ...p.policy_category]
            .join(" ")
            .toLowerCase()
            .includes(q))
    );
  }, [query, category, horizon, affected, promise]);

  const counts = useMemo(() => {
    const c = {};
    policies.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, []);

  return (
    <div>
      <header className="page-header">
        <h1>Policies</h1>
        <p>
          {policies.length} policy proposals for responding to AI-driven
          economic disruption, from the{" "}
          <a href={policySource.url} target="_blank" rel="noopener noreferrer">
            {policySource.name}
          </a>
          .
        </p>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Search policies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search policies"
        />
        <label className="select">
          <span>Horizon</span>
          <select value={horizon} onChange={(e) => setHorizon(e.target.value)}>
            <option value="all">Any</option>
            {HORIZONS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </label>
        <label className="select">
          <span>Affects</span>
          <select value={affected} onChange={(e) => setAffected(e.target.value)}>
            <option value="all">Anyone</option>
            {AFFECTED.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="select">
          <span>Promise</span>
          <select value={promise} onChange={(e) => setPromise(e.target.value)}>
            <option value="all">Any</option>
            {goal.criteria.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="chips chips-wrap" role="group" aria-label="Filter by category">
        <button
          className={`chip${category === "all" ? " active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All <span className="chip-count">{policies.length}</span>
        </button>
        {CATEGORY_KEYS.map((k) => (
          <button
            key={k}
            className={`chip${category === k ? " active" : ""}`}
            onClick={() => setCategory(k)}
          >
            <span className="dot dot-cat" data-cat={k} />
            {categoryName(k)} <span className="chip-count">{counts[k] || 0}</span>
          </button>
        ))}
      </div>

      <div className="result-count">
        {rows.length} of {policies.length} policies
      </div>

      <ul className="card-list card-grid">
        {rows.map((p) => (
          <li key={p.slug}>
            <a className="card" data-cat={p.category} href={href(`/policies/${p.slug}`)}>
              <div className="card-head">
                <h2 className="card-title">{p.title}</h2>
              </div>
              <CategoryBadge slug={p.category} />
              <p className="card-body">{p.summary}</p>
              <div className="card-tags">
                {criteriaForPolicy(goal, p.slug).map(({ criterion: c }) => (
                  <span key={c.id} className="tag tag-goal">{c.name}</span>
                ))}
                {p.risk_horizon.map((h) => (
                  <span key={h} className="tag">{h}</span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
      {rows.length === 0 && <div className="empty">No policies match these filters.</div>}
    </div>
  );
}

const FACETS = [
  ["risk_horizon", "Risk horizon"],
  ["rate_of_disruption", "Rate of disruption"],
  ["governance", "Level of governance"],
  ["decision_maker", "Decision maker"],
  ["who_it_affects", "Who it affects"],
  ["policy_category", "Policy type"],
];

function Bullets({ title, items, className }) {
  if (!items?.length) return null;
  return (
    <section className={`section ${className || ""}`}>
      <h2>{title}</h2>
      <ul className="bullets">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

function RelatedLink({ title, dir }) {
  if (!title) return <span />;
  const p = byTitle[title];
  const label = dir === "prev" ? `← ${title}` : `${title} →`;
  return p ? (
    <a className={`pager-link pager-${dir}`} href={href(`/policies/${p.slug}`)}>
      <small>{dir === "prev" ? "Previous" : "Next"}</small>
      {label}
    </a>
  ) : (
    <span />
  );
}

export function PolicyDetail({ slug }) {
  const p = bySlug[slug];
  if (!p) {
    return (
      <div>
        <Crumbs />
        <div className="empty">No policy with slug “{slug}”.</div>
      </div>
    );
  }
  return (
    <article>
      <Crumbs title={p.title} />
      <header className="page-header">
        <div className="detail-kicker">
          <CategoryBadge slug={p.category} />
        </div>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
      </header>

      <div className="detail-grid">
        <div>
          <PromisesServed slug={p.slug} />
          <section className="section">
            <h2>Core mechanism</h2>
            <p className="prose">{p.core_mechanism}</p>
          </section>
          <div className="pros-cons">
            <Bullets title="Pros" items={p.pros} className="pros" />
            <Bullets title="Cons" items={p.cons} className="cons" />
          </div>
          <Bullets title="Precedents" items={p.precedents} />
          <ScenarioMentions slug={p.slug} />
          <p>
            <a className="button" href={p.url} target="_blank" rel="noopener noreferrer">
              View in the Policy Atlas ↗
            </a>
          </p>
        </div>

        <aside className="section facets">
          {FACETS.map(([key, label]) =>
            p[key]?.length ? (
              <div key={key} className="facet">
                <h3>{label}</h3>
                <div className="card-tags">
                  {p[key].map((v) => (
                    <span key={v} className="tag">{v}</span>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </aside>
      </div>

      <nav className="pager" aria-label="Related policies">
        <RelatedLink title={p.related_prev} dir="prev" />
        <RelatedLink title={p.related_next} dir="next" />
      </nav>
    </article>
  );
}

function Crumbs({ title }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href={href("/policies")}>Policies</a>
      {title && <> <span aria-hidden="true">/</span> <span>{title}</span></>}
    </nav>
  );
}

// Literature scenarios that name this policy (data/scenario-policies.csv).
function ScenarioMentions({ slug }) {
  const rows = scenariosForPolicy(slug);
  if (!rows.length) return null;
  return (
    <section className="section">
      <h2>Named in scenarios</h2>
      <ScenarioList>
        {rows.map(({ scenario: s, evidence }) => (
          <ScenarioRow key={s.id} s={s} aside={<LikelihoodBadge s={s} />}>
            <p className="scenario-row-desc">{evidence}</p>
          </ScenarioRow>
        ))}
      </ScenarioList>
    </section>
  );
}

// The social contract promises this policy is meant to strengthen
// (goals/<default goal>/policies.csv).
function PromisesServed({ slug }) {
  const rows = criteriaForPolicy(goal, slug);
  if (!rows.length) return null;
  return (
    <section className="section">
      <h2>{goal.criteriaNoun ? `${goal.criteriaNoun[0].toUpperCase()}${goal.criteriaNoun.slice(1)}` : "Criteria"} it serves</h2>
      <p className="muted small chart-intro">
        Which <a href={href(`/goals/${goal.id}`)}>{goal.name}</a> {goal.criteriaNoun || "criteria"} this policy is meant to strengthen.
      </p>
      <ul className="link-list">
        {rows.map(({ criterion: c, reason }) => (
          <li key={c.id}>
            <strong>{c.name}</strong>
            <span className="muted"> — {reason}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
