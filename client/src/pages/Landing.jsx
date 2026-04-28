import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Landmark,
  FileSearch,
  Lock,
  Gavel,
  History
} from "lucide-react";
import api from "../services/api";

export default function Landing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/transmittals");

      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(
        "Fetch Error:",
        error.response?.data || error.message
      );
      setData([]);
    }
  };

  /* LIVE COUNTS FROM DATABASE */
  const totalRecords = data.length;

  const releasedCount = data.filter(
    (item) => item.status === "Released"
  ).length;

  const pendingCount = totalRecords - releasedCount;

  const today = new Date().toDateString();

  const dailyVolume = data.filter(
    (item) =>
      new Date(item.createdAt).toDateString() === today
  ).length;

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0C1B33] font-serif">
      {/* 1. NATIONAL FLAG STRIP */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#0038A8]"></div>
        <div className="h-full w-1/3 bg-[#CE1126]"></div>
        <div className="h-full w-1/3 bg-[#FCD116]"></div>
      </div>

      {/* 2. OFFICIAL TOP BAR */}
      <div className="bg-[#0C1B33] py-3 px-10 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <p className="text-[10px] text-slate-300 uppercase tracking-[0.4em] font-sans font-bold">
              Republic of the Philippines
              <span className="mx-2 text-slate-600">|</span>
              Commission on Higher Education
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[9px] text-[#C5A059] uppercase tracking-widest font-sans font-bold">
            <span className="flex items-center gap-1">
              <Lock size={10} />
              Secure Terminal
            </span>

            <span className="flex items-center gap-1">
              <History size={10} />
              v2026.0.4
            </span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden bg-white border-b border-slate-300">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <Landmark size={600} />
        </div>

        <div className="max-w-7xl mx-auto px-10 py-24 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8 shadow-sm">
              <Gavel size={14} className="text-[#0C1B33]" />

              <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#0C1B33]">
                Official Records & Archives Division
              </span>
            </div>

            <h1 className="text-7xl font-black text-[#0C1B33] leading-[0.95] tracking-tighter italic lg:not-italic">
              Digital <br />
              <span className="text-[#C5A059] underline decoration-slate-200 underline-offset-8">
                Transmittal
              </span>
              <br />

              <span className="text-5xl font-light text-slate-500 antialiased font-sans uppercase tracking-widest block mt-2">
                Registry System
              </span>
            </h1>

            <p className="mt-10 text-xl text-slate-600 leading-relaxed max-w-lg font-sans border-l-4 border-[#C5A059] pl-6">
              The secure platform for electronic transmittal creation,
              document verification, and real-time archival tracking
              of official records.
            </p>

            <div className="mt-12 flex flex-wrap gap-5 font-sans">
              <Link
                to="/login"
                className="bg-[#0C1B33] text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-[#162a4d] transition-all flex items-center gap-4 shadow-xl shadow-slate-300 group"
              >
                Officer Login
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/verify"
                className="bg-white text-[#0C1B33] border-2 border-[#0C1B33] px-10 py-5 rounded-sm font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-slate-50 transition-all flex items-center gap-3"
              >
                <FileSearch size={16} />
                Verify Document
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-10 opacity-60">
              <div className="flex items-center gap-2 text-[#0C1B33]">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest">
                  End-to-End Encryption
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#0C1B33]">
                <FileSpreadsheet size={20} />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest">
                  Audit-Ready Logs
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative group">
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-[#C5A059] pointer-events-none"></div>

            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-[#C5A059] pointer-events-none"></div>

            <div className="relative bg-white border border-slate-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="bg-[#0C1B33] px-8 py-5 flex justify-between items-center">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                  Live System Integrity
                </span>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>

                  <span className="text-[9px] font-sans font-bold text-white uppercase tracking-widest">
                    Encrypted
                  </span>
                </div>
              </div>

              <div className="p-1 grid grid-cols-2 gap-1 bg-slate-100">
                <StatCard
                  label="Daily Volume"
                  value={dailyVolume}
                  sub="Transmissions"
                />

                <StatCard
                  label="Pending Action"
                  value={pendingCount}
                  sub="Priority 1"
                  highlight
                />

                <StatCard
                  label="Successful Releases"
                  value={releasedCount}
                  sub="Verified 100%"
                />

                <StatCard
                  label="Digital Archives"
                  value={totalRecords}
                  sub="Total Records"
                />
              </div>

              <div className="p-8 bg-white text-center">
                <p className="text-[11px] font-sans text-slate-400 leading-loose uppercase tracking-tighter">
                  This system is governed by the <br />
                  <strong className="text-slate-600">
                    Data Privacy Act of 2012 (RA 10173)
                  </strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white py-12 px-10 text-center border-t border-slate-200">
        <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-[0.5em]">
          Official Document of the Office of Commissioner Desiderio R. Apag III
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div className="bg-white p-10 flex flex-col items-center text-center">
      <p className="text-[9px] font-sans font-black text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </p>

      <h2
        className={`text-5xl font-black mb-1 ${
          highlight ? "text-[#CE1126]" : "text-[#0C1B33]"
        }`}
      >
        {value}
      </h2>

      <p className="text-[9px] font-sans font-bold text-slate-300 uppercase tracking-widest">
        {sub}
      </p>
    </div>
  );
}