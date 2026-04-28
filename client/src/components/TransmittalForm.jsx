import { useState } from "react";
import { Save, Eraser, FileText, Info, Shield } from "lucide-react";

export default function TransmittalForm() {
  const defaultFrom = "DESIDERIO R. APAG III, D.Eng., PCPE";

  const [form, setForm] = useState({
    to: "",
    from: defaultFrom,
    subject: "",
    date: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  /* GENERATE DOCUMENT ID */
  const generateDocumentId = () => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  /* CONTINUOUS RUNNING NUMBER */
  const lastNumber = Number(
    localStorage.getItem("transmittal-item-number") || "0"
  );

  const nextNumber = lastNumber + 1;

  /* PAD NUMBER */
  const item = String(nextNumber).padStart(3, "0");

  return `${yyyy}${mm}${dd}-${item}`;
};

  /* KEEP SAME ID UNTIL SAVED */
  const [documentId, setDocumentId] = useState(() => {
    const savedId = localStorage.getItem("pending-transmittal-id");

    if (savedId) return savedId;

    const newId = generateDocumentId();
    localStorage.setItem("pending-transmittal-id", newId);

    return newId;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      to: "",
      charge: "",
      from: defaultFrom,
      subject: "",
      date: "",
      body: "",
    });
  };

const saveForm = async () => {
  try {
    setLoading(true);

    const payload = {
      ref: documentId,
      to: form.to,
      charge: form.charge || "",
      from: form.from,
      position: form.position || "",
      subject: form.subject,
      date: form.date,
      body: form.body,
    };

    const response = await fetch("http://localhost:5000/api/transmittals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      const usedNumber = documentId.split("-")[1];

      localStorage.setItem(
        "transmittal-item-number",
        Number(usedNumber)
      );

      localStorage.removeItem("pending-transmittal-id");

      const nextId = generateDocumentId();

      localStorage.setItem("pending-transmittal-id", nextId);
      setDocumentId(nextId);

      alert("Record committed to database successfully.");
      resetForm();
    } else {
      console.log(data);
      alert(data.message || "Failed to save.");
    }
  } catch (error) {
    console.error(error);
    alert("Server connection failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl border border-slate-300">
      {/* Left Sidebar */}
      <div className="lg:w-72 bg-slate-50 p-8 border-r border-slate-200 hidden lg:block">
        <div className="flex items-center gap-2 text-slate-900 mb-6">
          <Shield size={18} className="text-blue-800" />
          <span className="text-xs font-bold uppercase tracking-tighter">
            Security Protocol
          </span>
        </div>

        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
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
              Subject lines must follow the standard departmental naming
              convention.
            </p>
          </li>
        </ul>

        {/* DOCUMENT ID */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="p-4 bg-white border border-slate-200 rounded-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Document ID
            </p>

            <p className="text-xs font-mono mt-1 text-slate-700">
              {documentId}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="bg-slate-900 px-10 py-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider flex items-center gap-3">
              <FileText className="text-blue-400" />
              New Transmittal Entry
            </h1>

            <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide">
              Official Transmittal Registry
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Recipient */}
            <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
              Recipient Office / Official
            </label>

            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="e.g. Office of the Commissioner"
              className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-2 text-sm font-medium uppercase focus:border-blue-800 outline-none transition-colors"
            />

            {/* SECOND LINE */}
            <input
              name="charge"
              value={form.charge}
              onChange={handleChange}
              placeholder="e.g. SUCs PRESIDENTS/OIC AND BOARD SECRETARIES UNDER MY CHARGE"
              className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-2 text-sm font-bold uppercase focus:border-blue-800 outline-none transition-colors"
            />
          </div>

            {/* Originating Office */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                Originating Office
              </label>

              <div className="w-full border-b-2 border-slate-200 bg-slate-50 px-0 py-2">
                <p className="text-sm font-bold text-slate-700">
                  {form.from}
                </p>

                <p className="text-xs italic text-slate-500 mt-1">
                  Commissioner
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                Subject Matter
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Nature of document"
                className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-2 text-sm focus:border-blue-800 outline-none transition-colors font-medium"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                Date of Issuance
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-2 text-sm focus:border-blue-800 outline-none transition-colors font-medium"
              />
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
              Detailed Message / Description
            </label>

            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Provide a detailed breakdown of the transmittal contents..."
              className="w-full border border-slate-200 bg-slate-50/50 p-6 h-64 resize-none focus:border-blue-800 focus:bg-white outline-none transition-all text-sm leading-relaxed text-slate-700 rounded-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-10">
            <button
              onClick={saveForm}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-blue-800 transition shadow-lg shadow-slate-200 disabled:opacity-60"
            >
              <Save size={14} />
              {loading ? "Saving..." : "Commit Transmittal"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-3 bg-white text-slate-500 border border-slate-200 px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:text-red-600 transition"
            >
              <Eraser size={14} />
              Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}