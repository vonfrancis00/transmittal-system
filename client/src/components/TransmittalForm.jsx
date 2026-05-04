import { useState } from "react";
import { Save, Eraser, FileText, Info, Shield } from "lucide-react";
import api from "../services/api";

export default function TransmittalForm() {
  const defaultFrom = "DESIDERIO R. APAG III, D.Eng., PCPE";

  const [form, setForm] = useState({
    to: "",
    charge: "",
    from: defaultFrom,
    position: "",
    subject: "",
    date: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  const generateDocumentId = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const lastNumber = Number(localStorage.getItem("transmittal-item-number") || "0");
    const nextNumber = lastNumber + 1;
    const item = String(nextNumber).padStart(3, "0");
    return `${yyyy}${mm}${dd}-${item}`;
  };

  const [documentId, setDocumentId] = useState(() => {
    const savedId = localStorage.getItem("pending-transmittal-id");
    if (savedId) return savedId;
    const newId = generateDocumentId();
    localStorage.setItem("pending-transmittal-id", newId);
    return newId;
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      to: "",
      charge: "",
      from: defaultFrom,
      position: "",
      subject: "",
      date: "",
      body: "",
    });
  };

  const saveForm = async () => {
    try {
      setLoading(true);
      const payload = { ref: documentId, ...form };
      const response = await api.post("/transmittals", payload);

      if (response.status === 200 || response.status === 201) {
        const usedNumber = documentId.split("-")[1];
        localStorage.setItem("transmittal-item-number", Number(usedNumber));
        localStorage.removeItem("pending-transmittal-id");
        const nextId = generateDocumentId();
        localStorage.setItem("pending-transmittal-id", nextId);
        setDocumentId(nextId);
        alert("Record committed to database successfully.");
        resetForm();
      }
    } catch (error) {
      alert("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl border border-slate-300 bg-white overflow-hidden">
      
      {/* Left Sidebar / Mobile Top Info */}
      <div className="lg:w-72 bg-slate-50 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
        <div className="flex items-center gap-2 text-slate-900 mb-6">
          <Shield size={18} className="text-blue-800" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Security Protocol
          </span>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Instructions
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-500">
                Ensure all recipient fields match the official CHED registry.
              </p>
            </li>
            <li className="flex gap-3">
              <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-500">
                Subject lines must follow departmental naming conventions.
              </p>
            </li>
          </ul>
        </div>

        {/* DOCUMENT ID - Mobile friendly view */}
        <div className="mt-4 lg:mt-12 pt-4 lg:pt-8 border-t border-slate-200">
          <div className="p-4 bg-white border border-slate-200 rounded-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Assigned Document ID
            </p>
            <p className="text-xs font-mono mt-1 font-bold text-blue-900 tracking-tighter">
              {documentId}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1">
        {/* Form Header */}
        <div className="bg-slate-900 px-6 lg:px-10 py-6 lg:py-8 text-white">
          <h1 className="text-lg lg:text-xl font-bold uppercase tracking-wider flex items-center gap-3">
            <FileText className="text-blue-400 w-5 h-5" />
            New Entry
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
            Official Transmittal Registry
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Recipient */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Recipient Details
              </label>
              <input
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="Office / Official Name"
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 text-sm font-bold uppercase focus:border-blue-800 outline-none transition-colors placeholder:text-slate-300"
              />
              <input
                name="charge"
                value={form.charge}
                onChange={handleChange}
                placeholder="Charge Description"
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 text-sm font-medium uppercase focus:border-blue-800 outline-none transition-colors placeholder:text-slate-300"
              />
            </div>

            {/* Originating Office */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Originating Office
              </label>
              <div className="w-full border-b-2 border-slate-200 bg-slate-50/50 p-2 rounded-t-sm">
                <p className="text-sm font-bold text-slate-700">{form.from}</p>
                <p className="text-[10px] italic text-slate-500 mt-1">Commissioner</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Subject */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Subject Matter
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Nature of document"
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 text-sm focus:border-blue-800 outline-none transition-colors font-bold uppercase placeholder:text-slate-300"
              />
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Date of Issuance
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 text-sm focus:border-blue-800 outline-none transition-colors font-bold uppercase"
              />
            </div>
          </div>

          {/* Body Textarea */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Detailed breakdown of contents
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Enter message details..."
              className="w-full border border-slate-200 bg-slate-50/30 p-4 lg:p-6 h-48 lg:h-64 resize-none focus:border-blue-800 focus:bg-white outline-none transition-all text-sm leading-relaxed text-slate-700 rounded-sm"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={saveForm}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? "Processing..." : "Commit To Archive"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex-1 flex items-center justify-center gap-3 bg-white text-slate-400 border border-slate-200 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:text-red-600 transition-all"
            >
              <Eraser size={16} />
              Wipe Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}