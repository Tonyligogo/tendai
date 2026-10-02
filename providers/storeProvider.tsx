"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  StoreContext,
  type CartLine,
  type StoreState,
} from "@/context/useStore";
import type { Product } from "@/lib/products";

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (line) => line.product.id === product.id,
      );

      if (existingItem) {
        return currentCart.map((line) =>
          line.product.id === product.id
            ? {
                ...line,
                quantity: line.quantity + 1,
              }
            : line,
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  }, []);

  const changeQuantity = useCallback(
    (productId: string, delta: number) => {
      setCart((currentCart) =>
        currentCart
          .map((line) =>
            line.product.id === productId
              ? {
                  ...line,
                  quantity: line.quantity + delta,
                }
              : line,
          )
          .filter((line) => line.quantity > 0),
      );
    },
    [],
  );

  const value = useMemo<StoreState>(
    () => ({
      cart,
      cartOpen,
      addToCart,
      changeQuantity,
      setCartOpen,
    }),
    [cart, cartOpen, addToCart, changeQuantity],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}