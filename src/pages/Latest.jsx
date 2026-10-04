import { scenarios } from "../data.js";
import { href } from "../router.js";
import { POLICY_STANCES } from "../scenarioNotes.js";
import { LikelihoodBadge, byDateDesc, dateKey, formatDate } from "../likelihood.jsx";

// Scenarios that share a framework and a date came out in one publication,
// so they are shown together.
function publications() {
  const pubs = [];
  const seen = new Map();
  for (const s of [...scenarios].sort(byDateDesc)) {
    const key = s.framework ? `${s.framework}|${s.date || s.year}` : s.id;
    if (!seen.has(key)) {
      const pub = { key, framework: s.framework, items: [] };
      seen.set(key, pub);
      pubs.push(pub);
    }
    seen.get(key).items.push(s);
  }
  return pubs;
}

// "2026-06" → "June 2026"; year-only dates group under the year.
const periodOf = (s) => {
  const [y, m] = dateKey(s).split("-");
  return m === "00"
    ? `${y}, month not recorded`
    : new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-GB", { month: "long", year: "numeric" });
};

export default function Latest() {
  const pubs = publications();
  const periods = [];
  for (const p of pubs) {
    const label = periodOf(p.items[0]);
    if (periods.at(-1)?.label !== label) periods.push({ label, pubs: [] });
    periods.at(-1).pubs.push(p);
  }

  return (
    <div>
      <header className="page-header">
        <h1>Latest</h1>
        <p>
          The newest scenarios first, by publication date. Scenarios from the same framework and
          release are grouped together.
        </p>
      </header>

      <div className="timeline">
        {periods.map((period) => (
          <section key={period.label} className="timeline-period">
            <h2 className="timeline-label">{period.label}</h2>
            <ul className="card-list">
              {period.pubs.map((p) => (
                <li key={p.key}>
                  <Publication pub={p} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function Publication({ pub }) {
  const first = pub.items[0];
  if (!pub.framework) {
    return (
      <a className="card" href={href(`/scenarios/${first.id}`)}>
        <div className="card-head">
          <h3 className="card-title">{first.title}</h3>
          <div className="card-badges">
            <LikelihoodBadge s={first} />
          </div>
        </div>
        <div className="card-meta">
          {formatDate(first.date, first.year)} · {first.author} · {POLICY_STANCES[first.policy]?.label}
        </div>
        <p className="card-body">{first.desc}</p>
      </a>
    );
  }
  return (
    <div className="card pub-card">
      <div className="card-head">
        <h3 className="card-title">{pub.framework}</h3>
        <span className="tag">{pub.items.length} scenarios</span>
      </div>
      <div className="card-meta">
        {formatDate(first.date, first.year)} · {first.author}
        {first.url && (
          <>
            {" · "}
            <a href={first.url} target="_blank" rel="noopener noreferrer">Source ↗</a>
          </>
        )}
      </div>
      <ul className="pub-items">
        {pub.items.map((s) => (
          <li key={s.id}>
            <a href={href(`/scenarios/${s.id}`)} className="pub-item-title">{s.title}</a>
            <LikelihoodBadge s={s} />
            <p className="pub-item-desc">{s.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
