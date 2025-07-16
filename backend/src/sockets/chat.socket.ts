import { Server, Socket } from "socket.io";

export default function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🔌 Usuario conectado:", socket.id);

    // Recibe mensaje de un cliente
    socket.on("chat:message", (message) => {
      console.log("📨 Mensaje recibido:", message);

      // Reenvía mensaje a todos los demás
      socket.broadcast.emit("chat:message", message);
    });

    socket.on("disconnect", () => {
      console.log("❌ Usuario desconectado:", socket.id);
    });
  });
}