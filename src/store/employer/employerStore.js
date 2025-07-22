import { create } from "zustand";

export const useEmployerData = create((set) => ({
  employerData: null,
  setEmployerData: (data) => set({ employerData: data }),
  updateEmployerField: (path, value) =>
    set((state) => {
      const keys = path.split(".");
      const updatedData = { ...state.employerData };
      if (keys.length === 1) {
        updatedData[keys[0]] = value;
      } else if (keys.length === 2) {
        updatedData[keys[0]] = {
          ...updatedData[keys[0]],
          [keys[1]]: value,
        };
      }
      return { employerData: updatedData };
    }),
  clearEmployerData: () => set({ employerData: null }),
}));
