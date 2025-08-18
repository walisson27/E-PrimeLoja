import { useState } from "react";
import { useAuth } from "../../../utils/useAuth";
import { Link } from "react-router-dom";

function Login() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert("Login bem-sucedido!");
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {user ? (
        // Se estiver logado, mostra o usuário e o botão sair
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Bem-vindo, {user.username} 👋
          </h2>
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Sair
          </button>
        </div>
      ) : (
        // Se não estiver logado, mostra o formulário
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              to="/Cadastro"
              className="text-blue-600 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      )}
    </>
  );
}

export default Login;
