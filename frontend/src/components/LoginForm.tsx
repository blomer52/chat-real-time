// src/components/LoginForm.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onLogin: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-[#F5F3F5] rounded-xl shadow-2xl p-8">
      <h2 className="text-center text-3xl font-bold text-[#1F425F] mb-6">
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Usuario
          </label>
          <input
            id="username"
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
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1F425F] mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
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
          Entrar
        </button>

        <p className="text-center text-sm text-[#1F425F]">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="underline hover:text-[#E98A5F]"
          >
            Registrate acá
          </Link>
        </p>
      </form>
    </div>
  );
}