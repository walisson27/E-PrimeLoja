import { useState, useEffect } from "react";
import Order from "../components/Order/Order";
import CarrinhoModal from "../components/Carrinho/CarrinhoModal"; 

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

const ProdutoHome: React.FC<ProdutoHomeProps> = ({ cart, setCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>("az");

  useEffect(() => {
    fetch("https://loja-teste-1.onrender.com/produtos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const produtosOrdenados = [...products].sort((a: Product, b: Product) => {
    if (sortType === "az") return a.title.localeCompare(b.title);
    if (sortType === "za") return b.title.localeCompare(a.title);
    if (sortType === "menorPreco") return a.price - b.price;
    if (sortType === "maiorPreco") return b.price - a.price;
    return 0;
  });

  // 👉 Adicionar ao carrinho
  const adicionarAoCarrinho = (produto: Product) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
    console.log("adicionando")
  };

  // 👉 Remover do carrinho
  const removerDoCarrinho = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
// Remover Produto
const removerProduto = async (id: number) => {
  const confirmar = window.confirm("Tem certeza que deseja remover este produto?");
  if (!confirmar) return;

  try {
    await fetch(`https://loja-teste-1.onrender.com/produtos/${id}`, {
      method: "DELETE",
    });

    // Remove do estado (frontend)
    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (error: any) {
    console.error("Erro ao remover produto:", error.message || error);
  }
};



  
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* BOTÃO/MODAL DO CARRINHO */}
      <div className="flex justify-end mb-6">
        <CarrinhoModal cart={cart} onRemove={removerDoCarrinho} />
      </div>

      {/* PRODUTOS */}
      <header className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          Escolha um Produto
        </h1>
        <Order sortType={sortType} onSortChange={setSortType} />
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produtosOrdenados.map((product: Product) => (
          <li
            key={product.id}
            className="border p-0 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <a href={`/ProdutoPage?id=${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <h2 className="mt-2 font-semibold text-center">{product.title}</h2>
              <p className="text-green-600 font-bold text-center">
                R$ {product.price.toFixed(2)}
              </p>
            </a>

            {/* Botão para adicionar ao carrinho */}
            <button
              onClick={() => adicionarAoCarrinho(product)}
              className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Adicionar ao Carrinho
            </button>
            <button onClick={() =>removerProduto(product.id)}
              className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
              Remover Produto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutoHome;
