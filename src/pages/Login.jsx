// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth(); // use this to hydrate the in-app user state
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      // 1) Call your backend login API
      const res = await axios.post(
        "https://air-quality-monitoring-backend-1.onrender.com/api/auth/login",
        { email, password }
      );

      // 2) Save token (and user) for future API calls
      const { token, user } = res.data || {};
      if (token) localStorage.setItem("aqm:token", token);
      if (user) localStorage.setItem("aqm:serverUser", JSON.stringify(user));

      // 3) Hydrate app auth state so Protected routes work
      //    (uses your existing AuthContext mock login to set user in context)
      await login(email, password);

      // Optional: if you want the UI name to match backend immediately,
      // you could also overwrite the AuthContext localStorage key used by your provider:
      // localStorage.setItem("aqm:user", JSON.stringify({ id: user.id, name: user.name, email: user.email, project: "Air Quality Monitoring" }))

      // 4) Go to dashboard
      nav("/app");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#00b517] via-[#00d75a] to-[#009147]">
      {/* Project Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          🌿 Air Quality Monitoring System
        </h1>
        <p className="text-white/80 text-sm mt-1 tracking-wide">
          Real-time IoT-based Environmental Dashboard
        </p>
      </div>

      {/* Login Card */}
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 border border-slate-100"
      >
        <h2 className="text-xl font-semibold text-center text-slate-800">
          Sign In
        </h2>
        <p className="text-sm text-slate-500 text-center mb-4">
          Access your Air Quality Dashboard
        </p>

        {error && (
          <div className="mb-3 rounded-md bg-red-50 text-red-700 text-sm p-2 text-center">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="block text-sm font-medium text-slate-700 mt-3">
          Password
        </label>
        <div className="relative mt-1">
          <input
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none pr-10"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b517] via-[#00d75a] to-[#009147] text-white py-2 font-medium hover:opacity-90 active:scale-[.98] transition"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in…" : "Login"}
        </button>

        <div className="mt-4 text-sm text-center text-slate-600">
          No account?{" "}
          <Link className="text-green-600 hover:underline" to="/register">
            Register
          </Link>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-white/90 text-sm">
        Developed by{" "}
        <span className="font-semibold text-white">Technoverse</span>
      </div>
    </div>
  );
}
