import { ReactNode } from "react";
import TopBar from "./TopBar";
import TabNav from "./TabNav";
import BottomNav from "./BottomNav";
import PostJobFAB from "./PostJobFAB";
import { AppMode } from "@/hooks/useMode";

interface AppLayoutProps {
  children: ReactNode;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  mode: AppMode;
  onModeToggle: () => void;
}

export default function AppLayout({ children, theme, onThemeToggle, mode, onModeToggle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1120] transition-colors duration-300">
      <TopBar
        theme={theme}
        onThemeToggle={onThemeToggle}
        mode={mode}
        onModeToggle={onModeToggle}
      />
      {/* TabNav: desktop only */}
      <TabNav mode={mode} />
      {/* BottomNav: mobile only PWA fixed bar */}
      <BottomNav mode={mode} />
      {/* Floating Post Job button — recruiter only */}
      {mode === "recruiter" && <PostJobFAB />}
      {/* pt-16 on mobile (just TopBar), pt-[132px] on desktop (TopBar + TabNav) */}
      <main className="pt-16 pb-[70px] md:pt-[132px] md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
