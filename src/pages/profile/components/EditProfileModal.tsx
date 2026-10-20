import { useState } from "react";

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  phone: string;
}

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
}

export default function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  const [form, setForm] = useState<ProfileData>({ ...profile });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(form);
      setSaving(false);
      onClose();
    }, 600);
  };

  const isValid = form.name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151]">
          <h2 className="text-base font-black text-[#111827] dark:text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your full name"
              className="w-full h-11 px-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell clients about yourself..."
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2.5 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors resize-none leading-relaxed"
            />
            <p className="text-right text-[10px] text-[#9CA3AF] mt-1">{form.bio.length}/200</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Location
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <i className="ri-map-pin-line text-[#9CA3AF] text-sm"></i>
              </div>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="City, Country"
                className="w-full h-11 pl-9 pr-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <i className="ri-phone-line text-[#9CA3AF] text-sm"></i>
              </div>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full h-11 pl-9 pr-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] dark:focus:border-[#6B9EFF] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors"
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
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
