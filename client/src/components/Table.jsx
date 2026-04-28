import { useState, useEffect } from "react";
import {
  Search,
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

  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  /* ADDED */
  const totalRecords = data.length;

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
      console.error("Fetch Error:", error.response?.data || error.message);
      setData([]);
    }
  };

  const handleDelete = (row) => {
    setDeleteRow(row);
  };

  const confirmDelete = async () => {
    if (!deleteRow) return;

    try {
      setDeleting(true);

      const res = await api.delete(`/transmittals/${deleteRow._id}`);

      if (res.status === 200) {
        await fetchRecords();

        setDeleteRow(null);
        setDeleting(false);
        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
        }, 1800);
      }
    } catch (error) {
      setDeleting(false);

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
    Draft: "text-slate-600 bg-slate-50 border-slate-200"
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
      .toUpperCase();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white border border-slate-300 shadow-xl overflow-hidden rounded-sm">

        {/* TOP BAR */}
        <div className="bg-slate-900 px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <Database size={12} className="text-blue-400" />
              Server: PH-MANILA-01
            </span>

            <span className="h-3 w-[1px] bg-slate-700"></span>

            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <ShieldCheck size={12} className="text-emerald-400" />
              Encryption: AES-256
            </span>

            {/* ADDED TOTAL COUNT */}
            <span className="h-3 w-[1px] bg-slate-700"></span>

            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Total Records: {totalRecords}
            </span>
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Official Record System v2.4
          </p>
        </div>

        {/* HEADER */}
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

          </div>
        </div>

        {/* TABLE */}
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
                  Recipient
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
                    <span className="text-xs font-bold text-slate-800 uppercase">
                      {row.subject}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase">
                    {row.to || "N/A"}
                  </td>

                  <td className="px-8 py-5 text-[11px] font-bold text-slate-600 uppercase">
                    {formatDate(row.date)}
                  </td>

                  <td className="px-8 py-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm border text-[9px] font-black uppercase tracking-widest ${statusStyle["Released"]}`}
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

        {/* FOOTER */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Showing {data.length} entries | Total Database Records: {totalRecords}
          </p>
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