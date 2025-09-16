import { create } from "zustand";

interface FilterStore {
  filter: string;
  setFilter: (newFilter: string) => void;
}

// filter based on accountId for transactions page
export const useFilterStore = create<FilterStore>((set) => ({
  filter: "0",
  setFilter: (newFilter) => set({ filter: newFilter }),
}));
