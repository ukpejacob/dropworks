import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PostJobFAB() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pressed, setPressed] = useState(false);

  // Hide FAB on the post-job page itself
  if (location.pathname === "/post-job") return null;

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    navigate("/post-job");
  };

  return (
    <button
      onClick={handleClick}
      title="Post a Job"
      className={`fixed z-50 flex items-center justify-center cursor-pointer whitespace-nowrap transition-all duration-200 shadow-lg
        bottom-[88px] right-4
        md:bottom-6 md:right-6
        w-14 h-14 rounded-full
        bg-[#194DDC] hover:bg-[#1340C0] active:scale-95 text-white
        ${pressed ? "scale-90" : "scale-100"}
      `}
    >
      <i className="ri-add-line text-2xl"></i>
      {/* Tooltip label — desktop only */}
      <span className="hidden md:block absolute right-16 bg-[#0F172A] dark:bg-[#1F2937] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        Post a Job
      </span>
    </button>
  );
}
