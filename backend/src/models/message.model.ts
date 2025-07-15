import type { Database } from "sqlite";

// Obtener todos los mensajes
export async function getAllMessages(db: Database) {
  return await db.all(`
    SELECT messages.id, messages.content, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.id ASC
  `);
}

// Crear nuevo mensaje y devolverlo completo
export async function createMessage(db: Database, userId: number, content: string) {
  const result = await db.run(
    "INSERT INTO messages (user_id, content) VALUES (?, ?)",
    [userId, content]
  );

  const id = result.lastID;

  const message = await db.get(
    `
    SELECT messages.id, messages.content, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    WHERE messages.id = ?
    `,
    [id]
  );

  return message;
}