import { useLocation, useNavigate } from "react-router-dom";
import { AppMode } from "@/hooks/useMode";

interface NavItem {
  path: string;
  icon: string;
  activeIcon: string;
  label: string;
}

const workerNav: NavItem[] = [
  { path: "/", icon: "ri-map-pin-line", activeIcon: "ri-map-pin-fill", label: "Home" },
  { path: "/my-jobs", icon: "ri-briefcase-line", activeIcon: "ri-briefcase-fill", label: "My Jobs" },
  { path: "/wallet", icon: "ri-wallet-3-line", activeIcon: "ri-wallet-3-fill", label: "Wallet" },
  { path: "/profile", icon: "ri-user-line", activeIcon: "ri-user-fill", label: "Profile" },
];

const recruiterNav: NavItem[] = [
  { path: "/", icon: "ri-dashboard-line", activeIcon: "ri-dashboard-fill", label: "Dashboard" },
  { path: "/live-bids", icon: "ri-auction-line", activeIcon: "ri-auction-fill", label: "Live Bids" },
  { path: "/recruiter-jobs", icon: "ri-folder-line", activeIcon: "ri-folder-fill", label: "Jobs" },
  { path: "/wallet", icon: "ri-wallet-3-line", activeIcon: "ri-wallet-3-fill", label: "Wallet" },
  { path: "/profile", icon: "ri-building-4-line", activeIcon: "ri-building-4-fill", label: "Profile" },
];

interface BottomNavProps {
  mode: AppMode;
}

export default function BottomNav({ mode }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = mode === "worker" ? workerNav : recruiterNav;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[70px] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-t border-[#E5E7EB]/60 dark:border-[#1F2937]/60 flex items-center">
      <div className="w-full flex justify-around items-center px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 cursor-pointer group"
            >
              <div
                className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                <i
                  className={`text-xl transition-colors duration-200 ${
                    isActive
                      ? `${item.activeIcon} text-[#194DDC] dark:text-[#6B9EFF]`
                      : `${item.icon} text-[#9CA3AF] dark:text-[#6B7280]`
                  }`}
                ></i>
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-[#194DDC] dark:text-[#6B9EFF]" : "text-[#9CA3AF] dark:text-[#6B7280]"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-[#194DDC] dark:bg-[#6B9EFF] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
