import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#00b517] via-[#00cc77] to-[#00784e] shadow-inner">
      <div className="container-responsive py-3 text-center text-white text-sm font-medium">
        © {new Date().getFullYear()} Air Quality Monitoring System — Developed
        by <span className="font-semibold">Technoverse</span>
      </div>
    </footer>
  );
}
