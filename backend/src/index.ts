import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";
import initializeDb from "./db";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import privateRoutes from "./routes/private.routes";
import setupSocket from "./sockets/chat.socket";

// Cargar variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middlewares globales
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Ruta simple de test
app.get("/api/ping", (_, res) => res.send("pong"));

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/private", privateRoutes);

// Inicializar DB y lanzar servidor
initializeDb().then((db) => {
  app.set("db", db);
  app.set("io", io); // ✅ guardamos la instancia

  setupSocket(io);

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al iniciar la base de datos:", err);
});