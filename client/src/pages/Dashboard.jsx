import { FileText, Clock, CheckCircle, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-800 p-2 rounded">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Official System Portal
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Transmittal Overview
        </h1>
        <p className="text-slate-600 mt-1">Real-time status tracking and document management summary.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Total Transmittals */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Transmittals</p>
                  <h2 className="text-4xl font-bold mt-2 text-slate-900">25</h2>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="text-blue-700 w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs font-medium text-slate-400">
              Updated 2 minutes ago
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Awaiting Review</p>
                  <h2 className="text-4xl font-bold mt-2 text-amber-600">10</h2>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <Clock className="text-amber-600 w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-amber-50/30 px-6 py-3 border-t border-slate-100 text-xs font-medium text-amber-700">
              Requires immediate action
            </div>
          </div>

          {/* Released */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Released / Finalized</p>
                  <h2 className="text-4xl font-bold mt-2 text-emerald-700">15</h2>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <CheckCircle className="text-emerald-700 w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-emerald-50/30 px-6 py-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
              60% of total volume
            </div>
          </div>

        </div>

        {/* Professional Footer Detail */}
        <div className="mt-12 text-center border-t border-slate-200 pt-6">
          <p className="text-slate-400 text-sm italic">
            Confidentiality Notice: This data is for internal government use only.
          </p>
        </div>
      </div>
    </div>
  );
}