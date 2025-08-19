import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega o carrinho salvo
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Carrinho:</h2>
      <ul className="space-y-2">
        {cart.map((item, index) => (
          <li key={index} className="border p-2 rounded flex items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover mr-2"
            />
            <div>
              <p>{item.title}</p>
              <p className="text-green-600">R$ {item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
