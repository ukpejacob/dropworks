import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  category: string;
  price: number;
  status: string;
  statusColor: string;
  date: string;
  recruiterName: string;
  thumbnail: string;
}

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
}

const statusSteps = ["Pending", "Accepted", "In Progress", "Completed", "Paid"];

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  const navigate = useNavigate();
  const currentIdx = statusSteps.indexOf(job.status);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

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
          <h2 className="text-base font-black text-[#111827] dark:text-white">Job Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
          {/* Job thumbnail + title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={job.thumbnail}
                alt={job.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-[#111827] dark:text-white leading-tight">{job.title}</h3>
              <span className="text-xs text-[#9CA3AF] mt-0.5 block">{job.category}</span>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    job.statusColor === "green"
                      ? "bg-[#DCFCE7] text-[#16A34A]"
                      : job.statusColor === "blue"
                      ? "bg-[#DBEAFE] text-[#1D4ED8]"
                      : job.statusColor === "yellow"
                      ? "bg-[#FEF3C7] text-[#D97706]"
                      : "bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF]"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          </div>

          {/* Pay */}
          <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF]">Job Payment</p>
              <p className="text-2xl font-black text-[#111827] dark:text-white mt-0.5">{formatPrice(job.price)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
              <i className="ri-money-cny-circle-line text-[#194DDC] dark:text-[#6B9EFF] text-xl"></i>
            </div>
          </div>

          {/* Recruiter */}
          <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-2">Posted by</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#E5E7EB] dark:bg-[#374151] rounded-full">
                  <i className="ri-user-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">{job.recruiterName}</p>
                  <p className="text-[10px] text-[#9CA3AF]">Recruiter</p>
                </div>
              </div>
              <button
                onClick={() => { navigate("/recruiter/rec1"); onClose(); }}
                className="flex items-center gap-1.5 text-xs text-[#194DDC] dark:text-[#6B9EFF] font-semibold cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                View Profile
                <i className="ri-arrow-right-s-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl flex-shrink-0">
              <i className="ri-calendar-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Scheduled</p>
              <p className="text-sm font-semibold text-[#111827] dark:text-white">{job.date}</p>
            </div>
          </div>

          {/* Progress timeline */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-3">Job Progress</p>
            <div className="flex items-center gap-0">
              {statusSteps.map((step, idx) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      idx <= currentIdx
                        ? "bg-[#194DDC] dark:bg-[#6B9EFF]"
                        : "bg-[#E5E7EB] dark:bg-[#374151]"
                    }`}
                  >
                    {idx < currentIdx && (
                      <i className="ri-check-line text-white text-[9px]"></i>
                    )}
                    {idx === currentIdx && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 transition-all duration-300 ${
                        idx < currentIdx
                          ? "bg-[#194DDC] dark:bg-[#6B9EFF]"
                          : "bg-[#E5E7EB] dark:bg-[#374151]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {statusSteps.map((step) => (
                <span key={step} className="text-[8px] text-[#9CA3AF] flex-1 text-center leading-tight">{step}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
          >
            Close
          </button>
          <button className="flex-1 h-11 bg-[#194DDC] hover:bg-[#1542c0] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap transition-colors flex items-center justify-center gap-2">
            <i className="ri-message-2-line text-base"></i>
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
