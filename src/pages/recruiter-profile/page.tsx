import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockRecruiterProfile, mockRecruiterReviews } from "@/mocks/jobs";

type Tab = "about" | "reviews";

export default function RecruiterProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("about");

  // For now use the mock recruiter profile (in a real app, fetch by id)
  const recruiter = mockRecruiterProfile;
  const reviews = mockRecruiterReviews;

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

  if (!id) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full">
          <i className="ri-user-unfollow-line text-2xl text-[#9CA3AF]"></i>
        </div>
        <p className="font-bold text-[#374151] dark:text-[#D1D5DB] text-base">Recruiter not found</p>
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-24">
      {/* Cover */}
      <div className="relative">
        <div className={`h-40 bg-gradient-to-br ${recruiter.coverBg}`} />
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
              src={recruiter.avatar}
              alt={recruiter.name}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0F172A] object-cover object-top"
            />
            {recruiter.verified && (
              <div className="absolute bottom-1 right-1 w-7 h-7 flex items-center justify-center bg-[#16A34A] rounded-full border-2 border-white dark:border-[#0F172A]">
                <i className="ri-shield-check-fill text-white text-xs"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Identity */}
        <div className="mt-16 text-center px-4">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">{recruiter.name}</h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{recruiter.company}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{recruiter.industry} · {recruiter.teamSize}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line text-[#9CA3AF] text-xs"></i>
            </div>
            <span className="text-xs text-[#9CA3AF]">{recruiter.location}</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`${
                  i < Math.floor(recruiter.rating) ? "ri-star-fill" : "ri-star-line"
                } text-[#F59E0B] text-sm`}
              ></i>
            ))}
            <span className="text-sm font-bold text-[#374151] dark:text-[#D1D5DB] ml-1">{recruiter.rating}</span>
            <span className="text-xs text-[#9CA3AF]">({reviews.length} reviews)</span>
          </div>
          {recruiter.bio && (
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 max-w-xs mx-auto leading-relaxed">
              {recruiter.bio}
            </p>
          )}
        </div>

        {/* Stats strip */}
        <div className="mx-4 mt-5 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] dark:divide-[#374151]">
            {[
              { label: "Jobs Posted", value: recruiter.jobsPosted },
              { label: "Hires Made", value: recruiter.hiresMade },
              { label: "Response", value: recruiter.responseTime },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-2">
                <span className="text-xl font-black text-[#111827] dark:text-white">{stat.value}</span>
                <span className="text-[10px] text-[#9CA3AF]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mx-4 mt-6">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] rounded-xl p-1">
            {(["about", "reviews"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                {tab === "about" ? "About" : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="mx-4 mt-4 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
              <h3 className="text-sm font-bold text-[#111827] dark:text-white mb-3">Business Details</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "ri-building-4-line", label: "Company", value: recruiter.company },
                  { icon: "ri-briefcase-line", label: "Industry", value: recruiter.industry },
                  { icon: "ri-team-line", label: "Team Size", value: recruiter.teamSize },
                  { icon: "ri-money-cny-circle-line", label: "Budget Range", value: recruiter.budgetRange },
                  { icon: "ri-phone-line", label: "Phone", value: recruiter.phone },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl flex-shrink-0">
                      <i className={`${item.icon} text-[#194DDC] dark:text-[#6B9EFF] text-base`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF]">{item.label}</p>
                      <p className="text-sm font-semibold text-[#111827] dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member since */}
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-[#DCFCE7] dark:bg-[#14532d]/20 rounded-xl flex-shrink-0">
                  <i className="ri-calendar-check-line text-[#16A34A] text-base"></i>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Member Since</p>
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">{recruiter.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="mx-4 mt-4 flex flex-col gap-3">
            {reviews.length > 0 && (
              <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
                <div className="flex items-center gap-5">
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
                    <span className="text-[10px] text-[#9CA3AF] mt-1">{reviews.length} reviews</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    {ratingCounts.map(({ star, count, pct }) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9CA3AF] w-3 flex-shrink-0">{star}</span>
                        <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
                          <i className="ri-star-fill text-[#F59E0B] text-[10px]"></i>
                        </div>
                        <div className="flex-1 h-2 bg-[#F3F4F6] dark:bg-[#374151] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] w-4 text-right flex-shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={review.workerAvatar}
                    alt={review.workerName}
                    className="w-10 h-10 rounded-full object-cover object-top flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="text-sm font-bold text-[#111827] dark:text-white">{review.workerName}</p>
                      <span className="text-[10px] text-[#9CA3AF]">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`text-xs ${
                            i < review.rating ? "ri-star-fill text-[#F59E0B]" : "ri-star-line text-[#D1D5DB]"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <i className="ri-briefcase-line text-[#9CA3AF] text-[10px]"></i>
                      <span className="text-[10px] text-[#9CA3AF] truncate">{review.jobTitle}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed mt-3">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0F172A] border-t border-[#E5E7EB] dark:border-[#1F2937] px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#E5E7EB] dark:border-[#374151] rounded-xl cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937] transition-colors">
            <i className="ri-message-2-line text-[#374151] dark:text-[#D1D5DB] text-lg"></i>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 h-12 bg-[#194DDC] hover:bg-[#1542c0] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
