import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, UserRound, PackagePlus, Moon, Sun } from "../Icons";
import { useState } from "react";
import CarrinhoModal from "../../components/Carrinho/CarrinhoModal";
import { useTheme } from "../../hooks/useTheme";

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

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

export default function Navbar({ cart, onRemove }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="eprime-container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
            <ShoppingBag size={20} />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-slate-950">E-Prime</p>
            <p className="hidden text-xs text-slate-500 sm:block">Loja online</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/produto" className={linkClass}>Produtos</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/produto" className="ghost-btn px-4 py-2 text-sm">
            <PackagePlus size={17} /> Cadastrar
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Alternar modo escuro"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <CarrinhoModal cart={cart} onRemove={onRemove} />
          <Link to="/login" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50">
            <UserRound size={18} />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white p-4 shadow-xl md:hidden">
          <div className="eprime-container flex flex-col gap-2">
            <NavLink onClick={() => setIsOpen(false)} to="/" className={linkClass}>Home</NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/produto" className={linkClass}>Produtos</NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/login" className={linkClass}>Login</NavLink>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-btn w-full justify-center"
                aria-label="Alternar modo escuro"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? "Modo claro" : "Modo escuro"}
              </button>
              <CarrinhoModal cart={cart} onRemove={onRemove} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
