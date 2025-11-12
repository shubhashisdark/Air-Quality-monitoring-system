// src/components/StatCards.jsx
import React from "react";
import { Wind, Cpu, AlertTriangle } from "lucide-react";

export default function StatCards({ counts }) {
  const items = [
    {
      label: "Total Gases",
      value: counts?.gases ?? 4,
      desc: "Monitored gases (CO₂, CO, NO₂, PM2.5)",
      icon: Wind,
      gradient: "from-[#00b517] via-[#00d75a] to-[#009147]",
    },
    {
      label: "Sensor Count",
      value: counts?.devices ?? 6,
      desc: "Active IoT sensors transmitting data",
      icon: Cpu,
      gradient: "from-sky-500 via-cyan-400 to-sky-600",
    },
    {
      label: "Critical Alerts",
      value: counts?.alerts ?? 1,
      desc: "Detected threshold exceedances",
      icon: AlertTriangle,
      gradient: "from-amber-500 via-orange-400 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(({ label, value, desc, icon: Icon, gradient }, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition`}
        >
          {/* gradient accent bar */}
          <div
            className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient}`}
          />
          <div className="relative p-5 flex items-start gap-3">
            <div
              className={`shrink-0 rounded-xl p-3 text-white bg-gradient-to-br ${gradient} shadow-md`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-1 text-3xl font-semibold text-slate-800">
                {value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
