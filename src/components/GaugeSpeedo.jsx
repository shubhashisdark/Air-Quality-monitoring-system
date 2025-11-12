// src/components/GaugeSpeedo.jsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * Semicircle gauge with colored ranges, needle, and a linear "meter" bar.
 * Props:
 *  - value: number             current value
 *  - min, max: number          scale
 *  - ranges: [{from,to,color}] colored bands across the arc
 *  - title: string
 *  - unit: string
 *  - subtitle?: string         optional "123 → Good"
 *  - subtitleColor?: string    optional hex/rgb to tint subtitle (e.g., labels[key].color)
 */
export default function GaugeSpeedo({
  value = 0,
  min = 0,
  max = 100,
  ranges = [],
  title = "",
  unit = "",
  subtitle = "",
  subtitleColor, // e.g., "#10b981"
}) {
  const safeVal = Math.max(min, Math.min(max, value));
  const total = Math.max(1, max - min);

  const segs = ranges.length
    ? ranges
    : [
        { from: min, to: min + total * 0.5, color: "#10b981" },
        { from: min + total * 0.5, to: min + total * 0.75, color: "#f59e0b" },
        { from: min + total * 0.75, to: max, color: "#ef4444" },
      ];

  const data = segs.map((s) => ({
    name: `${s.from}-${s.to}`,
    value: Math.max(0, s.to - s.from),
    color: s.color,
  }));

  // Needle geometry (SVG coords for a 300x300 viewBox centered at 150,150)
  const angle = (180 * (safeVal - min)) / total;
  const cx = 150,
    cy = 150,
    r = 120;
  const rad = Math.PI * (1 - angle / 180);
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);

  const pct = Math.min(
    100,
    Math.max(0, Math.round(((safeVal - min) / total) * 100))
  );

  // gradient class for meter bar
  const barClass = useMemo(() => {
    if (pct < 50) return "from-emerald-500 to-emerald-400";
    if (pct < 75) return "from-amber-500 to-orange-400";
    return "from-red-500 to-rose-500";
  }, [pct]);

  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-sm"
      role="group"
      aria-roledescription="gauge"
      aria-label={title || "Gauge"}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={safeVal}
    >
      {/* Header */}
      <div className="mb-1 text-sm font-medium text-slate-700">{title}</div>
      {subtitle ? (
        <div
          className="mb-2 text-xs"
          style={{ color: subtitleColor || "#6b7280" /* slate-500 fallback */ }}
        >
          {subtitle}
        </div>
      ) : null}

      {/* Arc + needle */}
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="100%"
              innerRadius="70%"
              outerRadius="100%"
              stroke="none"
              isAnimationActive={false} // arc is static; needle animates
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>

            {/* Needle */}
            <g>
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill="#111827"
                transform="translate(-150,-150)"
              />
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                transform="translate(-150,-150)"
                stroke="#111827"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: "all .45s ease" }}
              />
            </g>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Numeric + unit */}
      <div className="text-center text-2xl font-semibold">
        {Number.isFinite(safeVal) ? safeVal : 0}
        {unit ? ` ${unit}` : ""}
      </div>

      {/* Linear meter with smooth width transition */}
      <div className="mt-2">
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-2 bg-gradient-to-r ${barClass}`}
            style={{ width: `${pct}%`, transition: "width .5s ease" }}
          />
        </div>
        <div className="mt-1 text-center text-xs text-slate-500">
          Range: {min}–{max}
          {unit ? ` ${unit}` : ""} • {pct}%
        </div>
      </div>
    </div>
  );
}
