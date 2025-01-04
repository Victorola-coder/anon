import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  username: string;
  age: number;
  profileUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
