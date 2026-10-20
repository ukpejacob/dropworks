import { useState } from "react";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface PortfolioItemModalProps {
  item?: PortfolioItem | null;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
}

const PLACEHOLDER_IMAGES = [
  "https://readdy.ai/api/search-image?query=professional%20work%20completed%20project%20clean%20modern%20result%20quality%20craftsmanship&width=400&height=400&seq=portNew1&orientation=squarish",
  "https://readdy.ai/api/search-image?query=skilled%20worker%20completed%20task%20professional%20service%20quality%20result&width=400&height=400&seq=portNew2&orientation=squarish",
  "https://readdy.ai/api/search-image?query=finished%20project%20professional%20quality%20work%20result%20clean%20background&width=400&height=400&seq=portNew3&orientation=squarish",
];

export default function PortfolioItemModal({ item, onClose, onSave }: PortfolioItemModalProps) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [image] = useState(
    item?.image ?? PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]
  );
  const [saving, setSaving] = useState(false);

  const isValid = title.trim().length > 0 && description.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;
    setSaving(true);
    setTimeout(() => {
      onSave({
        id: item?.id ?? `p-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        image,
      });
      setSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151]">
          <h2 className="text-base font-black text-[#111827] dark:text-white">
            {item ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {/* Image preview */}
          <div className="w-full h-40 rounded-xl overflow-hidden bg-[#F3F4F6] dark:bg-[#111827]">
            <img src={image} alt="Portfolio preview" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-[10px] text-[#9CA3AF] -mt-2 text-center">Image will be set automatically when saved</p>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Work Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kitchen Renovation"
              className="w-full h-11 px-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work you did, scope, outcome..."
              rows={4}
              maxLength={300}
              className="w-full px-3 py-2.5 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors resize-none leading-relaxed"
            />
            <p className="text-right text-[10px] text-[#9CA3AF] mt-1">{description.length}/300</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid || saving}
            className="flex-1 h-11 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              item ? "Save Changes" : "Add to Portfolio"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
