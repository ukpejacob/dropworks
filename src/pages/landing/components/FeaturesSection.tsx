const features = [
  {
    icon: "ri-map-pin-2-fill",
    color: "bg-[#EEF2FF] text-[#194DDC]",
    title: "Real-Time Geo-Matching",
    desc: "Jobs and workers match by proximity. See live distance and ETA — like Uber, but for every kind of skilled work.",
  },
  {
    icon: "ri-shield-keyhole-fill",
    color: "bg-emerald-50 text-emerald-600",
    title: "Escrow-Protected Payments",
    desc: "Funds are held securely until the job is confirmed complete. No ghosting, no disputes — money moves only when both sides agree.",
  },
  {
    icon: "ri-user-star-fill",
    color: "bg-yellow-50 text-yellow-600",
    title: "Verified Worker Profiles",
    desc: "Every worker goes through ID verification and background checks. Browse portfolios, ratings, and reviews before you hire.",
  },
  {
    icon: "ri-timer-flash-fill",
    color: "bg-rose-50 text-rose-500",
    title: "Bids in Under 60 Seconds",
    desc: "Post a job and watch bids arrive in real-time. Our smart matching algorithm surfaces the best candidates instantly.",
  },
  {
    icon: "ri-chat-voice-fill",
    color: "bg-violet-50 text-violet-500",
    title: "In-App Messaging",
    desc: "Chat directly with workers or recruiters. Share photos, confirm details, and coordinate — all without leaving the app.",
  },
  {
    icon: "ri-bar-chart-grouped-fill",
    color: "bg-orange-50 text-orange-500",
    title: "Earnings Dashboard",
    desc: "Workers track all earnings, pending payouts, and job history. Recruiters see spend analytics and budget breakdowns.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">Platform Features</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mt-2 mb-4">Built for speed. Designed for trust.</h2>
          <p className="text-[#6B7280] text-base md:text-lg max-w-xl mx-auto">
            Everything you need for fast, safe, and reliable local hiring — in one clean app.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#194DDC]/20 transition-all duration-300 group"
            >
              <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${f.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <i className={`${f.icon} text-xl`}></i>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">{f.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom feature highlight */}
        <div id="recruiters" className="mt-16 rounded-3xl overflow-hidden bg-[#0F172A] flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-[#6B9EFF] text-xs font-bold tracking-widest uppercase mb-3">For Recruiters</span>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Hire an entire crew before lunch.</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              Need 5 movers for Saturday? A plumber this afternoon? Post once, get multiple bids, hire in bulk. DropWorks handles scheduling, contracts, and payments so you can focus on the job.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Bulk hiring for teams", "Real-time bid comparison", "Escrow releases on completion", "Recruiter rating & trust score"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-check-line text-green-400 text-base"></i>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-[420px] h-64 lg:h-auto flex-shrink-0">
            <img
              src="https://readdy.ai/api/search-image?query=recruiter%20manager%20using%20app%20hiring%20dashboard%20dark%20theme%20professional%20office%20night%20cityscape%20background%20tech%20startup%20vibe&width=420&height=400&seq=feature-recruiter-1&orientation=portrait"
              alt="Recruiter dashboard"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
