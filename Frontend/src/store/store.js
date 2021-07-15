import create from "zustand";

const useStore = create((set) => ({
  LoggedIn: false,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
