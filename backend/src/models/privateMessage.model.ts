import type { Database } from "sqlite";

export async function getPrivateMessages(db: Database, userId: number, otherUserId: number) {
  return db.all(
    `
    SELECT private_messages.id, private_messages.content, users.username
    FROM private_messages
    JOIN users ON users.id = private_messages.sender_id
    WHERE (sender_id = ? AND recipient_id = ?)
       OR (sender_id = ? AND recipient_id = ?)
    ORDER BY private_messages.id ASC
    `,
    [userId, otherUserId, otherUserId, userId]
  );
}

export async function sendPrivateMessage(db: Database, sender: number, receiver: number, content: string) {
  return db.run(
    `INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
    [sender, receiver, content]
  );
}