import { scaleLabel } from "../lib/goals.js";

// Coloured 1–5 pill. Colour is normalised to the goal's scale, so goals with
// other ranges still read red → green.
export function ScoreChip({ goal, value, label, title }) {
  if (value == null) return <span className="score score-na">–</span>;
  const values = goal.scale.map((s) => s.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const step = hi === lo ? 2 : Math.round(((value - lo) / (hi - lo)) * 4);
  return (
    <span className={`score score-${step}`} title={title || scaleLabel(goal, value)}>
      {label ? `${value} · ${scaleLabel(goal, value)}` : value}
    </span>
  );
}

// Per-criterion breakdown of one scenario's assessment.
export function AssessmentCard({ goal, assessment }) {
  return (
    <div className="assessment">
      <ul className="assessment-rows">
        {goal.criteria.map((c) => {
          const s = assessment.scores[c.id];
          return (
            <li key={c.id}>
              <ScoreChip goal={goal} value={s?.score} />
              <div>
                <div className="assessment-name">{c.name}</div>
                <div className="assessment-reason">{s ? s.reason || "No reason given." : "Not scored."}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="assessment-foot">
        <span>
          Average <strong>{assessment.average.toFixed(1)}</strong>
        </span>
        <span>
          Rating{" "}
          {assessment.rating != null ? (
            <ScoreChip goal={goal} value={assessment.rating} label />
          ) : (
            <span className="muted">incomplete</span>
          )}
        </span>
        {assessment.capped && <span className="muted">held down by the weakest-link rule</span>}
      </div>
    </div>
  );
}
