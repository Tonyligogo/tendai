import { useStore } from "@/context/useStore";
import { formatKES, Product } from "@/lib/products";
import { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Plus } from "lucide-react";
import { cn } from "cn";

/* eslint-disable @next/next/no-img-element */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addToCart } = useStore();
  const [liked, setLiked] = useState(false);
  return (
    <article className="product-card group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-beige">
        <img
          src={product.image}
          alt={product.name}
          width={1600}
          height={1104}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-0"
          style={{ objectPosition: product.position }}
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} craftsmanship detail`}
          width={1408}
          height={1200}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
          style={{ objectPosition: product.hoverPosition }}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-brand-green px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-cream">
            {product.badge}
          </span>
        )}
        {!product.available && (
          <span className="absolute inset-0 grid place-items-center bg-brand-green/50 text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
            Sold out
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 bg-background/85 text-brand-green backdrop-blur hover:bg-brand-gold"
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn(liked && "fill-current text-brand-brown")} />
        </Button>
        {product.available && (
          <Button
            className="absolute bottom-3 left-3 right-3 h-11 translate-y-3 bg-brand-green text-brand-cream opacity-0 transition-all duration-300 hover:bg-brand-green-light group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
            onClick={() => addToCart(product)}
          >
            <Plus /> Quick add
          </Button>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="font-display text-xl text-brand-green">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.material} · {product.category}
          </p>
        </div>
        <div className="shrink-0 text-right text-sm font-semibold text-brand-green">
          <span>{formatKES(product.price)}</span>
          {product.previousPrice && (
            <span className="block text-xs font-normal text-muted-foreground line-through">
              {formatKES(product.previousPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
