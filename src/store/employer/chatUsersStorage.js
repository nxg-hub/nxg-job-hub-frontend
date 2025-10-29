import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatUsersData = create((set) => ({
  chatUsersData: null,
  setChatUsersData: (data) => set({ chatUsersData: data }),
  clearChatUsersData: () => set({ chatUsersData: null }),
}));
