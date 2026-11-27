import { scaleLabel, isScored } from "../lib/goals.js";

// Maps a score onto the five-step diverging palette (--score-0 … --score-4),
// normalised to the goal's scale so goals with other ranges still read
// red → neutral → blue.
export function scoreStep(goal, value) {
  const values = goal.scale.map((s) => s.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  return hi === lo ? 2 : Math.round(((value - lo) / (hi - lo)) * 4);
}

export const scoreColor = (goal, value) => `var(--score-${scoreStep(goal, value)})`;

export function ScoreChip({ goal, value, label, title, basis }) {
  if (value == null) return <span className="score score-na" title={title || "Not addressed"}>–</span>;
  const step = scoreStep(goal, value);
  const inferred = basis === "inferred";
  const tip = title || scaleLabel(goal, value);
  return (
    <span className={`score score-${step}${inferred ? " score-inferred" : ""}`} title={inferred ? `Inferred: ${tip}` : tip}>
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
              <ScoreChip goal={goal} value={s?.score} basis={s?.basis} />
              <div>
                <div className="assessment-name">
                  {c.name}
                  {s && !isScored(s) && <span className="muted"> · not addressed</span>}
                  {s?.basis === "inferred" && <span className="muted"> · inferred</span>}
                </div>
                <div className="assessment-reason">{s ? s.reason || "No reason given." : "Not scored."}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="assessment-foot">
        <span>
          Average <strong>{assessment.average != null ? assessment.average.toFixed(1) : "–"}</strong>
          {assessment.notAddressed.length > 0 && (
            <span className="muted"> over {assessment.scored} of {goal.criteria.length}</span>
          )}
        </span>
        <span>
          Rating{" "}
          {assessment.rating != null ? (
            <ScoreChip goal={goal} value={assessment.rating} label />
          ) : (
            <span className="muted">{assessment.complete ? "too few addressed" : "incomplete"}</span>
          )}
        </span>
        {assessment.capped && <span className="muted">held down by the weakest-link rule</span>}
      </div>
    </div>
  );
}
