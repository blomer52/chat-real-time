import { Router } from "express";
import { login, logout, register, getCurrentUser } from "../controllers/authController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);

export default router;