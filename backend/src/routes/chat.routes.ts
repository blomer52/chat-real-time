import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getAllMessages, createMessage } from "../models/message.model";

import type { Request } from "express";
import type { TokenPayload } from "../middleware/auth.middleware";
import type { Server as SocketIOServer } from "socket.io"; // 👈 importar tipo

const router = Router();

// Obtener todos los mensajes
router.get("/", authMiddleware, async (req, res) => {
  const db = req.app.get("db");
  const messages = await getAllMessages(db);
  res.json(messages);
});

// Enviar nuevo mensaje
router.post("/", authMiddleware, async (req: Request & { user?: TokenPayload }, res) => {
  const db = req.app.get("db");
  const io: SocketIOServer = req.app.get("io"); // 👈 recuperar instancia de io
  const user = req.user;
  const { content } = req.body;

  if (!user || !content || typeof content !== "string") {
    return res.status(400).json({ error: "Mensaje inválido" });
  }

  const newMsg = await createMessage(db, user.id, content);

  // ✅ Emitir el mensaje completo incluyendo el nombre de usuario
  io.emit("newMessage", {
    id: newMsg.id,
    content: newMsg.content,
    username: user.username, // 👈 importante para el frontend
  });

  res.sendStatus(201);
});

export default router;