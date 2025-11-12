import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserPlus, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://air-quality-monitoring-backend-1.onrender.com/api/auth/register",
        { name, email, password }
      );

      if (res.status === 201) {
        toast.success("Registration successful!");
        setTimeout(() => nav("/"), 2000); // redirect to login
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#00b517] via-[#00d75a] to-[#009147]">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Project Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          🌿 Air Quality Monitoring System
        </h1>
        <p className="text-white/80 text-sm mt-1 tracking-wide">
          Create your account to access the dashboard
        </p>
      </div>

      {/* Register Card */}
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 border border-slate-100"
      >
        <h2 className="text-xl font-semibold text-center text-slate-800">
          Create Account
        </h2>
        <p className="text-sm text-slate-500 text-center mb-4">
          Register to access real-time environmental data
        </p>

        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label className="block text-sm font-medium text-slate-700 mt-3">
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
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b517] via-[#00d75a] to-[#009147] text-white py-2 font-medium hover:opacity-90 active:scale-[.98] transition"
        >
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating…" : "Register"}
        </button>

        <div className="mt-4 text-sm text-center text-slate-600">
          Have an account?{" "}
          <Link className="text-green-600 hover:underline" to="/">
            Login
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
