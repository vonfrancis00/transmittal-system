import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Landmark,
  User,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Create Transmittal", path: "/create" },
    { name: "Official Records", path: "/records" },
  ];

  const handleLogout = () => {
    // Optional: clear auth/session here
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white border-b border-slate-700 shadow-md">
      {/* Top Thin Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-1 px-8 hidden md:block">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400">
          Office of Commissioner Desiderio R. Apag III Digital transmittal registry system
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center bg-white p-1.5 rounded-sm">
              <Landmark className="text-slate-900 w-6 h-6" />
            </div>

            <div className="border-l border-slate-700 pl-5">
              <h1 className="text-md font-bold tracking-tight leading-none uppercase">
                Transmittal Portal
              </h1>

              <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                Office of Commissioner Desiderio R. Apag III
              </p>
            </div>
          </div>

          {/* NAV */}
          <nav className="hidden lg:flex items-center h-full ml-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center h-16 px-5 text-xs font-bold uppercase tracking-widest transition-colors
                  ${
                    active
                      ? "text-white bg-white/5"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}

                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {/* Notification */}
            <button className="text-slate-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-slate-900"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-700 hidden md:block" />

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold uppercase">Administrator</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-tighter">
                  Office of the Director
                </p>
              </div>

              <div className="h-9 w-9 rounded bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sm overflow-hidden shadow-inner">
                <User size={20} className="text-slate-300" />
              </div>

              <ChevronDown
                size={14}
                className="text-slate-500 hidden md:block"
              />
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}