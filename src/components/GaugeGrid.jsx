import React from "react";
import GaugeSpeedo from "./GaugeSpeedo";

export default function GaugeGrid({ gauges, labels }) {
  const sub = (key) =>
    gauges?.[key] != null && labels?.[key]?.label
      ? `${gauges[key]} → ${labels[key].label}`
      : "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <GaugeSpeedo
        title="CO₂"
        subtitle={sub("co2")}
        value={gauges?.co2 ?? 0}
        min={400}
        max={2000}
        unit="ppm"
        ranges={[
          { from: 400, to: 800, color: "#10b981" },
          { from: 800, to: 1200, color: "#f59e0b" },
          { from: 1200, to: 2000, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
        title="CO"
        subtitle={sub("co")}
        value={gauges?.co ?? 0}
        min={0}
        max={50}
        unit="ppm"
        ranges={[
          { from: 0, to: 9, color: "#10b981" },
          { from: 9, to: 35, color: "#f59e0b" },
          { from: 35, to: 50, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
        title="NO₂"
        subtitle={sub("no2")}
        value={gauges?.no2 ?? 0}
        min={0}
        max={200}
        unit="ppb"
        ranges={[
          { from: 0, to: 50, color: "#10b981" },
          { from: 50, to: 100, color: "#f59e0b" },
          { from: 100, to: 200, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
  title="PM2.5"
  subtitle={
    gauges?.pm25 != null && labels?.pm25?.label
      ? `${gauges.pm25} → ${labels.pm25.label}`
      : "Loading..."
  }
  subtitleColor={labels?.pm25?.color ?? "#888"} // fallback color
  value={gauges?.pm25 ?? 0}
  min={0}
  max={200}
  unit="µg/m³"
  ranges={[
    { from: 0, to: 30, color: "#10b981" },
    { from: 30, to: 60, color: "#f59e0b" },
    { from: 60, to: 200, color: "#ef4444" },
  ]}
/>


      <GaugeSpeedo
        title="PM1.0"
        subtitle={sub("pm1")}
        value={gauges?.pm1 ?? 0}
        min={0}
        max={100}
        unit="µg/m³"
        ranges={[
          { from: 0, to: 20, color: "#10b981" },
          { from: 20, to: 40, color: "#f59e0b" },
          { from: 40, to: 100, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
        title="PM10"
        subtitle={sub("pm10")}
        value={gauges?.pm10 ?? 0}
        min={0}
        max={300}
        unit="µg/m³"
        ranges={[
          { from: 0, to: 50, color: "#10b981" },
          { from: 50, to: 100, color: "#f59e0b" },
          { from: 100, to: 300, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
        title="Temperature"
        subtitle={sub("temperature")}
        value={gauges?.temperature ?? 0}
        min={0}
        max={50}
        unit="°C"
        ranges={[
          { from: 0, to: 30, color: "#10b981" },
          { from: 30, to: 40, color: "#f59e0b" },
          { from: 40, to: 50, color: "#ef4444" },
        ]}
      />
      <GaugeSpeedo
        title="Humidity"
        subtitle={sub("humidity")}
        value={gauges?.humidity ?? 0}
        min={0}
        max={100}
        unit="%"
        ranges={[
          { from: 0, to: 20, color: "#ef4444" },
          { from: 20, to: 30, color: "#f59e0b" },
          { from: 30, to: 60, color: "#10b981" },
          { from: 60, to: 100, color: "#f59e0b" },
        ]}
      />
    </div>
  );
}
