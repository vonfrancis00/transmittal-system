import { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  BarChart3
} from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
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

  const totalTransmittals = data.length;
  const releasedCount = data.filter((item) => item.status === "Released").length;
  const pendingCount = totalTransmittals - releasedCount;
  const releasedPercent = totalTransmittals > 0 
    ? Math.round((releasedCount / totalTransmittals) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-5 md:p-8 font-sans overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-10 border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-2">
          <div className="bg-slate-800 p-2 rounded w-fit">
            <BarChart3 className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>

          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Official System Portal
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Transmittal Overview
        </h1>

        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Real-time status tracking and document management summary.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">

          {/* Total Transmittals */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-sm">
            <div className="p-5 md:p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Total Transmittals
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 text-slate-900">
                    {totalTransmittals}
                  </h2>
                </div>
                <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                  <FileText className="text-blue-700 w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-5 md:px-6 py-3 border-t border-slate-100 text-[10px] md:text-xs font-medium text-slate-400">
              Live database count
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-sm">
            <div className="p-5 md:p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Awaiting Review
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 text-amber-600">
                    {pendingCount}
                  </h2>
                </div>
                <div className="bg-amber-50 p-2 md:p-3 rounded-lg">
                  <Clock className="text-amber-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
            <div className="bg-amber-50/30 px-5 md:px-6 py-3 border-t border-slate-100 text-[10px] md:text-xs font-medium text-amber-700">
              Requires immediate action
            </div>
          </div>

          {/* Released */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-sm">
            <div className="p-5 md:p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Released / Finalized
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 text-emerald-700">
                    {releasedCount}
                  </h2>
                </div>
                <div className="bg-emerald-50 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="text-emerald-700 w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
            <div className="bg-emerald-50/30 px-5 md:px-6 py-3 border-t border-slate-100 text-[10px] md:text-xs font-medium text-emerald-700">
              {releasedPercent}% of total volume
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 text-center border-t border-slate-200 pt-6">
          <p className="text-slate-400 text-[11px] md:text-sm italic px-4">
            Confidentiality Notice: This data is for internal government use only.
          </p>
        </div>
      </div>
    </div>
  );
}