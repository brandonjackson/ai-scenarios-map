import { scenarios, policies } from "../data.js";
import { goals, defaultGoal, goalById, assessScenario } from "../goals.js";
import { describeAggregation } from "../lib/goals.js";
import { ScoreChip } from "../components/Assessment.jsx";
import { href } from "../router.js";

const scenarioById = Object.fromEntries(scenarios.map((s) => [s.id, s]));
const policyBySlug = Object.fromEntries(policies.map((p) => [p.slug, p]));
const assessedIds = (goal) => Object.keys(goal.assessments).filter((id) => scenarioById[id]);

export function GoalsList() {
  return (
    <div>
      <header className="page-header">
        <h1>Goals</h1>
        <p>
          A goal function is the yardstick scenarios are assessed against: a
          set of criteria, a scoring scale and a rule for combining them. Add
          your own in the <code>goals/</code> folder of the repository.
        </p>
      </header>
      <ul className="card-list">
        {goals.map((g) => (
          <li key={g.id}>
            <a className="card" href={href(`/goals/${g.id}`)}>
              <div className="card-head">
                <h2 className="card-title">{g.name}</h2>
                {g.id === defaultGoal.id && <span className="badge badge-single">Default</span>}
              </div>
              <div className="card-meta">
                {[g.author, g.status].filter(Boolean).join(" · ")}
              </div>
              <p className="card-body">{g.summary}</p>
              <div className="card-tags">
                {g.criteria.map((c) => (
                  <span key={c.id} className="tag">{c.name}</span>
                ))}
                <span className="tag tag-muted">{assessedIds(g).length} scenarios assessed</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Scorecard({ goal, rows }) {
  return (
    <div className="table-wrap">
      <table className="scorecard">
        <thead>
          <tr>
            <th>Scenario</th>
            {goal.criteria.map((c) => (
              <th key={c.id} title={c.vow}>{c.short || c.name}</th>
            ))}
            <th>Average</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, label, link, a, base }) => (
            <tr key={key}>
              <th scope="row">{link ? <a href={link}>{label}</a> : label}</th>
              {goal.criteria.map((c) => {
                const s = a.scores[c.id];
                const delta = base && s && base.scores[c.id] ? s.score - base.scores[c.id].score : 0;
                return (
                  <td key={c.id}>
                    <ScoreChip goal={goal} value={s?.score} title={s?.reason} />
                    {delta !== 0 && <span className={`delta ${delta > 0 ? "up" : "down"}`}>{delta > 0 ? `+${delta}` : delta}</span>}
                  </td>
                );
              })}
              <td className="mono">{a.average.toFixed(1)}</td>
              <td>
                {a.rating != null ? <ScoreChip goal={goal} value={a.rating} label /> : <span className="muted">incomplete</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GoalDetail({ id }) {
  const goal = goalById(id);
  if (!goal) {
    return (
      <div>
        <Crumbs />
        <div className="empty">No goal with id “{id}”.</div>
      </div>
    );
  }

  const ids = assessedIds(goal);
  const baseline = ids
    .map((sid) => ({ key: sid, label: scenarioById[sid].title, link: href(`/scenarios/${sid}`), a: assessScenario(goal, sid) }))
    .filter((r) => r.a)
    .sort((x, y) => (y.a.rating ?? 0) - (x.a.rating ?? 0) || y.a.average - x.a.average);
  const policyTests = ids.flatMap((sid) =>
    Object.keys(goal.assessments[sid].policies).map((slug) => ({
      key: `${sid}|${slug}`,
      label: (
        <>
          <a href={href(`/scenarios/${sid}`)}>{scenarioById[sid].title}</a>
          <span className="muted"> + </span>
          <a href={href(`/policies/${slug}`)}>{policyBySlug[slug]?.title || slug}</a>
        </>
      ),
      a: assessScenario(goal, sid, slug),
      base: assessScenario(goal, sid),
    }))
  );
  const unassessed = scenarios.length - ids.length;
  const hasThreats = goal.criteria.some((c) => c.threats?.length || c.opportunities?.length);
  const hasAnchors = goal.criteria.some((c) => c.anchors && Object.keys(c.anchors).length);

  return (
    <article>
      <Crumbs title={goal.name} />
      <header className="page-header">
        <div className="detail-kicker">
          {goal.id === defaultGoal.id && <span className="badge badge-single">Default goal</span>}
          {goal.status && <span className="muted">{goal.status}</span>}
        </div>
        <h1>{goal.name}</h1>
        {goal.author && <div className="detail-meta">{goal.author}</div>}
      </header>

      <section className="section">
        <p className="prose">{goal.summary}</p>
        {goal.description && <p className="prose prose-muted">{goal.description}</p>}
      </section>

      <section className="section">
        <h2>Criteria</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>The vow</th>
                {goal.criteria.some((c) => c.weight != null) && <th>Weight</th>}
              </tr>
            </thead>
            <tbody>
              {goal.criteria.map((c) => (
                <tr key={c.id}>
                  <th scope="row">{c.name}</th>
                  <td>{c.vow || c.description}</td>
                  {goal.criteria.some((x) => x.weight != null) && <td className="mono">{c.weight ?? 1}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="pros-cons">
        <section className="section">
          <h2>Scale</h2>
          <ul className="scale-list">
            {goal.scale.map((s) => (
              <li key={s.value}>
                <ScoreChip goal={goal} value={s.value} label />
                <span className="muted">{s.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="section">
          <h2>How scoring works</h2>
          {goal.rules?.length > 0 && (
            <ol className="rules">
              {goal.rules.map((r) => (
                <li key={r.name}>
                  <strong>{r.name}.</strong> {r.text}
                </li>
              ))}
            </ol>
          )}
          <p className="formula">{describeAggregation(goal)}</p>
        </section>
      </div>

      <section className="section">
        <h2>Scenarios assessed</h2>
        {baseline.length ? (
          <Scorecard goal={goal} rows={baseline} />
        ) : (
          <div className="empty">No scenarios have been scored against this goal yet.</div>
        )}
        {unassessed > 0 && (
          <p className="muted small">
            {unassessed} of {scenarios.length} scenarios not yet assessed. Add rows to{" "}
            <code>goals/{goal.id}/scores.csv</code> to score them.
          </p>
        )}
      </section>

      {policyTests.length > 0 && (
        <section className="section">
          <h2>Policy tests</h2>
          <p className="muted small">Each scenario rescored with a policy in place; changes are shown against its baseline.</p>
          <Scorecard goal={goal} rows={policyTests} />
        </section>
      )}

      {hasThreats && (
        <section className="section">
          <h2>Threats and opportunities</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>Threats</th>
                  <th>Opportunities</th>
                </tr>
              </thead>
              <tbody>
                {goal.criteria.map((c) => (
                  <tr key={c.id}>
                    <th scope="row">{c.name}</th>
                    <td className="threat">{(c.threats || []).join(". ")}{c.threats?.length ? "." : ""}</td>
                    <td className="opportunity">{(c.opportunities || []).join(". ")}{c.opportunities?.length ? "." : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {hasAnchors && (
        <section className="section">
          <h2>Rubric anchors</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  {goal.scale.map((s) => (
                    <th key={s.value}>{s.value}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {goal.criteria.map((c) => (
                  <tr key={c.id}>
                    <th scope="row">{c.name}</th>
                    {goal.scale.map((s) => (
                      <td key={s.value}>{c.anchors?.[s.value] || ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {goal.notes?.length > 0 && (
        <section className="section">
          <h2>Notes</h2>
          <ul className="bullets">
            {goal.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function Crumbs({ title }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href={href("/goals")}>Goals</a>
      {title && <> <span aria-hidden="true">/</span> <span>{title}</span></>}
    </nav>
  );
}

