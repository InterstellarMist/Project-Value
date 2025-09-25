import { create } from "zustand";

interface FilterStore {
  filter: string;
  setFilter: (newFilter: string) => void;
}

// Filter store factory function which filters based on accountId
const createFilterStore = (initialValue: string) =>
  create<FilterStore>((set) => ({
    filter: initialValue,
    setFilter: (newFilter) => set({ filter: newFilter }),
  }));

// Assets and Liabilities Accounts
export const useAccountFilterStore = createFilterStore("0");
// Account Types (Assets,Liabilities,Income,Expense)
export const useAcctTypeFilterStore = createFilterStore("1");
