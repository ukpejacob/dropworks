interface RecruiterReview {
  id: string;
  workerName: string;
  workerAvatar: string;
  rating: number;
  comment: string;
  jobTitle: string;
  date: string;
}

interface RecruiterReviewCardProps {
  review: RecruiterReview;
}

export default function RecruiterReviewCard({ review }: RecruiterReviewCardProps) {
  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 p-4">
      <div className="flex items-start gap-3">
        <img
          src={review.workerAvatar}
          alt={review.workerName}
          className="w-10 h-10 rounded-full object-cover object-top flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#111827] dark:text-white">{review.workerName}</p>
            <span className="text-[10px] text-[#9CA3AF]">{review.date}</span>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-0.5">{review.jobTitle}</p>
          <div className="flex items-center gap-0.5 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`${
                  i < Math.floor(review.rating) ? "ri-star-fill" : "ri-star-line"
                } text-[#F59E0B] text-xs`}
              ></i>
            ))}
            <span className="text-xs font-bold text-[#374151] dark:text-[#D1D5DB] ml-1">{review.rating}</span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2 leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}