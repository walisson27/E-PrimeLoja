import { useAuth } from "../../utils/useAuth";
import { useState } from "react";

export default function AuthPage() {
  const { user, login, logout, register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div>
        <h1>Bem-vindo, {user.username} 👋</h1>
        <button onClick={logout}>Sair</button>
      </div>
    );
  }

  const handleLogin = async () => {
    try {
      await login(username, password);
      alert("Login realizado com sucesso!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRegister = () => {
    try {
      register(username, password);
      alert("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login ou Cadastro</h1>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleLogin}>Entrar</button>
        <button onClick={handleRegister}>Cadastrar</button>
      </div>
    </div>
  );
}
