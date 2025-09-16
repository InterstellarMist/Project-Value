export type PostingType = "debit" | "credit";
export type TxnType = "income" | "expense" | "transfer";

export interface Posting {
  acctId: number;
  amount: number; // positive or negative
  currency: string;
}
export interface Transaction {
  txnId: number;
  txnType: TxnType;
  description: string;
  date: string;
  tags?: string;
  attachment?: string;
}
