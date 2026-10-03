"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useStore } from "@/context/useStore";
import { cn } from "@/lib/utils";
import {
  formatKES,
  products,
  type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type ProductPageClientProps = {
  product: Product;
};

export default function ProductPage({
  product,
}: ProductPageClientProps) {
  const { addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = [
    {
      src: product.image,
      alt: product.name,
      position: product.position,
    },
    {
      src: product.hoverImage,
      alt: `${product.name} craftsmanship detail`,
      position: product.hoverPosition,
    },
  ];

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category,
    )
    .concat(
      products.filter(
        (item) =>
          item.id !== product.id &&
          item.category !== product.category,
      ),
    )
    .slice(0, 4);

  const details = [
    ["Material", product.material],
    ["Category", product.category],
    ["Colour", product.color],
    ["Made in", "Nairobi, Kenya"],
  ];

  const currentImage =
    gallery[activeImage] ?? gallery[0];

  return (
    <main className="bg-background relative">
      <section className="mx-auto max-w-360 px-5 pb-20 pt-10 lg:px-10 lg:pt-16">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-brown hover:text-brand-green"
        >
          <ArrowLeft />
          Back to shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative aspect-4/5 flex-1 overflow-hidden bg-brand-beige">
              <Image
                key={activeImage}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{
                  objectPosition: currentImage.position,
                }}
              />

              {product.badge && (
                <span className="absolute left-4 top-4 bg-brand-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-cream">
                  {product.badge}
                </span>
              )}

              {!product.available && (
                <span className="absolute inset-0 grid place-items-center bg-brand-green/50 text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
                  Sold out
                </span>
              )}
            </div>

            <div className="flex gap-3 lg:w-24 lg:flex-col">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show ${image.alt}`}
                  aria-pressed={activeImage === index}
                  className={cn(
                    "relative aspect-square w-20 shrink-0 overflow-hidden border bg-brand-beige transition lg:w-full",
                    activeImage === index
                      ? "border-brand-green"
                      : "border-brand-brown/20 hover:border-brand-brown/50",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    style={{
                      objectPosition: image.position,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">
              {product.category} · {product.material}
            </p>

            <h1 className="font-display text-5xl leading-none text-brand-green sm:text-6xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-brand-green">
                {formatKES(product.price)}
              </span>

              {product.previousPrice && (
                <span className="text-base text-muted-foreground line-through">
                  {formatKES(product.previousPrice)}
                </span>
              )}
            </div>

            <p className="mt-7 max-w-lg text-base leading-8 text-brand-green/75">
              {product.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-brand-brown/15 py-6 text-sm">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] uppercase tracking-widest text-brand-brown">
                    {label}
                  </dt>

                  <dd className="mt-2 text-brand-green">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {product.available ? (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-brand-brown/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity((value) =>
                        Math.max(1, value - 1)
                      )
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus />
                  </Button>

                  <span className="w-8 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity((value) => value + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus />
                  </Button>
                </div>

                <Button
                  className="h-12 flex-1 bg-brand-green px-7 text-brand-cream hover:bg-brand-green-light"
                  onClick={() => {
                    for (
                      let index = 0;
                      index < quantity;
                      index += 1
                    ) {
                      addToCart(product);
                    }
                  }}
                >
                  Add to bag ·{" "}
                  {formatKES(product.price * quantity)}
                </Button>
              </div>
            ) : (
              <p className="mt-8 bg-brand-beige px-5 py-4 text-sm font-semibold text-brand-brown">
                This piece is currently sold out. Check back
                soon or explore the rest of the collection.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-360">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Keep looking</p>

              <h2 className="section-title">
                You may also love.
              </h2>
            </div>

            <Button
              variant="link"
              className="hidden text-brand-green md:inline-flex"
              render={<Link href="/shop" />}
            >
              View all
              <ArrowRight />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 left-0 right-0">
         <Button
                  className="h-12 w-full bg-brand-green px-7 text-brand-cream hover:bg-brand-green-light"
                  onClick={() => {
                    for (
                      let index = 0;
                      index < quantity;
                      index += 1
                    ) {
                      addToCart(product);
                    }
                  }}
                >
                  Buy now ·{" "}
                  {formatKES(product.price * quantity)}
                </Button>
      </div>
    </main>
  );
}