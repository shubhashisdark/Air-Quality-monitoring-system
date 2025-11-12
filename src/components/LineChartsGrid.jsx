import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatTs(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Panel({ title, series, subtitle }) {
  const data = useMemo(
    () =>
      (series || []).map((p) => ({ t: formatTs(p.ts), v: Math.round(p.v) })),
    [series]
  );
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-1 text-sm font-medium text-slate-700">{title}</div>
      {subtitle ? (
        <div className="mb-2 text-xs text-slate-500">{subtitle}</div>
      ) : null}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" minTickGap={20} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="v" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function LineChartsGrid({ data, gauges, labels }) {
  const sub = (key, unitShown = true) =>
    gauges?.[key] != null && labels?.[key]?.label
      ? `${Math.round(gauges[key])} → ${labels[key].label}`
      : "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Panel title="CO₂ (ppm)" series={data?.co2} subtitle={sub("co2")} />
      <Panel title="CO (ppm)" series={data?.co} subtitle={sub("co")} />
      <Panel title="NO₂ (ppb)" series={data?.no2} subtitle={sub("no2")} />
      <Panel title="PM2.5 (µg/m³)" series={data?.pm25} subtitle={sub("pm25")} />
      <Panel title="PM1.0 (µg/m³)" series={data?.pm1} subtitle={sub("pm1")} />
      <Panel title="PM10 (µg/m³)" series={data?.pm10} subtitle={sub("pm10")} />
      <Panel
        title="Temperature (°C)"
        series={data?.temperature}
        subtitle={sub("temperature")}
      />
      <Panel
        title="Humidity (%)"
        series={data?.humidity}
        subtitle={sub("humidity")}
      />
    </div>
  );
}
