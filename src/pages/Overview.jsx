import { scenarios } from "../data.js";
import { LikelihoodBadge } from "../likelihood.jsx";
import { defaultGoal as goal, assessScenario } from "../goals.js";
import { scaleLabel } from "../lib/goals.js";
import { ScoreChip, scoreColor } from "../components/Assessment.jsx";
import { ScenarioGroup, ScenarioRow } from "../components/ScenarioList.jsx";
import { href } from "../router.js";

const values = goal.scale.map((s) => s.value).sort((a, b) => a - b);
const lo = values[0];
const hi = values[values.length - 1];
const mid = (lo + hi) / 2;

// Position of a (possibly fractional) score along a track of equal-width
// segments, one per scale step, as a percentage from the left.
const pos = (v) => ((v - lo + 0.5) / values.length) * 100;

const mean = (xs) => (xs.length ? xs.reduce((t, x) => t + x, 0) / xs.length : null);

// Baseline assessments for every scenario with the given policy stance.
const assessed = (stance) =>
  scenarios
    .filter((s) => s.policy === stance)
    .map((s) => ({ s, a: assessScenario(goal, s.id) }))
    .filter((r) => r.a?.complete);

const off = assessed("off");
const on = assessed("on");

const summarise = (rows) => ({
  n: rows.length,
  average: mean(rows.map((r) => r.a.average)),
  rating: mean(rows.map((r) => r.a.rating)),
  criteria: Object.fromEntries(
    goal.criteria.map((c) => [c.id, mean(rows.map((r) => r.a.scores[c.id].score))])
  ),
});

const offSum = summarise(off);
const onSum = summarise(on);

// Policy-off scenarios grouped by headline rating, worst first.
const groups = [...new Set(off.map((r) => r.a.rating))]
  .sort((x, y) => x - y)
  .map((rating) => ({
    rating,
    rows: off.filter((r) => r.a.rating === rating).sort((x, y) => x.a.average - y.a.average),
  }));

// Nearest scale label for a fractional score, e.g. 2.4 → "Broken for some".
const nearest = (v) => scaleLabel(goal, Math.min(hi, Math.max(lo, Math.round(v))));

function Track({ children, labels }) {
  return (
    <div className="sc-track-wrap">
      <div className="sc-track">
        {values.map((v) => (
          <div key={v} className="sc-seg" style={{ background: scoreColor(goal, v) }} />
        ))}
        {children}
      </div>
      {labels && (
        <div className="sc-ticks">
          {values.map((v) => (
            <div key={v} className="sc-tick">
              <strong>{v}</strong> {scaleLabel(goal, v)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// An arrow from the "stable" midpoint to where the average scenario lands.
function Trajectory({ to, ghost }) {
  if (to == null) return null;
  const a = pos(mid);
  const b = pos(to);
  return (
    <>
      <div
        className={`sc-arrow${b < a ? " left" : ""}`}
        style={{ left: `${Math.min(a, b)}%`, width: `${Math.abs(b - a)}%` }}
      />
      {ghost != null && <div className="sc-ghost" style={{ left: `${pos(ghost)}%` }} title={`Policy on: ${ghost.toFixed(1)}`} />}
      <div className="sc-marker" style={{ left: `${pos(to)}%` }} title={`Policy off: ${to.toFixed(1)}`} />
    </>
  );
}

export default function Overview() {
  const worst = goal.criteria
    .map((c) => ({ c, v: offSum.criteria[c.id] }))
    .sort((x, y) => x.v - y.v);
  const below = off.filter((r) => r.a.rating < mid).length;

  return (
    <div>
      <header className="page-header">
        <h1>Overview</h1>
        <p>
          Where does AI leave the social contract if governments do nothing
          new? Each of the {scenarios.length} scenarios in the literature is
          scored on {goal.criteria.length} promises society makes to its
          citizens. Here is the average path of the {offSum.n} scenarios that
          assume policy is absent, lagging or captured.
        </p>
      </header>

      <section className="section">
        <h2>The social contract scale</h2>
        <p className="muted small chart-intro">
          Every promise is scored from {lo} to {hi}, judged for the group that fares worst. {scaleLabel(goal, mid)} is
          the midpoint: disruption existing institutions can absorb.
        </p>
        <ul className="sc-scale">
          {goal.scale.map((s) => (
            <li key={s.value} style={{ "--c": scoreColor(goal, s.value) }}>
              <span className="sc-scale-value">{s.value}</span>
              <span className="sc-scale-label">{s.label}</span>
              <span className="sc-scale-meaning">{s.meaning}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>The policy-off trajectory</h2>
        <div className="sc-headline">
          <div className="sc-stat">
            <span className="sc-stat-num">{offSum.average.toFixed(1)}</span>
            <span className="sc-stat-label">
              average score with policy off
              <br />
              <strong>{nearest(offSum.average)}</strong>
            </span>
          </div>
          <div className="sc-stat">
            <span className="sc-stat-num">
              {below}/{offSum.n}
            </span>
            <span className="sc-stat-label">
              policy-off scenarios rated below
              <br />
              <strong>{scaleLabel(goal, mid)}</strong>
            </span>
          </div>
          <div className="sc-stat">
            <span className="sc-stat-num">{onSum.average.toFixed(1)}</span>
            <span className="sc-stat-label">
              average with policy on, for comparison
              <br />
              <strong>{nearest(onSum.average)}</strong>
            </span>
          </div>
        </div>
        <Track labels>
          <Trajectory to={offSum.average} ghost={onSum.average} />
        </Track>
        <div className="sc-legend">
          <span><i className="sc-key-arrow" /> Policy off: from {scaleLabel(goal, mid).toLowerCase()} to where the average scenario lands</span>
          <span><i className="sc-key-ghost" /> Policy on average</span>
        </div>
      </section>

      <section className="section">
        <h2>Promise by promise</h2>
        <p className="muted small chart-intro">
          Average policy-off score on each promise, most at risk first. The ring marks the policy-on average.
        </p>
        <div className="sc-rows">
          {worst.map(({ c, v }) => (
            <div className="sc-row" key={c.id}>
              <div className="sc-row-label">
                <strong>{c.name}</strong>
                <span className="muted">{c.vow}</span>
              </div>
              <Track>
                <Trajectory to={v} ghost={onSum.criteria[c.id]} />
              </Track>
              <div className="sc-row-stat">
                <strong>{v.toFixed(1)}</strong>
                <span className="muted">{nearest(v)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Policy-off scenarios</h2>
        <div className="scenario-groups">
          {groups.map(({ rating, rows }) => (
            <ScenarioGroup
              key={rating}
              heading={<ScoreChip goal={goal} value={rating} label />}
              count={`${rows.length} scenario${rows.length === 1 ? "" : "s"}`}
            >
              {rows.map(({ s }) => (
                <ScenarioRow key={s.id} s={s} aside={<LikelihoodBadge s={s} />} />
              ))}
            </ScenarioGroup>
          ))}
        </div>
        <p className="muted small">
          Scores are provisional; see <a href={href(`/goals/${goal.id}`)}>{goal.name}</a> for how they are made, or
          explore every scenario on the <a href={href("/maps")}>maps</a>.
        </p>
      </section>
    </div>
  );
}
