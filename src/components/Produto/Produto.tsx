import { useState } from "react";
import { PackagePlus } from "../Icons";
import { useAuth } from "../../utils/useAuth";

const Produto = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    price: "",
    images: "",
    sizes: "",
    colors: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.images || !form.sizes || !form.colors) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoProduto = {
      title: form.title,
      price: parseFloat(form.price),
      images: form.images.split(",").map((url) => url.trim()).filter(Boolean),
      variants: {
        sizes: form.sizes.split(",").map((size) => size.trim()).filter(Boolean),
        colors: form.colors.split(",").map((color) => color.trim()).filter(Boolean),
      },
    };

    setLoading(true);
    try {
      const response = await fetch("https://loja-teste-1.onrender.com/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto");
      alert("Produto cadastrado com sucesso!");
      setForm({ title: "", price: "", images: "", sizes: "", colors: "" });
    } catch (error: any) {
      alert(error.message || "Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="eprime-container py-10">
        <div className="surface-card mx-auto max-w-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-950">Acesso restrito</h2>
          <p className="mt-2 text-slate-500">Você precisa estar logado para cadastrar novos produtos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="eprime-container py-10">
      <form onSubmit={handleSubmit} className="surface-card mx-auto max-w-2xl p-6 md:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <PackagePlus size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Cadastrar produto</h1>
            <p className="text-sm text-slate-500">Adicione as informações do produto para publicar na loja.</p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Nome do produto
            <input className="soft-input px-4 py-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Tênis esportivo" />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Preço
            <input className="soft-input px-4 py-3" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Ex: 249.90" />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            URLs das imagens
            <textarea className="soft-input min-h-28 px-4 py-3" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="Separe as URLs por vírgula" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Tamanhos
              <input className="soft-input px-4 py-3" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="P, M, G" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Cores
              <input className="soft-input px-4 py-3" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="Preto, Branco" />
            </label>
          </div>
        </div>

        <button type="submit" className="primary-btn mt-6 w-full px-5 py-3" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar produto"}
        </button>
      </form>
    </div>
  );
};

export default Produto;
