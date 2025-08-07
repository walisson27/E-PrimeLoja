import  { useState } from 'react';
import { autenticar,login } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [userAuth, setUserAuth] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, senha } = userAuth;
    if (autenticar(email, senha)) {
      login(email);
      navigate('/produto');
    } else {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <>
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userAuth.email}
          onChange={(e) => setUserAuth({ ...userAuth, email: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userAuth.senha}
          onChange={(e) => setUserAuth({ ...userAuth, senha: e.target.value })}
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
        Não tem uma conta? <a href="/Cadastro" className="text-blue-600 hover:underline">Cadastre-se</a>
      </p>
    </form>
</>
  );
}

export default Login;
