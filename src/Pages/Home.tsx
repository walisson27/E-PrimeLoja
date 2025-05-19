import { productData } from "../productData";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Escolha um Produto</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productData.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover" />
            <h2 className="mt-2 font-semibold">{product.title}</h2>
            <p className="text-green-600 font-bold">R$ {product.price.toFixed(2)}</p>
            <a href={`/ProductPage?id=${product.id}`} className="text-blue-500 underline mt-2 block">
              Ver Produto
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
