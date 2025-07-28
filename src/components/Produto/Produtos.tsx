import { useEffect, useState } from "react";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
};

const Produto = () => {
const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {produtos.map(prod => (
        <div key={prod.id} className="border p-4">
          <img src={prod.imagemUrl} alt={prod.nome} className="w-full h-40 object-cover" />
          <h2>{prod.nome}</h2>
          <p>R$ {prod.preco.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
export default Produto;