import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer.tsx/Footer";
import Cadastro from "./components/Users/NewUser/Cadastro";
import User from "./components/Users/User/User";
import Login from "./components/Users/Login/Login";
import Produto from "./components/Produto/Produto";
import ProdutoHome from "./Pages/ProdutoHome";
import ProdutoPage from "./Pages/ProdutoPage";
import { getStoredCart, saveStoredCart } from "./utils/cartStorage";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface CartItem extends Product {
  quantidade: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  const removerDoCarrinho = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="app-shell">
        <Navbar cart={cart} onRemove={removerDoCarrinho} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<ProdutoHome cart={cart} setCart={setCart} />} />
            <Route path="/ProdutoPage" element={<ProdutoPage setCart={setCart} />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produto" element={<Produto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
