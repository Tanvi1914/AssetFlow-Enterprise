import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "Admin" | "Asset Manager" | "Department Head" | "Employee";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  department: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  ready: boolean;
  login: (email: string, remember: boolean) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const KEY = "assetflow_session";

// Demo directory to resolve roles for known emails; everything else is an Employee.
const knownRoles: Record<string, { role: Role; name: string; department: string }> = {
  "admin@assetflow.io": { role: "Admin", name: "Arjun Mehta", department: "Information Technology" },
  "manager@assetflow.io": { role: "Asset Manager", name: "Rakesh Sharma", department: "Finance & Accounts" },
  "head@assetflow.io": { role: "Department Head", name: "Sneha Kapoor", department: "Operations" },
  "employee@assetflow.io": { role: "Employee", name: "Meera Iyer", department: "Information Technology" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = (u: SessionUser | null, remember = true) => {
    setUser(u);
    try {
      localStorage.removeItem(KEY);
      sessionStorage.removeItem(KEY);
      if (u) (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
  };

  const login = (email: string, remember: boolean) => {
    const known = knownRoles[email.toLowerCase()];
    persist(
      known
        ? { email, ...known }
        : { email, name: email.split("@")[0].replace(/\./g, " "), role: "Employee", department: "Operations" },
      remember,
    );
  };

  const signup = (name: string, email: string) => {
    // Signup ALWAYS creates an Employee account. No elevated roles allowed here.
    persist({ name, email, role: "Employee", department: "Operations" }, true);
  };

  const logout = () => persist(null);
  const setRole = (role: Role) => user && persist({ ...user, role });

  return (
    <AuthContext.Provider value={{ user, ready, login, signup, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Theme
interface ThemeContextValue {
  dark: boolean;
  toggle: () => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("assetflow_theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("assetflow_theme", next ? "dark" : "light");
      return next;
    });
  };

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
