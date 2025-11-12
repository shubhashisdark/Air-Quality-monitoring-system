import React, { useEffect, useState, useRef } from "react";
import StatCards from "../components/StatCards";
import LineChartsGrid from "../components/LineChartsGrid";
import GaugeGrid from "../components/GaugeGrid";
import TextReadout from "../components/TextReadout";
import { fetchAQMetrics } from "../utils/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const timerRef = useRef(null);

  const load = async () => {
    try {
      setError("");
      const res = await fetchAQMetrics();
      setData(res);
      setLastUpdated(new Date());
    } catch (e) {
      setError("Failed to load metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(); // initial fetch
    timerRef.current = setInterval(load, 10_000); // refresh every 10s
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container-responsive space-y-4 py-4">
      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-700">{error}</div>
      )}

      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold text-slate-800">
          Air Quality Dashboard
        </h1>
        <div className="text-xs text-slate-500">
          {lastUpdated
            ? `Last updated: ${lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}`
            : "Loading…"}
        </div>
      </div>

      <StatCards counts={data?.counts} />
      <TextReadout lines={data?.readout} />

      {loading && <div className="text-sm text-slate-500">Loading charts…</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChartsGrid
          data={data}
          gauges={data?.gauges}
          labels={data?.labels}
        />
        <GaugeGrid gauges={data?.gauges} labels={data?.labels} />
      </div>
    </div>
  );
}
