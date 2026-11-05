"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const DEMO_EMAIL = "admin@criamind.com";
const DEMO_PASSWORD = "123456";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 600));
        if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
          set({
            user: {
              email: DEMO_EMAIL,
              name: "Criamind Demo",
              role: "Genel Müdür",
            },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    { name: "criamind-auth" }
  )
);
