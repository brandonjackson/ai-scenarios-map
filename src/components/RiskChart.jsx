import { useState } from "react";
import { scaleLabel } from "../lib/goals.js";
import { scoreColor } from "./Assessment.jsx";

// Diverging stacked bar (Likert-style) per criterion: scores below the
// midpoint extend left, above extend right, the midpoint straddles the
// centre line. Rows are sorted so the most-broken criterion is on top.
export default function RiskChart({ goal, assessments }) {
  const [tip, setTip] = useState(null);
  const values = goal.scale.map((s) => s.value).sort((a, b) => a - b);
  const mid = (values[0] + values[values.length - 1]) / 2;

  const rows = goal.criteria
    .map((c) => {
      const byValue = Object.fromEntries(values.map((v) => [v, []]));
      for (const { title, a } of assessments) {
        const s = a.scores[c.id];
        if (s && byValue[s.score]) byValue[s.score].push(title);
      }
      const n = assessments.filter(({ a }) => a.scores[c.id]).length || 1;
      const share = (v) => byValue[v].length / n;
      const half = (v) => (v === mid ? share(v) / 2 : share(v));
      return {
        c,
        n,
        byValue,
        left: values.filter((v) => v <= mid).reduce((t, v) => t + half(v), 0),
        right: values.filter((v) => v >= mid).reduce((t, v) => t + half(v), 0),
        below: values.filter((v) => v < mid).reduce((t, v) => t + share(v), 0),
        share,
      };
    })
    .sort((x, y) => y.below - x.below);

  const maxLeft = Math.max(...rows.map((r) => r.left), 0.01);
  const maxRight = Math.max(...rows.map((r) => r.right), 0.01);
  const leftPct = (maxLeft / (maxLeft + maxRight)) * 100;
  const midLabel = (scaleLabel(goal, values.find((v) => v >= mid)) || "the midpoint").toLowerCase();

  const segment = (r, v, side) => {
    const count = r.byValue[v].length;
    if (!count) return null;
    const frac = v === mid ? r.share(v) / 2 : r.share(v);
    const width = (frac / (side === "left" ? maxLeft : maxRight)) * 100;
    return (
      <div
        key={`${side}-${v}`}
        className="risk-seg"
        style={{ width: `${width}%`, background: scoreColor(goal, v) }}
        onMouseEnter={(e) => {
          const box = e.currentTarget.closest(".risk").getBoundingClientRect();
          const seg = e.currentTarget.getBoundingClientRect();
          setTip({ r, v, x: seg.left + seg.width / 2 - box.left, y: seg.top - box.top });
        }}
        onMouseLeave={() => setTip(null)}
      />
    );
  };

  return (
    <figure className="risk">
      <div className="risk-legend" aria-hidden="true">
        {values.map((v) => (
          <span key={v}>
            <i style={{ background: scoreColor(goal, v) }} />
            {v} · {scaleLabel(goal, v)}
          </span>
        ))}
      </div>
      <div className="risk-rows" role="img" aria-label={`Share of scenarios scored below ${midLabel}: ${rows.map((r) => `${r.c.name} ${Math.round(r.below * 100)}%`).join(", ")}`}>
        {rows.map((r) => (
          <div className="risk-row" key={r.c.id}>
            <div className="risk-label">{r.c.name}</div>
            <div className="risk-bar">
              <div className="risk-side risk-left" style={{ width: `${leftPct}%` }}>
                {values.filter((v) => v <= mid).map((v) => segment(r, v, "left"))}
              </div>
              <div className="risk-side risk-right" style={{ width: `${100 - leftPct}%` }}>
                {values.filter((v) => v >= mid).map((v) => segment(r, v, "right"))}
              </div>
              <div className="risk-centre" style={{ left: `${leftPct}%` }} />
            </div>
            <div className="risk-stat">
              <strong>{Math.round(r.below * 100)}%</strong> below {midLabel}
            </div>
          </div>
        ))}
      </div>
      {tip && (
        <div className="risk-tip" style={{ left: tip.x, top: tip.y }}>
          <div className="risk-tip-head">
            <i style={{ background: scoreColor(goal, tip.v) }} />
            {tip.r.c.name} · {tip.v} {scaleLabel(goal, tip.v)}
          </div>
          <div className="risk-tip-count">
            {tip.r.byValue[tip.v].length} of {tip.r.n} scenarios ({Math.round(tip.r.share(tip.v) * 100)}%)
          </div>
          <div className="risk-tip-list">
            {tip.r.byValue[tip.v].slice(0, 8).join(", ")}
            {tip.r.byValue[tip.v].length > 8 && ` +${tip.r.byValue[tip.v].length - 8} more`}
          </div>
        </div>
      )}
    </figure>
  );
}
