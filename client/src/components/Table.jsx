import { useState, useEffect } from "react";
import {
  FileText,
  Trash2,
  Database,
  ShieldCheck,
  MoreVertical
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

  const totalRecords = data.length;

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

  const handleDelete = (row) => setDeleteRow(row);

  const handlePreview = (row) => {
    setSelectedRow(row);
    setOpenPreview(true);
  };

  const statusStyle = "text-emerald-700 bg-emerald-50 border-emerald-200";

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
      .toUpperCase();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white border border-slate-300 shadow-xl overflow-hidden rounded-sm">
        
        {/* TOP BAR - Responsive flex wrap */}
        <div className="bg-slate-900 px-4 md:px-6 py-2 flex flex-wrap justify-between items-center gap-y-2">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Database size={10} className="text-blue-400" />
              PH-01
            </span>
            <span className="hidden xs:block h-3 w-[1px] bg-slate-700"></span>
            <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={10} className="text-emerald-400" />
              AES-256
            </span>
            <span className="hidden xs:block h-3 w-[1px] bg-slate-700"></span>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total: {totalRecords}
            </span>
          </div>
          <p className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            v2.4
          </p>
        </div>

        {/* HEADER */}
        <div className="px-6 md:px-8 py-8 md:py-10 bg-white border-b border-slate-200">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
            Document Archive
          </h1>
          <p className="text-[9px] md:text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.15em]">
            Office of Commissioner Apag III
          </p>
        </div>

        {/* DESKTOP TABLE VIEW (Visible on lg and up) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Official Reference</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Subject</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Recipient</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={row._id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-xs font-mono font-bold text-blue-800">{row.ref}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-800 uppercase">{row.subject}</td>
                  <td className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase">{row.to || "N/A"}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-sm border text-[9px] font-black uppercase tracking-widest ${statusStyle}`}>
                      Released
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handlePreview(row)} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-all rounded-sm text-[10px] font-bold uppercase">
                        Preview
                      </button>
                      <button onClick={() => handleDelete(row)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW (Visible below lg) */}
        <div className="lg:hidden divide-y divide-slate-200">
          {data.map((row) => (
            <div key={row._id} className="p-6 space-y-4 hover:bg-slate-50 active:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {row.ref}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase leading-snug">
                    {row.subject}
                  </h3>
                </div>
                <span className={`px-2 py-0.5 rounded-sm border text-[8px] font-black uppercase tracking-tighter ${statusStyle}`}>
                  Released
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-[10px] uppercase font-bold tracking-wider">
                <div>
                  <p className="text-slate-400 text-[8px]">Recipient</p>
                  <p className="text-slate-600">{row.to || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[8px]">Date Filed</p>
                  <p className="text-slate-600">{formatDate(row.date)}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => handlePreview(row)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100"
                >
                  <FileText size={14} /> Preview Record
                </button>
                <button 
                  onClick={() => handleDelete(row)}
                  className="px-4 flex items-center justify-center border border-slate-200 text-slate-400 rounded-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
              No archives found
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 md:px-8 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
            Showing {data.length} entries | Database: PH-MANILA-01
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