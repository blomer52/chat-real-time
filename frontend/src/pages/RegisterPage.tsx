// src/pages/RegisterPage.tsx
import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, password });
      navigate("/login");
    } catch {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-yellow-700">Registro</h1>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-neutral-900 text-white px-4 py-2 rounded hover:bg-neutral-800"
        >
          Registrarse
        </button>

        {/* 🔁 Enlace para volver a login */}
        <button
          type="button"
          className="w-full mt-3 text-sm text-yellow-600 underline"
          onClick={() => navigate("/login")}
        >
          ¿Ya tenés cuenta? Iniciá sesión
        </button>
      </form>
    </div>
  );
}