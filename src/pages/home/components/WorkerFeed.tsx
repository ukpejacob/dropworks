import { useState, useCallback } from "react";
import { mockJobs } from "@/mocks/jobs";
import MapPlaceholder from "./MapPlaceholder";
import BidModal from "./BidModal";
import AllJobsModal from "./AllJobsModal";
import StatsPanel, { StatsOnly, ActivitiesOnly } from "./StatsPanel";

export default function WorkerFeed() {
  const [jobs, setJobs] = useState(mockJobs);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [expiredIds, setExpiredIds] = useState<Set<string>>(new Set());
  const [bidJob, setBidJob] = useState<string | null>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const visibleJobs = jobs.filter((j) => !acceptedIds.has(j.id) && !expiredIds.has(j.id));
  const allUnacceptedJobs = jobs.filter((j) => !acceptedIds.has(j.id));
  const missedCount = allUnacceptedJobs.filter((j) => expiredIds.has(j.id)).length;

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAccept = (id: string) => {
    setAcceptedIds((prev) => new Set([...prev, id]));
    showToast("Job accepted! Check your Active Jobs.", "success");
  };

  const handleExpire = useCallback((id: string) => {
    setExpiredIds((prev) => new Set([...prev, id]));
  }, []);

  const handleBid = (id: string) => {
    setBidJob(id);
  };

  const handleBidSubmit = (_amount: number) => {
    showToast("Your bid has been placed!", "success");
    setBidJob(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setJobs([...mockJobs]);
      setAcceptedIds(new Set());
      setExpiredIds(new Set());
      setIsRefreshing(false);
      showToast("Jobs refreshed!", "info");
    }, 800);
  };

  const bidJobData = jobs.find((j) => j.id === bidJob);

  const toastColors = {
    success: "bg-[#16A34A]",
    error: "bg-[#EF4444]",
    info: "bg-[#194DDC]",
  };

  return (
    <>
      {/* ─── Mobile layout: Map → Stats → Activities ─── */}
      <div className="flex flex-col gap-4 px-4 py-4 md:hidden">
        {/* Full-height map on mobile — comes first */}
        <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#334155]" style={{ height: "calc(100vh - 20px)", minHeight: "620px" }}>
          {/* Map header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1E293B] border-b border-[#E5E7EB] dark:border-[#334155]">
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-2-fill text-[#0F172A] dark:text-white text-base"></i>
              <span className="text-sm font-bold text-[#0F172A] dark:text-white">Live Job Map</span>
              <span className="flex items-center gap-1 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"></span>
                Live
              </span>
            </div>
            <button
              onClick={() => setShowAllJobs(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-xs font-medium text-[#374151] dark:text-[#D1D5DB] cursor-pointer hover:border-[#194DDC] transition-colors whitespace-nowrap"
            >
              {missedCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold mr-0.5">
                  {missedCount}
                </span>
              )}
              See all
              <i className="ri-arrow-right-s-line text-sm"></i>
            </button>
          </div>
          {/* Map fills remaining height */}
          <div className="h-[calc(100%-52px)]">
            <MapPlaceholder
              jobCount={visibleJobs.length}
              onAccept={handleAccept}
              onBid={handleBid}
              acceptedIds={acceptedIds}
              expiredIds={expiredIds}
            />
          </div>
        </div>

        <StatsOnly />
        <ActivitiesOnly />
      </div>

      {/* ─── Desktop layout: side-by-side ─── */}
      <div className="hidden md:flex gap-5 p-5" style={{ height: "calc(100vh - 72px)" }}>
        {/* Left: Stats panel — hidden when expanded */}
        {!isExpanded && <StatsPanel />}

        {/* Right: Full-height map */}
        <div className="flex-1 flex flex-col min-w-0 rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#334155]">
          {/* Map header bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white dark:bg-[#1E293B] border-b border-[#E5E7EB] dark:border-[#334155] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-2-fill text-[#0F172A] dark:text-white text-base"></i>
                <span className="text-sm font-bold text-[#0F172A] dark:text-white">Live Job Map</span>
              </div>
              <span className="flex items-center gap-1 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"></span>
                Live
              </span>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Click pins or job cards to view details
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllJobs(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-xs font-medium text-[#374151] dark:text-[#D1D5DB] cursor-pointer hover:border-[#194DDC] transition-colors whitespace-nowrap"
              >
                {missedCount > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold">
                    {missedCount}
                  </span>
                )}
                See all jobs
                <i className="ri-arrow-right-s-line text-sm"></i>
              </button>
              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-8 h-8 flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-[#374151] dark:text-[#D1D5DB] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors disabled:opacity-50"
                title="Refresh jobs"
              >
                <i className={`ri-refresh-line text-sm ${isRefreshing ? "animate-spin" : ""}`}></i>
              </button>
              {/* Expand / Minimize button */}
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="w-8 h-8 flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-[#374151] dark:text-[#D1D5DB] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors"
                title={isExpanded ? "Minimize map" : "Expand map"}
              >
                <i className={`text-sm ${isExpanded ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"}`}></i>
              </button>
            </div>
          </div>

          {/* Map fills all remaining height */}
          <div className="flex-1 min-h-0">
            <MapPlaceholder
              jobCount={visibleJobs.length}
              onAccept={handleAccept}
              onBid={handleBid}
              acceptedIds={acceptedIds}
              expiredIds={expiredIds}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-4 md:right-6 z-[200] ${toastColors[toast.type]} text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2`}
        >
          <i className={`text-base ${toast.type === "success" ? "ri-checkbox-circle-line" : "ri-information-line"}`}></i>
          {toast.message}
        </div>
      )}

      {/* All Jobs modal */}
      {showAllJobs && (
        <AllJobsModal
          jobs={allUnacceptedJobs.map((j) => ({
            ...j,
            expiresIn: expiredIds.has(j.id) ? 0 : j.expiresIn,
          }))}
          onAccept={handleAccept}
          onBid={handleBid}
          onClose={() => setShowAllJobs(false)}
        />
      )}

      {/* Bid modal */}
      {bidJob && bidJobData && (
        <BidModal
          jobId={bidJob}
          jobTitle={bidJobData.title}
          originalPrice={bidJobData.price}
          onSubmit={handleBidSubmit}
          onClose={() => setBidJob(null)}
        />
      )}
    </>
  );
}
