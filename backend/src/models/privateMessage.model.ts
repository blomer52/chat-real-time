import type { Database } from "sqlite";

export async function getPrivateMessages(db: Database, user1: number, user2: number) {
  return db.all(
    `SELECT * FROM private_messages
     WHERE (sender_id = ? AND receiver_id = ?)
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC`,
    [user1, user2, user2, user1]
  );
}

export async function sendPrivateMessage(db: Database, sender: number, receiver: number, content: string) {
  return db.run(
    `INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
    [sender, receiver, content]
  );
}