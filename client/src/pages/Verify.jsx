// src/pages/Verify.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ScanLine,
  FileWarning,
  ArrowLeft,
  Search,
  Building2,
  Lock,
  Stamp
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

export default function Verify() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openScanner, setOpenScanner] = useState(false);

  const scannerRef = useRef(null);

  const extractCode = (raw) => {
    let text = raw?.trim();
    try {
      const parsed = JSON.parse(text);
      if (parsed.ref) return parsed.ref;
      if (parsed.id) return parsed.id;
    } catch {}
    if (text.includes("/verify/")) return text.split("/verify/").pop().trim();
    return text;
  };

  const verifyDocument = async (manualCode = code) => {
    const finalCode = extractCode(manualCode);
    if (!finalCode) return;

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(
        `http://localhost:5000/api/transmittals/verify/${encodeURIComponent(finalCode)}`
      );

      const data = await res.json();
      setResult({ found: res.ok, data });
    } catch {
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        const devices = await Html5Qrcode.getCameras();
        if (!devices.length || !mounted) return;

        await scanner.start(
          devices[0].id,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            if (!mounted) return;

            const cleanCode = extractCode(decodedText);
            setCode(cleanCode);

            await stopScanner();
            setOpenScanner(false);
            await verifyDocument(cleanCode);
          },
          () => {}
        );
      } catch (err) {
        console.log(err);
      }
    };

    if (openScanner) startScanner();

    return () => {
      mounted = false;
    };
  }, [openScanner]);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {}
      scannerRef.current = null;
    }
  };

  const cancelScan = async () => {
    await stopScanner();
    setOpenScanner(false);
  };

  return (
    <>
      {/* PRINT STYLE */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }

          .print-area,
          .print-area * {
            visibility: visible;
          }

          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }

          button {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#F1F5F9] font-serif selection:bg-blue-100">
        {/* INSTITUTIONAL TOP BAR */}
        <div className="bg-[#0C1B33] text-white py-2 px-6 border-b-4 border-[#C5A059]">
          <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] uppercase tracking-widest font-sans font-bold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock size={12} /> Secure Official Gateway
              </span>
              <span className="hidden md:inline border-l border-slate-700 pl-4 text-slate-400 text-[9px]">
                Republic of the Philippines
              </span>
            </div>

            <Link
              to="/"
              className="hover:text-[#C5A059] transition flex items-center gap-2"
            >
              <ArrowLeft size={12} /> Return to Main Portal
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* HEADER SECTION */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md border border-slate-200 mb-4">
              <Building2 size={40} className="text-[#0C1B33]" />
            </div>

            <h1 className="text-3xl font-black text-[#0C1B33] uppercase tracking-tight mb-2">
              Document Verification System
            </h1>

            <p className="text-slate-500 font-sans text-sm max-w-md mx-auto leading-relaxed">
              Verify the authenticity of CHED transmittal documents by entering
              the reference number or scanning the official QR code.
            </p>
          </div>

          <div className="bg-white shadow-2xl border-t-8 border-[#0C1B33] overflow-hidden">
            <div className="p-10">
              {/* SEARCH AREA */}
              <div className="relative group">
                <label className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#0C1B33] mb-3">
                  Input Reference Number
                </label>

                <div className="flex flex-col md:flex-row gap-0 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#C5A059] transition-all">
                  <div className="flex items-center px-4 bg-slate-50 border-r border-slate-200">
                    <Search size={18} className="text-slate-400" />
                  </div>

                  <input
                    type="text"
                    placeholder="e.g., 2026-CHED-TR-008"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 px-5 py-4 font-sans text-lg outline-none placeholder:text-slate-300"
                  />

                  <button
                    onClick={() => verifyDocument()}
                    disabled={loading}
                    className="bg-[#0C1B33] text-[#C5A059] px-10 py-4 font-sans font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#162a4d] transition disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Validate"}
                  </button>
                </div>
              </div>

              {/* SCANNER TOGGLE */}
              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={() => {
                    setResult(null);
                    setCode("");
                    setOpenScanner(true);
                  }}
                  className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#0C1B33] transition border-b border-dashed border-slate-300 pb-1"
                >
                  <ScanLine size={16} />
                  Switch to QR Scanner
                </button>
              </div>

              {/* QR SCANNER */}
              {openScanner && (
                <div className="mt-8 bg-slate-50 p-6 border-2 border-dashed border-slate-200 rounded-lg">
                  <div
                    id="reader"
                    className="overflow-hidden rounded-md shadow-inner bg-black"
                  ></div>

                  <button
                    onClick={cancelScan}
                    className="mt-4 w-full bg-red-50 text-red-700 font-sans font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-red-100 transition border border-red-200"
                  >
                    Terminate Scanner Session
                  </button>
                </div>
              )}

              {/* RESULT */}
              {result && (
                <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {result.found ? (
                    <div className="print-area relative border-2 border-[#C5A059] bg-[#FCFBF7] p-8 md:p-12 overflow-hidden">
                      <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] rotate-12">
                        <Stamp size={250} />
                      </div>

                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-emerald-100 p-4 rounded-full text-emerald-700">
                          <ShieldCheck size={48} />
                        </div>

                        <div className="flex-1">
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#0C1B33] mb-1">
                              Certification of Authenticity
                            </h2>

                            <p className="text-emerald-700 font-sans text-xs font-bold uppercase tracking-widest">
                              Official Record Validated
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 border-t border-slate-200 pt-6 font-sans">
                            <Detail
                              label="Reference No."
                              value={result.data.ref}
                            />
                            <Detail
                              label="Date of Issuance"
                              value={result.data.date}
                            />
                            <Detail
                              label="Originating Office"
                              value={result.data.from}
                            />
                            <Detail
                              label="Intended Recipient"
                              value={result.data.to}
                            />

                            <div className="col-span-full">
                              <Detail
                                label="Subject/Description"
                                value={result.data.subject}
                              />
                            </div>
                          </div>

                          <div className="mt-10 flex gap-4">
                            <button
                              onClick={() => {
                                setCode("");
                                setResult(null);
                              }}
                              className="bg-[#0C1B33] text-white px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition shadow-lg"
                            >
                              New Verification
                            </button>

                            <button
                              onClick={() => window.print()}
                              className="border border-[#0C1B33] text-[#0C1B33] px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition"
                            >
                              Print Validation
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-red-200 bg-red-50 p-10 text-center">
                      <div className="inline-flex bg-red-100 p-4 rounded-full text-red-600 mb-4">
                        <FileWarning size={32} />
                      </div>

                      <h2 className="text-xl font-bold text-red-900 mb-2">
                        Record Not Found
                      </h2>

                      <p className="text-red-700 font-sans text-sm max-w-sm mx-auto mb-6">
                        The reference number provided does not match any records
                        in our secure database. Please ensure the code is entered
                        correctly.
                      </p>

                      <button
                        onClick={() => {
                          setCode("");
                          setResult(null);
                        }}
                        className="bg-red-700 text-white px-8 py-3 font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-red-800 transition"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-6 items-center opacity-40 grayscale">
                <div className="h-8 w-8 bg-slate-400 rounded-full"></div>
                <div className="h-8 w-8 bg-slate-400 rounded-full"></div>
              </div>

              <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-slate-400 text-center md:text-right">
                © 2026 Commission on Higher Education <br />
                Secure Digital Governance Initiative
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-tight mb-1">
        {label}
      </span>
      <span className="text-slate-900 font-medium">{value || "N/A"}</span>
    </div>
  );
}