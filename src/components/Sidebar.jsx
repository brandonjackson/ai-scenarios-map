import scenariosData from "../../data/scenarios.json";
import { policies } from "../data.js";
import { goals } from "../goals.js";
import { href } from "../router.js";

const NAV = [
  { key: "overview", label: "Overview", path: "/", icon: "◫" },
  { key: "scenarios", label: "Scenarios", path: "/scenarios", icon: "◇", count: scenariosData.length },
  { key: "goals", label: "Goals", path: "/goals", icon: "◎", count: goals.length },
  { key: "policies", label: "Policies", path: "/policies", icon: "▤", count: policies.length },
];

export default function Sidebar({ active }) {
  return (
    <nav className="sidebar" aria-label="Main">
      <a className="brand" href={href("/")}>
        <span className="brand-mark" aria-hidden="true" />
        <span>
          AI Scenarios
          <small>Literature Map</small>
        </span>
      </a>
      <ul className="nav-list">
        {NAV.map((n) => (
          <li key={n.key}>
            <a
              href={href(n.path)}
              className={`nav-link${active === n.key ? " active" : ""}`}
              aria-current={active === n.key ? "page" : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
              {n.count != null && <span className="nav-count">{n.count}</span>}
            </a>
          </li>
        ))}
      </ul>
      <div className="sidebar-foot">
        <a href="https://github.com/brandonjackson/ai-scenarios-map" target="_blank" rel="noopener noreferrer">
          Source on GitHub ↗
        </a>
      </div>
    </nav>
  );
}
