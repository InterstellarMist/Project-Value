import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

const loadDb = async () => {
  if (!db) {
    db = await Database.load("sqlite:data.db");
  }
  return db;
};

export const readTransactions = async () => {
  db = await loadDb();
  return db.select("SELECT * FROM transactions");
};

export const readAccounts = async () => {
  db = await loadDb();
  return db.select("SELECT * FROM accounts");
};

// export const readTransactions = async () => {
//   const db = await Database.load("sqlite:data.db");
//   return await db.execute("SELECT * FROM transactions");
// };
