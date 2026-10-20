import { useState } from "react";
import { WorkerReview } from "@/mocks/jobs";

interface LeaveReviewModalProps {
  subjectName: string;
  subjectAvatar: string;
  jobTitle: string;
  reviewerRole: "recruiter" | "worker";
  reviewerName: string;
  reviewerAvatar: string;
  onClose: () => void;
  onSubmit: (review: WorkerReview) => void;
}

export default function LeaveReviewModal({
  subjectName,
  subjectAvatar,
  jobTitle,
  reviewerRole,
  reviewerName,
  reviewerAvatar,
  onClose,
  onSubmit,
}: LeaveReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const maxChars = 400;
  const isValid = rating > 0 && comment.trim().length >= 10;

  const ratingLabels = ["", "Poor", "Below Average", "Average", "Good", "Excellent"];

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitting(true);
    setTimeout(() => {
      const newReview: WorkerReview = {
        id: `rev-${Date.now()}`,
        recruiterName: reviewerName,
        recruiterAvatar: reviewerAvatar,
        rating,
        comment: comment.trim(),
        jobTitle,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      onSubmit(newReview);
      setSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151]">
          <h2 className="text-base font-black text-[#111827] dark:text-white">Leave a Review</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
          {/* Who you're reviewing */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-[#0F172A] rounded-xl p-3">
            <img
              src={subjectAvatar}
              alt={subjectName}
              className="w-11 h-11 rounded-full object-cover object-top"
            />
            <div>
              <p className="text-sm font-bold text-[#111827] dark:text-white">
                Reviewing {subjectName}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {reviewerRole === "recruiter" ? "Worker" : "Recruiter"} · {jobTitle}
              </p>
            </div>
          </div>

          {/* Star rating */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-3">
              Overall Rating
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="w-10 h-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                  >
                    <i
                      className={`text-2xl transition-colors ${
                        star <= (hovered || rating)
                          ? "ri-star-fill text-[#F59E0B]"
                          : "ri-star-line text-[#D1D5DB] dark:text-[#4B5563]"
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
              {(hovered || rating) > 0 && (
                <span className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">
                  {ratingLabels[hovered || rating]}
                </span>
              )}
            </div>
          </div>

          {/* Written feedback */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-1.5">
              Your Feedback
            </p>
            <textarea
              value={comment}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) setComment(e.target.value);
              }}
              placeholder={
                reviewerRole === "recruiter"
                  ? "Describe the quality of work, punctuality, communication..."
                  : "How was the working experience? Was the recruiter respectful and clear?"
              }
              rows={4}
              className="w-full px-3 py-2.5 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-[#F1F5F9] placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-[10px] text-[#9CA3AF]">Minimum 10 characters</p>
              <p className="text-[10px] text-[#9CA3AF]">{comment.length}/{maxChars}</p>
            </div>
          </div>

          {/* Quick tags */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-2">
              Quick Tags (optional)
            </p>
            <QuickTags
              reviewerRole={reviewerRole}
              onTagClick={(tag) => {
                if (comment.length + tag.length + 2 <= maxChars) {
                  setComment((prev) => prev ? `${prev}, ${tag}` : tag);
                }
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="flex-1 h-11 bg-[#194DDC] hover:bg-[#1542c0] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickTags({
  reviewerRole,
  onTagClick,
}: {
  reviewerRole: "recruiter" | "worker";
  onTagClick: (tag: string) => void;
}) {
  const recruiterTags = [
    "On time", "Clean work", "Great communication", "Very professional",
    "Exceeded expectations", "Would hire again", "Fast delivery", "Detail-oriented",
  ];
  const workerTags = [
    "Clear instructions", "Paid on time", "Respectful", "Easy to work with",
    "Well-organized", "Responsive", "Fair pay", "Great to work for",
  ];
  const tags = reviewerRole === "recruiter" ? recruiterTags : workerTags;
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelected((prev) => [...prev, tag]);
      onTagClick(tag);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
            selected.includes(tag)
              ? "bg-[#194DDC] text-white"
              : "bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#4B5563]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
