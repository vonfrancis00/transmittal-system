import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Landmark,
  FileSearch,
  Lock,
  History,
  Gavel
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
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      setData([]);
    }
  };

  const totalRecords = data.length;
  const releasedCount = data.filter((item) => item.status === "Released").length;
  const pendingCount = totalRecords - releasedCount;
  const today = new Date().toDateString();
  const dailyVolume = data.filter(
    (item) => new Date(item.createdAt).toDateString() === today
  ).length;

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0C1B33] font-serif overflow-x-hidden">
      {/* 1. NATIONAL FLAG STRIP */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#0038A8]"></div>
        <div className="h-full w-1/3 bg-[#CE1126]"></div>
        <div className="h-full w-1/3 bg-[#FCD116]"></div>
      </div>

      {/* 2. OFFICIAL TOP BAR */}
      <div className="bg-[#0C1B33] py-3 px-4 md:px-10 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <p className="text-[8px] md:text-[10px] text-slate-300 uppercase tracking-[0.2em] md:tracking-[0.4em] font-sans font-bold leading-tight">
              Republic of the Philippines
              <span className="mx-2 text-slate-600 hidden sm:inline">|</span>
              <br className="sm:hidden" />
              Commission on Higher Education
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[9px] text-[#C5A059] uppercase tracking-widest font-sans font-bold">
            <span className="flex items-center gap-1">
              <Lock size={10} /> Secure
            </span>
            <span className="flex items-center gap-1">
              <History size={10} /> v2026.0.4
            </span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-white border-b border-slate-300">
        <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.04] pointer-events-none flex items-center justify-center">
          <Landmark size={300} className="md:size-[600px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-6 md:mb-8 shadow-sm">
              <Gavel size={14} className="text-[#0C1B33]" />
              <span className="text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#0C1B33]">
                Official Records & Archives Division
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-[#0C1B33] leading-[1.1] md:leading-[0.95] tracking-tighter">
              Digital <br />
              <span className="text-[#C5A059] underline decoration-slate-200 underline-offset-4 md:underline-offset-8">
                Transmittal
              </span>
              <br />
              <span className="text-2xl md:text-5xl font-light text-slate-500 antialiased font-sans uppercase tracking-widest block mt-2">
                Registry System
              </span>
            </h1>

            <p className="mt-6 md:mt-10 text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg font-sans border-l-4 border-[#C5A059] pl-4 md:pl-6">
              The secure platform for electronic transmittal creation and real-time archival tracking.
            </p>

            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 font-sans">
              <Link
                to="/login"
                className="bg-[#0C1B33] text-white px-8 py-4 md:py-5 rounded-sm font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-[#162a4d] transition-all flex justify-center items-center gap-4 shadow-xl shadow-slate-300 group"
              >
                Officer Login
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/verify"
                className="bg-white text-[#0C1B33] border-2 border-[#0C1B33] px-8 py-4 md:py-5 rounded-sm font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-slate-50 transition-all flex justify-center items-center gap-3"
              >
                <FileSearch size={16} />
                Verify Document
              </Link>
            </div>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 opacity-60">
              <div className="flex items-center gap-2 text-[#0C1B33]">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest">End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-[#0C1B33]">
                <FileSpreadsheet size={20} />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Audit-Ready Logs</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (STATS) */}
          <div className="relative group order-1 lg:order-2">
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 border-t-4 border-r-4 border-[#C5A059] pointer-events-none"></div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 border-b-4 border-l-4 border-[#C5A059] pointer-events-none"></div>

            <div className="relative bg-white border border-slate-300 shadow-2xl overflow-hidden">
              <div className="bg-[#0C1B33] px-6 py-4 flex justify-between items-center">
                <span className="text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                  Live System Integrity
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[9px] font-sans font-bold text-white uppercase tracking-widest">Encrypted</span>
                </div>
              </div>

              <div className="p-0.5 grid grid-cols-2 gap-0.5 bg-slate-200">
                <StatCard label="Daily Volume" value={dailyVolume} sub="Transmissions" />
                <StatCard label="Pending Action" value={pendingCount} sub="Priority 1" highlight />
                <StatCard label="Successful" value={releasedCount} sub="Verified" />
                <StatCard label="Archives" value={totalRecords} sub="Total Records" />
              </div>

              <div className="p-6 bg-white text-center">
                <p className="text-[10px] font-sans text-slate-400 leading-normal uppercase">
                  Governed by the <br />
                  <strong className="text-slate-600">Data Privacy Act of 2012</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white py-10 px-6 text-center border-t border-slate-200">
        <p className="text-[9px] md:text-[10px] font-sans font-bold text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.5em] max-w-2xl mx-auto">
          Official Document of the Office of Commissioner Desiderio R. Apag III
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div className="bg-white p-6 md:p-10 flex flex-col items-center text-center">
      <p className="text-[8px] md:text-[9px] font-sans font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h2 className={`text-3xl md:text-5xl font-black mb-1 ${highlight ? "text-[#CE1126]" : "text-[#0C1B33]"}`}>
        {value}
      </h2>
      <p className="text-[8px] md:text-[9px] font-sans font-bold text-slate-300 uppercase tracking-widest">
        {sub}
      </p>
    </div>
  );
}