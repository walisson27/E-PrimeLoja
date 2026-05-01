import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserRound } from "../../Icons";
import { useAuth } from "../../../utils/useAuth";

function Login() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eprime-container flex min-h-[calc(100vh-180px)] items-center justify-center py-10">
      {user ? (
        <div className="surface-card w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <UserRound size={26} />
          </div>
          <h2 className="text-2xl font-bold text-slate-950">Olá, {user.username}</h2>
          <p className="mt-2 text-slate-500">Você já está conectado na sua conta.</p>
          <button onClick={logout} className="danger-btn mt-6 w-full px-5 py-3">Sair da conta</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="surface-card w-full max-w-md p-6 md:p-8">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <LogIn size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-950">Entrar</h1>
            <p className="mt-1 text-sm text-slate-500">Acesse sua conta para gerenciar a loja.</p>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Email
              <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required className="soft-input px-4 py-3" placeholder="seu@email.com" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Senha
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="soft-input px-4 py-3" placeholder="Sua senha" />
            </label>
          </div>

          <button type="submit" className="primary-btn mt-6 w-full px-5 py-3" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Não tem uma conta? <Link to="/Cadastro" className="font-bold text-blue-700 hover:underline">Cadastre-se</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
