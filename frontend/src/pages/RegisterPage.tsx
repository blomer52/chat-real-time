// src/pages/RegisterPage.tsx
import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, password });
      toast.success("Usuario creado correctamente", { autoClose: 2000 });
      navigate("/login");
    } catch {
      toast.error("Error al registrarse", { autoClose: 2000 });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1F425F] overflow-hidden">
      {/* detalle decorativo */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#E98A5F] rounded-full opacity-20" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-[#F5F3F5] rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-center text-3xl font-bold text-[#1F425F] mb-6">
          Crear cuenta
        </h1>

        <div>
          <label
            htmlFor="reg-username"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Usuario
          </label>
          <input
            id="reg-username"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-4 py-2
              border border-[#1F425F] border-opacity-40
              bg-white rounded-md
              focus:outline-none focus:ring-2 focus:ring-[#E98A5F]
              mb-4
            "
            required
          />
        </div>

        <div>
          <label
            htmlFor="reg-password"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-2
              border border-[#1F425F] border-opacity-40
              bg-white rounded-md
              focus:outline-none focus:ring-2 focus:ring-[#E98A5F]
              mb-6
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
          Registrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-sm text-[#1F425F] underline hover:text-[#E98A5F] transition-colors"
        >
          ¿Ya tenés cuenta? Iniciá sesión
        </button>
      </form>
    </div>
);
}