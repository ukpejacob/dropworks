import { useState } from "react";
import { WorkerReview } from "@/mocks/jobs";

interface ReviewCardProps {
  review: WorkerReview;
  canReply?: boolean;
  onReply?: (reviewId: string, reply: string) => void;
}

export default function ReviewCard({ review, canReply, onReply }: ReviewCardProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onReply?.(review.id, replyText.trim());
      setReplyText("");
      setShowReplyBox(false);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
      {/* Reviewer info + rating */}
      <div className="flex items-start gap-3">
        <img
          src={review.recruiterAvatar}
          alt={review.recruiterName}
          className="w-10 h-10 rounded-full object-cover object-top flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <p className="text-sm font-bold text-[#111827] dark:text-white">{review.recruiterName}</p>
            <span className="text-[10px] text-[#9CA3AF]">{review.date}</span>
          </div>
          {/* Stars */}
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`text-xs ${i < review.rating ? "ri-star-fill text-[#F59E0B]" : "ri-star-line text-[#D1D5DB] dark:text-[#4B5563]"}`}
              ></i>
            ))}
          </div>
          {/* Job badge */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-briefcase-line text-[#9CA3AF] text-[10px]"></i>
            </div>
            <span className="text-[10px] text-[#9CA3AF] truncate">{review.jobTitle}</span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed mt-3">{review.comment}</p>

      {/* Worker reply */}
      {review.workerReply && (
        <div className="mt-3 ml-3 pl-3 border-l-2 border-[#194DDC]/20 dark:border-[#6B9EFF]/20">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-reply-line text-[#194DDC] dark:text-[#6B9EFF] text-xs"></i>
            </div>
            <span className="text-[10px] font-bold text-[#194DDC] dark:text-[#6B9EFF]">Worker&apos;s Response</span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">{review.workerReply}</p>
        </div>
      )}

      {/* Reply controls */}
      {canReply && !review.workerReply && (
        <div className="mt-3">
          {!showReplyBox ? (
            <button
              onClick={() => setShowReplyBox(true)}
              className="flex items-center gap-1.5 text-xs text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            >
              <i className="ri-reply-line text-xs"></i>
              Reply to this review
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your response..."
                rows={3}
                maxLength={300}
                className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-xs text-[#111827] dark:text-[#F1F5F9] placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowReplyBox(false); setReplyText(""); }}
                  className="h-8 px-3 border border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF] font-medium rounded-lg text-xs cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || submitting}
                  className="h-8 px-4 bg-[#194DDC] text-white font-bold rounded-lg text-xs cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {submitting ? (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Post Reply"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
