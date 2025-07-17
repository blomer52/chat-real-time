// src/pages/ChatPage.tsx
import { useEffect, useRef, useState } from "react";
import { getMessages, sendMessage, logout } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import type { ChatMessage } from "../services/api";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const socket = io("http://localhost:3001", { withCredentials: true });

export default function ChatPage() {
  const { user } = useAuthStore() as { user: { username: string } | null };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMessages().then(setMessages);

    socket.on("newMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.username !== user?.username) {
        toast.info(`Nuevo mensaje de ${msg.username}`, {
          autoClose: 2000,
          hideProgressBar: true,
          className: "bg-white text-gray-700 shadow rounded px-4 py-2",
        });
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [user?.username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await sendMessage(content);
      setContent("");
    } catch {
      toast.error("No se pudo enviar el mensaje", { autoClose: 2000 });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      useAuthStore.getState().logout();
      toast.success("Sesión cerrada", { autoClose: 2000 });
      navigate("/login");
    } catch {
      toast.error("Error al cerrar sesión", { autoClose: 2000 });
    }
  };

  // scroll down on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1F425F] p-6 overflow-hidden">
      {/* decorativo */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#E98A5F] rounded-full opacity-20" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col bg-[#F5F3F5] rounded-xl shadow-2xl overflow-hidden h-[80vh]">
        {/* header */}
        <header className="flex justify-between items-center bg-white border-b border-[#1F425F]/20 px-6 py-4">
          <h2 className="text-xl font-bold text-[#1F425F]">Chat público</h2>
          <button
            onClick={handleLogout}
            className="bg-[#E98A5F] text-white px-4 py-1 rounded-md hover:bg-[#E98A5F]/90 transition-colors"
          >
            Cerrar sesión
          </button>
        </header>

        {/* messages */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.username === user?.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  px-4 py-2 rounded-lg max-w-xs break-words
                  ${
                    msg.username === user?.username
                      ? "bg-[#E98A5F] text-white"
                      : "bg-white border border-[#1F425F]/20 text-[#1F425F]"
                  }
                `}
              >
                <span className="block text-xs font-semibold mb-1 text-[#1F425F]/80">
                  {msg.username}
                </span>
                <span>{msg.content}</span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white border-t border-[#1F425F]/20 px-6 py-4"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="
              flex-1 px-4 py-2
              border border-[#1F425F]/40 rounded-md bg-white
              focus:outline-none focus:ring-2 focus:ring-[#E98A5F]
            "
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="
              ml-4 px-4 py-2
              bg-[#E98A5F] text-white rounded-md
              hover:bg-[#E98A5F]/90 transition-colors
              disabled:opacity-50
            "
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}