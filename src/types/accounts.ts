export type AcctTypeSimple = "income" | "expense" | "account";

export type AcctTypeBase =
  | "assets"
  | "liabilities"
  | "income"
  | "expenses"
  | "equity"
  | "root";

export interface Account {
  accountId: number; // unique integer ID
  name: string; // human-readable name (e.g., "Cash", "Food")
  type: AcctTypeBase;
  parentId?: number; // optional parent account ID (undefined for root accounts)
  icon?: string; // optional icon reference
  currency?: string; // e.g., "USD" (only relevant for asset/liability)
  amount?: number; // balance (assets/liabilities only)
  hidden?: boolean; // hide from UI (e.g., closed accounts)
}
