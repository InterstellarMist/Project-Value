import { create } from "zustand";
import type { AccountNodeFull } from "@/data/dbTypes";

interface AcctStore {
  AcctSelected: AccountNodeFull;
  setAcctSelected: (data: AccountNodeFull) => void;
}

// stores selected transaction data for edit transactions page
export const useAcctStore = create<AcctStore>((set) => ({
  AcctSelected: {
    acctId: 0,
    acctTypeId: 0,
    children: [],
    currency: "USD",
    hidden: false,
    name: "Test",
    icon: "test",
    parentId: 0,
  },
  setAcctSelected: (data) => set({ AcctSelected: data }),
}));
