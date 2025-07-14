import { useEffect, useRef, useState } from "react";
import { getMessages, sendMessage } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import type { ChatMessage } from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
});

const ChatPage = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar mensajes iniciales
    getMessages().then(setMessages);

    // Recibir mensajes en tiempo real
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await sendMessage(content);
    setContent("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: "300px",
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}:</strong> {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ width: "70%" }}
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatPage;