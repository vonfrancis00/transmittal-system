// src/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  User,
  ArrowLeft,
  LogIn,
  Landmark,
  Eye,
  EyeOff,
  Gavel,
  KeyRound
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // DEMO LOGIN
    if (form.username === "admin" && form.password === "admin123") {
      navigate("/home");
    } else {
      alert("Unauthorized Access Attempt: Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-serif selection:bg-blue-100">
      {/* NATIONAL IDENTITY STRIP */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#0038A8]"></div>
        <div className="h-full w-1/3 bg-[#CE1126]"></div>
        <div className="h-full w-1/3 bg-[#FCD116]"></div>
      </div>

      {/* TOP HEADER */}
      <div className="bg-[#0C1B33] py-3 px-10 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-sans font-bold">
            Republic of the Philippines — Official Terminal
          </p>
          <Link to="/" className="text-[10px] text-[#C5A059] uppercase tracking-widest font-sans font-bold flex items-center gap-2 hover:text-white transition">
            <ArrowLeft size={12} /> Portal Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: AUTHORIZATION NOTICE */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8 shadow-sm">
            <Landmark size={14} className="text-[#0C1B33]" />
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#0C1B33]">
              Administrative Services Division
            </span>
          </div>

          <h1 className="text-6xl font-black text-[#0C1B33] leading-tight tracking-tight mb-6">
            Authorized <br />
            <span className="italic text-[#C5A059]">Personnel Only</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-xl leading-relaxed border-l-4 border-[#C5A059] pl-6 font-sans">
            Access to this system is restricted to authorized officers. 
            All activities are logged and monitored under the 
            <span className="font-bold"> RA 10173 Data Privacy Act.</span>
          </p>

          <div className="mt-12 space-y-5">
            <Feature text="FIPS-Compliant Encryption" />
            <Feature text="Role-Based Internal Access" />
            <Feature text="Automated Forensic Auditing" />
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="relative">
          {/* Subtle background seal */}
          <div className="absolute -inset-4 bg-slate-200/50 rounded-full blur-3xl opacity-50"></div>

          <div className="relative bg-white border border-slate-300 shadow-2xl rounded-sm overflow-hidden">
            <div className="bg-[#0C1B33] p-8 border-b border-[#C5A059]/20">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#C5A059]">
                  Authentication
                </p>
                <KeyRound size={20} className="text-[#C5A059]" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">System Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 font-sans">
              {/* USERNAME */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <User size={12} /> Staff ID / Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Official ID"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-4 outline-none focus:border-[#0C1B33] focus:bg-white transition text-sm"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Lock size={12} /> Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-4 outline-none focus:border-[#0C1B33] focus:bg-white transition text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0C1B33]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#0C1B33] hover:bg-[#162a4d] text-[#C5A059] py-5 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl group"
              >
                Enter Portal <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-[9px] uppercase tracking-widest font-bold">
                  Connection Secure & Encrypted
                </span>
              </div>
            </form>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-sans font-medium italic">
               <span>Access Level: GS-12 and Above</span>
               <span className="not-italic font-bold">DEMO: admin / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4 text-slate-700 font-sans">
      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <ShieldCheck size={14} className="text-emerald-700" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider">{text}</span>
    </div>
  );
}