import { useState } from "react";

interface NotificationsModalProps {
  onClose: () => void;
}

interface NotifSetting {
  id: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  description: string;
  enabled: boolean;
}

const defaultSettings: NotifSetting[] = [
  {
    id: "new_jobs",
    icon: "ri-briefcase-4-line",
    iconColor: "text-[#194DDC]",
    iconBg: "bg-[#EEF2FF] dark:bg-[#1e3a8a]/20",
    label: "New Job Alerts",
    description: "Get notified when new jobs match your skills",
    enabled: true,
  },
  {
    id: "bids",
    icon: "ri-auction-line",
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-[#FEF3C7] dark:bg-[#78350f]/20",
    label: "Bid Updates",
    description: "When your bid is accepted, rejected, or countered",
    enabled: true,
  },
  {
    id: "messages",
    icon: "ri-chat-3-line",
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#DCFCE7] dark:bg-[#14532d]/20",
    label: "Messages",
    description: "New messages from recruiters or workers",
    enabled: true,
  },
  {
    id: "payments",
    icon: "ri-money-dollar-circle-line",
    iconColor: "text-[#8B5CF6]",
    iconBg: "bg-[#F5F3FF] dark:bg-[#4c1d95]/20",
    label: "Payment Notifications",
    description: "Wallet credits, withdrawals, and escrow updates",
    enabled: true,
  },
  {
    id: "job_status",
    icon: "ri-checkbox-circle-line",
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#DCFCE7] dark:bg-[#14532d]/20",
    label: "Job Status Changes",
    description: "When a job is started, completed, or cancelled",
    enabled: false,
  },
  {
    id: "reviews",
    icon: "ri-star-line",
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-[#FEF3C7] dark:bg-[#78350f]/20",
    label: "Reviews & Ratings",
    description: "When someone leaves you a review",
    enabled: true,
  },
  {
    id: "promotions",
    icon: "ri-megaphone-line",
    iconColor: "text-[#6B7280]",
    iconBg: "bg-[#F3F4F6] dark:bg-[#374151]/40",
    label: "Promotions & Tips",
    description: "Platform updates, tips, and special offers",
    enabled: false,
  },
];

export default function NotificationsModal({ onClose }: NotificationsModalProps) {
  const [settings, setSettings] = useState<NotifSetting[]>(defaultSettings);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 800);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151] flex-shrink-0">
          <div>
            <h2 className="text-base font-black text-[#111827] dark:text-white">Notifications</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Manage what alerts you receive</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-5">
          {/* Delivery channels */}
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Delivery Channels</p>
            <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
              {/* Push */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl flex-shrink-0">
                  <i className="ri-notification-3-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Push Notifications</p>
                  <p className="text-[10px] text-[#9CA3AF]">In-app alerts on your device</p>
                </div>
                <button
                  onClick={() => setPushEnabled((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${pushEnabled ? "bg-[#194DDC]" : "bg-[#D1D5DB] dark:bg-[#374151]"}`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${pushEnabled ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-9 h-9 flex items-center justify-center bg-[#FEF3C7] dark:bg-[#78350f]/20 rounded-xl flex-shrink-0">
                  <i className="ri-mail-line text-[#F59E0B] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Email Notifications</p>
                  <p className="text-[10px] text-[#9CA3AF]">Summaries and alerts via email</p>
                </div>
                <button
                  onClick={() => setEmailEnabled((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${emailEnabled ? "bg-[#194DDC]" : "bg-[#D1D5DB] dark:bg-[#374151]"}`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailEnabled ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Per-type settings */}
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Notification Types</p>
            <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
              {settings.map((s, idx) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 px-4 py-3.5 ${idx < settings.length - 1 ? "border-b border-[#F3F4F6] dark:border-[#374151]" : ""}`}
                >
                  <div className={`w-9 h-9 flex items-center justify-center ${s.iconBg} rounded-xl flex-shrink-0`}>
                    <i className={`${s.icon} ${s.iconColor} text-base`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{s.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] leading-relaxed">{s.description}</p>
                  </div>
                  <button
                    onClick={() => toggle(s.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${s.enabled ? "bg-[#194DDC]" : "bg-[#D1D5DB] dark:bg-[#374151]"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${s.enabled ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 flex-shrink-0 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-11 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <i className="ri-check-line text-white"></i>
                Saved!
              </>
            ) : saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
