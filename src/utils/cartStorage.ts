export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface CartItem extends Product {
  quantidade: number;
}

const CART_KEY = "eprime-cart";

export function getStoredCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addProductToCart(cart: CartItem[], product: Product): CartItem[] {
  const existente = cart.find((item) => item.id === product.id);

  if (existente) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
  }

  return [...cart, { ...product, quantidade: 1 }];
}
