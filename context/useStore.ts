"use client";

import type { Product } from "@/lib/products";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type CartLine = {
  product: Product;
  quantity: number;
};

export type StoreState = {
  cart: CartLine[];
  cartOpen: boolean;
  addToCart: (product: Product) => void;
  changeQuantity: (productId: string, delta: number) => void;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
};

export const StoreContext = createContext<StoreState | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
}