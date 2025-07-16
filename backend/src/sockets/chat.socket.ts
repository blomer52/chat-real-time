import type { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../middleware/auth.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

const userSockets = new Map<number, string>();

export default function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    const token = socket.handshake.auth.token;

    try {
      const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
      const userId = payload.id;

      userSockets.set(userId, socket.id);
      socket.data.userId = userId;
      socket.data.username = payload.username;

      console.log(`🔌 Usuario conectado: ${payload.username} (${socket.id})`);

      socket.on("disconnect", () => {
        userSockets.delete(userId);
        console.log(`❌ Usuario desconectado: ${payload.username}`);
      });
    } catch {
      console.error("❌ Token inválido en conexión de socket");
      socket.disconnect();
    }
  });

  // ✅ función auxiliar para enviar mensajes privados
  (io as any).sendPrivateMessage = (targetUserId: number, message: any) => {
    const socketId = userSockets.get(targetUserId);
    if (socketId) {
      io.to(socketId).emit("privateMessage", message);
    }
  };
}