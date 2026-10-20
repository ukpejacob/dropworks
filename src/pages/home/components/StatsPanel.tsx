const activities = [
  {
    id: "a1",
    icon: "ri-bank-card-line",
    title: "Payout received for La...",
    subtitle: "Amount ₦20,000.00",
    time: "4:33 AM",
    color: "text-[#16A34A] bg-[#DCFCE7]",
  },
  {
    id: "a2",
    icon: "ri-briefcase-line",
    title: "Bid submitted for Forkl...",
    subtitle: "Amount ₦200,000.00",
    time: "5:20 AM",
    color: "text-[#194DDC] dark:text-[#6B9EFF] bg-[#EEF2FF] dark:bg-[#1e3a8a]/20",
  },
  {
    id: "a3",
    icon: "ri-file-text-line",
    title: "Application accepted for Event Setup Crew",
    subtitle: "",
    time: "6:00 PM",
    color: "text-[#16A34A] bg-[#DCFCE7]",
  },
  {
    id: "a4",
    icon: "ri-bank-line",
    title: "Withdrawal processed...",
    subtitle: "Amount ₦80,500.00",
    time: "4:33 AM",
    color: "text-[#6B7280] bg-[#F3F4F6]",
  },
];

interface StatsPanelProps {
  compact?: boolean;
}

export function StatsOnly() {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#334155]">
      <h2 className="text-base font-bold text-[#0F172A] dark:text-white mb-4">Stats</h2>
      <div className="bg-[#6B8EF0] rounded-xl px-4 py-3 mb-4">
        <p className="text-xs text-white/80 font-medium mb-0.5">Total Earnings</p>
        <p className="text-2xl font-black text-white">₦800,500.00</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#FFFBEB] dark:bg-[#292524] rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-star-line text-[#F59E0B] text-sm"></i></div><span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Rating</span></div>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">4.5</p>
        </div>
        <div className="bg-[#EEF2FF] dark:bg-[#1E1B4B] rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-briefcase-line text-[#194DDC] dark:text-[#6B9EFF] text-sm"></i></div><span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Jobs Completed</span></div>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">122</p>
        </div>
        <div className="bg-[#F3F4F6] dark:bg-[#1F2937] rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-calendar-check-line text-[#6B7280] text-sm"></i></div><span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Applications</span></div>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">210</p>
        </div>
        <div className="bg-[#FDF4FF] dark:bg-[#2D1B69] rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-time-line text-[#A855F7] text-sm"></i></div><span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Active Jobs</span></div>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">5</p>
        </div>
      </div>
    </div>
  );
}

export function ActivitiesOnly() {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#334155]">
      <h2 className="text-base font-bold text-[#0F172A] dark:text-white mb-1">Recent Activities</h2>
      <p className="text-xs text-[#9CA3AF] mb-4">Your latest bids, acceptances and payouts</p>
      <div className="flex flex-col gap-3">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3">
            <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl ${act.color}`}>
              <i className={`${act.icon} text-sm`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#111827] dark:text-white leading-tight">{act.title}</p>
              {act.subtitle && <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{act.subtitle}</p>}
            </div>
            <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-0.5">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsPanel({ compact = false }: StatsPanelProps) {
  return (
    <aside className={compact ? "w-full flex flex-col gap-4" : "w-72 flex-shrink-0 flex flex-col gap-4"}>
      {/* Stats Card */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#334155]">
        <h2 className="text-base font-bold text-[#0F172A] dark:text-white mb-4">Stats</h2>

        {/* Total Earnings */}
        <div className="bg-[#6B8EF0] rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-white/80 font-medium mb-0.5">Total Earnings</p>
          <p className="text-2xl font-black text-white">₦800,500.00</p>
        </div>

        {/* Grid stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#FFFBEB] dark:bg-[#292524] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-star-line text-[#F59E0B] text-sm"></i>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Rating</span>
            </div>
            <p className="text-lg font-bold text-[#0F172A] dark:text-white">4.5</p>
          </div>

          <div className="bg-[#EEF2FF] dark:bg-[#1E1B4B] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-briefcase-line text-[#194DDC] dark:text-[#6B9EFF] text-sm"></i>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Jobs Completed</span>
            </div>
            <p className="text-lg font-bold text-[#0F172A] dark:text-white">122</p>
          </div>

          <div className="bg-[#F3F4F6] dark:bg-[#1F2937] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-calendar-check-line text-[#6B7280] text-sm"></i>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Applications</span>
            </div>
            <p className="text-lg font-bold text-[#0F172A] dark:text-white">210</p>
          </div>

          <div className="bg-[#FDF4FF] dark:bg-[#2D1B69] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-time-line text-[#A855F7] text-sm"></i>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Active Jobs</span>
            </div>
            <p className="text-lg font-bold text-[#0F172A] dark:text-white">5</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#334155]">
        <h2 className="text-base font-bold text-[#0F172A] dark:text-white mb-1">Recent Activities</h2>
        <p className="text-xs text-[#9CA3AF] mb-4">Your latest bids, acceptances and payouts</p>

        <div className="flex flex-col gap-3">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3">
              <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl ${act.color}`}>
                <i className={`${act.icon} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#111827] dark:text-white leading-tight">{act.title}</p>
                {act.subtitle && (
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{act.subtitle}</p>
                )}
              </div>
              <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-0.5">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
