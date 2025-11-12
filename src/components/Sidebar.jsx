import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user } = useAuth();
  const loc = useLocation();

  const item = (to, label, Icon) => {
    const active = loc.pathname === to;
    return (
      <Link
        to={to}
        className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all
          ${
            active
              ? "bg-white/20 text-white font-semibold shadow-inner"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 shrink-0 bg-gradient-to-b from-[#00b517] via-[#00cc77] to-[#00784e] text-white flex flex-col shadow-lg mt-4 mb-4">
      <nav className="p-4 space-y-2 flex-1">
        {item("/app", "Dashboard", LayoutDashboard)}
        {item("/app/settings", "Settings", Settings)}
      </nav>

      <div className="text-center text-xs text-white/60 pb-4">
        Air Quality Monitoring System
      </div>
    </aside>
  );
}
