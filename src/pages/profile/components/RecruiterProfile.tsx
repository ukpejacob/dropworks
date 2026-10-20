import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRecruiterProfile, mockRecruiterReviews } from "@/mocks/jobs";
import EditRecruiterProfileModal from "./EditRecruiterProfileModal";
import PaymentMethodsModal, { PaymentMethod } from "./PaymentMethodsModal";
import RecruiterReviewCard from "./RecruiterReviewCard";
import LeaveReviewModal from "@/pages/worker-profile/components/LeaveReviewModal";
import { WorkerReview } from "@/mocks/jobs";
import NotificationsModal from "./NotificationsModal";
import PrivacySecurityModal from "./PrivacySecurityModal";
import HelpSupportModal from "./HelpSupportModal";
import LogoutModal from "./LogoutModal";

interface RecruiterProfileState {
  name: string;
  company: string;
  bio: string;
  location: string;
  phone: string;
  industry: string;
  teamSize: string;
  budgetRange: string;
}

type RecruiterTab = "about" | "reviews" | "payments";

export default function RecruiterProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<RecruiterProfileState>({
    name: mockRecruiterProfile.name,
    company: mockRecruiterProfile.company,
    bio: mockRecruiterProfile.bio,
    location: mockRecruiterProfile.location,
    phone: mockRecruiterProfile.phone,
    industry: mockRecruiterProfile.industry,
    teamSize: mockRecruiterProfile.teamSize,
    budgetRange: mockRecruiterProfile.budgetRange,
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([...mockRecruiterProfile.paymentMethods]);
  const [activeTab, setActiveTab] = useState<RecruiterTab>("about");
  const [reviews, setReviews] = useState([...mockRecruiterReviews]);

  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showLeaveReview, setShowLeaveReview] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacySecurity, setShowPrivacySecurity] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleSaveProfile = (data: RecruiterProfileState) => {
    setProfile(data);
  };

  const handleSavePayments = (methods: PaymentMethod[]) => {
    setPaymentMethods(methods);
  };

  const handleAddReview = (review: WorkerReview) => {
    const newReview = {
      id: `rr-${Date.now()}`,
      workerName: review.recruiterName,
      workerAvatar: review.recruiterAvatar,
      rating: review.rating,
      comment: review.comment,
      jobTitle: review.jobTitle,
      date: "Just now",
    };
    setReviews((prev) => [newReview, ...prev]);
    setShowLeaveReview(false);
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };



  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  const tabs: { id: RecruiterTab; label: string; count?: number }[] = [
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews", count: reviews.length },
    { id: "payments", label: "Payments" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-24">
      <div className="max-w-3xl mx-auto">

        {/* Cover + Avatar */}
        <div className="relative">
          <div className={`h-36 bg-gradient-to-br ${mockRecruiterProfile.coverBg}`} />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/30 transition-colors"
            >
              <i className="ri-share-line text-white text-base"></i>
            </button>
            <button
              onClick={() => setShowEditProfile(true)}
              className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/30 transition-colors"
            >
              <i className="ri-settings-3-line text-white text-base"></i>
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
            <div className="relative">
              <img
                src={mockRecruiterProfile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0F172A] object-cover object-top"
              />
              {mockRecruiterProfile.verified && (
                <div className="absolute bottom-1 right-1 w-7 h-7 flex items-center justify-center bg-[#16A34A] rounded-full border-2 border-white dark:border-[#0F172A]">
                  <i className="ri-shield-check-fill text-white text-xs"></i>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-14 text-center px-4">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">{profile.name}</h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{profile.company}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{profile.industry} · {profile.teamSize}</p>
          {profile.location && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-pin-line text-[#9CA3AF] text-xs"></i>
              </div>
              <span className="text-xs text-[#9CA3AF]">{profile.location}</span>
            </div>
          )}
          <div className="flex items-center justify-center gap-1 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`${i < Math.floor(mockRecruiterProfile.rating) ? "ri-star-fill" : "ri-star-line"} text-[#F59E0B] text-sm`}
              ></i>
            ))}
            <span className="text-sm font-bold text-[#374151] dark:text-[#D1D5DB] ml-1">{mockRecruiterProfile.rating}</span>
            <span className="text-xs text-[#9CA3AF]">({reviews.length} reviews)</span>
          </div>
          {profile.bio && (
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2 max-w-sm mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="mx-4 mt-5 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] dark:divide-[#374151]">
            {[
              { label: "Jobs Posted", value: mockRecruiterProfile.jobsPosted },
              { label: "Hires Made", value: mockRecruiterProfile.hiresMade },
              { label: "Response", value: mockRecruiterProfile.responseTime },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-2">
                <span className="text-xl font-black text-[#111827] dark:text-white">{stat.value}</span>
                <span className="text-[10px] text-[#9CA3AF]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mx-4 mt-3 flex gap-2">
          <button
            onClick={() => setShowEditProfile(true)}
            className="flex-1 h-10 bg-[#194DDC] dark:bg-[#1e3a8a] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={handleShare}
            className="flex-1 h-10 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
          >
            Share Profile
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mx-4 mt-6">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-[#194DDC] dark:bg-[#6B9EFF] text-white" : "bg-[#E5E7EB] dark:bg-[#374151] text-[#9CA3AF]"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── About Tab ── */}
        {activeTab === "about" && (
          <div className="mx-4 mt-4 flex flex-col gap-4">
            {/* Business Info */}
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
              <h3 className="text-sm font-bold text-[#111827] dark:text-white mb-3">Business Details</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                    <i className="ri-building-4-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Company</p>
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{profile.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                    <i className="ri-briefcase-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Industry</p>
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{profile.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                    <i className="ri-team-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Team Size</p>
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{profile.teamSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                    <i className="ri-money-cny-circle-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Budget Range</p>
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{profile.budgetRange}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                    <i className="ri-phone-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Phone</p>
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{profile.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 overflow-hidden">
              <button
                onClick={() => navigate("/post-job")}
                className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors border-b border-[#F3F4F6] dark:border-[#374151]"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                  <i className="ri-add-circle-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Post a New Job</p>
                  <p className="text-[10px] text-[#9CA3AF]">Find skilled workers for your next project</p>
                </div>
                <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
              </button>
              <button
                onClick={() => navigate("/recruiter-jobs")}
                className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors border-b border-[#F3F4F6] dark:border-[#374151]"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#FEF3C7] dark:bg-[#78350f]/20 rounded-xl">
                  <i className="ri-folder-3-line text-[#D97706] text-base"></i>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Manage My Jobs</p>
                  <p className="text-[10px] text-[#9CA3AF]">View open, ongoing, and completed jobs</p>
                </div>
                <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
              </button>
              <button
                onClick={() => navigate("/live-bids")}
                className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#DCFCE7] dark:bg-[#14532d]/20 rounded-xl">
                  <i className="ri-auction-line text-[#16A34A] text-base"></i>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Live Bids</p>
                  <p className="text-[10px] text-[#9CA3AF]">Review and accept worker bids in real time</p>
                </div>
                <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
              </button>
            </div>
          </div>
        )}

        {/* ── Reviews Tab ── */}
        {activeTab === "reviews" && (
          <div className="mx-4 mt-4 flex flex-col gap-3">
            {/* Rating summary */}
            {reviews.length > 0 && (
              <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-4xl font-black text-[#111827] dark:text-white">{avgRating.toFixed(1)}</span>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`text-sm ${i < Math.round(avgRating) ? "ri-star-fill text-[#F59E0B]" : "ri-star-line text-[#D1D5DB]"}`}
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
                          <div className="h-full bg-[#F59E0B] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] w-4 text-right flex-shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Leave review CTA */}
            <button
              onClick={() => setShowLeaveReview(true)}
              className="w-full flex items-center gap-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB]/60 dark:border-[#374151]/60 rounded-2xl px-4 py-3 cursor-pointer hover:border-[#194DDC]/30 hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-all group"
            >
              <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl group-hover:bg-[#194DDC]/10 transition-colors flex-shrink-0">
                <i className="ri-edit-2-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-[#111827] dark:text-white">Leave a Review</p>
                <p className="text-xs text-[#9CA3AF]">Share feedback about a worker you hired</p>
              </div>
              <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
            </button>

            {/* Reviews list */}
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F3F4F6] rounded-full mb-3">
                  <i className="ri-chat-3-line text-2xl text-[#9CA3AF]"></i>
                </div>
                <p className="text-sm font-semibold text-[#374151]">No reviews yet</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Hire workers and leave feedback to build your reputation</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {reviews.map((review) => (
                  <RecruiterReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Payments Tab ── */}
        {activeTab === "payments" && (
          <div className="mx-4 mt-4 flex flex-col gap-4">
            {/* Payment methods */}
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Payment Methods</h3>
                <button
                  onClick={() => setShowPaymentMethods(true)}
                  className="flex items-center gap-1 text-xs text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <i className="ri-edit-2-line text-xs"></i>
                  Manage
                </button>
              </div>
              {paymentMethods.length === 0 ? (
                <button
                  onClick={() => setShowPaymentMethods(true)}
                  className="w-full h-12 border-2 border-dashed border-[#E5E7EB] dark:border-[#374151] rounded-xl flex items-center justify-center gap-2 text-sm text-[#9CA3AF] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors"
                >
                  <i className="ri-add-circle-line"></i>
                  Add your first payment method
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        method.default
                          ? "border-[#194DDC] dark:border-[#6B9EFF] bg-[#EEF2FF] dark:bg-[#1e3a8a]/20"
                          : "border-[#E5E7EB] dark:border-[#374151]"
                      }`}
                    >
                      <div className="w-9 h-9 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-xl">
                        <i className={`${method.type === "card" ? "ri-bank-card-line" : "ri-bank-line"} text-[#194DDC] dark:text-[#6B9EFF] text-base`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{method.label}</p>
                        <p className="text-[10px] text-[#9CA3AF] capitalize">{method.type}</p>
                      </div>
                      {method.default && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#194DDC] text-white rounded-full flex-shrink-0">Default</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet quick link */}
            <button
              onClick={() => navigate("/wallet")}
              className="w-full flex items-center gap-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB]/60 dark:border-[#374151]/60 rounded-2xl px-4 py-4 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
            >
              <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
                <i className="ri-wallet-3-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-[#111827] dark:text-white">Wallet & Transactions</p>
                <p className="text-[10px] text-[#9CA3AF]">View balance, escrow, and payment history</p>
              </div>
              <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
            </button>
          </div>
        )}

        {/* Settings list */}
        <div className="mx-4 mt-6 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 overflow-hidden">
          {[
            { icon: "ri-notification-3-line", label: "Notifications", color: "text-[#194DDC] dark:text-[#6B9EFF]", bg: "bg-blue-50 dark:bg-blue-900/20", action: () => setShowNotifications(true) },
            { icon: "ri-shield-keyhole-line", label: "Privacy & Security", color: "text-[#16A34A]", bg: "bg-green-50 dark:bg-green-900/20", action: () => setShowPrivacySecurity(true) },
            { icon: "ri-bank-card-line", label: "Payment Methods", color: "text-[#F59E0B]", bg: "bg-yellow-50 dark:bg-yellow-900/20", action: () => setShowPaymentMethods(true) },
            { icon: "ri-customer-service-2-line", label: "Help & Support", color: "text-[#6B7280]", bg: "bg-gray-100 dark:bg-gray-800/30", action: () => setShowHelpSupport(true) },
            { icon: "ri-logout-box-r-line", label: "Sign Out", color: "text-[#EF4444]", bg: "bg-red-50 dark:bg-red-900/20", action: () => setShowLogout(true) },
          ].map((item, idx) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors ${
                idx < 4 ? "border-b border-[#F3F4F6] dark:border-[#374151]" : ""
              }`}
            >
              <div className={`w-9 h-9 flex items-center justify-center ${item.bg} rounded-xl`}>
                <i className={`${item.icon} ${item.color} text-base`}></i>
              </div>
              <span className="flex-1 text-sm font-medium text-[#374151] dark:text-[#D1D5DB] text-left">{item.label}</span>
              <i className="ri-arrow-right-s-line text-[#9CA3AF] text-lg"></i>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Modals ─── */}

      {showEditProfile && (
        <EditRecruiterProfileModal
          profile={profile}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}

      {showPaymentMethods && (
        <PaymentMethodsModal
          methods={paymentMethods}
          onClose={() => setShowPaymentMethods(false)}
          onSave={handleSavePayments}
        />
      )}

      {showLeaveReview && (
        <LeaveReviewModal
          subjectName="James R."
          subjectAvatar="https://readdy.ai/api/search-image?query=confident%20male%20professional%20headshot%20clean%20background%20friendly%20smile&width=80&height=80&seq=bidder1&orientation=squarish"
          jobTitle="Furniture Assembly"
          reviewerRole="recruiter"
          reviewerName={profile.name}
          reviewerAvatar={mockRecruiterProfile.avatar}
          onClose={() => setShowLeaveReview(false)}
          onSubmit={handleAddReview}
        />
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-[#111827] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <i className="ri-check-line text-[#16A34A]"></i>
          Profile link copied to clipboard
        </div>
      )}

      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}

      {showPrivacySecurity && (
        <PrivacySecurityModal onClose={() => setShowPrivacySecurity(false)} />
      )}

      {showHelpSupport && (
        <HelpSupportModal onClose={() => setShowHelpSupport(false)} />
      )}

      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          userName={profile.name}
          userAvatar={mockRecruiterProfile.avatar}
        />
      )}
    </div>
  );
}