import type { Account, AcctTypeBase } from "@/types/accounts";
import type { TxnType } from "@/types/transaction";

export interface EmojiEntry {
  acctId: string;
  icon: string;
}

export interface AccountName {
  acctId: string;
  name: string;
}

export interface TxnTypeTable {
  txnTypeId: number;
  txnType: TxnType;
}

export interface AcctTypeTable {
  acctTypeId: number;
  acctType: AcctTypeBase;
}

export interface BalanceSheet {
  acctId: number;
  balance: number;
}

export interface BalanceSummary {
  acctType: AcctTypeBase;
  balance: number;
}

export interface AccountNode extends Account {
  children: AccountNode[];
}
