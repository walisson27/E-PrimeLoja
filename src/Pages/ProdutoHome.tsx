import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ShoppingBag, Sparkles, Trash2 } from "../components/Icons";
import Order from "../components/Order/Order";
import { productData } from "../productData";
import { useAuth } from "../utils/useAuth";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface CartItem extends Product {
  quantidade: number;
}

interface ProdutoHomeProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const API_URL = "https://loja-teste-1.onrender.com/produtos";
const REMOVED_PRODUCTS_KEY = "eprime-removed-products";

const getRemovedProductIds = () => {
  try {
    const saved = localStorage.getItem(REMOVED_PRODUCTS_KEY);
    return saved ? (JSON.parse(saved) as number[]) : [];
  } catch {
    return [];
  }
};

const saveRemovedProductId = (id: number) => {
  const ids = getRemovedProductIds();
  if (!ids.includes(id)) {
    localStorage.setItem(REMOVED_PRODUCTS_KEY, JSON.stringify([...ids, id]));
  }
};

const ProdutoHome: React.FC<ProdutoHomeProps> = ({ setCart }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>("az");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        const source = Array.isArray(data) && data.length ? data : productData;
        const removedIds = getRemovedProductIds();
        setProducts(source.filter((product) => !removedIds.includes(product.id)));
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        const removedIds = getRemovedProductIds();
        setProducts(productData.filter((product) => !removedIds.includes(product.id)));
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  const produtosFiltrados = useMemo(() => {
    return [...products]
      .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortType === "az") return a.title.localeCompare(b.title);
        if (sortType === "za") return b.title.localeCompare(a.title);
        if (sortType === "menorPreco") return a.price - b.price;
        if (sortType === "maiorPreco") return b.price - a.price;
        return 0;
      });
  }, [products, search, sortType]);

  const adicionarAoCarrinho = (produto: Product) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerProduto = async (id: number) => {
    if (!user) {
      alert("Você precisa fazer login para remover produtos.");
      return;
    }

    const confirmar = window.confirm("Tem certeza que deseja remover este produto?");
    if (!confirmar) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      saveRemovedProductId(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      console.error("Erro ao remover produto:", error.message || error);
    }
  };

  return (
    <div className="eprime-container py-8 md:py-10">
      <section className="surface-card overflow-hidden p-6 md:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16} /> Nova coleção disponível
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Produtos premium, do seu jeito.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Explore produtos, compare preços, escolha variações e acompanhe seu carrinho.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#produtos" className="primary-btn px-5 py-3">
                Ver produtos <ArrowRight size={18} />
              </a>
              <Link to="/produto" className="ghost-btn px-5 py-3">
                Cadastrar produto
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[320px] lg:block">
            <div className="absolute right-8 top-4 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute left-4 top-8 rotate-[-8deg] rounded-[32px] bg-white p-4 shadow-2xl shadow-slate-900/15">
              <img src={products[0]?.images?.[0] || productData[0].images[0]} alt="Produto destaque" className="h-56 w-56 rounded-[24px] object-cover" />
              <p className="mt-3 font-bold text-slate-950">Produto em destaque</p>
              <p className="text-sm text-slate-500">Entrega rápida e segura</p>
            </div>
            <div className="absolute bottom-2 right-2 rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl">
              <p className="text-sm text-slate-300">Produtos cadastrados</p>
              <p className="text-4xl font-black">{products.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="mt-8">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Catálogo</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">Escolha um produto</h2>
            <p className="mt-1 text-sm text-slate-500">{produtosFiltrados.length} item(ns) encontrados</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="soft-input w-full px-11 py-3 sm:w-72"
              />
            </div>
            <Order sortType={sortType} onSortChange={setSortType} />
          </div>
        </div>

        {loading ? (
          <div className="surface-card flex min-h-[260px] items-center justify-center p-8">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFiltrados.map((product) => (
              <li key={product.id} className="product-card">
                <Link to={`/ProdutoPage?id=${product.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={product.images?.[0]} alt={product.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">Destaque</span>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 min-h-[44px] font-bold text-slate-950">{product.title}</h3>
                    <p className="mt-2 text-2xl font-black text-slate-950">R$ {product.price.toFixed(2)}</p>
                    <p className="mt-1 text-sm text-slate-500">ou 10x sem juros</p>
                  </div>
                </Link>

                <div className="grid gap-2 p-4 pt-0">
                  <button onClick={() => adicionarAoCarrinho(product)} className="primary-btn w-full px-4 py-3">
                    <ShoppingBag size={17} /> Adicionar
                  </button>
                  {user && (
                    <button onClick={() => removerProduto(product.id)} className="danger-btn w-full px-4 py-2.5 text-sm">
                      <Trash2 size={16} /> Remover produto
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProdutoHome;
