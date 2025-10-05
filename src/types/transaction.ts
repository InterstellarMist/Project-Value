export type PostingType = "debit" | "credit";
export type TxnType = "income" | "expense" | "transfer" | "equity";

export interface Transaction {
  txnId: number;
  txnType: TxnType;
  description: string;
  date: string;
  tags?: string | null;
  attachment?: File | null;
}

export type AddTransaction = Omit<Transaction, "txnId">;

export interface Posting {
  acctId: number;
  amount: number; // positive or negative
  currency: string;
}

export interface PostingFull extends Posting {
  postingId: number;
}

export interface AddPosting {
  debit: number;
  credit: number;
  amount: number;
  currency: string;
}
