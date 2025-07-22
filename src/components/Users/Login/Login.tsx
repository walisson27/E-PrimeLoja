



const Login = () => {
  return (
    <> 
    <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
        <input
          type="text"
          id="username"
          name="username"
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
