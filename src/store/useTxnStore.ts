import { create } from "zustand";
import type { PostingFull, Transaction } from "@/types/transaction";

export interface TxnSelected {
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
      txnType: "expense",
      description: "Test",
      date: "2025-09-16T23:32:00.000Z",
    },
    postings: [
      { postingId: 27, acctId: 6, amount: -75, currency: "USD" },
      { postingId: 28, acctId: 13, amount: 75, currency: "USD" },
    ],
  },
  setTxnSelected: (data) => set({ txnSelected: data }),
}));
