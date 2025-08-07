import  { useState } from 'react';
import { salvarUsuario } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const [newUser, setNewUser] = useState({ email: '', senha: '' , name: '' });
  const navigate = useNavigate();

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    salvarUsuario(newUser.email, newUser.senha, newUser.name);
    navigate('/login');
  };

  return (
        <>
        <form onSubmit={handleCadastro} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
            type="name"
            id="name"
            name="name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
            type="password"
            id="password"
            name="password"
            value={newUser.senha}
            onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
            Cadastrar
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Faça login</a>
        </p>
        </form>
        </>
  );
};

export default Cadastro;