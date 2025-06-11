import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/user";

interface IAuthState {
  user: IUser;
  updateUser: (userData: IUser) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      // default user
      user: {
        id: "2",
        email: "user@bank.com",
        name: "John Doe",
        role: "user",
        accountNumber: "ACC001",
        balance: 5000,
        createdAt: new Date().toISOString(),
      },

      updateUser: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
