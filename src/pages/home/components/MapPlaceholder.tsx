import { useState, useRef, useCallback, useEffect } from "react";
import { mockJobs } from "@/mocks/jobs";

interface MapPlaceholderProps {
  jobCount: number;
  onAccept: (id: string) => void;
  onBid: (id: string) => void;
  acceptedIds: Set<string>;
  expiredIds: Set<string>;
}

const jobPins = [
  { id: "1", top: 22, left: 43, urgent: true, yellow: false },
  { id: "2", top: 18, left: 68, urgent: true, yellow: false },
  { id: "3", top: 32, left: 81, urgent: false, yellow: true },
  { id: "4", top: 62, left: 20, urgent: true, yellow: false },
  { id: "5", top: 58, left: 47, urgent: true, yellow: false },
  { id: "6", top: 72, left: 62, urgent: true, yellow: false },
  { id: "7", top: 28, left: 88, urgent: true, yellow: false },
  { id: "8", top: 75, left: 90, urgent: true, yellow: false },
];

export default function MapPlaceholder({ jobCount, onAccept, onBid, acceptedIds, expiredIds }: MapPlaceholderProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const visiblePins = jobPins.filter(
    (p) => !acceptedIds.has(p.id) && !expiredIds.has(p.id)
  );

  const selectedJob = mockJobs.find((j) => j.id === selected);

  // Close popup on outside click
  useEffect(() => {
    if (!selected) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside any popup (mobile or desktop)
      if (target.closest("[data-popup]")) return;
      // Don't close if clicking on a pin
      if (target.closest("[data-pin]")) return;
      setSelected(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [selected]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-pin]")) return;
    if ((e.target as HTMLElement).closest("[data-popup]")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX, y: touch.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !dragStart.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  // Get popup position — flip if pin is near right/bottom edge
  const getPopupPosition = (pin: typeof jobPins[0]) => {
    const flipX = pin.left > 60;
    const flipY = pin.top > 55;
    return { flipX, flipY };
  };

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full overflow-hidden rounded-xl bg-[#E8EEF4]"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pannable map layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          width: "150%",
          height: "150%",
          top: "-25%",
          left: "-25%",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        <img
          src="https://readdy.ai/api/search-image?query=top%20down%20aerial%20city%20map%20view%20streets%20roads%20river%20urban%20suburban%20area%20clean%20light%20muted%20beige%20gray%20color%20detailed%20road%20network%20map%20view%20from%20above%20realistic&width=1400&height=900&seq=mapbg_pan1&orientation=landscape"
          alt="Live Job Map"
          className="w-full h-full object-cover object-center select-none"
          draggable={false}
        />

        {/* Job pins */}
        {visiblePins.map((pin) => (
          <button
            key={pin.id}
            data-pin
            onClick={(e) => {
              e.stopPropagation();
              setSelected(selected === pin.id ? null : pin.id);
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ top: `${pin.top}%`, left: `${pin.left}%` }}
          >
            {/* Pulse ring */}
            <span
              className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                pin.yellow ? "bg-[#F59E0B]" : "bg-[#EF4444]"
              }`}
              style={{ transform: "scale(1.8)" }}
            />
            <div
              className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white shadow-md transition-all duration-200 ${
                pin.yellow ? "bg-[#F59E0B]" : "bg-[#EF4444]"
              } ${selected === pin.id ? "scale-150 ring-2 ring-white/60" : "hover:scale-125"}`}
            />
          </button>
        ))}

        {/* User location dot */}
        <div className="absolute z-10" style={{ top: "53%", left: "54%" }}>
          <div className="relative">
            <div className="absolute -inset-4 md:-inset-6 bg-[#194DDC]/20 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full border-[3px] md:border-4 border-[#194DDC] relative z-10 flex items-center justify-center shadow-md">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#194DDC] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Overlay UI (fixed to viewport, not panned) ── */}

      {/* Your Location badge — top left */}
      <div className="absolute top-3 left-3 z-20 backdrop-blur-md bg-white/70 dark:bg-[#0F172A]/70 border border-white/40 dark:border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm pointer-events-none">
        <div className="w-7 h-7 flex items-center justify-center bg-[#194DDC] rounded-lg flex-shrink-0">
          <i className="ri-map-pin-2-fill text-white text-xs"></i>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#0F172A] dark:text-white leading-tight">Your Location</p>
          <p className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] leading-tight hidden sm:block">55 Force 2 Ave, Manitoba</p>
        </div>
      </div>

      {/* Live badge + job count — top right */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <div className="backdrop-blur-md bg-white/70 dark:bg-[#0F172A]/70 border border-white/40 dark:border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#0F172A] dark:text-white">
            <span className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse inline-block"></span>
            {jobCount} Live Jobs
          </span>
        </div>
      </div>

      {/* Nearby Jobs panel — bottom of map */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="backdrop-blur-md bg-white/60 dark:bg-[#0F172A]/60 border border-white/40 dark:border-white/10 rounded-2xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-[#0F172A] dark:text-white">Nearby Jobs</span>
            <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] font-medium">{jobCount} available</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
            {mockJobs
              .filter((j) => !acceptedIds.has(j.id) && !expiredIds.has(j.id))
              .map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelected(job.id)}
                  className="flex-shrink-0 flex items-center gap-2.5 backdrop-blur-sm bg-white/80 dark:bg-[#1E293B]/80 border border-white/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 cursor-pointer hover:bg-white dark:hover:bg-[#1E293B] transition-all"
                >
                  <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0 ${job.urgent ? "bg-[#EF4444]" : "bg-[#F59E0B]"}`} />
                  <div className="text-left">
                    <p className="text-[11px] md:text-sm font-bold text-[#0F172A] dark:text-white whitespace-nowrap leading-tight">{job.title}</p>
                    <p className="text-[10px] md:text-xs text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap mt-0.5">₦{job.price.toLocaleString()} · {job.distance}</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-[110px] right-3 z-20 backdrop-blur-md bg-white/60 dark:bg-[#0F172A]/60 border border-white/40 dark:border-white/10 rounded-lg px-2 py-1.5 flex items-center gap-1 pointer-events-none">
        <i className="ri-drag-move-2-line text-[#6B7280] dark:text-[#9CA3AF] text-xs"></i>
        <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] font-medium">Drag to explore</span>
      </div>

      {/* ── Job popup card ── */}
      {selected && selectedJob && (() => {
        const pin = jobPins.find((p) => p.id === selected);
        const { flipX, flipY } = pin ? getPopupPosition(pin) : { flipX: false, flipY: false };
        return (
          <>
            {/* Mobile: centered overlay */}
            <div
              ref={popupRef}
              data-popup
              className="md:hidden absolute z-30 w-[calc(100%-24px)] max-w-[340px]"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="backdrop-blur-xl bg-white/90 dark:bg-[#0F172A]/90 border border-white/60 dark:border-white/10 rounded-2xl p-4 shadow-xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#F3F4F6]/80 dark:bg-[#374151]/80 text-[#374151] dark:text-[#D1D5DB] text-[10px] font-semibold rounded">
                        {selectedJob.category}
                      </span>
                      {selectedJob.urgent && (
                        <span className="px-2 py-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded uppercase">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white leading-tight">{selectedJob.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <i className="ri-close-line text-[#374151] dark:text-[#D1D5DB] text-sm"></i>
                  </button>
                </div>
                <div className="text-2xl font-black text-[#0F172A] dark:text-white mb-2">
                  ₦{selectedJob.price.toLocaleString()}
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-3">
                  {selectedJob.description}
                </p>
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
                    <i className="ri-map-pin-2-line text-xs"></i>
                    <span>{selectedJob.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{selectedJob.rating}</span>
                    <span className="text-[#9CA3AF]">({selectedJob.reviews})</span>
                  </div>
                  {selectedJob.verified && (
                    <div className="flex items-center gap-1 text-[#16A34A] text-xs">
                      <i className="ri-shield-check-fill text-xs"></i>
                      <span className="font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-black/10 dark:border-white/10">
                  <img
                    src={selectedJob.recruiterAvatar}
                    alt={selectedJob.recruiterName}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Posted by <span className="font-semibold text-[#0F172A] dark:text-white">{selectedJob.recruiterName}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { onBid(selectedJob.id); setSelected(null); }}
                    className="flex-none h-9 px-4 border-2 border-black/15 dark:border-white/20 text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC] hover:text-[#194DDC] dark:hover:border-[#6B9EFF] dark:hover:text-[#6B9EFF] font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    BID
                  </button>
                  <button
                    onClick={() => { onAccept(selectedJob.id); setSelected(null); }}
                    className="flex-1 h-9 bg-[#194DDC] hover:bg-[#1542c0] text-white font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    ACCEPT
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: pin-relative positioning */}
            <div
              data-popup
              className="hidden md:block absolute z-30 w-[300px]"
              style={{
                top: pin ? `calc(${pin.top}% + ${flipY ? "-8px" : "8px"})` : "40%",
                left: pin ? `calc(${pin.left}% + ${flipX ? "-300px" : "8px"})` : "30%",
                transform: flipY ? "translateY(-100%)" : "translateY(0)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="backdrop-blur-xl bg-white/75 dark:bg-[#0F172A]/80 border border-white/50 dark:border-white/10 rounded-2xl p-4 shadow-lg">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#F3F4F6]/80 dark:bg-[#374151]/80 text-[#374151] dark:text-[#D1D5DB] text-[10px] font-semibold rounded">
                        {selectedJob.category}
                      </span>
                      {selectedJob.urgent && (
                        <span className="px-2 py-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded uppercase">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white leading-tight">{selectedJob.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <i className="ri-close-line text-[#374151] dark:text-[#D1D5DB] text-xs"></i>
                  </button>
                </div>
                <div className="text-2xl font-black text-[#0F172A] dark:text-white mb-2">
                  ₦{selectedJob.price.toLocaleString()}
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-3">
                  {selectedJob.description}
                </p>
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF] text-xs">
                    <i className="ri-map-pin-2-line text-xs"></i>
                    <span>{selectedJob.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <i className="ri-star-fill text-[#F59E0B] text-xs"></i>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{selectedJob.rating}</span>
                    <span className="text-[#9CA3AF]">({selectedJob.reviews})</span>
                  </div>
                  {selectedJob.verified && (
                    <div className="flex items-center gap-1 text-[#16A34A] text-xs">
                      <i className="ri-shield-check-fill text-xs"></i>
                      <span className="font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-black/10 dark:border-white/10">
                  <img
                    src={selectedJob.recruiterAvatar}
                    alt={selectedJob.recruiterName}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Posted by <span className="font-semibold text-[#0F172A] dark:text-white">{selectedJob.recruiterName}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { onBid(selectedJob.id); setSelected(null); }}
                    className="flex-none h-9 px-4 border-2 border-black/15 dark:border-white/20 text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC] hover:text-[#194DDC] dark:hover:border-[#6B9EFF] dark:hover:text-[#6B9EFF] font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    BID
                  </button>
                  <button
                    onClick={() => { onAccept(selectedJob.id); setSelected(null); }}
                    className="flex-1 h-9 bg-[#194DDC] hover:bg-[#1542c0] text-white font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    ACCEPT
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
