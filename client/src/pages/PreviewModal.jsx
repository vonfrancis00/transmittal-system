import { Printer, X, Shield } from "lucide-react";
import BAGONGPILIPINAS from "../assets/BAGONG-PILIPINAS.png";
import CHED from "../assets/ched-logo.png";
import { QRCodeCanvas } from "qrcode.react";
import { useMemo } from "react";

export default function PreviewModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const row = data || {};

  const qrValue = useMemo(() => {
  return row.ref || "";
}, [row]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          @media print {

            html, body {
              width: 210mm;
              height: 297mm;
              background: white;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #print-document,
            #print-document * {
              visibility: visible;
            }

            #print-document {
              position: fixed;
              left: 0;
              top: 0;
              width: 210mm !important;
              height: 297mm !important;
              min-height: 297mm !important;
              max-width: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              overflow: hidden !important;
              background: white;
            }

            .print-hide {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm overflow-y-auto p-4 md:p-10 flex flex-col items-center font-sans">

        {/* Action Bar */}
        <div className="w-full max-w-[8.5in] flex justify-between items-center mb-6 print-hide">
          <div className="flex items-center gap-3 text-white/80">
            <Shield size={20} className="text-emerald-500" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] leading-none">
                Official Registry Archive
              </p>
              <p className="text-[9px] opacity-60">
                ID: {row._id}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-slate-100 text-slate-900 px-6 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
            >
              <Printer size={16} /> Print Document
            </button>

            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-red-600 text-white px-4 py-2.5 rounded text-[11px] font-bold uppercase transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Paper */}
        <div
          id="print-document"
          className="bg-white w-[210mm] h-[297mm] shadow-2xl print:shadow-none flex flex-col font-serif"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {/* Header */}
          <div className="pt-10 pb-5 px-4 mx-8">
            <div className="flex items-center justify-between">

              {/* Left Logo */}
              <img
                src={CHED}
                alt="CHED"
                className="h-24 w-auto object-contain"
              />

              {/* Center Title */}
              <div className="flex-1 ml-6 leading-none">

                <p className="text-[15px] text-slate-800 mb-1">
                  Republic of the Philippines
                </p>

                <p className="text-[14px] font-semibold uppercase mb-2">
                  OFFICE OF THE PRESIDENT
                </p>

                {/* LINE BELOW OFFICE OF THE PRESIDENT */}
                <div className="border-t-[2px] border-slate-900 w-full mb-2"></div>

                <h1 className="text-[18px] font-bold uppercase leading-tight">
                  COMMISSION ON HIGHER EDUCATION
                </h1>

              </div>

              {/* Right Logo */}
              <img
                src={BAGONGPILIPINAS}
                alt="Bagong Pilipinas"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-14 py-10 flex-1 text-slate-900">

            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase border-l-4 border-slate-900 pl-4">
                Transmittal from the Office of the Commissioner
              </h2>

              <p className="text-xs font-sans text-slate-500 uppercase tracking-widest pl-5">
                Reference No. {row.ref}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-5 mb-10 text-[15px]">

              <div className="grid grid-cols-[90px_15px_1fr] items-start">
              <span className="text-[15px] font-semibold text-slate-400 uppercase font-sans">
                To
              </span>

              <span>:</span>

              <div className="leading-tight">
                <p className="font-bold uppercase">
                  {row.to}
                </p>

                {row.charge?.trim() && (
                  <p className="text-sm text-slate-600">
                    {row.charge}
                  </p>
                )}
              </div>
            </div>

              <div className="grid grid-cols-[90px_15px_1fr]">
                <span className="text-[15px] font-semibold text-slate-400 uppercase font-sans">
                  From
                </span>
                <span>:</span>

                <div>
                  <p className="font-bold uppercase">{row.from}</p>
                  <p className="text-sm text-slate-600">Commissioner</p>
                </div>
              </div>

              <div className="grid grid-cols-[90px_15px_1fr]">
                <span className="text-[15px] font-semibold text-slate-400 uppercase font-sans">
                  Subject
                </span>
                <span>:</span>
                <span className="font-bold uppercase underline underline-offset-4">
                  {row.subject}
                </span>
              </div>

              <div className="grid grid-cols-[90px_15px_1fr]">
                <span className="text-[15px] font-semibold text-slate-400 uppercase font-sans">
                  Date
                </span>
                <span>:</span>
                <span className="font-bold">
                  {new Date(row.date)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .toUpperCase()}
                </span>
              </div>
            </div>

            <hr className="mb-8 border-slate-900" />

            {/* Message */}
            <div className="text-[14px] leading-[1.55] text-slate-900">

              <p className="italic font-semibold text-slate-700 mb-5 text-left">
                Maayong Adlaw!
              </p>

              <div
                className="mb-5 text-justify"
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  whiteSpace: "pre-line",
                }}
              >
                {row.body}
              </div>

              <p className="text-left">
                Daghang salamat!
              </p>

            </div>
          </div>

          {/* Footer */}
          <div className="px-14 pb-6 mt-auto">

            {/* Existing Footer Top */}
            <div className="flex justify-end items-end mb-6">

            <div className="flex flex-col items-center gap-1">
              <QRCodeCanvas value={qrValue} size={100} level="H" includeMargin />

              <span className="text-[8px] font-bold uppercase text-slate-500">
                Verify Authenticity
              </span>
            </div>

          </div>

            {/* New Bottom Footer Line */}
            <div className="border-t border-slate-700 pt-2 text-center text-[10px] leading-tight text-slate-700">
              <p>
                Higher Education Development Center Building, 55 C.P Garcia Avenue,
                UP Campus Diliman, Quezon City, Philippines
              </p>

              <p>
                Tel. No. (02) 8441 1117 &nbsp;|&nbsp;
                Email: commissionerapag@ched.gov.ph &nbsp;|&nbsp;
                Website: www.ocdra.vercel.app &nbsp;|&nbsp;
                FB: www.facebook.com/ocdra3
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}