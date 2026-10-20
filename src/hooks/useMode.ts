import { useState } from "react";

export type AppMode = "worker" | "recruiter";

export function useMode() {
  const [mode, setMode] = useState<AppMode>(() => {
    const stored = localStorage.getItem("dw-mode");
    return stored === "recruiter" ? "recruiter" : "worker";
  });

  const toggle = () => {
    setMode((m) => {
      const next = m === "worker" ? "recruiter" : "worker";
      localStorage.setItem("dw-mode", next);
      return next;
    });
  };

  return { mode, toggle, isWorker: mode === "worker", isRecruiter: mode === "recruiter" };
}
