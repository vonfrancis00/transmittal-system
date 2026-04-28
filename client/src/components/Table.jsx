import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit3,
  Trash2,
  Filter,
  Download,
  FileText,
  ChevronRight,
  Database,
  ShieldCheck
} from "lucide-react";
import PreviewModal from "../pages/PreviewModal";
import api from "../services/api";

export default function Table() {
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [deleteRow, setDeleteRow] = useState(null);

  /* LOAD DATABASE RECORDS */
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/transmittals");

      console.log("Fetched:", res.data);

      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      setData([]);
    }
  };

  /* OPEN DELETE MODAL */
  const handleDelete = (row) => {
    setDeleteRow(row);
  };

  /* CONFIRM DELETE */
// REPLACE ONLY YOUR confirmDelete FUNCTION WITH THIS
const confirmDelete = async () => {
  if (!deleteRow) return;

  try {
    const res = await api.delete(`/transmittals/${deleteRow._id}`);

    if (res.status === 200) {
      // refresh records from database
      await fetchRecords();

      setDeleteRow(null);
      alert("Record deleted successfully.");
    } else {
      alert("Delete failed.");
    }
  } catch (error) {
    console.error(
      "Delete Error:",
      error.response?.data || error.message
    );

    alert("Failed to delete record.");
  }
};

  const handlePreview = (row) => {
    setSelectedRow(row);
    setOpenPreview(true);
  };

  const statusStyle = {
    Released: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Pending: "text-amber-700 bg-amber-50 border-amber-200",
    Draft: "text-slate-600 bg-slate-50 border-slate-200",
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).toUpperCase();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white border border-slate-300 shadow-xl overflow-hidden rounded-sm">

        {/* Top Status Bar */}
        <div className="bg-slate-900 px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <Database size={12} className="text-blue-400" /> Server: PH-MANILA-01
            </span>

            <span className="h-3 w-[1px] bg-slate-700"></span>

            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <ShieldCheck size={12} className="text-emerald-400" /> Encryption: AES-256
            </span>
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Official Record System v2.4
          </p>
        </div>

        {/* Header */}
        <div className="px-8 py-10 bg-white border-b border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
                Document Transmittal Archive
              </h1>

              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.15em]">
                OFFICE OF COMMISSIONER APAG III • TRANSMITTAL TRACKING
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-grow lg:flex-grow-0">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="SEARCH BY REFERENCE..."
                  className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-sm pl-10 pr-4 py-3 text-[11px] font-bold tracking-widest uppercase focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                />
              </div>

              <button className="p-3 border border-slate-200 rounded-sm hover:bg-slate-50 transition-colors text-slate-600">
                <Filter size={18} />
              </button>

              <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-blue-800 transition shadow-lg shadow-slate-200">
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Official Reference
                </th>

                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Classification / Subject
                </th>

                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Origin Office
                </th>

                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Date Filed
                </th>

                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-center">
                  Status
                </th>

                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr
                  key={row._id}
                  className="group hover:bg-slate-50 transition-colors"
                >
                  <td className="px-8 py-5 text-xs font-mono font-bold text-blue-800 tracking-tighter">
                    {row.ref}
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-slate-200 group-hover:bg-blue-600 transition-colors"></div>

                      <span className="text-xs font-bold text-slate-800 uppercase leading-tight tracking-tight">
                        {row.subject}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {row.from || "N/A"} UNIT
                    </span>
                  </td>

                  <td className="px-8 py-5 text-[11px] font-bold text-slate-600 uppercase">
                    {formatDate(row.date)}
                  </td>

                  <td className="px-8 py-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm border text-[9px] font-black uppercase tracking-widest ${
                        statusStyle["Released"]
                      }`}
                    >
                      Released
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex justify-end items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handlePreview(row)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-all rounded-sm text-[10px] font-bold uppercase tracking-tighter"
                      >
                        <FileText size={14} /> Preview
                      </button>

                      <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>

                      <button className="p-2 text-slate-400 hover:text-amber-600 transition-colors">
                        <Edit3 size={16} />
                      </button>

                      <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-400 text-sm"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      <PreviewModal
        isOpen={openPreview}
        onClose={() => setOpenPreview(false)}
        data={selectedRow}
      />
    </>
  );
}