import { useState } from "react";

interface Job {
  id: string;
  title: string;
  category: string;
  price: number;
  distance: string;
  timeAgo: string;
  expiresIn: number;
  totalTime: number;
  rating: number;
  reviews: number;
  verified: boolean;
  urgent: boolean;
  description: string;
}

interface AllJobsModalProps {
  jobs: Job[];
  onAccept: (id: string) => void;
  onBid: (id: string) => void;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  Handyman: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Cleaning: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Tech: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Photography: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Design: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function AllJobRow({ job, onAccept, onBid }: { job: Job; onAccept: (id: string) => void; onBid: (id: string) => void }) {
  const catColor = categoryColors[job.category] || "bg-gray-100 text-gray-600";
  const isExpired = job.expiresIn <= 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E5E7EB] dark:border-[#334155]">
      {/* Left: info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${catColor}`}>{job.category}</span>
          {job.urgent && (
            <span className="px-2 py-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded uppercase">URGENT</span>
          )}
          {isExpired && (
            <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] text-[10px] font-semibold rounded">
              Moved to archive
            </span>
          )}
        </div>
        <h4 className="text-sm font-bold text-[#0F172A] dark:text-white leading-tight truncate">{job.title}</h4>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 line-clamp-1">{job.description}</p>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <i className="ri-map-pin-2-line text-xs"></i>
            {job.distance}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <i className="ri-time-line text-xs"></i>
            {job.timeAgo}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
            <span className="font-semibold text-[#0F172A] dark:text-white">{job.rating}</span>
            <span className="text-[#9CA3AF]">({job.reviews})</span>
          </span>
          {job.verified && (
            <span className="flex items-center gap-1 text-[#16A34A] text-xs font-medium">
              <i className="ri-shield-check-fill text-xs"></i>
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Right: price + actions */}
      <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
        <span className="text-xl font-black text-[#0F172A] dark:text-white">
          ₦{job.price.toLocaleString()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onBid(job.id)}
            className="h-8 px-3 border-2 border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC] hover:text-[#194DDC] font-bold rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap"
          >
            BID
          </button>
          <button
            onClick={() => onAccept(job.id)}
            className="h-8 px-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1"
          >
            <i className="ri-check-line text-xs"></i>
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AllJobsModal({ jobs, onAccept, onBid, onClose }: AllJobsModalProps) {
  const [filter, setFilter] = useState<"all" | "expired">("all");

  const liveJobs = jobs.filter((j) => j.expiresIn > 0);
  const expiredJobs = jobs.filter((j) => j.expiresIn <= 0);
  const displayed = filter === "expired" ? expiredJobs : jobs;

  const handleAccept = (id: string) => {
    onAccept(id);
    onClose();
  };

  const handleBid = (id: string) => {
    onBid(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-[#F8FAFC] dark:bg-[#0F172A] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#1E293B]">
          <div>
            <h2 className="text-base font-black text-[#0F172A] dark:text-white">All Nearby Jobs</h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
              {liveJobs.length} live &middot; {expiredJobs.length} missed
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-white cursor-pointer transition-colors"
          >
            <i className="ri-close-line text-base"></i>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-4 py-3 bg-white dark:bg-[#1E293B] border-b border-[#E5E7EB] dark:border-[#334155]">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === "all"
                ? "bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A]"
                : "bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-white"
            }`}
          >
            All ({jobs.length})
          </button>
          <button
            onClick={() => setFilter("expired")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              filter === "expired"
                ? "bg-[#EF4444] text-white"
                : "bg-[#FEF2F2] dark:bg-[#450a0a]/50 text-[#EF4444] hover:bg-[#FEE2E2]"
            }`}
          >
            <i className="ri-time-line text-xs"></i>
            Missed ({expiredJobs.length})
          </button>
        </div>

        {/* Job list */}
        <div className="overflow-y-auto flex-1 p-4 flex flex-col gap-3">
          {displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <i className="ri-inbox-line text-3xl text-[#D1D5DB] dark:text-[#4B5563] mb-3"></i>
              <p className="text-sm font-semibold text-[#6B7280] dark:text-[#9CA3AF]">
                {filter === "expired" ? "No missed jobs yet" : "No jobs available"}
              </p>
              <p className="text-xs text-[#9CA3AF] dark:text-[#6B7280] mt-1">
                {filter === "expired" ? "Keep an eye on new jobs as they come in!" : "New jobs appear here instantly when posted."}
              </p>
            </div>
          ) : (
            displayed.map((job) => (
              <AllJobRow
                key={job.id}
                job={job}
                onAccept={handleAccept}
                onBid={handleBid}
              />
            ))
          )}
        </div>

        {/* Footer note */}
        <div className="px-5 py-3 border-t border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#1E293B]">
          <p className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] text-center">
            <i className="ri-information-line mr-1"></i>
            Missed jobs can still be bid on or accepted — act fast!
          </p>
        </div>
      </div>
    </div>
  );
}
