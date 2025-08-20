import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CarrinhoModal from "../../components/Carrinho/CarrinhoModal";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantidade: number;
}

interface NavbarProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
}

export default function Navbar({ cart, onRemove }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-2 flex justify-between items-center h-16">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Logo
        </Link>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-blue-400">Home</Link>
          <Link to="/produto" className="text-gray-300 hover:text-blue-400">Produtos</Link>
          <Link to="/login" className="text-gray-300 hover:text-blue-400">Login</Link>

          {/* Carrinho Modal na Navbar */}
          <CarrinhoModal cart={cart} onRemove={onRemove} />
        </div>

        {/* Botão Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-blue-400">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</Link>
          <Link to="/produto" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Produtos</Link>
          <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Login</Link>
          
          {/* Carrinho Modal no Mobile */}
          <div className="px-4 py-2">
            <CarrinhoModal cart={cart} onRemove={onRemove} />
          </div>
        </div>
      )}
    </nav>
  );
}
