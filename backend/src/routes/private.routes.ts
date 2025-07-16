import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getPrivateMessages, sendPrivateMessage } from "../models/privateMessage.model";
import type { Request } from "express";
import type { TokenPayload } from "../middleware/auth.middleware";

const router = Router();

// Obtener historial privado entre 2 usuarios
router.get("/:username", authMiddleware, async (req: Request & { user?: TokenPayload }, res) => {
  const db = req.app.get("db");
  const currentUser = req.user!;
  const targetUsername = req.params.username;

  const targetUser = await db.get("SELECT * FROM users WHERE username = ?", [targetUsername]);

  if (!targetUser) return res.status(404).json({ error: "Usuario no encontrado" });

  const messages = await getPrivateMessages(db, currentUser.id, targetUser.id);
  res.json(messages);
});

// Enviar mensaje privado
router.post("/:username", authMiddleware, async (req: Request & { user?: TokenPayload }, res) => {
  const db = req.app.get("db");
  const currentUser = req.user!;
  const targetUsername = req.params.username;
  const { content } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Mensaje inválido" });
  }

  const targetUser = await db.get("SELECT * FROM users WHERE username = ?", [targetUsername]);
  if (!targetUser) return res.status(404).json({ error: "Usuario no encontrado" });

  await sendPrivateMessage(db, currentUser.id, targetUser.id, content);
  res.sendStatus(201);
});

export default router;