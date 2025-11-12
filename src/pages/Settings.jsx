import React from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Briefcase, KeyRound, LogOut } from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();

  const info = [
    { label: "Name", value: user?.name || "—", icon: User },
    { label: "Email", value: user?.email || "—", icon: Mail },
    {
      label: "Project",
      value: user?.project || "Air Quality Monitoring System",
      icon: Briefcase,
    },
    { label: "User ID", value: user?.id || "—", icon: KeyRound },
  ];

  // ✅ handle logout (clears tokens & redirects)
  const handleLogout = () => {
    localStorage.removeItem("aqm:token");
    localStorage.removeItem("aqm:user");
    logout(); // if your AuthContext manages session state
  };

  return (
    <div className="container-responsive py-6">
      <div className="rounded-2xl bg-white shadow-md border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00b517] via-[#00d75a] to-[#00b517] px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            ⚙️ User Profile & Session
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:scale-[1.02] active:scale-[.98] transition shadow-md"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {info.map(({ label, value, icon: Icon }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 border border-slate-100 rounded-xl p-3 hover:shadow-sm transition"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-2 rounded-lg">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">{label}</div>
                <div className="text-sm font-medium text-slate-800">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
