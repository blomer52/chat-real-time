import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initializeDb = async () => {
  const db = await open({
    filename: "./chat.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  return db;
};

export default initializeDb;