import Database from "@tauri-apps/plugin-sql";
import type {
  AccountName,
  BalanceSheet,
  BalanceSummary,
  EmojiEntry,
  TxnTypeTable,
} from "@/data/dbTypes";
import type { Account, AcctTypeBase, AcctTypeSimple } from "@/types/accounts";
import type {
  AddPosting,
  AddTransaction,
  Posting,
  PostingFull,
  Transaction,
  TxnType,
} from "@/types/transaction";

let db: Database | null = null;
let txnTypeRef: Record<TxnType, number> | null = null;

const loadDb = async () => {
  if (!db) {
    db = await Database.load("sqlite:app.db");
  }
  return db;
};

// ====================== INITIALIZE REFERENCE TABLES =============================

// Lazy loads an object mapping of (TxnType) -> (TxnTypeId)
export const getTxnTypeRef = async (): Promise<Record<string, number>> => {
  if (!txnTypeRef) {
    db = await loadDb();
    const data: TxnTypeTable[] = await db.select(
      "SELECT txnTypeId,txnType FROM txnType",
    );
    txnTypeRef = Object.fromEntries(
      data.map((row) => [row.txnType, row.txnTypeId]),
    ) as Record<TxnType, number>;
  }
  return txnTypeRef;
};

// ============================== READ METHODS ====================================

// Returns all transaction data
export const getAllTransactions = async (): Promise<Transaction[]> => {
  db = await loadDb();
  return await db.select(
    `SELECT txnId,txnType,description,date,tags,attachment
    FROM transactions INNER JOIN txnType USING(txnTypeId) ORDER BY date DESC`,
  );
};

// Returns transaction data related to a single account
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

// Returns postings data of the specified transaction
export const getTxnPostings = async ([_, txnId]: [string, number]): Promise<
  PostingFull[]
> => {
  db = await loadDb();
  return await db.select(
    `SELECT postingId,acctId,amount,currency
    FROM postings WHERE txnId = $1 ORDER BY amount ASC`,
    [txnId],
  );
};

// Returns an object mapping of (AccountId) -> (Emoji Icon)
export const getAccEmojis = async (): Promise<Record<string, string>> => {
  db = await loadDb();
  const emojiList: EmojiEntry[] = await db.select(
    "SELECT acctId,icon FROM accounts",
  );
  return Object.fromEntries(emojiList.map((row) => [row.acctId, row.icon]));
};

// Returns an object mapping of (AccountId) -> (Account Name)
export const getAccNames = async (): Promise<Record<string, string>> => {
  db = await loadDb();
  const accNames: AccountName[] = await db.select(
    "SELECT acctId,name FROM accounts",
  );
  return Object.fromEntries(accNames.map((row) => [row.acctId, row.name]));
};

// Returns all account data
export const getAllAccounts = async (): Promise<Account[]> => {
  db = await loadDb();
  return db.select(
    `SELECT acctId,acctType,name,parentId,icon,currency,hidden
    FROM accounts INNER JOIN acctType USING(acctTypeId)`,
  );
};

// Returns account data of the specified account type (acctType)
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

// Returns a list of accounts based on a simplified account type ("income","expenses","accounts")
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

// =================== BALANCE METHODS =========================

// Returns balance for all accounts [TRIAL BALANCE]
export const getTrialBalance = async () => {
  db = await loadDb();
  return await db.select(
    `SELECT acctId, SUM(amount) FROM postings
    GROUP BY acctId`,
  );
};

// Returns balance for each asset and liability [BALANCE SHEET]
export const getBalanceSheet = async (): Promise<Record<number, number>> => {
  db = await loadDb();
  const balances: BalanceSheet[] = await db.select(
    `SELECT p.acctId, SUM(amount) balance
    FROM postings p
    JOIN accounts a ON a.acctId = p.acctId 
    JOIN acctType t ON t.acctTypeId = a.acctTypeId 
    WHERE t.acctType IN ("liabilities","assets")
    GROUP BY p.acctId `,
  );
  return Object.fromEntries(balances.map((row) => [row.acctId, row.balance]));
};

// Returns balance summary for assets and liabilities [BALANCE SHEET SUMMARY]
export const getBalanceSummary = async (): Promise<
  Record<AcctTypeBase, number>
> => {
  db = await loadDb();
  const balances: BalanceSummary[] = await db.select(
    `SELECT t.acctType , SUM(amount) balance
    FROM postings p
    JOIN accounts a ON a.acctId = p.acctId 
    JOIN acctType t ON t.acctTypeId = a.acctTypeId 
    WHERE t.acctType IN ("liabilities","assets")
    GROUP BY t.acctType`,
  );
  return Object.fromEntries(
    balances.map((row) => [row.acctType, row.balance]),
  ) as Record<AcctTypeBase, number>;
};

// Returns balance for a given account
export const getAccBalance = async ([_, acctId]: [
  string,
  number,
]): Promise<number> => {
  db = await loadDb();
  return await db.select(
    `SELECT SUM(amount) FROM postings
    WHERE acctId = $1`,
    [acctId],
  );
};

// ============================== CREATE METHODS =================================

// TODO: support multiple postings
const createPostings = (postingData: AddPosting) => {
  const post1: Posting = {
    acctId: postingData.credit,
    amount: -postingData.amount,
    currency: postingData.currency,
  };
  const post2: Posting = {
    acctId: postingData.debit,
    amount: postingData.amount,
    currency: postingData.currency,
  };
  return [post1, post2];
};

// TODO: proper file attachment
export const addTransaction = async (
  txnData: AddTransaction,
  postingData: AddPosting,
) => {
  txnTypeRef = await getTxnTypeRef();
  db = await loadDb();

  const result = [];
  const posts = createPostings(postingData);

  const res = await db.execute(
    `INSERT INTO transactions (txnTypeId,description,date,tags,attachment)
    VALUES ($1,$2,$3,$4,$5) `,
    [
      txnTypeRef[txnData.txnType],
      txnData.description,
      txnData.date,
      txnData.tags,
      txnData.attachment,
    ],
  );

  result.push(res);

  for (const post of posts) {
    result.push(
      await db.execute(
        `INSERT INTO postings (txnId,acctId,amount,currency)
      VALUES ($1,$2,$3,$4)`,
        [res.lastInsertId, post.acctId, post.amount, post.currency],
      ),
    );
  }
  console.log(result);
  return result;
};

// ============================== UPDATE METHODS =================================

// TODO: proper file attachment
export const editTransaction = async (
  txnId: number,
  postingIds: number[],
  txnData: AddTransaction,
  postingData: AddPosting,
) => {
  txnTypeRef = await getTxnTypeRef();
  db = await loadDb();

  const result = [];
  const posts = createPostings(postingData);

  const res = await db.execute(
    `UPDATE transactions 
    SET txnTypeId = $1, description = $2,
        date = $3, tags = $4, attachment = $5
    WHERE txnId = $6`,
    [
      txnTypeRef[txnData.txnType],
      txnData.description,
      txnData.date,
      txnData.tags,
      txnData.attachment,
      txnId,
    ],
  );

  result.push(res);

  for (const [key, post] of posts.entries()) {
    result.push(
      await db.execute(
        `UPDATE postings
        SET txnId =$1, acctId = $2, amount = $3, currency = $4
        WHERE postingId = $5`,
        [txnId, post.acctId, post.amount, post.currency, postingIds[key]],
      ),
    );
  }
  console.log(result);
  return result;
};

// ============================== DELETE METHODS =================================

export const deleteTransaction = async (txnId: number) => {
  db = await loadDb();
  const res = await db.execute(
    `DELETE FROM transactions 
    WHERE txnId = $1`,
    [txnId],
  );
  console.log(res);
  return res;
};
