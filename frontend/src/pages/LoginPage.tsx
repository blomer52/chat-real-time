import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      navigate("/chat");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al Chat</h1>
      <LoginForm onLogin={handleLogin} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}