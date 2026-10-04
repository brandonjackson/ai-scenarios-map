import { useMemo, useState } from "react";
import { scenarios, axes, hasAxis, quadrantLabel, splitTags, policiesForScenario, policyNoteForScenario } from "../data.js";
import { href } from "../router.js";
import { goals, defaultGoal, assessScenario } from "../goals.js";
import { AssessmentCard, ScoreChip } from "../components/Assessment.jsx";
import { scenarioNotes, splitSections, renderMarkdown, POLICY_STANCES } from "../scenarioNotes.js";
import { LIKELIHOOD, LikelihoodBadge, LikelihoodScale, likelihoodOf, byDateDesc, formatDate } from "../likelihood.jsx";

const TYPES = [
  { key: "all", label: "All" },
  { key: "single", label: "Single Vision" },
  { key: "framework", label: "Framework Sub-scenario" },
];

const SORTS = {
  newest: { label: "Newest first", cmp: byDateDesc },
  oldest: { label: "Oldest first", cmp: (a, b) => -byDateDesc(a, b) },
  likely: { label: "Most likely first", cmp: (a, b) => (likelihoodOf(b)?.level || 0) - (likelihoodOf(a)?.level || 0) || byDateDesc(a, b) },
  unlikely: { label: "Least likely first", cmp: (a, b) => (likelihoodOf(a)?.level || 9) - (likelihoodOf(b)?.level || 9) || byDateDesc(a, b) },
  title: { label: "Title A–Z", cmp: (a, b) => a.title.localeCompare(b.title) },
};

const typeLabel = (t) => (t === "framework" ? "Framework" : "Single Vision");

function TypeBadge({ type }) {
  return <span className={`badge badge-${type}`}>{typeLabel(type)}</span>;
}

function PolicyBadge({ policy }) {
  const p = POLICY_STANCES[policy];
  if (!p) return null;
  return (
    <span className={`badge badge-policy-${policy}`} title={p.hint}>
      {p.label}
    </span>
  );
}

export function ScenariosList() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [policy, setPolicy] = useState("all");
  const [likelihood, setLikelihood] = useState("all");
  const [sort, setSort] = useState("newest");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scenarios
      .filter((s) => type === "all" || s.type === type)
      .filter((s) => policy === "all" || s.policy === policy)
      .filter((s) => likelihood === "all" || s.likelihood === likelihood)
      .filter(
        (s) =>
          !q ||
          [s.title, s.author, s.desc, s.framework, s.tags]
            .join(" ")
            .toLowerCase()
            .includes(q)
      )
      .sort(SORTS[sort].cmp);
  }, [query, type, policy, likelihood, sort]);

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
        <label className="select">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
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
        <div className="chips" role="group" aria-label="Filter by policy stance">
          {[["all", "Any stance"], ...Object.entries(POLICY_STANCES).map(([k, v]) => [k, v.label])].map(([k, label]) => (
            <button
              key={k}
              className={`chip${policy === k ? " active" : ""}`}
              onClick={() => setPolicy(k)}
              title={POLICY_STANCES[k]?.hint}
            >
              {k !== "all" && <span className={`dot dot-policy-${k}`} />}
              {label}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Filter by likelihood">
          {[{ key: "all", label: "Any likelihood" }, ...LIKELIHOOD].map((l) => (
            <button
              key={l.key}
              className={`chip${likelihood === l.key ? " active" : ""}`}
              onClick={() => setLikelihood(l.key)}
              title={l.hint}
            >
              {l.level && <span className={`dot dot-lk lk-${l.level}`} />}
              {l.label}
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
                  <LikelihoodBadge s={s} />
                  <RatingBadge s={s} />
                  <PolicyBadge policy={s.policy} />
                  <TypeBadge type={s.type} />
                </div>
              </div>
              <div className="card-meta">
                {formatDate(s.date, s.year)} · {s.author}
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
  // Keyed on id so the selected tab resets when moving between scenarios.
  return <ScenarioDetailInner key={id} id={id} />;
}

function ScenarioDetailInner({ id }) {
  const [tab, setTab] = useState("overview");
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
  const notes = scenarioNotes(s.id);
  const tabs = [
    { key: "overview", label: "Overview" },
    notes.summary && { key: "summary", label: "Social contract summary" },
    notes.analysis && { key: "analysis", label: "Assumptions" },
  ].filter(Boolean);

  return (
    <article>
      <Crumbs title={s.title} />
      <header className="page-header">
        <div className="detail-kicker">
          <TypeBadge type={s.type} />
          <PolicyBadge policy={s.policy} />
          <LikelihoodBadge s={s} />
          {s.framework && <span className="muted">{s.framework}</span>}
        </div>
        <h1>{s.title}</h1>
        <div className="detail-meta">
          {s.author} · {formatDate(s.date, s.year)}
        </div>
      </header>

      {tabs.length > 1 && (
        <div className="tabs" role="tablist" aria-label="Scenario views">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`tab${tab === t.key ? " active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {tab === "summary" && notes.summary && <SocialContractSummary s={s} md={notes.summary} />}
      {tab === "analysis" && notes.analysis && <Note md={notes.analysis} />}

      {tab === "overview" && <div className="detail-grid">
        <div>
          <section className="section">
            <h2>At a glance</h2>
            <p className="prose">{s.desc}</p>
            {s.url && (
              <p>
                <a className="button" href={s.url} target="_blank" rel="noopener noreferrer">
                  Read the source ↗
                </a>
              </p>
            )}
          </section>

          <section className="section">
            <h2>Likelihood</h2>
            <LikelihoodScale s={s} />
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

          <AtlasPolicies s={s} />

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
      </div>}
      <NotesFooter id={s.id} />
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

// summary.md, with each promise's draft score shown beside its heading.
function SocialContractSummary({ s, md }) {
  const { lead, sections } = splitSections(md);
  const a = assessScenario(defaultGoal, s.id);
  return (
    <div className="note">
      <div className="md note-lead" dangerouslySetInnerHTML={renderMarkdown(lead)} />
      {sections.map((sec) => {
        const c = defaultGoal.criteria.find((c) => c.name.toLowerCase() === sec.heading.toLowerCase());
        const score = c && a?.scores[c.id];
        return (
          <section key={sec.heading} className={`note-section${c ? " note-promise" : ""}`}>
            <h2>
              {c && <ScoreChip goal={defaultGoal} value={score?.score} label={!!score} />}
              <span>{sec.heading}</span>
            </h2>
            <div className="md" dangerouslySetInnerHTML={renderMarkdown(sec.body)} />
          </section>
        );
      })}
      {a && (
        <p className="muted small">
          Scores are drafts from <a href={href(`/goals/${defaultGoal.id}`)}>{defaultGoal.name}</a>; the
          text is a reading of the source.
        </p>
      )}
    </div>
  );
}

function Note({ md }) {
  const { lead, sections } = splitSections(md);
  return (
    <div className="note">
      {lead && <div className="md note-lead" dangerouslySetInnerHTML={renderMarkdown(lead)} />}
      {sections.map((sec) => (
        <section key={sec.heading} className="note-section">
          <h2>
            <span>{sec.heading}</span>
          </h2>
          <div className="md" dangerouslySetInnerHTML={renderMarkdown(sec.body)} />
        </section>
      ))}
    </div>
  );
}

const REPO = "https://github.com/brandonjackson/ai-scenarios-map/tree/main/scenarios";

function NotesFooter({ id }) {
  return (
    <p className="muted small notes-footer">
      Context for this scenario lives in{" "}
      <a href={`${REPO}/${id}`} target="_blank" rel="noopener noreferrer">
        <code>scenarios/{id}/</code>
      </a>
      .
    </p>
  );
}

// Policy Atlas policies the scenario names, for scenarios that assume or
// prescribe policy.
function AtlasPolicies({ s }) {
  const tagged = policiesForScenario(s.id);
  const note = policyNoteForScenario(s.id);
  if (!tagged.length && !note) return null;
  return (
    <section className="section">
      <h2>Policies from the atlas</h2>
      {tagged.length > 0 ? (
        <div className="table-wrap">
          <table className="data-table atlas-table">
            <thead>
              <tr>
                <th>Policy</th>
                <th>How this scenario uses it</th>
              </tr>
            </thead>
            <tbody>
              {tagged.map(({ policy: p, evidence }) => (
                <tr key={p.slug} data-cat={p.category}>
                  <th scope="row">
                    <a className="badge badge-cat" href={href(`/policies/${p.slug}`)}>{p.title}</a>
                  </th>
                  <td>{evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="muted small">No atlas policies named. {note}</p>
      )}
    </section>
  );
}
