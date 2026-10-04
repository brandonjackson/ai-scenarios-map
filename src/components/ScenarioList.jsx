import { href } from "../router.js";

// A compact list of scenarios: one row each, title on top, a meta line
// (author, date…) underneath, and badges in a trailing column that drops
// onto the meta line on narrow screens so rows never wrap into a jumble.
// `bare` drops the top rule, for a list that sits alone inside a card.
export function ScenarioList({ bare, children }) {
  return <ul className={`scenario-list${bare ? " bare" : ""}`}>{children}</ul>;
}

// `meta` defaults to the author; `aside` holds badges; `children` is an
// optional body (e.g. a description) spanning the full row width.
export function ScenarioRow({ s, meta = s.author, aside, children }) {
  return (
    <li className={`scenario-row${meta ? "" : " no-meta"}`}>
      <a className="scenario-row-title" href={href(`/scenarios/${s.id}`)}>
        {s.title}
      </a>
      {meta && <div className="scenario-row-meta">{meta}</div>}
      {aside && <div className="scenario-row-aside">{aside}</div>}
      {children && <div className="scenario-row-body">{children}</div>}
    </li>
  );
}

// A labelled group of rows, e.g. all scenarios sharing one rating. The
// heading (often a badge) is shown once rather than repeated on every row.
export function ScenarioGroup({ heading, count, children }) {
  return (
    <section className="scenario-group">
      <header className="scenario-group-head">
        {heading}
        {count != null && <span className="scenario-group-count">{count}</span>}
      </header>
      <ScenarioList>{children}</ScenarioList>
    </section>
  );
}
