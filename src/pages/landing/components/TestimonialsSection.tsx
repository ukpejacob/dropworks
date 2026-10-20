const testimonials = [
  {
    name: "Marcus J.",
    role: "Electrician · Worker",
    avatar: "https://readdy.ai/api/search-image?query=professional%20black%20male%20electrician%20headshot%20smiling%20confident%20clean%20background%20natural%20lighting&width=56&height=56&seq=testi-1&orientation=squarish",
    stars: 5,
    text: "I was skeptical at first but I had my first job within 20 minutes of signing up. Made $340 on a Saturday I had off. DropWorks is genuinely different — the escrow thing means I always get paid.",
    highlight: "First job in 20 minutes",
  },
  {
    name: "Sarah K.",
    role: "Property Manager · Recruiter",
    avatar: "https://readdy.ai/api/search-image?query=professional%20woman%20property%20manager%20headshot%20smiling%20office%20background%20clean%20portrait&width=56&height=56&seq=testi-2&orientation=squarish",
    stars: 5,
    text: "I manage 12 properties and finding reliable contractors used to take days. Now I post, get 5+ bids within minutes, pick the best rated, done. Hired a painter for 3 units in one afternoon.",
    highlight: "12 properties managed",
  },
  {
    name: "Diego R.",
    role: "Mover & Handyman · Worker",
    avatar: "https://readdy.ai/api/search-image?query=young%20hispanic%20male%20handyman%20worker%20confident%20smiling%20headshot%20natural%20background&width=56&height=56&seq=testi-3&orientation=squarish",
    stars: 5,
    text: "The app shows me jobs around me on a map — I can literally pick up work while I&apos;m commuting. Bid on something nearby, accept it, show up. Simple. I averaged $1,200 extra last month.",
    highlight: "$1,200 extra last month",
  },
  {
    name: "Priya N.",
    role: "Restaurant Owner · Recruiter",
    avatar: "https://readdy.ai/api/search-image?query=south%20asian%20woman%20restaurant%20owner%20entrepreneur%20confident%20headshot%20warm%20lighting%20professional&width=56&height=56&seq=testi-4&orientation=squarish",
    stars: 5,
    text: "My regular cleaner got sick, I posted on DropWorks at 7am, had someone booked by 7:40am. The worker's reviews were all 5-star. Honestly saved the day. Now I use it every time.",
    highlight: "Booked in 40 minutes",
  },
  {
    name: "Tyler M.",
    role: "Plumber · Worker",
    avatar: "https://readdy.ai/api/search-image?query=white%20male%20plumber%20tradesman%20headshot%20professional%20smiling%20outdoor%20background%20work%20uniform&width=56&height=56&seq=testi-5&orientation=squarish",
    stars: 5,
    text: "The portfolio feature is underrated — I posted 6 photos of my best work and my acceptance rate jumped. Recruiters can see quality before they hire. My rating is 4.9 after 60 jobs.",
    highlight: "4.9 rating · 60 jobs",
  },
  {
    name: "Aisha B.",
    role: "Event Planner · Recruiter",
    avatar: "https://readdy.ai/api/search-image?query=black%20woman%20event%20planner%20professional%20headshot%20stylish%20smiling%20indoor%20natural%20light&width=56&height=56&seq=testi-6&orientation=squarish",
    stars: 5,
    text: "I needed 8 setup helpers for a corporate event on short notice. Posted the job, got 15 bids, hired 8 and paid them all through the platform. Zero hassle, zero cash, zero drama. 10/10.",
    highlight: "8 workers hired at once",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">Real Reviews</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mt-2 mb-4">Trusted by workers &amp; recruiters</h2>
          <p className="text-[#6B7280] text-base md:text-lg max-w-lg mx-auto">
            Over 50,000 completed jobs and counting. Here&apos;s what our community says.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <i key={s} className="ri-star-fill text-yellow-400 text-sm"></i>
                ))}
              </div>
              {/* Text */}
              <p className="text-[#374151] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              {/* Highlight */}
              <div className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#194DDC] text-xs font-semibold rounded-full px-3 py-1 self-start">
                <i className="ri-flashlight-fill text-xs"></i>
                {t.highlight}
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">{t.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
