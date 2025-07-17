// src/components/RegisterForm.tsx
import { useState } from "react";
import { register } from "../services/api";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, password });
      alert("Registro exitoso. Ahora inicia sesión.");
    } catch (err: any) {
      alert(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="bg-[#F5F3F5] rounded-xl shadow-2xl p-8">
      <h2 className="text-center text-3xl font-bold text-[#1F425F] mb-6">
        Registrarse
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="form-username"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Usuario
          </label>
          <input
            id="form-username"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-4 py-2
              border border-[#1F425F] border-opacity-40
              bg-white rounded-md
              focus:outline-none focus:ring-2 focus:ring-[#E98A5F]
            "
            required
          />
        </div>
        <div>
          <label
            htmlFor="form-password"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Contraseña
          </label>
          <input
            id="form-password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-2
              border border-[#1F425F] border-opacity-40
              bg-white rounded-md
              focus:outline-none focus:ring-2 focus:ring-[#E98A5F]
            "
            required
          />
        </div>
        <button
          type="submit"
          className="
            w-full py-2
            bg-[#E98A5F] text-white rounded-md
            hover:bg-[#E98A5F]/90
            transition-colors
          "
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}