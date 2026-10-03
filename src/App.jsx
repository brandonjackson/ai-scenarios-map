import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview.jsx";
import Maps from "./pages/Maps.jsx";
import { GoalsList, GoalDetail } from "./pages/Goals.jsx";
import { PoliciesList, PolicyDetail } from "./pages/Policies.jsx";
import { ScenariosList, ScenarioDetail } from "./pages/Scenarios.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useRoute } from "./router.js";

function resolve([section, id]) {
  switch (section) {
    case undefined:
      return { nav: "overview", page: <Overview /> };
    case "maps":
      return { nav: "maps", page: <Maps /> };
    case "goals":
      return {
        nav: "goals",
        page: id ? <GoalDetail id={id} /> : <GoalsList />,
      };
    case "policies":
      return {
        nav: "policies",
        page: id ? <PolicyDetail slug={id} /> : <PoliciesList />,
      };
    case "scenarios":
      return {
        nav: "scenarios",
        page: id ? <ScenarioDetail id={id} /> : <ScenariosList />,
      };
    default:
      return { nav: null, page: <NotFound /> };
  }
}

export default function App() {
  const route = useRoute();
  const { nav, page } = resolve(route);
  return (
    <div className="shell">
      <Sidebar active={nav} />
      <main className="main">
        <div className="content" key={route.join("/")}>
          {page}
        </div>
      </main>
    </div>
  );
}
