import { useEffect, useState } from "react";

// Minimal hash router — GitHub Pages serves a single index.html, so hash
// routes avoid needing server-side rewrites for deep links.
const parse = () => {
  const path = window.location.hash.replace(/^#/, "") || "/";
  return path.split("/").filter(Boolean);
};

export function useRoute() {
  const [segments, setSegments] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setSegments(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return segments;
}

export const href = (path) => `#${path}`;
