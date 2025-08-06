import { useState, useEffect } from "react";
import Order from "../components/Order/Order";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const ProdutoHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>("az");

  // Buscar produtos da API ao montar o componente
  useEffect(() => {
    fetch("https://loja-teste-1.onrender.com/produtos") // ajuste a URL se necessário
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  // Ordenar os produtos de acordo com o tipo selecionado
  const produtosOrdenados = [...products].sort((a: Product, b: Product) => {
    if (sortType === "az") return a.title.localeCompare(b.title);
    if (sortType === "za") return b.title.localeCompare(a.title);
    if (sortType === "menorPreco") return a.price - b.price;
    if (sortType === "maiorPreco") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutoHome;
