export type AcctTypeSimple = "income" | "expenses" | "accounts";

export type AcctTypeBase =
  | "assets"
  | "liabilities"
  | "income"
  | "expenses"
  | "equity"
  | "root";

export interface Account {
  acctId: number;
  name: string;
  acctType: AcctTypeBase;
  parentId?: number;
  icon: string;
  currency?: string;
  hidden?: boolean;
}
