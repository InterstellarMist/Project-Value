export type PostingType = "debit" | "credit";
export type TxnType = "income" | "expense" | "transfer";

export interface Posting {
  accountId: number;
  amount: number; // positive or negative
  currency: string;
}
export interface Transaction {
  txnId: string;
  type: TxnType;
  postings: Posting[];
  description: string;
  time: string;
  tags?: string;
  attachment?: string;
}
