// src/components/PreviewModal.jsx
import { Printer, X, Shield } from "lucide-react";
import BAGONGPILIPINAS from "../assets/BAGONG-PILIPINAS.png";
import CHED from "../assets/ched-logo.png";
import { QRCodeCanvas } from "qrcode.react";
import { useMemo } from "react";

export default function PreviewModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const row = data || {};
  const qrValue = useMemo(() => row.ref || "", [row]);

  return (
    <>
      <style>
        {`
          @page {
            size: A4 portrait;
            margin: 0;
          }

          @media print {
            body { background: white; }
            .print-hide { display: none !important; }
            #print-document {
              position: fixed;
              top: 0;
              left: 0;
              width: 210mm !important;
              height: 297mm !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 1in !important; 
              transform: scale(1) !important; /* Reset scale for actual printing */
            }
          }

          /* Mobile Preview Scaling */
          @media (max-width: 800px) {
            .paper-preview-container {
              transform: scale(0.45); /* Scales the A4 sheet to fit mobile screens */
              transform-origin: top center;
              margin-bottom: -150mm; /* Adjusts layout flow since scale doesn't change element bounds */
            }
          }
          @media (max-width: 500px) {
            .paper-preview-container {
              transform: scale(0.38);
              margin-bottom: -180mm;
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[100] bg-slate-900/98 backdrop-blur-md overflow-y-auto overflow-x-hidden flex flex-col items-center font-sans pb-20">
        
        {/* Action Bar - Mobile Optimized */}
        <div className="sticky top-0 w-full z-10 bg-slate-900/80 p-4 border-b border-white/10 flex justify-between items-center print-hide">
          <div className="flex items-center gap-2 text-white/80">
            <Shield size={16} className="text-emerald-500" />
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-widest">Preview Mode</p>
              <p className="text-[8px] opacity-60">ID: {row.ref}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 transition-all"
            >
              <Printer size={14} /> Print
            </button>
            <button
              onClick={onClose}
              className="bg-slate-800 text-white p-2 rounded hover:bg-red-600 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scaled Wrapper for Mobile */}
        <div className="paper-preview-container transition-transform duration-500 ease-in-out mt-4 md:mt-10">
          
          {/* Actual A4 Paper Document */}
          <div
            id="print-document"
            className="bg-white w-[210mm] min-h-[297mm] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col px-[1in] py-[1in] relative"
            style={{ 
              fontFamily: '"Times New Roman", Times, serif', 
              color: '#000',
              lineHeight: '1.5' 
            }}
          >
            {/* Official Header */}
            <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
              <img src={CHED} alt="CHED" className="h-20 w-auto object-contain" />
              
              <div className="text-center flex-1 mx-4">
                <p className="text-[15px] leading-tight text-left">Republic of the Philippines</p>
                <p className="text-[15px] font-bold uppercase leading-tight text-left">Office of the President</p>
                <h1 className="text-[20px] font-bold uppercase text-left">Commission on Higher Education</h1>
              </div>

              <img src={BAGONGPILIPINAS} alt="Bagong Pilipinas" className="h-20 w-auto object-contain" />
            </div>

            {/* Document Type & Reference */}
            <div className="mb-8">
              <h2 className="text-[15px] font-bold uppercase tracking-tight">
                Transmittal from the Office of the Commissioner
              </h2>
              <p className="text-[13px] italic font-serif">Reference No. {row.ref}</p>
            </div>

            {/* Formal Metadata */}
            <div className="space-y-3 mb-10 text-[15px]">
              <div className="grid grid-cols-[100px_20px_1fr] items-start">
                <span className="font-bold">TO</span>
                <span>:</span>
                <div className="font-bold uppercase leading-snug">
                  <p>{row.to}</p>
                  {row.charge && <p className="text-[13px] font-normal normal-case italic mt-1">{row.charge}</p>}
                </div>
              </div>

              <div className="grid grid-cols-[100px_20px_1fr] items-start">
                <span className="font-bold">FROM</span>
                <span>:</span>
                <div className="leading-snug">
                  <p className="font-bold uppercase">{row.from}</p>
                  <p className="text-[14px]">Commissioner</p>
                </div>
              </div>

              <div className="grid grid-cols-[100px_20px_1fr] items-start">
                <span className="font-bold">SUBJECT</span>
                <span>:</span>
                <span className="font-bold uppercase underline underline-offset-4 decoration-1">
                  {row.subject}
                </span>
              </div>

              <div className="grid grid-cols-[100px_20px_1fr] items-start">
                <span className="font-bold">DATE</span>
                <span>:</span>
                <span className="font-bold">
                  {row.date ? new Date(row.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).toUpperCase() : ""}
                </span>
              </div>
            </div>

            <div className="border-t border-black mb-8 opacity-20"></div>

            {/* Body Content */}
            <div className="text-[15px] flex-1">
              <p className="italic font-bold mb-6">Maayong Adlaw!</p>
              <div className="text-justify whitespace-pre-line" style={{ textAlignLast: 'left' }}>
                {row.body}
              </div>
              <p className="mt-8 font-bold">Daghang salamat!</p>
            </div>

            {/* Formal Footer with QR */}
            <div className="mt-auto pt-10">
              <div className="flex justify-end mb-6">
                <div className="flex flex-col items-center">
                  <QRCodeCanvas value={qrValue} size={90} level="H" />
                  <span className="text-[9px] font-bold uppercase mt-2 tracking-tighter opacity-70">
                    Electronic Verification Link
                  </span>
                </div>
              </div>

              <div className="border-t border-black pt-4 text-[10px] leading-relaxed italic opacity-80">
                <p className="font-bold not-italic">Higher Education Development Center Building</p>
                <p>C.P. Garcia Ave., UP Campus, Diliman, Quezon City, Philippines</p>
                <p>Website: www.ched.gov.ph | Email: commissioner@ched.gov.ph</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}