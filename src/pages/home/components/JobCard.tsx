import { useRef, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";

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
  recruiterName: string;
  recruiterAvatar: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  onAccept: (id: string) => void;
  onIgnore: (id: string) => void;
  onBid: (id: string) => void;
  isActive: boolean;
}

const categoryColors: Record<string, string> = {
  Handyman: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Cleaning: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  "Pet Care": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Tech: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Photography: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Design: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function JobCard({ job, onAccept, onIgnore, onBid, isActive }: JobCardProps) {
  const { label: countdownLabel, remaining } = useCountdown(job.expiresIn);
  const progress = Math.max(0, remaining / job.totalTime);
  const [swipeDx, setSwipeDx] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const urgentExpiry = remaining < 3600;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    setSwipeDx(dx);
  };

  const handleTouchEnd = () => {
    setSwiping(false);
    const threshold = window.innerWidth * 0.35;
    if (swipeDx > threshold) {
      onAccept(job.id);
    } else if (swipeDx < -threshold) {
      onIgnore(job.id);
    }
    setSwipeDx(0);
  };

  const swipeOpacity = Math.min(Math.abs(swipeDx) / (window.innerWidth * 0.35), 1);
  const isSwipeRight = swipeDx > 30;
  const isSwipeLeft = swipeDx < -30;

  const catColor = categoryColors[job.category] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

  return (
    <div className="relative flex-shrink-0 w-[88vw] max-w-sm select-none">
      {/* Swipe overlays */}
      {isSwipeRight && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-start px-8 rounded-2xl bg-[#16A34A]/20 pointer-events-none"
          style={{ opacity: swipeOpacity }}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-[#16A34A] rounded-full">
            <i className="ri-check-line text-white text-2xl"></i>
          </div>
          <span className="ml-3 text-[#16A34A] font-bold text-lg">Accept</span>
        </div>
      )}
      {isSwipeLeft && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-end px-8 rounded-2xl bg-[#EF4444]/20 pointer-events-none"
          style={{ opacity: swipeOpacity }}
        >
          <span className="mr-3 text-[#EF4444] font-bold text-lg">Ignore</span>
          <div className="w-14 h-14 flex items-center justify-center bg-[#EF4444] rounded-full">
            <i className="ri-close-line text-white text-2xl"></i>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        className={`bg-white dark:bg-[#1F2937] rounded-2xl overflow-hidden border border-[#E5E7EB]/80 dark:border-[#374151]/60 transition-all duration-200 ${isActive ? "" : "opacity-75 scale-95"}`}
        style={{
          transform: swiping ? `translateX(${swipeDx * 0.5}px) rotate(${swipeDx * 0.02}deg)` : undefined,
          transition: swiping ? "none" : "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top row: price + category */}
        <div className="px-4 pt-4 pb-2 flex items-start justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#0F172A] dark:text-white">${job.price}</span>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">flat</span>
          </div>
          <div className="flex items-center gap-2">
            {job.urgent && (
              <span className="flex items-center gap-1 bg-[#EF4444]/10 text-[#EF4444] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                <i className="ri-fire-line text-xs"></i>
                Urgent
              </span>
            )}
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${catColor}`}>
              {job.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="px-4 pb-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-left cursor-pointer w-full"
          >
            <h3 className="text-base font-bold text-[#111827] dark:text-white leading-tight line-clamp-2">
              {job.title}
            </h3>
          </button>
        </div>

        {/* Expanded description */}
        {expanded && (
          <div className="px-4 pb-2">
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">{job.description}</p>
          </div>
        )}

        {/* Meta row */}
        <div className="px-4 pb-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
            <i className="ri-map-pin-2-line text-sm text-[#194DDC] dark:text-[#6B9EFF]"></i>
            <span>{job.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
            <i className="ri-time-line text-sm text-[#F59E0B]"></i>
            <span>{job.timeAgo}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
            <span className="font-semibold text-[#111827] dark:text-white">{job.rating}</span>
            <span className="text-[#9CA3AF]">({job.reviews})</span>
          </div>
          {job.verified && (
            <div className="flex items-center gap-1 text-[#16A34A] text-xs">
              <i className="ri-shield-check-fill text-xs"></i>
              <span className="font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Recruiter */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <img
            src={job.recruiterAvatar}
            alt={job.recruiterName}
            className="w-6 h-6 rounded-full object-cover object-top"
          />
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">by <span className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{job.recruiterName}</span></span>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#9CA3AF] dark:text-[#6B7280]">Expires in</span>
            <span className={`text-[10px] font-bold ${urgentExpiry ? "text-[#EF4444]" : "text-[#374151] dark:text-[#D1D5DB]"}`}>
              {countdownLabel}
            </span>
          </div>
          <div className="h-1.5 bg-[#E5E7EB] dark:bg-[#374151] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                urgentExpiry
                  ? "bg-gradient-to-r from-[#EF4444] to-[#F59E0B]"
                  : "bg-gradient-to-r from-[#194DDC] to-[#3B82F6] dark:from-[#3b6fd4] dark:to-[#6B9EFF]"
              }`}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-4 py-3 flex gap-2">
          <button
            onClick={() => onAccept(job.id)}
            className="flex-1 h-11 bg-[#194DDC] dark:bg-[#1e3a8a] hover:bg-[#1542c0] active:scale-95 text-white font-bold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-check-line text-base"></i>
            Accept
          </button>
          <button
            onClick={() => onBid(job.id)}
            className="flex-1 h-11 border-2 border-[#194DDC] dark:border-[#6B9EFF] text-[#194DDC] dark:text-[#6B9EFF] hover:bg-[#194DDC]/5 active:scale-95 font-bold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-auction-line text-base"></i>
            Bid
          </button>
          <button
            onClick={() => onIgnore(job.id)}
            className="w-11 h-11 flex items-center justify-center border border-[#E5E7EB] dark:border-[#374151] text-[#9CA3AF] hover:border-[#EF4444] hover:text-[#EF4444] rounded-xl transition-all duration-150 cursor-pointer"
          >
            <i className="ri-close-line text-base"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
