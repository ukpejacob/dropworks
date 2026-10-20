import { useState } from "react";

interface PrivacySecurityModalProps {
  onClose: () => void;
}

export default function PrivacySecurityModal({ onClose }: PrivacySecurityModalProps) {
  const [profileVisible, setProfileVisible] = useState(true);
  const [locationVisible, setLocationVisible] = useState(true);
  const [activityVisible, setActivityVisible] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Change password form
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChangePassword = () => {
    setPwError("");
    if (!currentPw) { setPwError("Please enter your current password."); return; }
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwSuccess(true);
    setTimeout(() => {
      setPwSuccess(false);
      setShowChangePassword(false);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    }, 1500);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 800);
    }, 600);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${value ? "bg-[#194DDC]" : "bg-[#D1D5DB] dark:bg-[#374151]"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );

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
            <h2 className="text-base font-black text-[#111827] dark:text-white">Privacy &amp; Security</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Control your data and account security</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-5">

          {/* Privacy */}
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Privacy</p>
            <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#DCFCE7] dark:bg-[#14532d]/20 rounded-xl flex-shrink-0">
                  <i className="ri-user-line text-[#16A34A] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Public Profile</p>
                  <p className="text-[10px] text-[#9CA3AF]">Allow others to view your profile</p>
                </div>
                <Toggle value={profileVisible} onChange={() => setProfileVisible((v) => !v)} />
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl flex-shrink-0">
                  <i className="ri-map-pin-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Show Location</p>
                  <p className="text-[10px] text-[#9CA3AF]">Display your city on your profile</p>
                </div>
                <Toggle value={locationVisible} onChange={() => setLocationVisible((v) => !v)} />
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-9 h-9 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151]/40 rounded-xl flex-shrink-0">
                  <i className="ri-eye-line text-[#6B7280] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Activity Status</p>
                  <p className="text-[10px] text-[#9CA3AF]">Show when you were last active</p>
                </div>
                <Toggle value={activityVisible} onChange={() => setActivityVisible((v) => !v)} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Security</p>
            <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#FEF3C7] dark:bg-[#78350f]/20 rounded-xl flex-shrink-0">
                  <i className="ri-shield-keyhole-line text-[#F59E0B] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Two-Factor Auth</p>
                  <p className="text-[10px] text-[#9CA3AF]">Extra layer of login security</p>
                </div>
                <Toggle value={twoFactor} onChange={() => setTwoFactor((v) => !v)} />
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl flex-shrink-0">
                  <i className="ri-alarm-warning-line text-[#194DDC] dark:text-[#6B9EFF] text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Login Alerts</p>
                  <p className="text-[10px] text-[#9CA3AF]">Notify me of new sign-ins</p>
                </div>
                <Toggle value={loginAlerts} onChange={() => setLoginAlerts((v) => !v)} />
              </div>
              {/* Change password */}
              <button
                onClick={() => setShowChangePassword((v) => !v)}
                className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#374151]/30 transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#FEE2E2] dark:bg-[#7f1d1d]/20 rounded-xl flex-shrink-0">
                  <i className="ri-lock-password-line text-[#EF4444] text-base"></i>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">Change Password</p>
                  <p className="text-[10px] text-[#9CA3AF]">Update your account password</p>
                </div>
                <i className={`${showChangePassword ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} text-[#9CA3AF] text-lg`}></i>
              </button>
            </div>

            {/* Change password form */}
            {showChangePassword && (
              <div className="mt-3 bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl p-4 flex flex-col gap-3">
                {/* Current */}
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full h-11 px-3 pr-10 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                    />
                    <button onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                      <i className={`${showCurrent ? "ri-eye-off-line" : "ri-eye-line"} text-[#9CA3AF] text-sm`}></i>
                    </button>
                  </div>
                </div>
                {/* New */}
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full h-11 px-3 pr-10 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                    />
                    <button onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                      <i className={`${showNew ? "ri-eye-off-line" : "ri-eye-line"} text-[#9CA3AF] text-sm`}></i>
                    </button>
                  </div>
                </div>
                {/* Confirm */}
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full h-11 px-3 pr-10 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                    />
                    <button onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                      <i className={`${showConfirm ? "ri-eye-off-line" : "ri-eye-line"} text-[#9CA3AF] text-sm`}></i>
                    </button>
                  </div>
                </div>
                {pwError && <p className="text-xs text-[#EF4444] font-medium">{pwError}</p>}
                {pwSuccess && (
                  <div className="flex items-center gap-2 text-xs text-[#16A34A] font-semibold">
                    <i className="ri-checkbox-circle-line"></i>
                    Password updated successfully!
                  </div>
                )}
                <button
                  onClick={handleChangePassword}
                  className="w-full h-10 bg-[#EF4444] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#DC2626] transition-colors"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* Danger zone */}
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Danger Zone</p>
            <div className="bg-[#FEF2F2] dark:bg-[#7f1d1d]/10 border border-[#FECACA] dark:border-[#7f1d1d]/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-[#FEE2E2] dark:bg-[#7f1d1d]/30 rounded-xl flex-shrink-0 mt-0.5">
                  <i className="ri-delete-bin-line text-[#EF4444] text-base"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#EF4444]">Delete Account</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5 leading-relaxed">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="mt-2.5 h-8 px-4 border border-[#EF4444] text-[#EF4444] text-xs font-bold rounded-lg cursor-pointer hover:bg-[#EF4444] hover:text-white transition-colors whitespace-nowrap">
                    Request Deletion
                  </button>
                </div>
              </div>
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
              <><i className="ri-check-line text-white"></i>Saved!</>
            ) : saving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Saving...</>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
