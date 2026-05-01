import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "../../Icons";
import { useAuth } from "../../../utils/useAuth";

export const Cadastrar = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      register(username, password);
      alert("Cadastro realizado com sucesso! Agora faça login.");
      window.location.href = "/login";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="eprime-container flex min-h-[calc(100vh-180px)] items-center justify-center py-10">
      <form onSubmit={handleSubmit} className="surface-card w-full max-w-md p-6 md:p-8">
        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Criar conta</h1>
          <p className="mt-1 text-sm text-slate-500">Cadastre-se para acessar os recursos da loja.</p>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required className="soft-input px-4 py-3" placeholder="seu@email.com" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Senha
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="soft-input px-4 py-3" placeholder="Crie uma senha" />
          </label>
        </div>

        <button type="submit" className="primary-btn mt-6 w-full px-5 py-3">Cadastrar</button>
        <p className="mt-5 text-center text-sm text-slate-500">
          Já tem uma conta? <Link to="/login" className="font-bold text-blue-700 hover:underline">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastrar;
