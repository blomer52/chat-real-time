import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initializeDb = async () => {
  const db = await open({
    filename: "./chat.db",
    driver: sqlite3.Database,
  });

  // Crear tabla de usuarios
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  // Crear tabla de mensajes con relación a usuarios
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      content TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  return db;
};

export default initializeDb;