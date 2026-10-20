import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LandingNavProps {
  scrolled: boolean;
}

export default function LandingNav({ scrolled }: LandingNavProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "For Recruiters", href: "#recruiters" },
    { label: "Reviews", href: "#testimonials" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/landing")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-[#194DDC] rounded-xl">
              <i className="ri-briefcase-4-fill text-white text-base md:text-lg"></i>
            </div>
            <span
              className={`text-xl font-black tracking-tight transition-colors ${
                scrolled ? "text-[#0F172A]" : "text-white"
              }`}
            >
              DropWorks
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  scrolled
                    ? "text-[#6B7280] hover:text-[#0F172A]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/auth/login")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                scrolled
                  ? "text-[#194DDC] border border-[#194DDC] hover:bg-[#194DDC]/5"
                  : "text-white border border-white/40 hover:bg-white/10"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/auth/signup")}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-[#194DDC] hover:bg-[#1340C0] text-white transition-all cursor-pointer whitespace-nowrap"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${
              scrolled ? "bg-gray-100" : "bg-white/10"
            }`}
          >
            <i
              className={`${mobileOpen ? "ri-close-line" : "ri-menu-3-line"} text-lg ${
                scrolled ? "text-[#374151]" : "text-white"
              }`}
            ></i>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-4 flex flex-col gap-3 md:hidden shadow-lg">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-medium text-[#374151] hover:text-[#194DDC] py-2 border-b border-gray-50 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => { setMobileOpen(false); navigate("/auth/login"); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-full border border-[#194DDC] text-[#194DDC] cursor-pointer whitespace-nowrap"
            >
              Log In
            </button>
            <button
              onClick={() => { setMobileOpen(false); navigate("/auth/signup"); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-full bg-[#194DDC] text-white cursor-pointer whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}
