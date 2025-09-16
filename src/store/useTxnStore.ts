import { create } from "zustand";
import type { PostingFull, Transaction } from "@/types/transaction";

interface TxnSelected {
  transaction: Transaction;
  postings: PostingFull[];
}

interface TxnStore {
  txnSelected: TxnSelected;
  setTxnSelected: (data: TxnSelected) => void;
}

// stores selected transaction data for edit transactions page
export const useTxnStore = create<TxnStore>((set) => ({
  txnSelected: {
    transaction: {
      txnId: 1,
      txnType: "income",
      description: "Test",
      date: "2025-09-16T19:01:35.802Z",
    },
    postings: [],
  },
  setTxnSelected: (data) => set({ txnSelected: data }),
}));
