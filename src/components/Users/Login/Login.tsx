import  { useState } from 'react';



const Login = () => {
const [user, setUser] = useState({
  username: '',
  password: ''
})

const login = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  fetch('http://localhost:3001/usuarios', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
  if (user.username === user.password) {
    alert("Login bem-sucedido!");
  }
}
  return (
    <> 
    <form onSubmit={login} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
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
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
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
