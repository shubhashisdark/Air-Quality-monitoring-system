import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-[#00b517] via-[#00cc77] to-[#00784e] shadow-md p-4">
      <div className="container-responsive flex justify-between items-center">
        <h1 className="text-white text-lg sm:text-xl font-semibold text-center drop-shadow-md">
          🌿 Air Quality Monitoring System
        </h1>

        {/* ✅ Dynamic user greeting */}
        <h3 className="text-white text-md sm:text-md font-semibold text-center drop-shadow-md">
          Hi, {user?.name ? user.name.split(" ")[0] : "Guest"} 👋
        </h3>
      </div>
    </header>
  );
}
