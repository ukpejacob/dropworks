import { useState } from "react";

interface BidModalProps {
  jobId: string;
  jobTitle: string;
  originalPrice: number;
  onSubmit: (amount: number) => void;
  onClose: () => void;
}

export default function BidModal({ jobTitle, originalPrice, onSubmit, onClose }: BidModalProps) {
  const [amount, setAmount] = useState(Math.round(originalPrice * 0.9));
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (amount > 0) {
      onSubmit(amount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1F2937] rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#E5E7EB] dark:bg-[#374151] rounded-full" />

        <h3 className="text-lg font-bold text-[#111827] dark:text-white mt-2 mb-1">Place Your Bid</h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-5 line-clamp-1">{jobTitle}</p>

        {/* Original price ref */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#9CA3AF]">Posted price</span>
          <span className="text-xs font-semibold text-[#374151] dark:text-[#D1D5DB]">${originalPrice}</span>
        </div>

        {/* Bid amount input */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-[#9CA3AF]">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-16 pl-10 pr-4 text-3xl font-black text-[#111827] dark:text-white bg-[#F8FAFC] dark:bg-[#111827] border-2 border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-sm transition-colors"
          />
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2 mb-4">
          {[0.7, 0.8, 0.9, 1.0].map((mult) => {
            const val = Math.round(originalPrice * mult);
            return (
              <button
                key={mult}
                onClick={() => setAmount(val)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  amount === val
                    ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                    : "bg-[#F3F4F6] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:bg-[#E5E7EB]"
                }`}
              >
                ${val}
              </button>
            );
          })}
        </div>

        {/* Note */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note to the recruiter (optional)..."
          rows={2}
          maxLength={200}
          className="w-full px-4 py-3 text-sm bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl outline-none focus:border-[#194DDC] resize-none text-[#374151] dark:text-[#D1D5DB] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] transition-colors mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#194DDC] dark:bg-[#1e3a8a] hover:bg-[#1542c0] active:scale-95 text-white font-bold rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap"
        >
          Submit Bid for ${amount}
        </button>
      </div>
    </div>
  );
}
