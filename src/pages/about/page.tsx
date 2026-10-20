import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingNav from "@/pages/landing/components/LandingNav";
import LandingFooter from "@/pages/landing/components/LandingFooter";

const team = [
  {
    name: "Marcus Reid",
    role: "CEO & Co-Founder",
    bio: "Former construction site manager turned tech entrepreneur. Built DropWorks after struggling to find reliable workers for his renovation projects.",
    img: "https://readdy.ai/api/search-image?query=professional%20male%20CEO%20founder%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-1&orientation=squarish",
  },
  {
    name: "Aisha Okonkwo",
    role: "CTO & Co-Founder",
    bio: "10+ years in fintech and marketplace platforms. Previously led engineering at two unicorn startups before joining Marcus to build DropWorks.",
    img: "https://readdy.ai/api/search-image?query=professional%20female%20CTO%20tech%20founder%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-2&orientation=squarish",
  },
  {
    name: "Daniel Torres",
    role: "Head of Operations",
    bio: "Logistics and operations expert with a background in last-mile delivery. Ensures every job on DropWorks runs smoothly from post to payment.",
    img: "https://readdy.ai/api/search-image?query=professional%20male%20operations%20director%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-3&orientation=squarish",
  },
  {
    name: "Priya Nair",
    role: "Head of Product",
    bio: "UX-obsessed product leader who spent 7 years at top consumer apps. Priya ensures DropWorks is the most intuitive hiring platform on the market.",
    img: "https://readdy.ai/api/search-image?query=professional%20female%20product%20manager%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-4&orientation=squarish",
  },
  {
    name: "James Osei",
    role: "Head of Trust & Safety",
    bio: "Former fraud investigator and compliance officer. James built our verification and escrow systems to make every transaction on DropWorks bulletproof.",
    img: "https://readdy.ai/api/search-image?query=professional%20male%20trust%20safety%20director%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-5&orientation=squarish",
  },
  {
    name: "Sofia Mendes",
    role: "Head of Marketing",
    bio: "Growth marketer who scaled two gig economy platforms from zero to millions of users. Sofia leads DropWorks' community and brand strategy.",
    img: "https://readdy.ai/api/search-image?query=professional%20female%20marketing%20director%20headshot%20confident%20smile%20business%20casual%20attire%20clean%20neutral%20background%20studio%20lighting&width=300&height=300&seq=team-6&orientation=squarish",
  },
];

const values = [
  {
    icon: "ri-shield-check-fill",
    color: "bg-emerald-50 text-emerald-600",
    title: "Trust First",
    desc: "Every feature we build starts with one question: does this make the platform safer and more trustworthy for workers and recruiters alike?",
  },
  {
    icon: "ri-flashlight-fill",
    color: "bg-yellow-50 text-yellow-600",
    title: "Speed Matters",
    desc: "We believe time is money — especially for gig workers. Our platform is engineered to get jobs posted, matched, and started in minutes, not days.",
  },
  {
    icon: "ri-group-fill",
    color: "bg-[#EEF2FF] text-[#194DDC]",
    title: "Community Driven",
    desc: "DropWorks is built by listening to real workers and recruiters. Our roadmap is shaped by the people who use the platform every single day.",
  },
  {
    icon: "ri-hand-coin-fill",
    color: "bg-rose-50 text-rose-500",
    title: "Fair Pay Always",
    desc: "We take a minimal platform fee and never touch worker earnings. Escrow ensures workers get paid on time, every time — no exceptions.",
  },
];

const milestones = [
  { year: "2022", title: "DropWorks Founded", desc: "Marcus and Aisha quit their jobs and started building in a garage in Atlanta, GA." },
  { year: "2023", title: "Beta Launch", desc: "500 workers and 200 recruiters joined our closed beta. First $1M in jobs facilitated within 3 months." },
  { year: "2023", title: "Seed Funding", desc: "Raised $4.2M seed round led by Horizon Ventures to expand engineering and operations teams." },
  { year: "2024", title: "10 Cities Live", desc: "Expanded to 10 major US cities. Crossed 50,000 registered workers and 15,000 active recruiters." },
  { year: "2025", title: "Series A", desc: "Closed $18M Series A. Launched escrow payments, verified profiles, and the real-time bid system." },
  { year: "2026", title: "50+ Cities & Growing", desc: "Now operating in 50+ cities with 200,000+ workers and $120M+ in jobs facilitated annually." },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <LandingNav scrolled={scrolled} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=diverse%20team%20of%20workers%20and%20professionals%20collaborating%20in%20modern%20office%20space%20warm%20lighting%20community%20togetherness%20gig%20economy%20workforce%20abstract%20artistic&width=1440&height=600&seq=about-hero-1&orientation=landscape"
            alt="DropWorks team"
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 to-[#0F172A]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-[#6B9EFF] text-xs font-bold tracking-widest uppercase mb-4">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            We're building the future<br />of local work
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            DropWorks was born from a simple frustration: finding reliable local workers shouldn't take days of phone calls and crossed fingers. We built the platform we always wished existed.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#194DDC] py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "200K+", label: "Registered Workers" },
            { value: "50+", label: "Cities Active" },
            { value: "$120M+", label: "Jobs Facilitated" },
            { value: "4.9★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
              <p className="text-white/70 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1">
            <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-3 mb-5 leading-tight">
              Empowering every worker.<br />Enabling every hire.
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed mb-5">
              We believe skilled workers deserve a platform that respects their time, protects their earnings, and connects them with real opportunities — not just a race to the bottom on price.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">
              For recruiters, we've eliminated the friction of finding, vetting, and paying local talent. DropWorks handles the hard parts so you can focus on getting the job done.
            </p>
            <button
              onClick={() => navigate("/auth/signup")}
              className="px-7 py-3.5 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Join DropWorks Today
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="rounded-3xl overflow-hidden h-72 md:h-96">
              <img
                src="https://readdy.ai/api/search-image?query=skilled%20worker%20electrician%20plumber%20carpenter%20professional%20at%20work%20confident%20portrait%20warm%20natural%20lighting%20urban%20setting%20gig%20economy%20empowerment&width=600&height=450&seq=about-mission-1&orientation=landscape"
                alt="Skilled worker"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-2 mb-3">Our Core Values</h2>
            <p className="text-[#6B7280] text-base max-w-xl mx-auto">
              These aren't just words on a wall — they're the principles behind every product decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${v.color} mb-4`}>
                  <i className={`${v.icon} text-xl`}></i>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{v.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-2">From garage to 50+ cities</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px"></div>
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-10 md:pl-0`}>
                    <span className="text-[#194DDC] text-xs font-bold tracking-widest">{m.year}</span>
                    <h3 className="text-base font-bold text-[#0F172A] mt-1 mb-1">{m.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="absolute left-0 md:relative md:left-auto w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-full flex-shrink-0 z-10">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">The People</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-2 mb-3">Meet the team</h2>
            <p className="text-[#6B7280] text-base max-w-xl mx-auto">
              A diverse group of builders, operators, and problem-solvers obsessed with making local work better.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden border border-gray-100 group">
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#0F172A]">{member.name}</h3>
                  <p className="text-[#194DDC] text-xs font-semibold mb-2">{member.role}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to join the movement?</h2>
          <p className="text-white/60 text-base mb-8">
            Whether you're looking for work or looking to hire, DropWorks is the fastest way to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth/signup")}
              className="w-full sm:w-auto px-8 py-4 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-base rounded-2xl transition-all cursor-pointer whitespace-nowrap"
            >
              Find Work Near Me
            </button>
            <button
              onClick={() => navigate("/auth/signup")}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-2xl transition-all cursor-pointer whitespace-nowrap"
            >
              Post a Job — It's Free
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
