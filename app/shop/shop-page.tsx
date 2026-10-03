'use client';

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { formatKES, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

function FilterPanel({
  category,
  setCategory,
  material,
  setMaterial,
  color,
  setColor,
  price,
  setPrice,
  available,
  setAvailable,
}: {
  category: string;
  setCategory: (value: string) => void;
  material: string;
  setMaterial: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  price: number[];
  setPrice: (value: number[]) => void;
  available: boolean;
  setAvailable: (value: boolean) => void;
}) {
  const maximumPrice = price[0] ?? 10000;
  return (
    <div className="space-y-8">
      <div>
        <h3 className="filter-title">Category</h3>
        <div className="grid gap-3">
          {["All", "Totes", "Pouches", "Crossbody", "Travel"].map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <Checkbox
                checked={category === item}
                onCheckedChange={() => setCategory(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="filter-title">Material</h3>
        <div className="grid gap-3">
          {["All", "Leather", "Canvas", "African Print"].map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <Checkbox
                checked={material === item}
                onCheckedChange={() => setMaterial(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="filter-title">Price</h3>
        <Slider
          min={500}
          max={10000}
          step={100}
          value={price}
          onValueChange={(value) => {
            setPrice(
              typeof value === "number"
                ? [value]
                : Array.from(value)
            );
          }}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>KES 500</span>
          <span>{formatKES(maximumPrice)}</span>
        </div>
      </div>
      <div>
        <h3 className="filter-title">Availability</h3>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <Checkbox
            checked={available}
            onCheckedChange={(checked) => setAvailable(checked === true)}
          />
          In stock only
        </label>
      </div>
      <div>
        <h3 className="filter-title">Colour</h3>
        <div className="flex gap-3">
          {[
            { name: "Brown", style: "bg-brand-brown" },
            { name: "Cream", style: "bg-brand-cream" },
            { name: "Green", style: "bg-brand-green" },
            { name: "Multi", style: "bg-brand-gold" },
          ].map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              onClick={() => setColor(color === item.name ? "All" : item.name)}
              className={`size-8 rounded-full border-2 border-background p-0 ring-1 ${color === item.name ? "ring-2 ring-brand-green" : "ring-border"} ${item.style}`}
              aria-label={`Filter by ${item.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState<number[]>([10000]);;
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "new" | null>("featured");
  const filtered = useMemo(() => {
    const maximumPrice = price[0] ?? 10000;
    const result = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (material === "All" || p.material === material) &&
        (color === "All" || p.color === color) &&
        p.price <= maximumPrice &&
        (!available || p.available),
    );
    return [...result].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "new"
            ? Number(Boolean(b.badge)) - Number(Boolean(a.badge))
            : 0,
    );
  }, [category, material, color, price, available, sort]);
  const clear = () => {
    setCategory("All");
    setMaterial("All");
    setColor("All");
    setPrice([10000]);
    setAvailable(false);
  };
  const filterProps = {
    category,
    setCategory,
    material,
    setMaterial,
    color,
    setColor,
    price,
    setPrice,
    available,
    setAvailable,
  };
  return (
    <main className="bg-background">
      <section className="bg-brand-green px-5 py-20 text-brand-cream lg:px-10 lg:py-28">
        <div className="mx-auto max-w-360">
          <p className="eyebrow text-brand-gold">The full collection</p>
          <h1 className="font-display text-6xl sm:text-7xl">
            Carry your story.
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-brand-cream/70">
            Hand-finished pieces with room for your routine, your plans and the
            unexpected in between.
          </p>
        </div>
      </section>
      <section className="px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-360">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              pieces
            </p>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger className="lg:hidden">
                    <SlidersHorizontal /> Filters
                </SheetTrigger>
                <SheetContent side="left" className="bg-brand-cream">
                  <SheetHeader className="mb-8 text-left">
                    <SheetTitle className="font-display text-3xl">
                      Filter the collection
                    </SheetTitle>
                    <SheetDescription>
                      Find the shape that fits your day.
                    </SheetDescription>
                  </SheetHeader>
                  <FilterPanel {...filterProps} />
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                  <SelectItem value="low">Price: low to high</SelectItem>
                  <SelectItem value="high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="font-display text-2xl">Refine</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-xs"
                  >
                    <X /> Clear
                  </Button>
                </div>
                <FilterPanel {...filterProps} />
              </div>
            </aside>
            <div>
              {filtered.length ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-6">
                  {filtered.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 3}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid min-h-105 place-content-center text-center">
                  <h2 className="font-display text-4xl text-brand-green">
                    Nothing hidden here.
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Try opening up your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mx-auto mt-6"
                    onClick={clear}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
