export type AcctTypeSimple = "income" | "expenses" | "accounts";

export type AcctTypeBase =
  | "assets"
  | "liabilities"
  | "income"
  | "expenses"
  | "equity";

export interface Account {
  acctId: number;
  name: string;
  acctTypeId: number;
  parentId?: number;
  icon?: string;
  currency?: string;
  hidden?: boolean;
}

export type AddAccount = Omit<Account, "acctId" | "acctType">;
