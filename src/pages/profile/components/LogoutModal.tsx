import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  onClose: () => void;
  userName?: string;
  userAvatar?: string;
}

export default function LogoutModal({ onClose, userName, userAvatar }: LogoutModalProps) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#E5E7EB] dark:bg-[#374151] rounded-full"></div>
        </div>

        <div className="px-6 pt-5 pb-6 flex flex-col items-center text-center">
          {/* Avatar + icon */}
          <div className="relative mb-4">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#E5E7EB] dark:border-[#374151]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] dark:bg-[#374151] flex items-center justify-center">
                <i className="ri-user-line text-2xl text-[#9CA3AF]"></i>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center bg-[#FEE2E2] dark:bg-[#7f1d1d]/40 rounded-full border-2 border-white dark:border-[#1F2937]">
              <i className="ri-logout-box-r-line text-[#EF4444] text-sm"></i>
            </div>
          </div>

          <h2 className="text-base font-black text-[#111827] dark:text-white">
            Sign out{userName ? `, ${userName.split(" ")[0]}?` : "?"}
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed max-w-xs">
            You&apos;ll be signed out of your account. Any unsaved changes will be lost.
          </p>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-2.5 mt-6">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full h-12 bg-[#EF4444] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#DC2626] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing out...
                </>
              ) : (
                <>
                  <i className="ri-logout-box-r-line"></i>
                  Yes, Sign Out
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={loggingOut}
              className="w-full h-12 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
