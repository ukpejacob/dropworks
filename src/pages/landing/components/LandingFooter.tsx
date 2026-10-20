import { useNavigate } from "react-router-dom";

export default function LandingFooter() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to landing and then scroll
      navigate("/landing");
      setTimeout(() => {
        const el2 = document.querySelector(id);
        if (el2) el2.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const footerLinks: Record<string, { label: string; action: () => void }[]> = {
    Product: [
      { label: "How It Works", action: () => scrollTo("#how-it-works") },
      { label: "Features", action: () => scrollTo("#features") },
      { label: "Pricing", action: () => navigate("/auth/signup") },
      { label: "Security", action: () => navigate("/about") },
    ],
    Workers: [
      { label: "Browse Jobs", action: () => navigate("/auth/signup") },
      { label: "Create Profile", action: () => navigate("/auth/signup") },
      { label: "Earnings Calculator", action: () => navigate("/auth/signup") },
      { label: "Worker FAQs", action: () => navigate("/blog") },
    ],
    Recruiters: [
      { label: "Post a Job", action: () => navigate("/auth/signup") },
      { label: "How Billing Works", action: () => navigate("/blog") },
      { label: "Team Hiring", action: () => navigate("/auth/signup") },
      { label: "Recruiter FAQs", action: () => navigate("/blog") },
    ],
    Company: [
      { label: "About Us", action: () => navigate("/about") },
      { label: "Blog", action: () => navigate("/blog") },
      { label: "Careers", action: () => navigate("/about") },
      { label: "Press Kit", action: () => navigate("/about") },
    ],
  };

  return (
    <footer className="bg-[#F1F5F9] border-t border-gray-200 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => navigate("/landing")}
              className="flex items-center gap-2 mb-4 cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
                <i className="ri-briefcase-4-fill text-white text-base"></i>
              </div>
              <span className="text-lg font-black text-[#0F172A]">DropWorks</span>
            </button>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
              The fastest way to hire local workers or find gigs near you.
            </p>
            <div className="flex items-center gap-3">
              {["ri-twitter-x-line", "ri-instagram-line", "ri-linkedin-line", "ri-tiktok-line"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  rel="nofollow"
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-[#194DDC]/40 hover:text-[#194DDC] text-[#6B7280] transition-colors cursor-pointer"
                >
                  <i className={`${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-[#6B7280] hover:text-[#194DDC] transition-colors cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <p className="text-xs text-[#9CA3AF]">
            &copy; 2026 DropWorks Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", action: () => navigate("/about") },
              { label: "Terms of Service", action: () => navigate("/about") },
              { label: "Cookie Policy", action: () => navigate("/about") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
