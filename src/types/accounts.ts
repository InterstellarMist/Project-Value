export type AcctTypeSimple = "income" | "expenses" | "accounts";

export type AcctTypeBase =
  | "assets"
  | "liabilities"
  | "income"
  | "expenses"
  | "equity";

export interface AccountOld {
  acctId: number;
  name: string;
  acctType: AcctTypeBase;
  parentId?: number;
  icon?: string;
  currency?: string;
  hidden?: boolean;
}

export interface Account {
  acctId: number;
  name: string;
  acctTypeId: number;
  parentId?: number;
  icon?: string;
  currency?: string;
  hidden?: boolean;
}

export interface AddAccount extends Omit<Account, "acctId" | "acctType"> {
  acctTypeId: number;
}
