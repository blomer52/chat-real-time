import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (username, password) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      set({ isAuthenticated: true, user: username });
      return true;
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      return false;
    }
  },
  logout: () => {
    fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    set({ isAuthenticated: false, user: null });
  },
}));