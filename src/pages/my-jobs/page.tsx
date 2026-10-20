import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockMyJobs } from "@/mocks/jobs";
import StatusBadge from "@/components/base/StatusBadge";
import JobDetailsModal from "./components/JobDetailsModal";
import LeaveReviewModal from "@/pages/worker-profile/components/LeaveReviewModal";
import { WorkerReview } from "@/mocks/jobs";

type Tab = "active" | "bids" | "completed";

const tabs: { id: Tab; label: string; count: number }[] = [
  { id: "active", label: "Active", count: mockMyJobs.active.length },
  { id: "bids", label: "Bids", count: mockMyJobs.bids.length },
  { id: "completed", label: "Completed", count: mockMyJobs.completed.length },
];

const statusSteps = ["Pending", "Accepted", "In Progress", "Completed", "Paid"];

function TimelineProgress({ status }: { status: string }) {
  const currentIdx = statusSteps.indexOf(status);
  return (
    <div className="flex items-center gap-0 mt-3">
      {statusSteps.map((step, idx) => (
        <div key={step} className="flex items-center flex-1">
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              idx <= currentIdx
                ? "bg-[#194DDC] dark:bg-[#6B9EFF]"
                : "bg-[#E5E7EB] dark:bg-[#374151]"
            }`}
          >
            {idx < currentIdx && (
              <i className="ri-check-line text-white text-[8px]"></i>
            )}
            {idx === currentIdx && (
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
          </div>
          {idx < statusSteps.length - 1 && (
            <div
              className={`h-0.5 flex-1 transition-all duration-300 ${
                idx < currentIdx ? "bg-[#194DDC] dark:bg-[#6B9EFF]" : "bg-[#E5E7EB] dark:bg-[#374151]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MyJobsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailsJob, setDetailsJob] = useState<typeof mockMyJobs.active[0] | null>(null);
  const [reviewJob, setReviewJob] = useState<typeof mockMyJobs.completed[0] | null>(null);
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, boolean>>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const jobs = mockMyJobs[activeTab];

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const handleReviewSubmit = (review: WorkerReview) => {
    if (reviewJob) {
      setSubmittedReviews((prev) => ({ ...prev, [reviewJob.id]: true }));
      setReviewJob(null);
      showToast("Review submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="pt-5 pb-3">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">My Jobs</h1>
        </div>

        {/* Tabs */}
        <div className="sticky top-[132px] z-10 bg-[#F8FAFC] dark:bg-[#0F172A] pb-3">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] p-1 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                    : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#374151]"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-[#194DDC] dark:bg-[#6B9EFF] text-white"
                      : "bg-[#E5E7EB] dark:bg-[#374151] text-[#9CA3AF]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Job list */}
        <div className="space-y-3 pb-6">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full mb-3">
                <i className="ri-briefcase-line text-2xl text-[#9CA3AF]"></i>
              </div>
              <p className="font-semibold text-[#374151] dark:text-[#D1D5DB] text-sm">No {activeTab} jobs yet</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Jobs will appear here once created</p>
            </div>
          ) : (
            jobs.map((job) => {
              const isExpanded = expandedId === job.id;
              const reviewDone = submittedReviews[job.id];
              return (
                <div
                  key={job.id}
                  className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : job.id)}
                    className="w-full p-4 flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={job.thumbnail}
                      alt={job.title}
                      className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="text-sm font-bold text-[#111827] dark:text-white truncate">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <StatusBadge status={job.status} color={job.statusColor} />
                        <span className="text-xs text-[#9CA3AF]">{job.category}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-[#194DDC] dark:text-[#6B9EFF]">
                          {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(job.price)}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">{job.date}</span>
                      </div>
                    </div>
                    <i className={`${isExpanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} text-[#9CA3AF] text-lg flex-shrink-0`}></i>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[#F3F4F6] dark:border-[#374151] pt-3">
                      {/* Recruiter row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          Recruiter: <span className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{job.recruiterName}</span>
                        </div>
                        <button
                          onClick={() => navigate("/recruiter/rec1")}
                          className="flex items-center gap-1 text-[10px] text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
                        >
                          <i className="ri-user-line text-[10px]"></i>
                          View Profile
                        </button>
                      </div>

                      <div className="text-xs text-[#9CA3AF] mb-2">Job progress</div>
                      <TimelineProgress status={job.status} />
                      <div className="flex justify-between mt-1">
                        {statusSteps.map((step) => (
                          <span key={step} className="text-[8px] text-[#9CA3AF] flex-1 text-center leading-tight">{step}</span>
                        ))}
                      </div>

                      {activeTab === "active" && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => setDetailsJob(job as typeof mockMyJobs.active[0])}
                            className="flex-1 h-9 bg-[#194DDC] dark:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
                          >
                            View Details
                          </button>
                          <button className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors">
                            Message
                          </button>
                        </div>
                      )}

                      {activeTab === "bids" && (
                        <div className="mt-3 flex items-center gap-2">
                          <i className="ri-information-line text-[#F59E0B] text-sm"></i>
                          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                            Your bid: <strong className="text-[#F59E0B]">
                              {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format((job as typeof mockMyJobs.bids[0]).price)}
                            </strong> · Original: {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format((job as typeof mockMyJobs.bids[0]).originalPrice)}
                          </span>
                        </div>
                      )}

                      {activeTab === "completed" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setDetailsJob(job as typeof mockMyJobs.active[0])}
                            className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
                          >
                            View Details
                          </button>
                          {reviewDone ? (
                            <div className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#DCFCE7] dark:bg-[#14532d]/30 rounded-xl text-xs font-semibold text-[#16A34A]">
                              <i className="ri-check-line text-sm"></i>
                              Review Sent
                            </div>
                          ) : (
                            <button
                              onClick={() => setReviewJob(job as typeof mockMyJobs.completed[0])}
                              className="flex-1 h-9 bg-[#194DDC] dark:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
                            >
                              Leave Feedback
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {detailsJob && (
        <JobDetailsModal
          job={detailsJob}
          onClose={() => setDetailsJob(null)}
        />
      )}

      {/* Leave Review Modal */}
      {reviewJob && (
        <LeaveReviewModal
          subjectName={reviewJob.recruiterName}
          subjectAvatar="https://readdy.ai/api/search-image?query=professional%20african%20american%20businessman%20headshot%20clean%20bright%20background%20confident%20friendly%20smile%20modern%20corporate&width=80&height=80&seq=recruiter_main&orientation=squarish"
          jobTitle={reviewJob.title}
          reviewerRole="worker"
          reviewerName="Alex Rivera"
          reviewerAvatar="https://readdy.ai/api/search-image?query=confident%20young%20professional%20man%20smiling%20headshot%20clean%20bright%20background%20modern&width=80&height=80&seq=profilemain&orientation=squarish"
          onClose={() => setReviewJob(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Success Toast */}
      {successToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[400] bg-[#111827] dark:bg-[#1F2937] text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
          <i className="ri-check-line text-[#16A34A]"></i>
          {successToast}
        </div>
      )}
    </div>
  );
}
