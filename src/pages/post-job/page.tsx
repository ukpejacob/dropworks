import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Handyman", "Cleaning", "Delivery", "Tech", "Design",
  "Pet Care", "Tutoring", "Photography", "Moving", "Other",
];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    location: "New York, NY",
    startDate: "",
    duration: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.budget) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate("/live-bids");
    }, 2000);
  };

  const isValid = form.title.length > 3 && form.category && form.budget;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-8 text-center">
        <div className="w-20 h-20 flex items-center justify-center bg-[#16A34A] rounded-full mb-4 animate-in zoom-in duration-300">
          <i className="ri-checkbox-circle-line text-white text-4xl"></i>
        </div>
        <h2 className="text-xl font-black text-[#111827] dark:text-white mb-2">Job Posted!</h2>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Your job is live. Funds held in escrow. Redirecting to bids...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-36">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="pt-5 pb-3">
          <h1 className="text-xl font-black text-[#111827] dark:text-white">Post a Job</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">Fill in the details to attract workers</p>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Furniture Assembly – IKEA Wardrobe"
              className="w-full h-12 px-4 text-sm bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] placeholder-[#9CA3AF] transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Category *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => update("category", cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    form.category === cat
                      ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white"
                      : "bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the job in detail, requirements, what to bring..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 text-sm bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none resize-none text-[#374151] dark:text-[#D1D5DB] placeholder-[#9CA3AF] transition-colors"
            />
            <p className="text-right text-[10px] text-[#9CA3AF] mt-1">{form.description.length}/500</p>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Budget *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-[#9CA3AF]">$</span>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="0"
                className="w-full h-14 pl-9 pr-4 text-2xl font-black bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[25, 50, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => update("budget", String(amt))}
                  className="flex-1 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC] cursor-pointer whitespace-nowrap transition-colors"
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Location</label>
            <div className="relative">
              <i className="ri-map-pin-line absolute left-4 top-1/2 -translate-y-1/2 text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full h-12 pl-10 pr-4 text-sm bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="w-full h-12 px-4 text-sm bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Duration</label>
              <select
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="w-full h-12 px-4 text-sm bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors cursor-pointer"
              >
                <option value="">Select</option>
                <option>1-2 hours</option>
                <option>Half day</option>
                <option>Full day</option>
                <option>2-3 days</option>
                <option>1 week+</option>
              </select>
            </div>
          </div>

          {/* Image upload placeholder */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Photos (optional)</label>
            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={img} alt="Upload" className="w-full h-full object-cover object-top" />
                  <button
                    onClick={() => setImages((imgs) => imgs.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-white text-xs"></i>
                  </button>
                </div>
              ))}
              <button className="w-20 h-20 border-2 border-dashed border-[#D1D5DB] dark:border-[#374151] rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#194DDC] transition-colors">
                <i className="ri-image-add-line text-xl text-[#9CA3AF]"></i>
                <span className="text-[10px] text-[#9CA3AF]">Add</span>
              </button>
            </div>
          </div>

          {/* Escrow notice */}
          <div className="bg-[#EEF2FF] dark:bg-[#1e3a7a]/20 border border-[#C7D2FE] dark:border-[#1e3a7a]/40 rounded-2xl px-4 py-3 flex items-start gap-3">
            <i className="ri-lock-2-line text-[#194DDC] text-xl flex-shrink-0 mt-0.5"></i>
            <div>
              <p className="text-xs font-bold text-[#1E40AF] dark:text-[#93C5FD]">Funds held in escrow</p>
              <p className="text-xs text-[#3B82F6] dark:text-[#60A5FA] mt-0.5">
                Payment is locked in escrow until the job is completed and confirmed. Auto-released after 48h.
              </p>
            </div>
          </div>

          {/* CTA button (inline, not fixed) */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full h-14 font-bold rounded-2xl text-sm transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
              isValid
                ? "bg-[#194DDC] dark:bg-[#1e3a8a] hover:bg-[#1542c0] active:scale-[0.99] text-white"
                : "bg-[#E5E7EB] dark:bg-[#374151] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            <i className="ri-lock-2-line text-base"></i>
            Post &amp; Fund Job
            {form.budget && <span className="text-white/80">· ${form.budget}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
