import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserData = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  updateUserField: (path, value) =>
    set((state) => {
      const keys = path.split(".");
      const updatedData = { ...state.userData };
      if (keys.length === 1) {
        updatedData[keys[0]] = value;
      } else if (keys.length === 2) {
        updatedData[keys[0]] = {
          ...updatedData[keys[0]],
          [keys[1]]: value,
        };
      }
      return { userData: updatedData };
    }),
  clearUserData: () => set({ userData: null }),
}));
