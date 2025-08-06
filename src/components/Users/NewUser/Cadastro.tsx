import  { useState } from 'react';



const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert(data.erro);
    }
  };

  return (
        <>
        <form onSubmit={handleCadastro} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
            type="password"
            id="password"
            name="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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