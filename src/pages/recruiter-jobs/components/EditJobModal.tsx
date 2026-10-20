import { useState } from "react";

const categories = [
  "Handyman", "Cleaning", "Delivery", "Tech", "Design",
  "Pet Care", "Tutoring", "Photography", "Moving", "Other",
];

interface JobData {
  id: string;
  title: string;
  category: string;
  budget: number;
  location: string;
}

interface EditJobModalProps {
  job: JobData;
  onClose: () => void;
  onSave: (updated: JobData) => void;
}

export default function EditJobModal({ job, onClose, onSave }: EditJobModalProps) {
  const [form, setForm] = useState({
    title: job.title,
    category: job.category,
    budget: String(job.budget),
    location: job.location,
    description: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const isValid = form.title.length > 3 && form.category && form.budget;

  const handleSave = () => {
    if (!isValid) return;
    onSave({ ...job, title: form.title, category: form.category, budget: Number(form.budget), location: form.location });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E5E7EB] dark:border-[#374151]">
          <div>
            <h2 className="text-base font-black text-[#111827] dark:text-white">Edit Job</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Update your job details</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] dark:bg-[#374151] cursor-pointer"
          >
            <i className="ri-close-line text-[#374151] dark:text-[#D1D5DB] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full h-11 px-4 text-sm bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
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
                      : "bg-[#F3F4F6] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:border-[#194DDC]"
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
              placeholder="Add any updated details..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 text-sm bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none resize-none text-[#374151] dark:text-[#D1D5DB] placeholder-[#9CA3AF] transition-colors"
            />
            <p className="text-right text-[10px] text-[#9CA3AF] mt-0.5">{form.description.length}/500</p>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Budget *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-[#9CA3AF]">$</span>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="w-full h-12 pl-9 pr-4 text-xl font-black bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] mb-1.5">Location</label>
            <div className="relative">
              <i className="ri-map-pin-line absolute left-4 top-1/2 -translate-y-1/2 text-[#194DDC] text-base"></i>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-sm bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none text-[#374151] dark:text-[#D1D5DB] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-[#E5E7EB] dark:border-[#374151] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-2xl text-sm font-semibold cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`flex-1 h-12 rounded-2xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all ${
              isValid
                ? "bg-[#194DDC] dark:bg-[#1e3a8a] text-white hover:bg-[#1542c0] active:scale-[0.98]"
                : "bg-[#E5E7EB] dark:bg-[#374151] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
