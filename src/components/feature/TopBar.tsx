import { useState } from "react";
import { AppMode } from "@/hooks/useMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface TopBarProps {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  mode: AppMode;
  onModeToggle: () => void;
}

export default function TopBar({ theme, onThemeToggle, mode, onModeToggle }: TopBarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/landing");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#0F172A] border-b border-[#E5E7EB] dark:border-[#1F2937]">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-[#194DDC] rounded-xl">
            <i className="ri-briefcase-4-fill text-white text-base md:text-lg"></i>
          </div>
          <span className="text-lg md:text-xl font-black text-[#0F172A] dark:text-white tracking-tight">DropWorks</span>
        </button>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Mode toggle */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full p-1">
            <button
              onClick={() => mode !== "worker" && onModeToggle()}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                mode === "worker"
                  ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                  : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#194DDC] dark:hover:text-[#6B9EFF]"
              }`}
            >
              <i className="ri-user-smile-line text-sm"></i>
              Worker
            </button>
            <button
              onClick={() => mode !== "recruiter" && onModeToggle()}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                mode === "recruiter"
                  ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                  : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#194DDC] dark:hover:text-[#6B9EFF]"
              }`}
            >
              <i className="ri-building-4-line text-sm"></i>
              Recruiter
            </button>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full p-1">
            <button
              onClick={() => theme !== "light" && onThemeToggle()}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                theme === "light" ? "bg-white text-[#F59E0B]" : "text-[#6B7280]"
              }`}
            >
              <i className="ri-sun-line text-sm"></i>
            </button>
            <button
              onClick={() => theme !== "dark" && onThemeToggle()}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                theme === "dark" ? "bg-[#374151] text-white" : "text-[#6B7280]"
              }`}
            >
              <i className="ri-moon-line text-sm"></i>
            </button>
          </div>

          {/* Profile icon (only when authenticated) */}
          {isAuthenticated && (
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full cursor-pointer hover:bg-[#E5E7EB] dark:hover:bg-[#374151] transition-colors"
              title={mode === "recruiter" ? "Recruiter Profile" : "Worker Profile"}
            >
              {mode === "recruiter" ? (
                <i className="ri-building-4-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
              ) : (
                <i className="ri-user-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
              )}
            </button>
          )}

          {/* Auth buttons */}
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#EF4444] font-semibold text-sm rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/auth/login")}
                className="px-4 py-2 border border-[#194DDC] text-[#194DDC] font-semibold text-sm rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap hover:bg-[#EEF2FF]"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/auth/signup")}
                className="px-4 py-2 bg-[#194DDC] hover:bg-[#1340C0] text-white font-semibold text-sm rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile right controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme toggle icon only */}
          <button
            onClick={onThemeToggle}
            className="w-9 h-9 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full cursor-pointer"
          >
            <i className={`${theme === "light" ? "ri-moon-line text-[#6B7280]" : "ri-sun-line text-[#F59E0B]"} text-base`}></i>
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full cursor-pointer"
          >
            <i className={`${menuOpen ? "ri-close-line" : "ri-menu-3-line"} text-[#374151] dark:text-[#D1D5DB] text-base`}></i>
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-[#0F172A] border-b border-[#E5E7EB] dark:border-[#1F2937] px-4 py-4 flex flex-col gap-3">
          {/* Mode toggle */}
          <div>
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Switch Mode</p>
            <div className="flex items-center bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full p-1">
              <button
                onClick={() => { mode !== "worker" && onModeToggle(); setMenuOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "worker"
                    ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                <i className="ri-user-smile-line text-sm"></i>
                Worker
              </button>
              <button
                onClick={() => { mode !== "recruiter" && onModeToggle(); setMenuOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "recruiter"
                    ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                <i className="ri-building-4-line text-sm"></i>
                Recruiter
              </button>
            </div>
          </div>

          {/* Auth buttons */}
          {isAuthenticated ? (
            <button
              onClick={() => { handleSignOut(); setMenuOpen(false); }}
              className="w-full py-2.5 bg-[#FEE2E2] text-[#EF4444] font-semibold text-sm rounded-xl cursor-pointer whitespace-nowrap"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { setMenuOpen(false); navigate("/auth/login"); }}
                className="flex-1 py-2.5 border border-[#194DDC] text-[#194DDC] font-semibold text-sm rounded-xl cursor-pointer whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => { setMenuOpen(false); navigate("/auth/signup"); }}
                className="flex-1 py-2.5 bg-[#194DDC] text-white font-semibold text-sm rounded-xl cursor-pointer whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
