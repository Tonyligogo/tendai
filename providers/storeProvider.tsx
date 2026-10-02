import { CartLine, StoreContext } from "@/context/useStore";
import type { Product } from "@/lib/products";
import { ReactNode, useMemo, useState } from "react";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const addToCart = (product: Product) => {
    setCart((items) => {
      const found = items.find((line) => line.product.id === product.id);
      return found
        ? items.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...items, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const changeQuantity = (id: string, delta: number) => setCart((items) => items
    .map((line) => line.product.id === id ? { ...line, quantity: line.quantity + delta } : line)
    .filter((line) => line.quantity > 0));
  const value = useMemo(() => ({ cart, addToCart, changeQuantity, cartOpen, setCartOpen }), [cart, cartOpen]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}