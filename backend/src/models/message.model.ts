import type { Database } from "sqlite";

export async function getAllMessages(db: Database) {
  return db.all(`
    SELECT messages.id, content, timestamp, users.username AS sender
    FROM messages
    JOIN users ON users.id = messages.sender_id
    ORDER BY timestamp ASC
  `);
}

export async function createMessage(db: Database, senderId: number, content: string) {
  return db.run(
    `INSERT INTO messages (sender_id, content) VALUES (?, ?)`,
    [senderId, content]
  );
}