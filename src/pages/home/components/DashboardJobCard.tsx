import { useEffect, useRef } from "react";
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
  description: string;
}

interface DashboardJobCardProps {
  job: Job;
  onAccept: (id: string) => void;
  onBid: (id: string) => void;
  onExpire: (id: string) => void;
}

export default function DashboardJobCard({ job, onAccept, onBid, onExpire }: DashboardJobCardProps) {
  const { remaining } = useCountdown(job.expiresIn);
  const fillPercent = Math.round((1 - Math.max(0, remaining / job.totalTime)) * 100);
  const expiredRef = useRef(false);

  // When timer hits 0, notify parent to move job to "See All"
  useEffect(() => {
    if (remaining <= 0 && !expiredRef.current) {
      expiredRef.current = true;
      onExpire(job.id);
    }
  }, [remaining, job.id, onExpire]);

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#E5E7EB] dark:border-[#334155] min-w-[260px] flex-shrink-0 w-[280px]">
      {/* Price + badges row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-2xl font-black text-[#0F172A] dark:text-white">
          ₦{job.price.toLocaleString()}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] text-[10px] font-semibold rounded">
            {job.category}
          </span>
          {job.urgent && (
            <span className="px-2 py-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded uppercase">
              URGENT
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white leading-tight">{job.title}</h3>

      {/* Description */}
      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2">{job.description}</p>

      {/* Meta row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
          <i className="ri-map-pin-2-line text-[#6B7280] text-xs"></i>
          <span>{job.distance}</span>
        </div>
        <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
          <i className="ri-time-line text-[#6B7280] text-xs"></i>
          <span>{job.timeAgo}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
          <span className="font-semibold text-[#0F172A] dark:text-white">{job.rating}</span>
          <span className="text-[#9CA3AF]">({job.reviews})</span>
        </div>
        {job.verified && (
          <div className="flex items-center gap-1 text-[#16A34A] text-xs">
            <i className="ri-shield-check-fill text-xs"></i>
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-1">
        {/* BID button */}
        <button
          onClick={() => onBid(job.id)}
          className="flex-none h-10 px-4 border-2 border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC] hover:text-[#194DDC] dark:hover:border-[#6B9EFF] dark:hover:text-[#6B9EFF] font-bold rounded-xl text-xs transition-all duration-150 cursor-pointer whitespace-nowrap"
        >
          BID
        </button>

        {/* ACCEPT — progress bar button */}
        <button
          onClick={() => onAccept(job.id)}
          className="relative flex-1 h-10 rounded-xl overflow-hidden cursor-pointer"
        >
          {/* Light blue base background */}
          <div className="absolute inset-0 bg-[#83A1F1]" />
          {/* Primary blue fill — grows left to right */}
          <div
            className="absolute inset-y-0 left-0 bg-[#194DDC] transition-all duration-1000 ease-linear"
            style={{ width: `${fillPercent}%` }}
          />
          {/* Button text */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-xs font-black tracking-widest text-white">
              ACCEPT
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
