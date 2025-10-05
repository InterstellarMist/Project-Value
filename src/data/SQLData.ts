import Database from "@tauri-apps/plugin-sql";
import type {
  AccountName,
  AccountNode,
  AccountNodeSimple,
  AcctTypeTable,
  BalanceSheet,
  BalanceSummary,
  EmojiEntry,
  TxnTypeTable,
} from "@/data/dbTypes";
import type {
  Account,
  AcctTypeBase,
  AcctTypeSimple,
  AddAccount,
} from "@/types/accounts";
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
let acctTypeRef: Record<AcctTypeBase, number> | null = null;

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

// Lazy loads an object mapping of (acctType) -> (acctTypeId)
export const getAcctTypeRef = async (): Promise<Record<string, number>> => {
  if (!acctTypeRef) {
    db = await loadDb();
    const data: AcctTypeTable[] = await db.select(
      "SELECT acctTypeId,acctType FROM acctType",
    );
    acctTypeRef = Object.fromEntries(
      data.map((row) => [row.acctType, row.acctTypeId]),
    ) as Record<AcctTypeBase, number>;
  }
  return acctTypeRef;
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
    `SELECT acctId,acctTypeId,name,parentId,icon,currency,hidden
    FROM accounts`,
  );
};

// Constructs a tree representation of the accounts
const constructAccountsTree = (
  accountsData: Account[],
  parentId: number | null = null,
): AccountNode[] => {
  return accountsData
    .filter((node) => node.parentId === parentId)
    .map((node) => ({
      ...node,
      children: constructAccountsTree(accountsData, node.acctId), // recursive call
    }));
};

// Returns account data of the specified account type ID(acctTypeId)
export const getAccountType = async ([_, acctTypeId]: [
  string,
  number,
]): Promise<AccountNode[]> => {
  db = await loadDb();
  const data: Account[] = await db.select(
    `SELECT acctId,acctTypeId,name,parentId,icon,currency,hidden
    FROM accounts
    WHERE acctTypeId = $1`,
    [acctTypeId],
  );
  return constructAccountsTree(data);
};

// Returns a list of categories based on a simplified account type (income,expenses,accounts)
// along with the accountIds of its children
export const getAccountsSimple = async ([_, acctType]: [
  string,
  AcctTypeSimple,
]) => {
  const filterData = (node: AccountNode): AccountNodeSimple[] => {
    const children = node.children.flatMap((child) =>
      child.icon ? child.acctId : [],
    );

    if (!children.length)
      return [...node.children.flatMap((child) => filterData(child))];

    return [
      {
        acctId: node.acctId,
        name: node.name,
        children: children,
      },
      ...node.children.flatMap((child) => filterData(child)),
    ];
  };

  switch (acctType) {
    case "accounts": {
      const assets = await getAccountType([_, 1]);
      const liabilities = await getAccountType([_, 2]);
      return [
        ...assets.flatMap(filterData),
        ...liabilities.flatMap(filterData),
      ];
    }
    case "income": {
      const income = await getAccountType([_, 3]);
      return income.flatMap(filterData);
    }
    case "expenses": {
      const expenses = await getAccountType([_, 4]);
      return expenses.flatMap(filterData);
    }
  }
};

// Return account categories for the specified account type ID (acctTypeID)
export const getCategoriesType = async ([_, acctTypeId]: [string, number]) => {
  const accountsTree = await getAccountType([_, acctTypeId]);
  const root = accountsTree[0];
  const categories = root.children
    .filter((category) => !category.icon)
    .map((category) => ({
      acctId: category.acctId,
      name: category.name,
    }));

  return [...categories, { acctId: root.acctId, name: "Uncategorized" }];
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

export const addAccount = async (acctData: AddAccount) => {
  db = await loadDb();
  const res = await db.execute(
    `INSERT INTO accounts (acctTypeId,name,parentId,icon,currency,hidden)
    VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      acctData.acctTypeId,
      acctData.name,
      acctData.parentId,
      acctData.icon,
      acctData.currency,
      0,
    ],
  );
  console.log(res);
  if (!acctData.openingBalance || !res.lastInsertId) return res;
  await addTransaction(
    {
      txnType: "equity",
      description: "Opening Balance",
      date: new Date().toISOString(),
      tags: null,
      attachment: null,
    },
    {
      debit: res.lastInsertId,
      credit: 6, // opening-balances acctId
      amount: acctData.openingBalance,
      currency: acctData.currency ?? "USD",
    },
  );
  return res;
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

export const editAccount = async (acctId: number, acctData: AddAccount) => {
  db = await loadDb();

  const res = await db.execute(
    `UPDATE accounts
    SET acctTypeId =$1, name=$2, parentId=$3, icon=$4, currency=$5
    WHERE acctId = $6`,
    [
      acctData.acctTypeId,
      acctData.name,
      acctData.parentId,
      acctData.icon,
      acctData.currency,
      acctId,
    ],
  );

  console.log(res);
  return res;
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

export const deleteAccount = async (AcctId: number) => {
  db = await loadDb();
  const res = await db.execute(
    `DELETE FROM accounts 
    WHERE acctId = $1`,
    [AcctId],
  );
  console.log(res);
  return res;
};
