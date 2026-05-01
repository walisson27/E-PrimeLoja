import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, X } from "../Icons";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantidade: number;
}

interface CarrinhoModalProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
}

const CarrinhoModal: React.FC<CarrinhoModalProps> = ({ cart, onRemove }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantidade, 0);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="primary-btn relative px-4 py-2 text-sm">
          <ShoppingCart size={17} />
          Carrinho
          <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">{totalItems}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl sm:rounded-l-[28px] sm:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-bold text-slate-950">Carrinho</Dialog.Title>
              <Dialog.Description className="text-sm text-slate-500">
                Revise seus produtos antes de finalizar.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <ShoppingCart className="mx-auto mb-3 text-slate-400" size={38} />
              <p className="font-semibold text-slate-800">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-slate-500">Adicione produtos para aparecerem aqui.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <img src={item.images[0]} alt={item.title} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.quantidade} x R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Total</span>
              <span>{totalItems} item(ns)</span>
            </div>
            <p className="mt-2 text-3xl font-bold">R$ {total.toFixed(2)}</p>
            <button className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-bold text-slate-950 transition hover:bg-slate-100">
              Finalizar compra
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CarrinhoModal;
