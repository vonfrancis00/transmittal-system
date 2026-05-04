import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Landmark,
  User,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Create Transmittal", path: "/create" },
    { name: "Official Records", path: "/records" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white border-b border-slate-700 shadow-md">
      {/* Top Thin Bar - Hidden on Mobile */}
      <div className="bg-slate-900 border-b border-slate-800 py-1 px-8 hidden md:block">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400">
          Office of Commissioner Desiderio R. Apag III Digital transmittal registry system
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center justify-center bg-white p-1.5 rounded-sm shrink-0">
              <Landmark className="text-slate-900 w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="border-l border-slate-700 pl-3 md:pl-5">
              <h1 className="text-sm md:text-md font-bold tracking-tight leading-none uppercase">
                Portal
              </h1>
              <p className="text-[9px] md:text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider line-clamp-1">
                <span className="hidden sm:inline">Office of Commissioner</span> Desiderio R. Apag III
              </p>
            </div>
          </div>

          {/* NAV: Desktop Only */}
          <nav className="hidden lg:flex items-center h-full ml-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center h-16 px-5 text-xs font-bold uppercase tracking-widest transition-colors
                  ${active ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  {item.name}
                  {active && <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Profile & Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Notification */}
            <button className="text-slate-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-slate-900"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-700 hidden sm:block" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 md:h-9 md:w-9 rounded bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sm overflow-hidden shadow-inner shrink-0">
                <User size={18} className="text-slate-300" />
              </div>
              <ChevronDown size={14} className="text-slate-500 hidden md:block" />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 md:px-4 py-2 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-widest transition flex items-center gap-2"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700">
          <div className="flex flex-col py-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-slate-700/50 last:border-0
                  ${active ? "text-blue-400 bg-slate-900/40" : "text-slate-300 hover:bg-slate-700/50"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}