import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

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
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantidade,
    0
  );

  return (
    <Dialog.Root>
      {/* Botão que abre o modal */}
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          🛒 Carrinho ({cart.length})
        </button>
      </Dialog.Trigger>

      {/* Overlay */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        {/* Conteúdo do modal */}
        <Dialog.Content className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto rounded-l-2xl">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Carrinho de Compras
          </Dialog.Title>

          {cart.length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            <ul className="divide-y">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p>
                      {item.quantidade}x R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </div>

          {/* Botão fechar */}
          <Dialog.Close asChild>
            <button className="mt-4 w-full bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Fechar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CarrinhoModal;
