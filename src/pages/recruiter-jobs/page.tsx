import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveReviewModal from "@/pages/worker-profile/components/LeaveReviewModal";
import EditJobModal from "@/pages/recruiter-jobs/components/EditJobModal";
import { WorkerReview } from "@/mocks/jobs";

type Tab = "open" | "ongoing" | "completed";

interface ReviewTarget {
  workerName: string;
  workerAvatar: string;
  jobTitle: string;
  jobId: string;
}

interface Job {
  id: string;
  title: string;
  category: string;
  budget: number;
  bids: number;
  location: string;
  postedAt: string;
  workerName?: string;
  workerRating?: number;
  workerId?: string;
  progress?: number;
  thumbnail: string;
}

const workerAvatarMap: Record<string, string> = {
  "Aisha P.": "https://readdy.ai/api/search-image?query=young%20professional%20woman%20headshot%20clean%20background%20confident%20warm%20smile&width=80&height=80&seq=bidder2&orientation=squarish",
  "Nina W.": "https://readdy.ai/api/search-image?query=professional%20woman%20headshot%20clean%20background%20warm%20confident%20smile%20light&width=80&height=80&seq=bidder_new&orientation=squarish",
  "James R.": "https://readdy.ai/api/search-image?query=confident%20male%20professional%20headshot%20clean%20background%20friendly%20smile&width=80&height=80&seq=bidder1&orientation=squarish",
};

const workerIdMap: Record<string, string> = {
  "Aisha P.": "bid2",
  "Nina W.": "bid_new",
  "James R.": "bid1",
};

const initialJobs: Record<Tab, Job[]> = {
  open: [
    {
      id: "rj1",
      title: "Furniture Assembly \u2013 IKEA Wardrobe",
      category: "Handyman",
      budget: 85,
      bids: 3,
      location: "Brooklyn, NY",
      postedAt: "2h ago",
      thumbnail: "https://readdy.ai/api/search-image?query=modern%20wardrobe%20furniture%20assembly%20living%20room%20clean%20bright&width=120&height=120&seq=rjob1&orientation=squarish",
    },
    {
      id: "rj2",
      title: "Office Deep Clean \u2013 3 Floors",
      category: "Cleaning",
      budget: 220,
      bids: 7,
      location: "Manhattan, NY",
      postedAt: "5h ago",
      thumbnail: "https://readdy.ai/api/search-image?query=clean%20modern%20office%20building%20interior%20bright%20natural%20light%20professional&width=120&height=120&seq=rjob2&orientation=squarish",
    },
  ],
  ongoing: [
    {
      id: "rj3",
      title: "React Frontend Bug Fix",
      category: "Tech",
      budget: 150,
      bids: 0,
      location: "Remote",
      postedAt: "1d ago",
      workerName: "James R.",
      workerRating: 4.9,
      workerId: "bid1",
      progress: 60,
      thumbnail: "https://readdy.ai/api/search-image?query=laptop%20computer%20code%20screen%20developer%20desk%20clean%20workspace%20modern&width=120&height=120&seq=rjob3&orientation=squarish",
    },
  ],
  completed: [
    {
      id: "rj4",
      title: "Logo Design for Caf\u00e9",
      category: "Design",
      budget: 120,
      bids: 0,
      location: "Online",
      postedAt: "Apr 15",
      workerName: "Aisha P.",
      workerRating: 4.8,
      workerId: "bid2",
      progress: 100,
      thumbnail: "https://readdy.ai/api/search-image?query=coffee%20shop%20branding%20logo%20design%20minimalist%20clean%20typography&width=120&height=120&seq=rjob4&orientation=squarish",
    },
    {
      id: "rj5",
      title: "Event Photography",
      category: "Photography",
      budget: 300,
      bids: 0,
      location: "Queens, NY",
      postedAt: "Apr 10",
      workerName: "Nina W.",
      workerRating: 4.7,
      workerId: "bid_new",
      progress: 100,
      thumbnail: "https://readdy.ai/api/search-image?query=event%20photography%20camera%20birthday%20party%20colorful%20professional&width=120&height=120&seq=rjob5&orientation=squarish",
    },
  ],
};

const tabs: { id: Tab; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
];

interface ConfirmCompleteState {
  jobId: string;
  jobTitle: string;
  workerName: string;
}

export default function RecruiterJobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("open");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobs);
  const [reviewTarget, setReviewTarget] = useState<ReviewTarget | null>(null);
  const [reviewedJobs, setReviewedJobs] = useState<Set<string>>(new Set());
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [confirmComplete, setConfirmComplete] = useState<ConfirmCompleteState | null>(null);
  const [completedAnim, setCompletedAnim] = useState<string | null>(null);

  const handleLeaveReview = (job: Job) => {
    const workerName = job.workerName || "";
    const workerAvatar =
      workerAvatarMap[workerName] ||
      "https://readdy.ai/api/search-image?query=professional%20worker%20headshot%20clean%20background%20confident%20smile%20modern&width=80&height=80&seq=worker_default&orientation=squarish";
    setReviewTarget({ workerName, workerAvatar, jobTitle: job.title, jobId: job.id });
  };

  const handleReviewSubmit = (_review: WorkerReview) => {
    if (reviewTarget) setReviewedJobs((prev) => new Set(prev).add(reviewTarget.jobId));
    setReviewTarget(null);
  };

  const handleEditSave = (updated: Job) => {
    setJobs((prev) => ({
      ...prev,
      open: prev.open.map((j) => (j.id === updated.id ? { ...j, ...updated } : j)),
    }));
    setEditingJob(null);
  };

  const handleMarkComplete = (jobId: string) => {
    const job = jobs.ongoing.find((j) => j.id === jobId);
    if (!job) return;
    setConfirmComplete({ jobId, jobTitle: job.title, workerName: job.workerName || "Worker" });
  };

  const confirmMarkComplete = () => {
    if (!confirmComplete) return;
    const { jobId } = confirmComplete;
    const job = jobs.ongoing.find((j) => j.id === jobId);
    if (!job) return;
    const completedJob: Job = { ...job, progress: 100, postedAt: "Today" };
    setJobs((prev) => ({
      ...prev,
      ongoing: prev.ongoing.filter((j) => j.id !== jobId),
      completed: [completedJob, ...prev.completed],
    }));
    setCompletedAnim(jobId);
    setConfirmComplete(null);
    setActiveTab("completed");
    setTimeout(() => setCompletedAnim(null), 2000);
  };

  const tabJobs = jobs[activeTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="pt-5 pb-3 flex items-center justify-between">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">My Posted Jobs</h1>
          <button
            onClick={() => navigate("/post-job")}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#194DDC] dark:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line text-sm"></i>
            New Job
          </button>
        </div>

        {/* Tabs */}
        <div className="sticky top-14 z-10 bg-[#F8FAFC] dark:bg-[#0F172A] pb-3">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] p-1 rounded-2xl">
            {tabs.map((tab) => {
              const count = jobs[tab.id].length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                      : "text-[#6B7280] dark:text-[#9CA3AF]"
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-[#194DDC] dark:bg-[#6B9EFF] text-white" : "bg-[#E5E7EB] dark:bg-[#374151] text-[#9CA3AF]"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs list */}
        <div className="space-y-3 pb-6">
          {tabJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 overflow-hidden transition-all duration-500 ${completedAnim === job.id ? "ring-2 ring-[#16A34A]" : ""}`}
            >
              <div className="p-4 flex items-start gap-3">
                <img
                  src={job.thumbnail}
                  alt={job.title}
                  className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white truncate">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-[#9CA3AF]">{job.category}</span>
                    <span className="text-xs font-bold text-[#194DDC] dark:text-[#6B9EFF]">${job.budget}</span>
                    <span className="text-xs text-[#9CA3AF]">·</span>
                    <span className="text-xs text-[#9CA3AF]">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] text-[#9CA3AF]">{job.postedAt}</span>
                    {activeTab === "open" && (
                      <span className="text-[10px] font-bold text-[#F59E0B]">{job.bids} bids</span>
                    )}
                    {(activeTab === "ongoing" || activeTab === "completed") && job.workerName && (
                      <span className="text-[10px] text-[#374151] dark:text-[#D1D5DB] font-medium">
                        by {job.workerName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Worker avatar for ongoing/completed — tappable */}
                {(activeTab === "ongoing" || activeTab === "completed") && job.workerName && job.workerId && (
                  <button
                    onClick={() => navigate(`/worker/${job.workerId}`)}
                    className="flex-shrink-0 cursor-pointer group relative"
                    title={`View ${job.workerName}'s profile`}
                  >
                    <img
                      src={workerAvatarMap[job.workerName] || "https://readdy.ai/api/search-image?query=professional%20worker%20headshot%20clean%20background&width=80&height=80&seq=worker_default&orientation=squarish"}
                      alt={job.workerName}
                      className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#E5E7EB] dark:border-[#374151] group-hover:border-[#194DDC] transition-colors"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-[#194DDC] rounded-full">
                      <i className="ri-eye-line text-white text-[8px]"></i>
                    </div>
                  </button>
                )}
              </div>

              {/* Progress bar for ongoing */}
              {activeTab === "ongoing" && job.progress !== undefined && (
                <div className="px-4 pb-3">
                  <div className="flex justify-between text-[10px] text-[#9CA3AF] mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-[#194DDC]">{job.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E5E7EB] dark:bg-[#374151] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#194DDC] to-[#60A5FA] rounded-full"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-4 pb-3 flex gap-2">
                {activeTab === "open" && (
                  <>
                    <button
                      onClick={() => navigate("/live-bids")}
                      className="flex-1 h-9 bg-[#194DDC] dark:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap"
                    >
                      View {job.bids} Bids
                    </button>
                    <button
                      onClick={() => setEditingJob(job)}
                      className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:border-[#194DDC] hover:text-[#194DDC] transition-colors flex items-center justify-center gap-1"
                    >
                      <i className="ri-edit-line text-xs"></i>
                      Edit
                    </button>
                  </>
                )}

                {activeTab === "ongoing" && (
                  <div className="flex-1 flex gap-2">
                    <button
                      onClick={() => navigate(`/worker/${job.workerId}`)}
                      className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:border-[#194DDC] hover:text-[#194DDC] transition-colors flex items-center justify-center gap-1"
                    >
                      <i className="ri-user-line text-xs"></i>
                      View Profile
                    </button>
                    <button
                      onClick={() => handleMarkComplete(job.id)}
                      className="flex-1 h-9 bg-[#16A34A] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap hover:bg-[#15803d] transition-colors flex items-center justify-center gap-1"
                    >
                      <i className="ri-checkbox-circle-line text-xs"></i>
                      Mark Complete
                    </button>
                  </div>
                )}

                {activeTab === "completed" && (
                  <div className="flex-1 flex gap-2">
                    <button
                      onClick={() => navigate(`/worker/${job.workerId}`)}
                      className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:border-[#194DDC] hover:text-[#194DDC] transition-colors flex items-center justify-center gap-1"
                    >
                      <i className="ri-briefcase-line text-xs"></i>
                      View Portfolio
                    </button>
                    {reviewedJobs.has(job.id) ? (
                      <div className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#F0FDF4] dark:bg-[#14532d]/30 text-[#16A34A] rounded-xl text-xs font-semibold">
                        <i className="ri-checkbox-circle-fill text-sm"></i>
                        Review Submitted
                      </div>
                    ) : (
                      <button
                        onClick={() => handleLeaveReview(job)}
                        className="flex-1 h-9 border border-[#16A34A] text-[#16A34A] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:bg-[#F0FDF4] transition-colors"
                      >
                        Leave Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {tabJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full mb-3">
                <i className="ri-folder-line text-2xl text-[#9CA3AF]"></i>
              </div>
              <p className="font-semibold text-[#374151] dark:text-[#D1D5DB] text-sm">No {activeTab} jobs</p>
              <button onClick={() => navigate("/post-job")} className="mt-3 px-4 py-2 bg-[#194DDC] dark:bg-[#1e3a8a] text-white rounded-full text-xs font-bold cursor-pointer whitespace-nowrap">
                Post a Job
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Confirm Complete Modal ── */}
      {confirmComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmComplete(null)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1F2937] rounded-3xl p-6 animate-in zoom-in-90 duration-200">
            <div className="w-14 h-14 flex items-center justify-center bg-[#DCFCE7] dark:bg-[#14532d]/40 rounded-2xl mx-auto mb-4">
              <i className="ri-checkbox-circle-line text-2xl text-[#16A34A]"></i>
            </div>
            <h2 className="text-base font-black text-[#111827] dark:text-white text-center mb-1">Mark as Complete?</h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] text-center mb-1">
              <span className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{confirmComplete.jobTitle}</span>
            </p>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] text-center mb-5">
              This will release the escrowed payment to <span className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{confirmComplete.workerName}</span> and move the job to Completed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmComplete(null)}
                className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-2xl text-sm font-semibold cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmMarkComplete}
                className="flex-1 h-11 bg-[#16A34A] hover:bg-[#15803d] text-white rounded-2xl text-sm font-bold cursor-pointer whitespace-nowrap transition-colors"
              >
                Confirm &amp; Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Review Modal */}
      {reviewTarget && (
        <LeaveReviewModal
          subjectName={reviewTarget.workerName}
          subjectAvatar={reviewTarget.workerAvatar}
          jobTitle={reviewTarget.jobTitle}
          reviewerRole="recruiter"
          reviewerName="You"
          reviewerAvatar="https://readdy.ai/api/search-image?query=professional%20recruiter%20headshot%20clean%20background%20confident%20smile%20modern&width=80&height=80&seq=self_recruiter&orientation=squarish"
          onClose={() => setReviewTarget(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
