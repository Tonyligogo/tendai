import type { Product } from "@/lib/products";
import { createContext, useContext } from "react";

export type CartLine = { product: Product; quantity: number };

export type StoreState = {
  cart: CartLine[];
  addToCart: (product: Product) => void;
  changeQuantity: (id: string, delta: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const StoreContext = createContext<StoreState | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
