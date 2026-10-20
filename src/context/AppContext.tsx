import { createContext, ReactNode } from "react";
import { AppMode } from "@/hooks/useMode";

interface AppContextValue {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  mode: AppMode;
  onModeToggle: () => void;
  isWorker: boolean;
  isRecruiter: boolean;
}

export const AppContext = createContext<AppContextValue>({
  theme: "light",
  onThemeToggle: () => {},
  mode: "worker",
  onModeToggle: () => {},
  isWorker: true,
  isRecruiter: false,
});

interface AppProviderProps {
  children: ReactNode;
  value: AppContextValue;
}

export function AppProvider({ children, value }: AppProviderProps) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
