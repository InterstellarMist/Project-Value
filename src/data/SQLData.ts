import Database from "@tauri-apps/plugin-sql";
import type { Account, AcctTypeBase, AcctTypeSimple } from "@/types/accounts";
import type { Posting, Transaction } from "@/types/transaction";

interface EmojiEntry {
  acctId: string;
  icon: string;
}

interface AccountName {
  acctId: string;
  name: string;
}

let db: Database | null = null;

const loadDb = async () => {
  if (!db) {
    db = await Database.load("sqlite:data.db");
  }
  return db;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  db = await loadDb();
  return await db.select(
    `SELECT txnId,txnType,description,date,tags,attachment
    FROM transactions INNER JOIN txnType USING(txnTypeId) ORDER BY date DESC`,
  );
};

export const getAccTransactions = async ([_, acctId]: [
  string,
  number,
]): Promise<Transaction[]> => {
  db = await loadDb();
  if (acctId === 0) return getAllTransactions(); // 0 => All Accounts
  return await db.select(
    `SELECT txnId,txnType,description,date,tags,attachment
    FROM transactions INNER JOIN txnType USING(txnTypeId) 
    WHERE EXISTS (
      SELECT 1
      FROM postings
      WHERE postings.txnId = transactions.txnId
        AND postings.acctId = $1
    )
    ORDER BY date DESC`,
    [acctId],
  );
};

export const getTxnPostings = async ([_, txnId]: [string, number]): Promise<
  Posting[]
> => {
  db = await loadDb();
  return await db.select(
    `SELECT acctId,amount,currency
    FROM postings WHERE txnId = $1 ORDER BY amount ASC`,
    [txnId],
  );
};

export const getAccEmojis = async (): Promise<Record<string, string>> => {
  db = await loadDb();
  const emojiList: EmojiEntry[] = await db.select(
    "SELECT acctId,icon FROM accounts",
  );
  return Object.fromEntries(emojiList.map((row) => [row.acctId, row.icon]));
};

export const getAccNames = async (): Promise<Record<string, string>> => {
  db = await loadDb();
  const accNames: AccountName[] = await db.select(
    "SELECT acctId,name FROM accounts",
  );
  return Object.fromEntries(accNames.map((row) => [row.acctId, row.name]));
};

export const getAllAccounts = async (): Promise<Account[]> => {
  db = await loadDb();
  return db.select(
    `SELECT acctId,acctType,name,parentId,icon,currency,hidden
    FROM accounts INNER JOIN acctType USING(acctTypeId)`,
  );
};

export const getAccountType = async ([_, acctType]: [
  string,
  AcctTypeBase,
]): Promise<Account[]> => {
  db = await loadDb();
  return db.select(
    `SELECT acctId,acctType,name,parentId,icon,currency,hidden
    FROM accounts INNER JOIN acctType USING(acctTypeId)
    WHERE acctType = $1`,
    [acctType],
  );
};

export const getAccountIdSimple = async ([_, acctType]: [
  string,
  AcctTypeSimple,
]): Promise<number[]> => {
  db = await loadDb();
  let data: { acctId: number }[];
  if (acctType === "accounts") {
    data = await db.select(
      `SELECT acctId
    FROM accounts INNER JOIN acctType USING(acctTypeId)
    WHERE acctType = "liabilities" OR acctType = "assets"`,
    );
  } else {
    data = await db.select(
      `SELECT acctId
      FROM accounts INNER JOIN acctType USING(acctTypeId)
      WHERE acctType = $1`,
      [acctType],
    );
  }
  return data.map((acc) => acc.acctId);
};

// export const readTransactions = async () => {
//   const db = await Database.load("sqlite:data.db");
//   return await db.execute("SELECT * FROM transactions");
// };
