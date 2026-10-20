const stats = [
  { value: "50K+", label: "Jobs Completed", icon: "ri-briefcase-4-fill", color: "text-[#194DDC]" },
  { value: "28K+", label: "Verified Workers", icon: "ri-user-star-fill", color: "text-emerald-500" },
  { value: "4.9★", label: "Average Rating", icon: "ri-star-fill", color: "text-yellow-500" },
  { value: "< 8min", label: "Avg. Hire Time", icon: "ri-time-fill", color: "text-rose-500" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0F172A] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-2">
              <div className={`text-3xl md:text-4xl font-black ${s.color}`}>{s.value}</div>
              <div className="flex items-center gap-1.5">
                <i className={`${s.icon} ${s.color} text-sm`}></i>
                <span className="text-white/50 text-xs md:text-sm font-medium">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
