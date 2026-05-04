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
              /* Standard 1-inch margins for formal documents */
              padding: 1in !important; 
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm overflow-y-auto p-4 md:p-10 flex flex-col items-center font-sans">
        
        {/* Action Bar (Remains the same for UI) */}
        <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 print-hide">
          <div className="flex items-center gap-3 text-white/80">
            <Shield size={20} className="text-emerald-500" />
            <div className="leading-tight">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Official Registry Archive</p>
              <p className="text-[9px] opacity-60">REF: {row.ref}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-100 text-slate-900 px-6 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
            >
              <Printer size={16} /> Print Document
            </button>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-red-600 text-white px-4 py-2.5 rounded transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div
          id="print-document"
          className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex flex-col px-[1in] py-[1in]"
          style={{ 
            fontFamily: '"Times New Roman", Times, serif', 
            color: '#000', // Formal documents use true black
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

          {/* Formal Metadata Table (Grid for perfect colon alignment) */}
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
                {new Date(row.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="border-t border-black mb-8 opacity-20"></div>

          {/* Salutation & Body Content */}
          <div className="text-[15px] flex-1">
            <p className="italic font-bold mb-6">Maayong Adlaw!</p>
            
            <div 
              className="text-justify whitespace-pre-line"
              style={{ textAlignLast: 'left' }} // Keeps final line of paragraphs left-aligned
            >
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
    </>
  );
}