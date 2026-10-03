import { useState, useRef, useEffect, useMemo } from "react";
import scenariosData from "../../data/scenarios.json";
import axesData from "../../data/axes.json";
import { href } from "../router.js";
import { defaultGoal, assessScenario } from "../goals.js";
import { scaleLabel } from "../lib/goals.js";
import { ScoreChip, scoreColor } from "../components/Assessment.jsx";

// Headline rating under the default goal, or null if not assessed.
const ratingOf = (s) => assessScenario(defaultGoal, s.id)?.rating ?? null;
const UNRATED = "var(--border-strong)";

// Build framework connection groups
const frameworkGroups = {};
scenariosData.forEach((s) => {
  if (s.framework) {
    if (!frameworkGroups[s.framework]) frameworkGroups[s.framework] = [];
    frameworkGroups[s.framework].push(s.id);
  }
});

const toNorm = (v) => (v + 1) / 2;

const FILTERS = [
  { key: "all", label: "All" },
  { key: "single", label: "Single Vision", dot: "single" },
  { key: "framework", label: "Framework Sub-scenario", dot: "framework" },
];

export default function Maps() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const [axisIdx, setAxisIdx] = useState(0);
  const [colorBy, setColorBy] = useState("type");
  const chartRef = useRef(null);
  const [dims, setDims] = useState({ w: 900, h: 680 });

  const axes = axesData[axisIdx];

  useEffect(() => {
    const measure = () => {
      if (chartRef.current) {
        const r = chartRef.current.getBoundingClientRect();
        setDims({ w: r.width, h: Math.max(480, r.height) });
      }
    };
    measure();
    // Observe the element rather than the window: the sidebar layout can
    // change the chart's width without a window resize.
    const ro = new ResizeObserver(measure);
    ro.observe(chartRef.current);
    return () => ro.disconnect();
  }, []);

  const filtered = useMemo(
    () =>
      scenariosData.filter((s) => {
        const xVal = s[axes.xField];
        const yVal = s[axes.yField];
        const hasData = xVal !== null && xVal !== "" && yVal !== null && yVal !== "";
        const matchesType = filter === "all" || s.type === filter;
        return hasData && matchesType;
      }),
    [filter, axisIdx]
  );

  const skipped = useMemo(
    () =>
      scenariosData.filter((s) => {
        const xVal = s[axes.xField];
        const yVal = s[axes.yField];
        return xVal === null || xVal === "" || yVal === null || yVal === "";
      }).length,
    [axisIdx]
  );

  const active = hovered || selected;
  const byRating = colorBy === "rating";
  const typeColor = (s) => (s.type === "framework" ? "var(--framework)" : "var(--single)");
  const pointColor = (s) => {
    if (!byRating) return typeColor(s);
    const r = ratingOf(s);
    return r == null ? UNRATED : scoreColor(defaultGoal, r);
  };
  const activeFramework = active?.framework || null;
  const frameworkSiblings = activeFramework
    ? frameworkGroups[activeFramework] || []
    : [];

  const pad = { top: 50, right: 30, bottom: 50, left: 30 };
  const plotW = dims.w - pad.left - pad.right;
  const plotH = dims.h - pad.top - pad.bottom;

  const toScreen = (s) => {
    const xVal = s[axes.xField];
    const yVal = s[axes.yField];
    const sx = pad.left + toNorm(xVal) * plotW;
    let sy;
    if (axes.yInvert) {
      sy = pad.top + (1 - toNorm(yVal)) * plotH;
    } else {
      sy = pad.top + toNorm(yVal) * plotH;
    }
    return { sx, sy };
  };

  const frameworkLines = useMemo(() => {
    const lines = [];
    Object.values(frameworkGroups).forEach((ids) => {
      const members = ids
        .map((id) => scenariosData.find((s) => s.id === id))
        .filter(Boolean)
        .filter(
          (s) =>
            s[axes.xField] !== null &&
            s[axes.xField] !== "" &&
            s[axes.yField] !== null &&
            s[axes.yField] !== ""
        );
      for (let i = 0; i < members.length; i++) {
        for (let j = i + 1; j < members.length; j++) {
          lines.push([members[i], members[j], members[i].framework]);
        }
      }
    });
    return lines;
  }, [axisIdx]);

  const proximityLines = useMemo(() => {
    const eligible = scenariosData.filter(
      (s) =>
        s[axes.xField] !== null &&
        s[axes.xField] !== "" &&
        s[axes.yField] !== null &&
        s[axes.yField] !== ""
    );
    const lines = [];
    const K = 3;
    const threshold = 0.55;
    eligible.forEach((s) => {
      const dists = eligible
        .filter((o) => o.id !== s.id)
        .map((o) => ({
          o,
          d: Math.sqrt(
            (s[axes.xField] - o[axes.xField]) ** 2 +
              (s[axes.yField] - o[axes.yField]) ** 2
          ),
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, K)
        .filter(({ d }) => d < threshold);
      dists.forEach(({ o }) => {
        const key = [s.id, o.id].sort().join("-");
        if (!lines.find((l) => l.key === key)) {
          lines.push({ key, a: s, b: o });
        }
      });
    });
    return lines;
  }, [axisIdx]);

  return (
    <div>
      <header className="page-header">
        <h1>Maps</h1>
        <p>
          Map {scenariosData.length} AI scenarios across different analytical
          dimensions. Select an axis pair to explore how the literature
          distributes across that lens.
        </p>
      </header>

      {/* Axis picker */}
      <div className="axis-picker" role="group" aria-label="Axis pair">
        {axesData.map((a, i) => (
          <button
            key={a.id}
            className={`axis-btn${axisIdx === i ? " active" : ""}`}
            aria-pressed={axisIdx === i}
            onClick={() => {
              setAxisIdx(i);
              setSelected(null);
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="map-controls">
        <div className="chips" role="group" aria-label="Filter by type">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`chip${filter === f.key ? " active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.dot && <span className={`dot${f.dot === "framework" ? " dot-framework" : ""}`} />}
              {f.label}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Colour points by" style={{ marginLeft: "auto" }}>
          {[
            { key: "type", label: "Colour by type" },
            { key: "rating", label: `Colour by ${defaultGoal.name.replace(/^The /, "").toLowerCase()} rating` },
          ].map((c) => (
            <button
              key={c.key}
              className={`chip${colorBy === c.key ? " active" : ""}`}
              aria-pressed={colorBy === c.key}
              onClick={() => setColorBy(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <span className="map-hint">↗ best &nbsp;&nbsp; ↙ worst</span>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="map-chart" onClick={() => setSelected(null)}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Quadrant tint: the best (top-right) quadrant */}
          <rect x={pad.left + plotW / 2} y={pad.top} width={plotW / 2} height={plotH / 2} className="map-best" />

          {/* Cross axes */}
          <line x1={pad.left + plotW / 2} y1={pad.top} x2={pad.left + plotW / 2} y2={pad.top + plotH} className="map-axis" />
          <line x1={pad.left} y1={pad.top + plotH / 2} x2={pad.left + plotW} y2={pad.top + plotH / 2} className="map-axis" />

          {/* Quadrant labels */}
          {[
            { qIdx: 0, x: pad.left + 10, y: pad.top + 16, anchor: "start" },
            { qIdx: 1, x: pad.left + plotW - 10, y: pad.top + 16, anchor: "end" },
            { qIdx: 2, x: pad.left + 10, y: pad.top + plotH - 10, anchor: "start" },
            { qIdx: 3, x: pad.left + plotW - 10, y: pad.top + plotH - 10, anchor: "end" },
          ].map(({ qIdx, x, y, anchor }) => {
            const lines = axes.qLabels[qIdx].split("\n");
            return (
              <text key={qIdx} x={x} y={y} className="map-quad" textAnchor={anchor}>
                {lines.map((l, li) => (
                  <tspan key={li} x={x} dy={li === 0 ? 0 : 13}>{l}</tspan>
                ))}
              </text>
            );
          })}

          {/* Edge axis labels */}
          <text x={pad.left + plotW / 2} y={pad.top - 12} textAnchor="middle" className="map-edge">{axes.yLabel[1]}</text>
          <text x={pad.left + plotW / 2} y={pad.top + plotH + 30} textAnchor="middle" className="map-edge">{axes.yLabel[0]}</text>
          <text x={pad.left - 14} y={pad.top + plotH / 2} textAnchor="middle" className="map-edge" transform={`rotate(-90, ${pad.left - 14}, ${pad.top + plotH / 2})`}>{axes.xLabel[0]}</text>
          <text x={pad.left + plotW + 14} y={pad.top + plotH / 2} textAnchor="middle" className="map-edge" transform={`rotate(90, ${pad.left + plotW + 14}, ${pad.top + plotH / 2})`}>{axes.xLabel[1]}</text>

          {/* Proximity lines */}
          {proximityLines.map(({ key, a, b }) => {
            const filteredIds = new Set(filtered.map((s) => s.id));
            if (!filteredIds.has(a.id) || !filteredIds.has(b.id)) return null;
            const p1 = toScreen(a);
            const p2 = toScreen(b);
            const isActiveEdge = active && (active.id === a.id || active.id === b.id);
            return (
              <line key={`prox-${key}`} x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy}
                stroke={isActiveEdge ? "var(--muted)" : "var(--border-strong)"}
                strokeWidth={isActiveEdge ? 1 : 0.7}
                strokeDasharray="3 7"
                opacity={isActiveEdge ? 0.6 : 0.3}
                style={{ transition: "all 0.2s" }}
              />
            );
          })}

          {/* Framework connection lines */}
          {activeFramework &&
            frameworkLines.map(([a, b, fw]) => {
              if (fw !== activeFramework) return null;
              if (filter === "single") return null;
              const filteredIds = new Set(filtered.map((s) => s.id));
              if (!filteredIds.has(a.id) || !filteredIds.has(b.id)) return null;
              const p1 = toScreen(a);
              const p2 = toScreen(b);
              return (
                <line key={`fw-${a.id}-${b.id}`} x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy}
                  stroke={byRating ? "var(--muted)" : "var(--framework)"} strokeWidth={1.5} opacity={0.7}
                />
              );
            })}

          {/* Points */}
          {filtered.map((s) => {
            const { sx, sy } = toScreen(s);
            const isActive = active?.id === s.id;
            const isSibling = frameworkSiblings.includes(s.id);
            const isFaded = active && !isActive && !isSibling;

            return (
              <g key={s.id}
                style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                opacity={isFaded ? 0.18 : 1}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(selected?.id === s.id ? null : s);
                }}
              >
                {isActive && (
                  <circle cx={sx} cy={sy} r={14} fill="none"
                    stroke={pointColor(s)}
                    strokeWidth={1.2} opacity={0.4}
                  >
                    <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.08;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {s.type === "framework" ? (
                  <rect x={sx - 6.5} y={sy - 6.5} width={13} height={13} rx={2.5}
                    fill={pointColor(s)}
                    stroke={isActive || isSibling ? "var(--blush)" : "var(--bg)"}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                ) : (
                  <circle cx={sx} cy={sy} r={7.5} fill={pointColor(s)}
                    stroke={isActive ? "var(--blush)" : "var(--bg)"} strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {active &&
          active[axes.xField] !== null &&
          active[axes.xField] !== "" &&
          (() => {
            const { sx, sy } = toScreen(active);
            const cardW = 310;
            let cx = sx + 16,
              cy = sy - 50;
            if (cx + cardW > dims.w - 12) cx = sx - cardW - 16;
            if (cy < 8) cy = 8;
            if (cy + 290 > dims.h - 8) cy = dims.h - 298;

            return (
              <div
                className="map-tip"
                style={{ left: cx, top: cy, width: cardW, pointerEvents: selected ? "auto" : "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="map-tip-title">
                  {active.url ? (
                    <a href={active.url} target="_blank" rel="noopener noreferrer">
                      {active.title} ↗
                    </a>
                  ) : (
                    active.title
                  )}
                </div>
                <div className="map-tip-meta">
                  {active.author} ({active.year})
                </div>
                <div className="map-tip-desc">{active.desc}</div>
                <div className="card-tags">
                  <span className={`badge badge-${active.type === "single" ? "single" : "framework"}`}>
                    {active.type === "single" ? "Single Vision" : "Framework"}
                  </span>
                  {ratingOf(active) != null && (
                    <ScoreChip goal={defaultGoal} value={ratingOf(active)} label
                      title={`${defaultGoal.name} rating`} />
                  )}
                  {active.tags &&
                    active.tags.split(", ").map((t, i) => (
                      <span key={i} className="tag">{t}</span>
                    ))}
                </div>
                {selected && (
                  <a className="map-tip-link" href={href(`/scenarios/${active.id}`)}>
                    View details →
                  </a>
                )}
              </div>
            );
          })()}
      </div>

      <div className="map-legend">
        <span>{filtered.length} sources plotted</span>
        {skipped > 0 && <span className="muted">({skipped} not rated on this axis)</span>}
        {byRating ? (
          <>
            <span>{defaultGoal.name} rating:</span>
            {defaultGoal.scale.map((v) => (
              <span key={v.value} className="map-key">
                <i style={{ background: scoreColor(defaultGoal, v.value) }} />
                {v.value} · {scaleLabel(defaultGoal, v.value)}
              </span>
            ))}
            <span className="map-key">
              <i style={{ background: UNRATED }} />
              Not assessed
            </span>
            <span>● single vision · ■ framework</span>
          </>
        ) : (
          <>
            <span className="map-key">
              <span className="dot" /> Single Vision
            </span>
            <span className="map-key">
              <span className="dot dot-framework" /> Framework Sub-scenario
            </span>
          </>
        )}
      </div>
    </div>
  );
}
