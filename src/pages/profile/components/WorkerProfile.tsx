import { useState } from "react";
import { mockProfile, mockMyJobs, WorkerReview } from "@/mocks/jobs";
import EditProfileModal from "./EditProfileModal";
import SkillsEditorModal from "./SkillsEditorModal";
import PortfolioItemModal, { PortfolioItem } from "./PortfolioItemModal";
import LeaveReviewModal from "@/pages/worker-profile/components/LeaveReviewModal";
import ReviewCard from "@/pages/worker-profile/components/ReviewCard";
import NotificationsModal from "./NotificationsModal";
import PrivacySecurityModal from "./PrivacySecurityModal";
import PaymentMethodsModal, { PaymentMethod } from "./PaymentMethodsModal";
import HelpSupportModal from "./HelpSupportModal";
import LogoutModal from "./LogoutModal";

interface ProfileState {
  name: string;
  bio: string;
  location: string;
  phone: string;
}

export default function WorkerProfile() {
  const [profile, setProfile] = useState<ProfileState>({
    name: mockProfile.name,
    bio: mockProfile.bio,
    location: mockProfile.location,
    phone: mockProfile.phone,
  });
  const [skills, setSkills] = useState<string[]>([...mockProfile.skills]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([...mockProfile.portfolioItems]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSkillsEditor, setShowSkillsEditor] = useState(false);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null | undefined>(undefined);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacySecurity, setShowPrivacySecurity] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Completed jobs from platform
  const completedJobs = mockMyJobs.completed;

  // Reviews left by this worker on recruiters
  const [givenReviews, setGivenReviews] = useState<(WorkerReview & { recruiterJobTitle: string })[]>([]);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const [pendingReviewJob, setPendingReviewJob] = useState<{ recruiterName: string; recruiterAvatar: string; jobTitle: string } | null>(null);

  // Jobs that haven't been reviewed yet
  const reviewedJobIds = new Set(givenReviews.map((r) => r.recruiterJobTitle));
  const pendingFeedbackJobs = completedJobs.filter((j) => !reviewedJobIds.has(j.title));

  const handleOpenReviewForJob = (job: typeof completedJobs[0]) => {
    setPendingReviewJob({
      recruiterName: job.recruiterName,
      recruiterAvatar: job.thumbnail,
      jobTitle: job.title,
    });
    setShowLeaveReviewModal(true);
  };

  const handleSubmitGivenReview = (review: WorkerReview) => {
    setGivenReviews((prev) => [
      ...prev,
      { ...review, recruiterJobTitle: pendingReviewJob?.jobTitle ?? "" },
    ]);
    setPendingReviewJob(null);
  };

  const handleSaveProfile = (data: ProfileState) => {
    setProfile(data);
  };

  const handleSaveSkills = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const handleSavePortfolioItem = (item: PortfolioItem) => {
    setPortfolioItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? item : p));
      }
      return [...prev, item];
    });
  };

  const handleDeletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-24">
      <div className="max-w-3xl mx-auto">

        {/* Cover + Avatar */}
        <div className="relative">
          <div className={`h-36 bg-gradient-to-br ${mockProfile.coverBg}`} />
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer">
              <i className="ri-share-line text-white text-base"></i>
            </button>
            <button
              onClick={() => setShowEditProfile(true)}
              className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer"
            >
              <i className="ri-settings-3-line text-white text-base"></i>
            </button>
          </div>
          {/* Avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
            <div className="relative">
              <img
                src={mockProfile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0F172A] object-cover object-top"
              />
              {mockProfile.verified && (
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
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
            {mockProfile.role} · Member since {mockProfile.memberSince}
          </p>
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
                className={`${i < Math.floor(mockProfile.rating) ? "ri-star-fill" : "ri-star-line"} text-[#F59E0B] text-sm`}
              ></i>
            ))}
            <span className="text-sm font-bold text-[#374151] dark:text-[#D1D5DB] ml-1">{mockProfile.rating}</span>
            <span className="text-xs text-[#9CA3AF]">({mockProfile.reviews})</span>
          </div>
          {profile.bio && (
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2 max-w-xs mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="mx-4 mt-5 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] dark:divide-[#374151]">
            {[
              { label: "Jobs Done", value: mockProfile.jobsCompleted },
              { label: "Rating", value: `${mockProfile.rating}★` },
              { label: "Response", value: mockProfile.responseTime },
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
          <button className="flex-1 h-10 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors">
            Share
          </button>
        </div>

        {/* Skills */}
        <div className="mx-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827] dark:text-white">Skills</h2>
            <button
              onClick={() => setShowSkillsEditor(true)}
              className="flex items-center gap-1 text-xs text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            >
              <i className="ri-edit-2-line text-xs"></i>
              Edit Skills
            </button>
          </div>
          {skills.length === 0 ? (
            <button
              onClick={() => setShowSkillsEditor(true)}
              className="w-full h-12 border-2 border-dashed border-[#E5E7EB] dark:border-[#374151] rounded-xl flex items-center justify-center gap-2 text-sm text-[#9CA3AF] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors"
            >
              <i className="ri-add-circle-line"></i>
              Add your first skill
            </button>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-full text-xs font-medium text-[#374151] dark:text-[#D1D5DB]"
                >
                  {skill}
                </span>
              ))}
              <button
                onClick={() => setShowSkillsEditor(true)}
                className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-[#194DDC] dark:border-[#6B9EFF] rounded-full text-xs font-medium text-[#194DDC] dark:text-[#6B9EFF] cursor-pointer hover:bg-[#EEF2FF] dark:hover:bg-[#1e3a8a]/20 transition-colors"
              >
                <i className="ri-add-line text-xs"></i>
                Add
              </button>
            </div>
          )}
        </div>

        {/* Portfolio */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827] dark:text-white">Portfolio</h2>
            <button
              onClick={() => setEditingPortfolioItem(null)}
              className="flex items-center gap-1 text-xs text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            >
              <i className="ri-add-line text-xs"></i>
              Add Work
            </button>
          </div>

          {portfolioItems.length === 0 ? (
            <button
              onClick={() => setEditingPortfolioItem(null)}
              className="w-full h-24 border-2 border-dashed border-[#E5E7EB] dark:border-[#374151] rounded-xl flex flex-col items-center justify-center gap-1 text-sm text-[#9CA3AF] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors"
            >
              <i className="ri-image-add-line text-xl"></i>
              Add your first portfolio item
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {portfolioItems.map((item) => (
                <div key={item.id} className="group relative">
                  {/* Card */}
                  <button
                    onClick={() => setLightboxItem(item)}
                    className="w-full bg-white dark:bg-[#1F2937] rounded-xl overflow-hidden border border-[#E5E7EB]/60 dark:border-[#374151]/60 cursor-pointer hover:opacity-95 transition-opacity text-left"
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
                      <p className="text-xs font-bold text-[#111827] dark:text-white line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                  </button>
                  {/* Edit / Delete overlay */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingPortfolioItem(item); }}
                      className="w-7 h-7 flex items-center justify-center bg-white dark:bg-[#1F2937] rounded-lg cursor-pointer hover:bg-[#EEF2FF] transition-colors"
                    >
                      <i className="ri-edit-2-line text-[#194DDC] text-xs"></i>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeletePortfolioItem(item.id); }}
                      className="w-7 h-7 flex items-center justify-center bg-white dark:bg-[#1F2937] rounded-lg cursor-pointer hover:bg-[#FEE2E2] transition-colors"
                    >
                      <i className="ri-delete-bin-line text-[#EF4444] text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Jobs on Platform */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827] dark:text-white">Past Jobs on Platform</h2>
            <span className="text-xs text-[#9CA3AF]">{completedJobs.length} completed</span>
          </div>
          <div className="flex flex-col gap-2">
            {completedJobs.map((job) => (
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
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-[#9CA3AF]">{job.date}</span>
                    <span className="text-[10px] text-[#9CA3AF]">·</span>
                    <span className="text-[10px] text-[#9CA3AF]">by {job.recruiterName}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-sm font-black text-[#111827] dark:text-white">{formatPrice(job.price)}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      job.statusColor === "green"
                        ? "bg-[#DCFCE7] text-[#16A34A]"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Feedback on Recruiters */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827] dark:text-white">Feedback to Give</h2>
            {pendingFeedbackJobs.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded-full">
                {pendingFeedbackJobs.length} pending
              </span>
            )}
          </div>

          {pendingFeedbackJobs.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {pendingFeedbackJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-3 bg-white dark:bg-[#1F2937] rounded-xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-3"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden">
                    <img src={job.thumbnail} alt={job.title} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#111827] dark:text-white truncate">{job.title}</p>
                    <p className="text-[10px] text-[#9CA3AF]">by {job.recruiterName}</p>
                  </div>
                  <button
                    onClick={() => handleOpenReviewForJob(job)}
                    className="flex items-center gap-1 h-7 px-3 bg-[#194DDC] text-white text-[10px] font-bold rounded-lg cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
                  >
                    <i className="ri-star-line text-[10px]"></i>
                    Rate
                  </button>
                </div>
              ))}
            </div>
          )}

          {givenReviews.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[#9CA3AF] font-medium mb-1">Reviews you&apos;ve submitted</p>
              {givenReviews.map((review) => (
                <ReviewCard key={review.id} review={review} canReply={false} />
              ))}
            </div>
          )}

          {pendingFeedbackJobs.length === 0 && givenReviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-white dark:bg-[#1F2937] rounded-xl border border-[#E5E7EB]/60 dark:border-[#374151]/60">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full mb-2">
                <i className="ri-star-line text-lg text-[#9CA3AF]"></i>
              </div>
              <p className="text-xs text-[#9CA3AF]">Complete a job to leave feedback for your recruiter</p>
            </div>
          )}
        </div>

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

      {/* Modals */}
      {showEditProfile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}

      {showSkillsEditor && (
        <SkillsEditorModal
          skills={skills}
          onClose={() => setShowSkillsEditor(false)}
          onSave={handleSaveSkills}
        />
      )}

      {editingPortfolioItem !== undefined && (
        <PortfolioItemModal
          item={editingPortfolioItem}
          onClose={() => setEditingPortfolioItem(undefined)}
          onSave={handleSavePortfolioItem}
        />
      )}

      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}

      {showPrivacySecurity && (
        <PrivacySecurityModal onClose={() => setShowPrivacySecurity(false)} />
      )}

      {showPaymentMethods && (
        <PaymentMethodsModal
          methods={paymentMethods}
          onClose={() => setShowPaymentMethods(false)}
          onSave={(methods) => setPaymentMethods(methods)}
        />
      )}

      {showHelpSupport && (
        <HelpSupportModal onClose={() => setShowHelpSupport(false)} />
      )}

      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          userName={profile.name}
          userAvatar={mockProfile.avatar}
        />
      )}

      {showLeaveReviewModal && pendingReviewJob && (
        <LeaveReviewModal
          subjectName={pendingReviewJob.recruiterName}
          subjectAvatar={pendingReviewJob.recruiterAvatar}
          jobTitle={pendingReviewJob.jobTitle}
          reviewerRole="worker"
          reviewerName={profile.name}
          reviewerAvatar={mockProfile.avatar}
          onClose={() => { setShowLeaveReviewModal(false); setPendingReviewJob(null); }}
          onSubmit={handleSubmitGivenReview}
        />
      )}

      {/* Portfolio Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={() => setLightboxItem(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 rounded-full cursor-pointer">
            <i className="ri-close-line text-white text-xl"></i>
          </button>
          <div className="max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full rounded-2xl object-cover object-top max-h-[60vh]"
            />
            <div className="mt-4 px-1">
              <h3 className="text-white font-black text-base">{lightboxItem.title}</h3>
              <p className="text-white/70 text-sm mt-1.5 leading-relaxed">{lightboxItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}