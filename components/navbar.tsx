/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { useStore } from "@/context/useStore";
import { formatKES } from "@/lib/products";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { cart, cartOpen, setCartOpen, changeQuantity } = useStore();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/#collections" },
    { name: "Our Story", href: "/#story" },
    { name: "Contact", href: "/#contact" },
  ];
  const count = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce(
    (total, line) => total + line.quantity * line.product.price,
    0,
  );
  return (
    <>
      <div className="bg-brand-gold px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-green">
        Handcrafted bags for everyday living
      </div>
      <header className="sticky top-0 z-40 border-b border-brand-gold/20 bg-brand-green/95 text-brand-cream backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-5 lg:px-10">
          <BrandMark />
          <nav
            className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`transition-colors hover:text-brand-gold-light ${pathname === link.href ? "text-brand-gold-light" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-brand-cream hover:bg-brand-green-light hover:text-brand-gold"
              aria-label={`Open cart with ${count} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-brand-gold text-[9px] font-bold text-brand-green">
                  {count}
                </span>
              )}
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger>
                  <Menu />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-brand-gold/20 bg-brand-green text-brand-cream"
              >
                <SheetHeader>
                  <SheetTitle className="text-left font-display text-3xl text-brand-cream">
                    Tendai
                  </SheetTitle>

                  <SheetDescription className="text-left text-brand-gold-light">
                    Treasure Craft
                  </SheetDescription>
                </SheetHeader>

                <nav className="ml-4 mt-12 flex flex-col gap-7 font-display text-3xl">
                  {navLinks.map((link,index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="transition-colors hover:text-brand-gold"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col bg-brand-cream p-0 sm:max-w-md">
          <SheetHeader className="border-b border-brand-brown/15 p-6 text-left">
            <SheetTitle className="font-display text-3xl text-brand-green">
              Your bag
            </SheetTitle>
            <SheetDescription>
              {count} {count === 1 ? "piece" : "pieces"} selected
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="grid h-full place-content-center text-center">
                <ShoppingBag className="mx-auto mb-5 size-10 text-brand-brown" />
                <p className="font-display text-2xl text-brand-green">
                  Your bag is waiting.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose something made to move with you.
                </p>
                <Button className="mt-6 bg-brand-green text-brand-cream hover:bg-brand-green-light">
                  <Link href="/shop" onClick={() => setCartOpen(false)}>
                    Explore the collection
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-brand-brown/15 pb-6"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="size-24 object-cover"
                      style={{ objectPosition: product.position }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg text-brand-green">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-widest text-brand-brown">
                        {formatKES(product.price)}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 border-brand-brown/30"
                          onClick={() => changeQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          {quantity === 1 ? <Trash2 /> : <Minus />}
                        </Button>
                        <span className="w-5 text-center text-sm">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 border-brand-brown/30"
                          onClick={() => changeQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="border-t border-brand-brown/15 bg-background p-6">
              <div className="mb-4 flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatKES(subtotal)}</span>
              </div>
              <Button className="h-12 w-full bg-brand-green text-brand-cream hover:bg-brand-green-light">
                Proceed to checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
