import  { useState } from 'react';


interface formData {
    name: string;
    email: string;
    address: string;
    password: string;
}

const Cadastro = () => {
const [form, setForm] = useState<formData>({
    name: '',
    email: '',
    address: '',
    password: ''
  });

const user = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado:", form);
    setForm({
      name: '',
      email: '',
      address: '',
      password: ''
    });
  }

  return (
        <>
        <form onSubmit={user} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-5">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <div>
            <label htmlFor="adress" className="block text-sm font-medium text-gray-700">Endereço</label>
            <input
            type="text"
            id="adress"
            name="adress"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
}

export default Cadastro;