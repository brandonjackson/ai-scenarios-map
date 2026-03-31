import { useState, useRef, useEffect, useMemo } from "react";
import scenariosData from "../data/scenarios.json";
import axesData from "../data/axes.json";

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
  { key: "all", label: "ALL" },
  { key: "single", label: "Single Vision", dot: "single" },
  { key: "framework", label: "Framework Sub-scenario", dot: "framework" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const [axisIdx, setAxisIdx] = useState(0);
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
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
    <div
      style={{
        background: "#0a0f16",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: "#b0bec5",
      }}
    >
    <div
      style={{
        maxWidth: 1060,
        margin: "0 auto",
        padding: "24px 28px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <h1
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#eceff1",
          margin: "0 0 8px",
          letterSpacing: "-0.4px",
        }}
      >
        AI Scenario Literature Map
      </h1>
      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "#78909c",
          maxWidth: 820,
          margin: "0 0 16px",
        }}
      >
        Map {scenariosData.length} AI scenarios across different analytical
        dimensions. Select an axis pair to explore how the literature distributes
        across that lens.
      </p>

      {/* Axis picker */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {axesData.map((a, i) => (
          <button
            key={a.id}
            onClick={() => {
              setAxisIdx(i);
              setSelected(null);
            }}
            style={{
              background: axisIdx === i ? "#1a3345" : "transparent",
              border:
                axisIdx === i
                  ? "1px solid #2a5060"
                  : "1px solid #1a2332",
              color: axisIdx === i ? "#4dd0e1" : "#607d8b",
              padding: "6px 16px",
              borderRadius: 6,
              fontSize: 13,
              fontFamily: "inherit",
              cursor: "pointer",
              fontWeight: axisIdx === i ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              background: filter === f.key ? "#1a2332" : "transparent",
              border:
                filter === f.key
                  ? "1px solid #263545"
                  : "1px solid transparent",
              color: filter === f.key ? "#eceff1" : "#607d8b",
              padding: "4px 13px",
              borderRadius: 5,
              fontSize: 12.5,
              fontFamily: "inherit",
              cursor: "pointer",
              fontWeight: filter === f.key ? 600 : 400,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {f.dot === "single" && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4dd0e1",
                }}
              />
            )}
            {f.dot === "framework" && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: "#ffb74d",
                }}
              />
            )}
            {f.label}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "#546e7a",
            fontFamily: "JetBrains Mono",
          }}
        >
          ↗ best &nbsp;&nbsp; ↙ worst
        </span>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(480px, 64vh, 760px)",
          background:
            "radial-gradient(ellipse at 45% 35%, #0f1a26 0%, #0a0f16 75%)",
          borderRadius: 10,
          border: "1px solid #172030",
          overflow: "hidden",
        }}
        onClick={() => setSelected(null)}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Quadrant tints */}
          <rect x={pad.left} y={pad.top} width={plotW / 2} height={plotH / 2} fill="rgba(77,208,225,0.02)" />
          <rect x={pad.left + plotW / 2} y={pad.top} width={plotW / 2} height={plotH / 2} fill="rgba(77,208,225,0.035)" />
          <rect x={pad.left} y={pad.top + plotH / 2} width={plotW / 2} height={plotH / 2} fill="rgba(255,183,77,0.015)" />
          <rect x={pad.left + plotW / 2} y={pad.top + plotH / 2} width={plotW / 2} height={plotH / 2} fill="rgba(255,183,77,0.025)" />

          {/* Cross axes */}
          <line x1={pad.left + plotW / 2} y1={pad.top} x2={pad.left + plotW / 2} y2={pad.top + plotH} stroke="#1e3040" strokeWidth={1} />
          <line x1={pad.left} y1={pad.top + plotH / 2} x2={pad.left + plotW} y2={pad.top + plotH / 2} stroke="#1e3040" strokeWidth={1} />

          {/* Quadrant labels */}
          {[
            { qIdx: 0, x: pad.left + 10, y: pad.top + 16, anchor: "start" },
            { qIdx: 1, x: pad.left + plotW - 10, y: pad.top + 16, anchor: "end" },
            { qIdx: 2, x: pad.left + 10, y: pad.top + plotH - 10, anchor: "start" },
            { qIdx: 3, x: pad.left + plotW - 10, y: pad.top + plotH - 10, anchor: "end" },
          ].map(({ qIdx, x, y, anchor }) => {
            const lines = axes.qLabels[qIdx].split("\n");
            return (
              <text key={qIdx} x={x} y={y} fill="#1e3040" fontSize={9.5} fontFamily="JetBrains Mono" fontWeight={500} letterSpacing="0.6px" textAnchor={anchor}>
                {lines.map((l, li) => (
                  <tspan key={li} x={x} dy={li === 0 ? 0 : 13}>{l}</tspan>
                ))}
              </text>
            );
          })}

          {/* Edge axis labels */}
          <text x={pad.left + plotW / 2} y={pad.top - 12} textAnchor="middle" fill="#546e7a" fontSize={12} fontFamily="DM Sans" fontWeight={500}>{axes.yLabel[1]}</text>
          <text x={pad.left + plotW / 2} y={pad.top + plotH + 30} textAnchor="middle" fill="#546e7a" fontSize={12} fontFamily="DM Sans" fontWeight={500}>{axes.yLabel[0]}</text>
          <text x={pad.left - 14} y={pad.top + plotH / 2} textAnchor="middle" fill="#546e7a" fontSize={11} fontFamily="DM Sans" fontWeight={500} transform={`rotate(-90, ${pad.left - 14}, ${pad.top + plotH / 2})`}>{axes.xLabel[0]}</text>
          <text x={pad.left + plotW + 14} y={pad.top + plotH / 2} textAnchor="middle" fill="#546e7a" fontSize={11} fontFamily="DM Sans" fontWeight={500} transform={`rotate(90, ${pad.left + plotW + 14}, ${pad.top + plotH / 2})`}>{axes.xLabel[1]}</text>

          {/* Proximity lines */}
          {proximityLines.map(({ key, a, b }) => {
            const filteredIds = new Set(filtered.map((s) => s.id));
            if (!filteredIds.has(a.id) || !filteredIds.has(b.id)) return null;
            const p1 = toScreen(a);
            const p2 = toScreen(b);
            const isActiveEdge = active && (active.id === a.id || active.id === b.id);
            return (
              <line key={`prox-${key}`} x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy}
                stroke={isActiveEdge ? "#3a5a6e" : "#1a2a38"}
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
                  stroke="#ffb74d" strokeWidth={1.5} opacity={0.7}
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
                    stroke={s.type === "framework" ? "#ffb74d" : "#4dd0e1"}
                    strokeWidth={1.2} opacity={0.4}
                  >
                    <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.08;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {s.type === "framework" ? (
                  <rect x={sx - 6.5} y={sy - 6.5} width={13} height={13} rx={2.5}
                    fill="#ffb74d"
                    stroke={isActive || isSibling ? "#ffe0b2" : "none"}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                ) : (
                  <circle cx={sx} cy={sy} r={7.5} fill="#4dd0e1"
                    stroke={isActive ? "#b2ebf2" : "none"} strokeWidth={2}
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
            if (cy + 220 > dims.h - 8) cy = dims.h - 228;

            return (
              <div
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy,
                  width: cardW,
                  background: "linear-gradient(145deg, #121d2b 0%, #0c1420 100%)",
                  border: "1px solid #1e3345",
                  borderRadius: 9,
                  padding: "14px 16px",
                  pointerEvents: selected ? "auto" : "none",
                  zIndex: 10,
                  boxShadow: "0 10px 36px rgba(0,0,0,0.55)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: "#eceff1",
                    marginBottom: 3,
                    lineHeight: 1.3,
                  }}
                >
                  {active.url ? (
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#eceff1",
                        textDecoration: "none",
                        borderBottom: "1px solid transparent",
                        transition: "border-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.borderBottomColor = "#4dd0e1")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.borderBottomColor = "transparent")
                      }
                    >
                      {active.title} ↗
                    </a>
                  ) : (
                    active.title
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "#4dd0e1",
                    fontFamily: "JetBrains Mono",
                    marginBottom: 9,
                  }}
                >
                  {active.author} ({active.year})
                </div>
                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.55,
                    color: "#78909c",
                    marginBottom: 10,
                  }}
                >
                  {active.desc}
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontFamily: "JetBrains Mono",
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: 3,
                      background:
                        active.type === "single" ? "#0e2a3a" : "#2a1e0e",
                      color:
                        active.type === "single" ? "#4dd0e1" : "#ffb74d",
                    }}
                  >
                    {active.type === "single" ? "Single Vision" : "Framework"}
                  </span>
                  {active.tags &&
                    active.tags.split(", ").map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 9.5,
                          fontFamily: "JetBrains Mono",
                          fontWeight: 500,
                          padding: "2px 7px",
                          borderRadius: 3,
                          background: "#151f2e",
                          color: "#607d8b",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                </div>
              </div>
            );
          })()}
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 12,
          fontSize: 11,
          color: "#455a64",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span>{filtered.length} sources plotted</span>
        {skipped > 0 && (
          <span style={{ color: "#37474f" }}>
            ({skipped} not rated on this axis)
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4dd0e1",
            }}
          />{" "}
          Single Vision
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 2,
              background: "#ffb74d",
            }}
          />{" "}
          Framework Sub-scenario
        </span>
      </div>
    </div>
    </div>
  );
}
