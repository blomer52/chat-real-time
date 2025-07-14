import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Database } from "sqlite";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const db: Database = req.app.get("db");

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed]);
    res.sendStatus(201);
  } catch (err: any) {
    console.error(err);
    if (err.code === "SQLITE_CONSTRAINT") {
      res.status(400).json({ error: "El usuario ya existe" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const db: Database = req.app.get("db");

  const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ message: "Login exitoso" });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.json(req.user); // el middleware ya agregó req.user
};