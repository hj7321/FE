import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: null,
      login: (token: string) => set({ isLogin: true, accessToken: token }),
      logout: () => set({ isLogin: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
