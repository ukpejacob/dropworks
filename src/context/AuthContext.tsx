import { createContext, useContext, useState, ReactNode } from "react";
import { AppMode } from "@/hooks/useMode";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AppMode;
  avatar: string;
  setupComplete: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, role: AppMode) => Promise<AuthUser>;
  completeSetup: (data: Partial<AuthUser>) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signUp: async () => ({ id: "", name: "", email: "", role: "worker", avatar: "", setupComplete: false }),
  completeSetup: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "dw-auth-user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const persist = (u: AuthUser | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = async (email: string, _password: string) => {
    // Mock login — in real app replace with Supabase auth
    const mockUser: AuthUser = {
      id: "mock-" + Date.now(),
      name: email.split("@")[0],
      email,
      role: (localStorage.getItem("dw-mode") as AppMode) || "worker",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20smiling%20person%20neutral%20background%20high%20quality%20portrait&width=80&height=80&seq=auth-avatar-1&orientation=squarish",
      setupComplete: true,
    };
    persist(mockUser);
  };

  const logout = () => {
    persist(null);
  };

  const signUp = async (email: string, _password: string, role: AppMode): Promise<AuthUser> => {
    const newUser: AuthUser = {
      id: "mock-" + Date.now(),
      name: "",
      email,
      role,
      avatar: "",
      setupComplete: false,
    };
    persist(newUser);
    return newUser;
  };

  const completeSetup = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data, setupComplete: true };
    persist(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signUp,
        completeSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
