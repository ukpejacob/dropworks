import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useTheme } from "./hooks/useTheme";
import { useMode } from "./hooks/useMode";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/feature/AppLayout";

const AUTH_ROUTES = ["/landing", "/auth/login", "/auth/signup", "/auth/setup/worker", "/auth/setup/recruiter", "/auth/forgot-password", "/about", "/blog"];

function LayoutWrapper({ children, theme, onThemeToggle, mode, onModeToggle }: {
  children: React.ReactNode;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  mode: "worker" | "recruiter";
  onModeToggle: () => void;
}) {
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.some((r) => location.pathname.startsWith(r));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <AppLayout
      theme={theme}
      onThemeToggle={onThemeToggle}
      mode={mode}
      onModeToggle={onModeToggle}
    >
      {children}
    </AppLayout>
  );
}

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { mode, toggle: toggleMode, isWorker, isRecruiter } = useMode();

  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider value={{ theme, onThemeToggle: toggleTheme, mode, onModeToggle: toggleMode, isWorker, isRecruiter }}>
        <AuthProvider>
          <BrowserRouter basename={__BASE_PATH__}>
            <LayoutWrapper
              theme={theme}
              onThemeToggle={toggleTheme}
              mode={mode}
              onModeToggle={toggleMode}
            >
              <AppRoutes />
            </LayoutWrapper>
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>
    </I18nextProvider>
  );
}

export default App;
