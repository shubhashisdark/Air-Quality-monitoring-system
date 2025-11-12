import React from "react";

export default function TextReadout({ lines = [] }) {
  if (!lines.length) return null;
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-medium text-slate-700">
        Sensor Readout
      </div>
      <pre className="text-xs leading-5 text-slate-700 whitespace-pre-wrap">
        {lines.join("\n")}
      </pre>
    </div>
  );
}
