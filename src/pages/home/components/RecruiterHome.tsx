import { useNavigate } from "react-router-dom";

const quickStats = [
  { label: "Active Jobs", value: "3", icon: "ri-briefcase-line", color: "text-[#194DDC] dark:text-[#6B9EFF]", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Open Bids", value: "12", icon: "ri-auction-line", color: "text-[#F59E0B]", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  { label: "Hired Today", value: "2", icon: "ri-user-add-line", color: "text-[#16A34A]", bg: "bg-green-50 dark:bg-green-900/20" },
];

const recentJobs = [
  {
    id: "rj1",
    title: "Furniture Assembly – IKEA Wardrobe",
    category: "Handyman",
    budget: 85,
    bids: 3,
    status: "Open",
    timeAgo: "2h ago",
  },
  {
    id: "rj2",
    title: "Office Deep Clean – 3 Floors",
    category: "Cleaning",
    budget: 220,
    bids: 7,
    status: "Open",
    timeAgo: "5h ago",
  },
  {
    id: "rj3",
    title: "React Frontend Bug Fix",
    category: "Tech",
    budget: 150,
    bids: 4,
    status: "Ongoing",
    timeAgo: "1d ago",
  },
];

export default function RecruiterHome() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-black text-[#111827] dark:text-white">Recruiter Dashboard</h1>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">Wednesday, Apr 22 · New York, NY</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-3 text-center`}>
            <div className={`w-8 h-8 flex items-center justify-center mx-auto mb-1`}>
              <i className={`${stat.icon} ${stat.color} text-xl`}></i>
            </div>
            <div className="text-xl font-black text-[#111827] dark:text-white">{stat.value}</div>
            <div className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Post Job CTA */}
      <button
        onClick={() => navigate("/post-job")}
        className="w-full h-14 bg-[#194DDC] dark:bg-[#1e3a8a] hover:bg-[#1542c0] active:scale-[0.99] text-white font-bold rounded-2xl transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
      >
        <i className="ri-add-circle-line text-xl"></i>
        <span>Post a New Job</span>
      </button>

      {/* Recent jobs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#111827] dark:text-white">Your Recent Jobs</h2>
          <button onClick={() => navigate("/recruiter-jobs")} className="text-xs text-[#194DDC] dark:text-[#6B9EFF] font-medium cursor-pointer">See all</button>
        </div>
        <div className="space-y-3">
          {recentJobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 border border-[#E5E7EB]/60 dark:border-[#374151]/60 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#111827] dark:text-white truncate">{job.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[#9CA3AF]">{job.category}</span>
                  <span className="text-xs font-bold text-[#194DDC] dark:text-[#6B9EFF]">${job.budget}</span>
                  <span className="text-xs text-[#F59E0B] font-medium">{job.bids} bids</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {job.status}
                </span>
                <span className="text-[10px] text-[#9CA3AF]">{job.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-[#111827] dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate("/live-bids")} className="bg-white dark:bg-[#1F2937] border border-[#E5E7EB]/60 dark:border-[#374151]/60 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-[#194DDC]/50 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <i className="ri-auction-line text-[#F59E0B] text-lg"></i>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-[#111827] dark:text-white">Live Bids</div>
              <div className="text-xs text-[#9CA3AF]">12 pending</div>
            </div>
          </button>
          <button onClick={() => navigate("/wallet")} className="bg-white dark:bg-[#1F2937] border border-[#E5E7EB]/60 dark:border-[#374151]/60 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-[#194DDC]/50 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <i className="ri-wallet-3-line text-[#194DDC] dark:text-[#6B9EFF] text-lg"></i>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-[#111827] dark:text-white">Wallet</div>
              <div className="text-xs text-[#9CA3AF]">$1,240 balance</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
