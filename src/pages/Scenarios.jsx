import { useMemo, useState } from "react";
import { scenarios, axes, hasAxis, quadrantLabel, splitTags } from "../data.js";
import { href } from "../router.js";
import { goals, defaultGoal, assessScenario } from "../goals.js";
import { AssessmentCard, ScoreChip } from "../components/Assessment.jsx";

const TYPES = [
  { key: "all", label: "All" },
  { key: "single", label: "Single Vision" },
  { key: "framework", label: "Framework Sub-scenario" },
];

const typeLabel = (t) => (t === "framework" ? "Framework" : "Single Vision");

function TypeBadge({ type }) {
  return <span className={`badge badge-${type}`}>{typeLabel(type)}</span>;
}

export function ScenariosList() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scenarios
      .filter((s) => type === "all" || s.type === type)
      .filter(
        (s) =>
          !q ||
          [s.title, s.author, s.desc, s.framework, s.tags]
            .join(" ")
            .toLowerCase()
            .includes(q)
      )
      .sort((a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title));
  }, [query, type]);

  return (
    <div>
      <header className="page-header">
        <h1>Scenarios</h1>
        <p>
          {scenarios.length} sources from the AI futures literature — single
          visions of where AI takes the economy, and sub-scenarios from
          multi-scenario frameworks.
        </p>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Search title, author, description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search scenarios"
        />
        <div className="chips" role="group" aria-label="Filter by type">
          {TYPES.map((t) => (
            <button
              key={t.key}
              className={`chip${type === t.key ? " active" : ""}`}
              onClick={() => setType(t.key)}
            >
              {t.key !== "all" && <span className={`dot dot-${t.key}`} />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="result-count">
        {rows.length} of {scenarios.length} scenarios
      </div>

      <ul className="card-list">
        {rows.map((s) => (
          <li key={s.id}>
            <a className="card" href={href(`/scenarios/${s.id}`)}>
              <div className="card-head">
                <h2 className="card-title">{s.title}</h2>
                <div className="card-badges">
                  <RatingBadge s={s} />
                  <TypeBadge type={s.type} />
                </div>
              </div>
              <div className="card-meta">
                {s.author} · {s.year}
                {s.framework && <> · {s.framework}</>}
              </div>
              <p className="card-body">{s.desc}</p>
              <div className="card-tags">
                {axes.map((a) => {
                  const q = quadrantLabel(s, a);
                  return (
                    <span key={a.id} className={`tag${q ? "" : " tag-muted"}`} title={a.name}>
                      {q || `${a.name}: not rated`}
                    </span>
                  );
                })}
              </div>
            </a>
          </li>
        ))}
      </ul>
      {rows.length === 0 && <div className="empty">No scenarios match these filters.</div>}
    </div>
  );
}

// Headline rating under the default goal, if this scenario has been scored.
function RatingBadge({ s }) {
  const a = assessScenario(defaultGoal, s.id);
  if (a?.rating == null) return null;
  return <ScoreChip goal={defaultGoal} value={a.rating} label title={`${defaultGoal.name}: average ${a.average.toFixed(1)}`} />;
}

// Small 2×2 showing where one scenario sits on an axis pair.
function MiniQuadrant({ s, a }) {
  const size = 168;
  const pad = 14;
  const inner = size - pad * 2;
  const rated = hasAxis(s, a);
  const cx = rated ? pad + ((s[a.xField] + 1) / 2) * inner : 0;
  const ny = rated ? (s[a.yField] + 1) / 2 : 0;
  const cy = pad + (a.yInvert ? 1 - ny : ny) * inner;
  const color = s.type === "framework" ? "var(--framework)" : "var(--single)";
  return (
    <figure className="mini">
      <figcaption>{a.name}</figcaption>
      <div className="mini-body">
        <span className="mini-y">{a.yLabel[1]}</span>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img"
          aria-label={rated ? quadrantLabel(s, a) : "Not rated"}>
          <rect x={pad} y={pad} width={inner} height={inner} rx={4} className="mini-frame" />
          <rect x={pad + inner / 2} y={pad} width={inner / 2} height={inner / 2} className="mini-best" />
          <line x1={pad + inner / 2} y1={pad} x2={pad + inner / 2} y2={pad + inner} className="mini-axis" />
          <line x1={pad} y1={pad + inner / 2} x2={pad + inner} y2={pad + inner / 2} className="mini-axis" />
          {rated &&
            (s.type === "framework" ? (
              <rect x={cx - 6} y={cy - 6} width={12} height={12} rx={2.5} fill={color} />
            ) : (
              <circle cx={cx} cy={cy} r={7} fill={color} />
            ))}
          {!rated && (
            <text x={size / 2} y={size / 2 + 4} textAnchor="middle" className="mini-na">not rated</text>
          )}
        </svg>
        <span className="mini-y">{a.yLabel[0]}</span>
        <div className="mini-x">
          <span>← {a.xLabel[0]}</span>
          <span>{a.xLabel[1]} →</span>
        </div>
      </div>
      {rated && <div className="mini-quad">{quadrantLabel(s, a)}</div>}
    </figure>
  );
}

export function ScenarioDetail({ id }) {
  const s = scenarios.find((x) => x.id === id);
  if (!s) {
    return (
      <div>
        <Crumbs />
        <div className="empty">No scenario with id “{id}”.</div>
      </div>
    );
  }
  const siblings = s.framework
    ? scenarios.filter((o) => o.framework === s.framework && o.id !== s.id)
    : [];

  return (
    <article>
      <Crumbs title={s.title} />
      <header className="page-header">
        <div className="detail-kicker">
          <TypeBadge type={s.type} />
          {s.framework && <span className="muted">{s.framework}</span>}
        </div>
        <h1>{s.title}</h1>
        <div className="detail-meta">
          {s.author} · {s.year}
        </div>
      </header>

      <div className="detail-grid">
        <div>
          <section className="section">
            <h2>Summary</h2>
            <p className="prose">{s.desc}</p>
            {s.url && (
              <p>
                <a className="button" href={s.url} target="_blank" rel="noopener noreferrer">
                  Read the source ↗
                </a>
              </p>
            )}
          </section>

          {goals.map((g) => {
            const a = assessScenario(g, s.id);
            if (!a && g.id !== defaultGoal.id) return null;
            return (
              <section className="section" key={g.id}>
                <h2>
                  Assessed against <a href={href(`/goals/${g.id}`)}>{g.name}</a>
                </h2>
                {a ? (
                  <AssessmentCard goal={g} assessment={a} />
                ) : (
                  <p className="muted small">
                    Not yet assessed. Add rows to <code>goals/{g.id}/scores.csv</code> to score it.
                  </p>
                )}
              </section>
            );
          })}

          {splitTags(s.tags).length > 0 && (
            <section className="section">
              <h2>Ratings notes</h2>
              <div className="card-tags">
                {splitTags(s.tags).map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </section>
          )}

          {siblings.length > 0 && (
            <section className="section">
              <h2>Other scenarios in {s.framework}</h2>
              <ul className="link-list">
                {siblings.map((o) => (
                  <li key={o.id}>
                    <a href={href(`/scenarios/${o.id}`)}>{o.title}</a>
                    <span className="muted"> — {o.desc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="section">
          <h2>Position on the map</h2>
          <div className="mini-stack">
            {axes.map((a) => (
              <MiniQuadrant key={a.id} s={s} a={a} />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}

function Crumbs({ title }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href={href("/scenarios")}>Scenarios</a>
      {title && <> <span aria-hidden="true">/</span> <span>{title}</span></>}
    </nav>
  );
}
