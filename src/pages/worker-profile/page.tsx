import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockWorkerProfiles, WorkerReview } from "@/mocks/jobs";
import ReviewCard from "./components/ReviewCard";
import LeaveReviewModal from "./components/LeaveReviewModal";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

type TabType = "portfolio" | "jobs" | "reviews";

export default function WorkerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const worker = id ? mockWorkerProfiles[id] : null;

  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("portfolio");
  const [accepted, setAccepted] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState<WorkerReview[]>(
    worker ? [...worker.reviewsList] : []
  );
  // Track per-review replies
  const [reviewReplies, setReviewReplies] = useState<Record<string, string>>({});

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const handleAddReview = (review: WorkerReview) => {
    setReviews((prev) => [review, ...prev]);
    setActiveTab("reviews");
  };

  const handleAddReply = (reviewId: string, reply: string) => {
    setReviewReplies((prev) => ({ ...prev, [reviewId]: reply }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, workerReply: reply } : r))
    );
  };

  if (!worker) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#E5E7EB] rounded-full">
          <i className="ri-user-unfollow-line text-2xl text-[#9CA3AF]"></i>
        </div>
        <p className="font-bold text-[#374151] text-base">Worker not found</p>
        <button
          onClick={() => navigate(-1)}
          className="h-10 px-5 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-32">
      {/* Cover + Back button */}
      <div className="relative">
        <div className={`h-40 bg-gradient-to-br ${worker.coverBg}`} />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center bg-black/25 backdrop-blur-sm rounded-full cursor-pointer hover:bg-black/40 transition-colors"
          >
            <i className="ri-arrow-left-line text-white text-base"></i>
          </button>
          <button className="w-9 h-9 flex items-center justify-center bg-black/25 backdrop-blur-sm rounded-full cursor-pointer hover:bg-black/40 transition-colors">
            <i className="ri-share-line text-white text-base"></i>
          </button>
        </div>

        {/* Avatar */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
          <div className="relative">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0F172A] object-cover object-top"
            />
            {worker.verified && (
              <div className="absolute bottom-1 right-1 w-7 h-7 flex items-center justify-center bg-[#16A34A] rounded-full border-2 border-white">
                <i className="ri-shield-check-fill text-white text-xs"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Identity */}
        <div className="mt-16 text-center px-4">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">{worker.name}</h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{worker.role}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line text-[#9CA3AF] text-xs"></i>
            </div>
            <span className="text-xs text-[#9CA3AF]">{worker.location}</span>
            <span className="text-xs text-[#9CA3AF] mx-1">·</span>
            <span className="text-xs text-[#9CA3AF]">Member since {worker.memberSince}</span>
          </div>

          <div className="flex items-center justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`${
                  i < Math.floor(worker.rating)
                    ? "ri-star-fill"
                    : i < worker.rating
                    ? "ri-star-half-fill"
                    : "ri-star-line"
                } text-[#F59E0B] text-sm`}
              ></i>
            ))}
            <span className="text-sm font-bold text-[#374151] dark:text-[#D1D5DB] ml-1">{worker.rating}</span>
            <span className="text-xs text-[#9CA3AF]">({worker.reviews} reviews)</span>
          </div>

          {worker.bio && (
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 max-w-xs mx-auto leading-relaxed">
              {worker.bio}
            </p>
          )}
        </div>

        {/* Stats strip */}
        <div className="mx-4 mt-5 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] dark:divide-[#374151]">
            {[
              { label: "Jobs Done", value: worker.jobsCompleted },
              { label: "Rating", value: `${worker.rating}★` },
              { label: "Response", value: worker.responseTime },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-2">
                <span className="text-xl font-black text-[#111827] dark:text-white">{stat.value}</span>
                <span className="text-[10px] text-[#9CA3AF]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mx-4 mt-5">
          <h2 className="text-sm font-bold text-[#111827] dark:text-white mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-full text-xs font-medium text-[#374151] dark:text-[#D1D5DB]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tab switcher — 3 tabs */}
        <div className="mx-4 mt-6">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] rounded-xl p-1">
            {(["portfolio", "jobs", "reviews"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#1e3a8a]/40 text-[#111827] dark:text-[#6B9EFF]"
                    : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#374151]"
                }`}
              >
                {tab === "portfolio"
                  ? "Portfolio"
                  : tab === "jobs"
                  ? `Past Jobs (${worker.completedJobs.length})`
                  : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Portfolio tab ── */}
        {activeTab === "portfolio" && (
          <div className="mx-4 mt-4">
            {worker.portfolioItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#1F2937] rounded-full mb-3">
                  <i className="ri-image-2-line text-2xl text-[#9CA3AF]"></i>
                </div>
                <p className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">No portfolio yet</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  This worker hasn&apos;t added any work samples
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {worker.portfolioItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLightboxItem(item)}
                    className="bg-white dark:bg-[#1F2937] rounded-xl overflow-hidden border border-[#E5E7EB]/60 dark:border-[#374151]/60 cursor-pointer hover:opacity-95 transition-opacity text-left w-full"
                  >
                    <div className="w-full h-28 sm:h-32 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-bold text-[#111827] dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Past Jobs tab ── */}
        {activeTab === "jobs" && (
          <div className="mx-4 mt-4 flex flex-col gap-2">
            {worker.completedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#1F2937] rounded-full mb-3">
                  <i className="ri-briefcase-line text-2xl text-[#9CA3AF]"></i>
                </div>
                <p className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">No completed jobs yet</p>
              </div>
            ) : (
              worker.completedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-3 bg-white dark:bg-[#1F2937] rounded-xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-3"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={job.thumbnail}
                      alt={job.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] dark:text-white truncate">{job.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-[#9CA3AF]">{job.date}</span>
                      <span className="text-[10px] text-[#9CA3AF]">·</span>
                      <span className="text-[10px] text-[#9CA3AF]">by {job.recruiterName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-black text-[#111827] dark:text-white">
                      {formatPrice(job.price)}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        job.statusColor === "green"
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF]"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Reviews tab ── */}
        {activeTab === "reviews" && (
          <div className="mx-4 mt-4">
            {/* Rating summary card */}
            {reviews.length > 0 && (
              <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4 mb-4">
                <div className="flex items-center gap-5">
                  {/* Big number */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-4xl font-black text-[#111827] dark:text-white">
                      {avgRating.toFixed(1)}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`text-sm ${
                            i < Math.round(avgRating)
                              ? "ri-star-fill text-[#F59E0B]"
                              : "ri-star-line text-[#D1D5DB]"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] mt-1">
                      {reviews.length} reviews
                    </span>
                  </div>

                  {/* Breakdown bars */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    {ratingCounts.map(({ star, count, pct }) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9CA3AF] w-3 flex-shrink-0">
                          {star}
                        </span>
                        <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
                          <i className="ri-star-fill text-[#F59E0B] text-[10px]"></i>
                        </div>
                        <div className="flex-1 h-2 bg-[#F3F4F6] dark:bg-[#374151] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] w-4 text-right flex-shrink-0">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Leave a review CTA */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full flex items-center gap-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB]/60 dark:border-[#374151]/60 rounded-2xl px-4 py-3 mb-4 cursor-pointer hover:border-[#194DDC]/30 hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-all group"
            >
              <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl group-hover:bg-[#194DDC]/10 transition-colors flex-shrink-0">
                <i className="ri-edit-2-line text-[#194DDC] text-base"></i>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-[#111827] dark:text-white">Leave a Review</p>
                <p className="text-xs text-[#9CA3AF]">Share your experience working with {worker.name}</p>
              </div>
              <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
            </button>

            {/* Reviews list */}
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#1F2937] rounded-full mb-3">
                  <i className="ri-chat-3-line text-2xl text-[#9CA3AF]"></i>
                </div>
                <p className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">No reviews yet</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Be the first to leave feedback
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    canReply={false}
                    onReply={handleAddReply}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0F172A] border-t border-[#E5E7EB] dark:border-[#1F2937] px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button
            onClick={() => setShowReviewModal(true)}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#E5E7EB] dark:border-[#374151] rounded-xl cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937] transition-colors"
            title="Leave a review"
          >
            <i className="ri-star-line text-[#374151] dark:text-[#D1D5DB] text-lg"></i>
          </button>
          <button className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#E5E7EB] dark:border-[#374151] rounded-xl cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937] transition-colors">
            <i className="ri-message-2-line text-[#374151] dark:text-[#D1D5DB] text-lg"></i>
          </button>
          <button
            onClick={() => setAccepted(true)}
            disabled={accepted}
            className={`flex-1 h-12 font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
              accepted
                ? "bg-[#DCFCE7] dark:bg-[#14532d]/30 text-[#16A34A] cursor-default"
                : "bg-[#194DDC] hover:bg-[#1542c0] text-white"
            }`}
          >
            {accepted ? (
              <>
                <i className="ri-check-line text-base"></i>
                Bid Accepted
              </>
            ) : (
              <>
                <i className="ri-check-line text-base"></i>
                Accept This Bid
              </>
            )}
          </button>
        </div>
      </div>

      {/* Portfolio Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={() => setLightboxItem(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 rounded-full cursor-pointer">
            <i className="ri-close-line text-white text-xl"></i>
          </button>
          <div
            className="max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full rounded-2xl object-cover object-top max-h-[60vh]"
            />
            <div className="mt-4 px-1">
              <h3 className="text-white font-black text-base">{lightboxItem.title}</h3>
              <p className="text-white/70 text-sm mt-1.5 leading-relaxed">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leave Review Modal */}
      {showReviewModal && (
        <LeaveReviewModal
          subjectName={worker.name}
          subjectAvatar={worker.avatar}
          jobTitle={
            worker.completedJobs[0]?.title ?? "Previous Job"
          }
          reviewerRole="recruiter"
          reviewerName="You"
          reviewerAvatar="https://readdy.ai/api/search-image?query=confident%20young%20professional%20man%20smiling%20headshot%20clean%20bright%20background%20modern&width=80&height=80&seq=profilemain&orientation=squarish"
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleAddReview}
        />
      )}
    </div>
  );
}
