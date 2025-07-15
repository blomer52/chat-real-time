import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

export const register = (data: { username: string; password: string }) =>
  api.post("/auth/register", data);

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getCurrentUser = () => api.get("/auth/me");

export interface ChatMessage {
  id: number;
  content: string;
  username: string;
}

export const getMessages = () =>
  api.get<ChatMessage[]>("/chat").then((res) => res.data);

export const sendMessage = (content: string) =>
  api.post("/chat", { content });
