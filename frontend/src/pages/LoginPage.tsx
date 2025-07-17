// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (username: string, password: string) => {
    setError("");
    const success = await login(username, password);
    if (success) {
      toast.success("Sesión iniciada");
      navigate("/chat");
    } else {
      toast.error("Credenciales incorrectas");
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1F425F] overflow-hidden">
      {/* Detalle decorativo */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 bg-[#E98A5F] rounded-full opacity-20"
      />

      <div className="relative z-10 w-full max-w-md p-4">
        <LoginForm onLogin={handleLogin} />

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}