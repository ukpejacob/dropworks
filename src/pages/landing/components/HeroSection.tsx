import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const roles = ["Electricians", "Movers", "Cleaners", "Painters", "Plumbers", "Drivers"];

export default function HeroSection() {
  const navigate = useNavigate();
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=urban%20city%20workers%20team%20construction%20site%20aerial%20view%20industrial%20abstract%20modern%20colorful%20professional%20workers%20in%20action%20gig%20economy%20workforce%20dynamic%20energy%20wide%20panoramic&width=1440&height=900&seq=hero-bg-1&orientation=landscape"
          alt="DropWorks hero background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/90 via-[#0F2152]/80 to-[#194DDC]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Floating job cards animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[20%] right-[8%] animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-400/20">
              <i className="ri-check-line text-green-400 text-sm"></i>
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Job Accepted!</p>
              <p className="text-white/60 text-[10px]">$85 · Plumbing · 0.4 mi</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[6%] animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.8s" }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400/20">
              <i className="ri-auction-line text-yellow-400 text-sm"></i>
            </div>
            <div>
              <p className="text-white text-xs font-semibold">3 New Bids</p>
              <p className="text-white/60 text-[10px]">Painting · Posted 2m ago</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[55%] right-[12%] animate-bounce" style={{ animationDuration: "4s", animationDelay: "1.2s" }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#194DDC]/30">
              <i className="ri-wallet-3-line text-[#6B9EFF] text-sm"></i>
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Payment Released</p>
              <p className="text-white/60 text-[10px]">$240 · Escrow cleared</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-white/90 text-xs font-medium">12,400+ active jobs right now</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
          Hire Local{" "}
          <span
            className={`text-[#6DB3FF] transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ display: "inline-block" }}
          >
            {roles[roleIdx]}
          </span>
          <br />
          <span className="text-white">in Minutes</span>
        </h1>

        <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          DropWorks connects you with verified local workers instantly. Post a job, get bids in seconds, hire with confidence — backed by secure escrow payments.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => navigate("/auth/signup")}
            className="w-full sm:w-auto px-8 py-4 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-lg shadow-[#194DDC]/40 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-add-line mr-2"></i>
            Find Work Near Me
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-base rounded-2xl transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-building-4-line mr-2"></i>
            Post a Job — It&apos;s Free
          </button>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://readdy.ai/api/search-image?query=diverse%20person%20professional%20headshot%20smiling%20natural%20lighting%20clean%20background&width=40&height=40&seq=hero-face-${i}&orientation=squarish`}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white/50 object-cover object-top"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <i key={s} className="ri-star-fill text-yellow-400 text-sm"></i>
            ))}
            <span className="text-white/80 text-sm ml-1 font-medium">4.9 · 50,000+ jobs done</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: "2s" }}>
        <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <i className="ri-arrow-down-line text-white/40 text-xl"></i>
      </div>
    </section>
  );
}
