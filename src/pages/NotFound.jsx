import { href } from "../router.js";

export default function NotFound() {
  return (
    <div>
      <header className="page-header">
        <h1>Page not found</h1>
        <p>
          That page doesn't exist. <a href={href("/")}>Back to the overview</a>.
        </p>
      </header>
    </div>
  );
}
