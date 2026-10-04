import likelihoodData from "../data/likelihood.json";

// Five-step likelihood scale (data/likelihood.json), least to most likely.
export const LIKELIHOOD = likelihoodData.scale.map((l, i) => ({ ...l, level: i + 1 }));
export const likelihoodNote = likelihoodData.note;
export const likelihoodReviewed = likelihoodData.reviewed;

const byKey = Object.fromEntries(LIKELIHOOD.map((l) => [l.key, l]));
export const likelihoodOf = (s) => byKey[s?.likelihood] || null;
export const likelihoodColor = (key) => (byKey[key] ? `var(--lk-${byKey[key].level})` : "var(--border-strong)");

// Pips filled up to the scenario's level, then the label.
export function LikelihoodBadge({ s, compact }) {
  const l = likelihoodOf(s);
  if (!l) return null;
  return (
    <span className={`lk lk-${l.level}`} title={`Likelihood: ${l.label}. ${s.likelihood_reason || l.hint}`}>
      <span className="lk-pips" aria-hidden="true">
        {LIKELIHOOD.map((x) => <i key={x.key} className={x.level <= l.level ? "on" : ""} />)}
      </span>
      {!compact && l.label}
    </span>
  );
}

// The whole scale with the scenario's step highlighted, for detail pages.
export function LikelihoodScale({ s }) {
  const l = likelihoodOf(s);
  return (
    <div className="lk-scale">
      <ol className="lk-steps">
        {LIKELIHOOD.map((x) => (
          <li key={x.key} className={`lk-step lk-${x.level}${l?.key === x.key ? " active" : ""}`} title={x.hint}>
            {x.label}
          </li>
        ))}
      </ol>
      {l ? (
        <p className="prose lk-reason">
          <strong>{l.label}.</strong> {s.likelihood_reason || l.hint}
        </p>
      ) : (
        <p className="muted small">Not yet rated.</p>
      )}
      <p className="muted small">
        {likelihoodNote} Last reviewed {formatDate(likelihoodReviewed)}.
      </p>
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates are YYYY, YYYY-MM or YYYY-MM-DD; show only the precision we have.
export function formatDate(date, fallbackYear) {
  if (!date) return fallbackYear ? String(fallbackYear) : "";
  const [y, m, d] = date.split("-");
  if (!m) return y;
  return d ? `${Number(d)} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${y}`;
}

// Sort key: a date missing its month or day sorts after full dates in that period.
export const dateKey = (s) => {
  const [y = String(s.year || 0), m = "00", d = "00"] = (s.date || "").split("-").filter(Boolean);
  return `${y}-${m}-${d}`;
};
// Newest first; ties keep their existing order (sort is stable).
export const byDateDesc = (a, b) => dateKey(b).localeCompare(dateKey(a));
