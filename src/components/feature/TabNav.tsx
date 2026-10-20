import { useLocation, useNavigate } from "react-router-dom";
import { AppMode } from "@/hooks/useMode";

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const workerNav: NavItem[] = [
  { path: "/", icon: "ri-map-pin-line", label: "Job Feed" },
  { path: "/my-jobs", icon: "ri-briefcase-line", label: "My Jobs" },
  { path: "/profile", icon: "ri-user-3-line", label: "Profile" },
  { path: "/wallet", icon: "ri-bank-card-line", label: "Wallet" },
];

const recruiterNav: NavItem[] = [
  { path: "/", icon: "ri-dashboard-line", label: "Dashboard" },
  { path: "/live-bids", icon: "ri-auction-line", label: "Live Bids" },
  { path: "/recruiter-jobs", icon: "ri-folder-line", label: "My Jobs" },
  { path: "/wallet", icon: "ri-wallet-3-line", label: "Wallet" },
  { path: "/profile", icon: "ri-building-4-line", label: "Profile" },
];

interface TabNavProps {
  mode: AppMode;
}

export default function TabNav({ mode }: TabNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = mode === "worker" ? workerNav : recruiterNav;

  return (
    <nav className="hidden md:block fixed top-16 left-0 right-0 z-40">
      <div className="px-4 pt-2 pb-2 mt-1">
        <div className="flex items-center gap-1 bg-white dark:bg-[#1F2937] p-1 rounded-2xl w-full mx-4" style={{width: 'calc(100% - 2rem)'}}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap rounded-xl ${
                  isActive
                    ? "bg-[#EEF2FF] dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                    : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#374151] dark:hover:text-[#D1D5DB]"
                }`}
              >
                <i className={`${item.icon} text-base`}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
