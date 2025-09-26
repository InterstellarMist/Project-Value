import { create } from "zustand";
import type { AccountNode } from "@/data/dbTypes";

interface AcctStore {
  AcctSelected: AccountNode;
  setAcctSelected: (data: AccountNode) => void;
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
