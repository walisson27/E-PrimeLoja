import { useState } from "react";
import { useAuth } from "../../utils/useAuth";


const Produto = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    price: '',
    images: '', 
    sizes: '',
    colors: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.images || !form.sizes || !form.colors) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const novoProduto = {
      title: form.title,
      price: parseFloat(form.price),
      images: form.images.split(',').map(url => url.trim()),
      variants: {
        sizes: form.sizes.split(',').map(size => size.trim()),
        colors: form.colors.split(',').map(color => color.trim())
      }
    };

    await fetch("https://loja-teste-1.onrender.com/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoProduto)
    });

    alert("Produto cadastrado com sucesso!");
    setForm({
      title: '',
      price: '',
      images: '',
      sizes: '',
      colors: ''
    });
  };

  return (
    <>
    {user ? (
      // 🔑 Usuário logado pode cadastrar produtos
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto mt-6 p-4 border rounded shadow"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          Cadastrar Produto
        </h2>
        <input
          type="text"
          placeholder="Título do Produto"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URLs das Imagens (separadas por vírgula)"
          value={form.images}
          onChange={e => setForm({ ...form, images: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tamanhos (separados por vírgula)"
          value={form.sizes}
          onChange={e => setForm({ ...form, sizes: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Cores (separadas por vírgula)"
          value={form.colors}
          onChange={e => setForm({ ...form, colors: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar Produto
        </button>
      </form>
    ) : (
      // 🔒 Se não estiver logado, bloqueia
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Você precisa estar logado para cadastrar produtos 🚫
        </h2>
      </div>
    )}
  </>
);

};

export default Produto;
