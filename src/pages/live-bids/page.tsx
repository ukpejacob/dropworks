import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBids } from "@/mocks/jobs";
import { useCountdown } from "@/hooks/useCountdown";

const activeJobs = [
  { id: "j1", title: "Furniture Assembly – IKEA Wardrobe", category: "Assembly", budget: 50000 },
  { id: "j2", title: "Office Deep Clean Downtown", category: "Cleaning", budget: 35000 },
  { id: "j3", title: "React Frontend Bug Fix", category: "Tech", budget: 80000 },
];

function BidTimer() {
  const { remaining, label } = useCountdown(1800);
  const progress = remaining / 1800;
  const urgency = progress < 0.3;

  return (
    <div className="mb-4">
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl px-4 py-3 border border-[#E5E7EB]/60 dark:border-[#374151]/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-[#374151] dark:text-[#D1D5DB]">Bidding closes in</span>
          </div>
          <span className={`text-sm font-black ${urgency ? "text-[#EF4444]" : "text-[#111827] dark:text-white"}`}>{label}</span>
        </div>
        <div className="h-2 bg-[#F3F4F6] dark:bg-[#374151] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${urgency ? "bg-gradient-to-r from-[#EF4444] to-[#F59E0B]" : "bg-gradient-to-r from-[#194DDC] to-[#60A5FA] dark:from-[#3b6fd4] dark:to-[#6B9EFF]"}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function LiveBidsPage() {
  const navigate = useNavigate();
  const [bids, setBids] = useState(mockBids);
  const [newBidFlash, setNewBidFlash] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedJobId, setSelectedJobId] = useState(activeJobs[0].id);
  const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
  const selectedJob = activeJobs.find((j) => j.id === selectedJobId) ?? activeJobs[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewBidFlash(true);
      const newBid = {
        id: "bid_new",
        workerName: "Nina W.",
        workerAvatar: "https://readdy.ai/api/search-image?query=professional%20woman%20headshot%20clean%20background%20warm%20confident%20smile%20light&width=80&height=80&seq=bidder_new&orientation=squarish",
        rating: 4.7,
        reviews: 45,
        amount: 72,
        originalBudget: 85,
        timeAgo: "Just now",
        skills: ["Handyman", "Assembly"],
        verified: true,
        jobsCompleted: 63,
      };
      setBids((prev) => [newBid, ...prev]);
      setTimeout(() => setNewBidFlash(false), 600);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAccept = (id: string) => {
    setBids((prev) => prev.filter((b) => b.id !== id));
    showToast("Worker accepted! Job is now underway.", "success");
  };

  const handleDecline = (id: string) => {
    setBids((prev) => prev.filter((b) => b.id !== id));
    showToast("Bid declined.", "error");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-black text-[#111827] dark:text-white">Live Bids</h1>
            <div className="flex items-center gap-1.5 bg-[#EF4444]/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-[#EF4444]">{bids.length} bids</span>
            </div>
          </div>

          {/* Job selector */}
          <div className="relative">
            <button
              onClick={() => setJobDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-between gap-2 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl px-4 py-3 cursor-pointer hover:border-[#194DDC] dark:hover:border-[#6B9EFF] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/40 rounded-lg flex-shrink-0">
                  <i className="ri-briefcase-line text-[#194DDC] dark:text-[#6B9EFF] text-sm"></i>
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[10px] text-[#9CA3AF] font-medium">Viewing bids for</p>
                  <p className="text-sm font-bold text-[#111827] dark:text-white truncate">{selectedJob.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] px-2 py-0.5 bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] rounded-full font-medium">{selectedJob.category}</span>
                <i className={`ri-arrow-down-s-line text-[#9CA3AF] text-base transition-transform duration-200 ${jobDropdownOpen ? "rotate-180" : ""}`}></i>
              </div>
            </button>

            {/* Dropdown */}
            {jobDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl overflow-hidden z-30">
                {activeJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => { setSelectedJobId(job.id); setJobDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 cursor-pointer transition-colors text-left ${
                      job.id === selectedJobId
                        ? "bg-[#EEF2FF] dark:bg-[#1e3a8a]/30"
                        : "hover:bg-[#F9FAFB] dark:hover:bg-[#374151]/50"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{job.title}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{job.category} · Budget ₦{job.budget.toLocaleString()}</p>
                    </div>
                    {job.id === selectedJobId && (
                      <i className="ri-check-line text-[#194DDC] dark:text-[#6B9EFF] text-base flex-shrink-0 ml-2"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timer */}
        <BidTimer />

        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-[200]`}
          >
            <div className={`${toast.type === "success" ? "bg-[#16A34A]" : "bg-[#EF4444]"} text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top duration-300`}>
              <i className={`text-base ${toast.type === "success" ? "ri-checkbox-circle-line" : "ri-close-circle-line"}`}></i>
              {toast.message}
            </div>
          </div>
        )}

        {/* Bids list */}
        <div className="space-y-3 pb-6">
          {bids.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full mb-3">
                <i className="ri-auction-line text-2xl text-[#9CA3AF]"></i>
              </div>
              <p className="font-semibold text-[#374151] dark:text-[#D1D5DB] text-sm">No bids yet</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Workers will bid on your job soon</p>
            </div>
          ) : (
            bids.map((bid, idx) => (
              <div
                key={bid.id}
                className={`bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4 transition-all duration-500 ${
                  idx === 0 && newBidFlash ? "ring-2 ring-[#194DDC] dark:ring-[#6B9EFF] scale-[1.01]" : ""
                }`}
              >
                {idx === 0 && newBidFlash && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-ping"></span>
                    <span className="text-[10px] text-[#16A34A] font-bold">New bid!</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => navigate(`/worker/${bid.id}`)}
                    className="relative flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={bid.workerAvatar}
                      alt={bid.workerName}
                      className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#F3F4F6] dark:border-[#374151]"
                    />
                    {bid.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-[#16A34A] rounded-full border-2 border-white dark:border-[#1F2937]">
                        <i className="ri-shield-check-fill text-white text-[8px]"></i>
                      </div>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => navigate(`/worker/${bid.id}`)}
                        className="text-sm font-bold text-[#111827] dark:text-white cursor-pointer hover:text-[#194DDC] transition-colors"
                      >
                        {bid.workerName}
                      </button>
                      <span className="text-xl font-black text-[#194DDC] dark:text-[#6B9EFF]">${bid.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
                        <span className="text-xs font-bold text-[#374151] dark:text-[#D1D5DB]">{bid.rating}</span>
                      </div>
                      <span className="text-xs text-[#9CA3AF]">({bid.reviews})</span>
                      <span className="text-xs text-[#9CA3AF]">·</span>
                      <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{bid.jobsCompleted} jobs</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {bid.skills.map((skill) => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleAccept(bid.id)}
                    className="flex-1 h-10 bg-[#16A34A] hover:bg-[#15803d] active:scale-95 text-white font-bold rounded-xl text-sm transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                  >
                    <i className="ri-check-line text-base"></i>
                    Accept ${bid.amount}
                  </button>
                  <button
                    onClick={() => handleDecline(bid.id)}
                    className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] dark:border-[#374151] text-[#EF4444] hover:border-[#EF4444] rounded-xl transition-all cursor-pointer"
                  >
                    <i className="ri-close-line text-base"></i>
                  </button>
                </div>
                <p className="text-[10px] text-[#9CA3AF] mt-2 text-right">{bid.timeAgo}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
