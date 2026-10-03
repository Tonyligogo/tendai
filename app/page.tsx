/* eslint-disable @next/next/no-img-element */

'use client';
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gem,
  Hammer,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatKES, products } from "@/lib/products";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import Image from "next/image";

const collections = [
  { name: "Tote Bags", note: "Carry your whole day", position: "18% 47%" },
  {
    name: "Everyday Essentials",
    note: "Small pieces, big character",
    position: "88% 68%",
  },
  {
    name: "African Print",
    note: "Pattern with a purpose",
    position: "70% 34%",
  },
  { name: "New Arrivals", note: "Fresh from the studio", position: "44% 73%" },
];

export default function HomePage() {
  const [spotlight, setSpotlight] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSpotlight((value) => (value + 1) % 4),
      4500,
    );
    return () => window.clearInterval(timer);
  }, []);
  const spotlightPositions = ["16% 45%", "69% 34%", "45% 72%", "88% 70%"];
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative min-h-[calc(100svh-7rem)] overflow-hidden bg-brand-green text-brand-cream">
         <Image
            src="/tendai-hero.jpg"
            alt="Woman carrying a Tendai handcrafted tote in Nairobi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center motion-safe:animate-slow-zoom"
          />
        <div className="absolute inset-0 bg-linear-to-r from-brand-green/90 via-brand-green/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-360 items-end px-6 pb-16 pt-36 md:items-center md:pb-24 lg:px-10">
          <div className="max-w-2xl animate-fade-in">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              <span className="h-px w-12 bg-brand-gold" />
              Modern African craftsmanship
            </p>
            <h1 className="font-display text-6xl font-medium leading-[0.94] sm:text-7xl lg:text-8xl">
              Crafted to
              <br />
              <em className="font-normal text-brand-cream">Move With You.</em>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-brand-cream/85 md:text-lg">
              Handcrafted bags designed for everyday life, travel and everything
              in between.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 bg-brand-gold px-7 text-brand-green hover:bg-brand-gold-light"
              >
                <Link href="/shop" className="">
                  Shop bags <ArrowRight />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 border-brand-cream/60 bg-transparent px-7 text-brand-cream hover:bg-brand-cream hover:text-brand-green"
              >
                <a href="#collections">Explore collections</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 right-8 hidden items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 md:flex">
          <span>Scroll to discover</span>
          <span className="h-px w-16 bg-brand-gold" />
        </div>
      </section>

      <section
        id="collections"
        className="bg-brand-cream px-5 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Find your carry</p>
              <h2 className="section-title">Collections with character.</h2>
            </div>
            <Button
              variant="link"
              className="hidden text-brand-green md:inline-flex"
            >
              <Link href="/shop">
                View all <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection, index) => (
              <Link
                href="/shop"
                key={collection.name}
                className={`group relative overflow-hidden ${index % 2 ? "aspect-[4/5] lg:mt-12" : "aspect-[4/5]"}`}
              >
                <Image
                  src="/tendai-products.jpg"
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: collection.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-cream">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-light">
                    0{index + 1} · {collection.note}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">
                    {collection.name}
                  </h3>
                  <ArrowRight className="mt-4 transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center">Made to be lived with</p>
            <h2 className="section-title">The pieces everyone loves.</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 2}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="h-12 border-brand-green px-7 text-brand-green hover:bg-brand-green hover:text-brand-cream"
            >
              <Link href="/shop">
                Shop all bags <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid bg-brand-green text-brand-cream lg:grid-cols-2">
        <div className="relative min-h-[560px] overflow-hidden lg:min-h-[760px]">
          <Image
            key={spotlight}
            src={spotlight === 3 ? "/tendai-craft.jpg" : "/tendai-products.jpg"}
            alt="Denka Tote detail"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="animate-fade-in object-cover"
            style={{ objectPosition: spotlightPositions[spotlight] }}
          />
          <div className="absolute bottom-7 left-7 flex gap-2">
            {spotlightPositions.map((_, index) => (
              <button
                key={index}
                onClick={() => setSpotlight(index)}
                aria-label={`Show product view ${index + 1}`}
                className={`h-1 transition-all ${index === spotlight ? "w-12 bg-brand-gold" : "w-7 bg-brand-cream/50"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center px-7 py-20 sm:px-14 lg:px-20">
          <div className="max-w-lg">
            <p className="eyebrow text-brand-gold">The studio selection</p>
            <h2 className="font-display text-5xl leading-none md:text-6xl">
              Denka Tote Bag
            </h2>
            <p className="mt-7 text-base leading-8 text-brand-cream/75">
              A confident carry with space for everything. The Denka balances
              warm leather, a clean architectural shape and hand-finished
              details that become more personal with time.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-brand-gold/25 py-6 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-brand-gold">
                  Material
                </dt>
                <dd className="mt-2">Full-grain leather</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-brand-gold">
                  Price
                </dt>
                <dd className="mt-2">{formatKES(6800)}</dd>
              </div>
            </dl>
            <Button
              className="mt-8 h-12 bg-brand-gold px-7 text-brand-green hover:bg-brand-gold-light"
            >
              <Link href="/shop">
                Meet the Denka <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative min-h-[76svh] overflow-hidden">
         <Image
    src="/tendai-lifestyle.jpg"
    alt="Friends carrying Tendai bags at a Nairobi cafe"
    fill
    sizes="100vw"
    className="object-cover motion-safe:animate-slow-zoom"
  />
        <div className="absolute inset-0 bg-brand-green/30" />
        <div className="relative mx-auto flex min-h-[76svh] max-w-[1440px] items-end px-6 py-16 lg:px-10">
          <h2 className="max-w-3xl font-display text-5xl leading-[0.95] text-brand-cream sm:text-7xl">
            Made for wherever
            <br />
            life takes you.
          </h2>
        </div>
      </section>

      <section className="bg-brand-beige py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">On repeat</p>
              <h2 className="section-title">Best sellers.</h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous products"
              >
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon" aria-label="Next products">
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
        <div className="hide-scrollbar flex snap-x gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1440px)/2+2.5rem))] pb-5">
          {products.slice(2, 8).map((product) => (
            <div
              key={product.id}
              className="w-[76vw] max-w-[330px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section
        id="story"
        className="bg-brand-cream px-5 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative pb-20 pr-12">
            {/* First Image */}
            <Image
              src="/tendai-craft.jpg"
              alt="Tendai artisan hand stitching leather"
              width={1000}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-[5/6] w-full object-cover"
            />

            {/* Second Image */}
            <Image
              src="/tendai-products.jpg"
              alt="Finished Tendai bags"
              width={800}
              height={800}
              sizes="(max-width: 1024px) 42vw, 22vw"
              className="absolute bottom-0 right-0 aspect-square w-[42%] border-8 border-brand-cream object-cover"
              style={{ objectPosition: "72% 36%" }}
            />
          </div>
          <div>
            <p className="eyebrow">Our hands, your story</p>
            <h2 className="section-title">Crafted With Character.</h2>
            <p className="mt-7 text-base leading-8 text-brand-green/75">
              Tendai Treasure Craft creates practical, stylish bags where
              durable materials meet distinctive African-inspired details. Every
              piece is considered for how it feels in your hand, moves through
              your day and gathers stories of its own.
            </p>
            <Button
              className="mt-8 h-12 bg-brand-green px-7 text-brand-cream hover:bg-brand-green-light"
            >
              <a href="#craft">
                Discover our story <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="craft"
        className="grid bg-brand-green text-brand-cream lg:grid-cols-2"
      >
        <div className="flex items-center px-7 py-20 sm:px-14 lg:px-20">
          <div className="max-w-xl">
            <p className="eyebrow text-brand-gold">
              Print, pattern, provenance
            </p>
            <h2 className="font-display text-5xl leading-none md:text-6xl">
              A detail that speaks.
            </h2>
            <p className="mt-7 leading-8 text-brand-cream/75">
              Expressive textiles meet disciplined construction. We let pattern
              hold the energy while rich leather and canvas keep each silhouette
              timeless.
            </p>
            <Button
              
              variant="outline"
              className="mt-8 h-12 border-brand-gold bg-transparent px-7 text-brand-gold hover:bg-brand-gold hover:text-brand-green"
            >
              <Link href="/shop">Explore printed pieces</Link>
            </Button>
          </div>
        </div>
        <Image
          src="/tendai-craft.jpg"
          alt="African print fabric and leather craftsmanship"
          width={1200}
          height={1400}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full min-h-[560px] w-full object-cover"
        />
      </section>

      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center">Tendai in the wild</p>
            <h2 className="section-title">Shop the look.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
            {[
              { name: "Cafe Carry", position: "28% center" },
              { name: "City Crossbody", position: "78% center" },
            ].map((look, index) => (
              <div
                key={look.name}
                className="group relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[620px]"
              >
                <Image
                  src="/tendai-lifestyle.jpg"
                  alt={look.name}
                  width={1000}
                  height={1250}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: look.position }}
                />
                <div
                  className={`absolute ${index ? "bottom-[20%] left-[18%]" : "bottom-[17%] left-[42%]"}`}
                >
                  <span className="absolute -inset-2 animate-ping rounded-full bg-brand-gold/40" />
                  <Link
                    href="/shop"
                    className="relative block size-5 rounded-full border-4 border-brand-cream bg-brand-gold"
                    aria-label={`Shop ${look.name}`}
                  />
                  <span className="absolute left-7 top-1/2 w-max -translate-y-1/2 bg-brand-cream px-3 py-2 text-xs font-semibold text-brand-green">
                    {look.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-brown/10 bg-brand-cream px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-360 grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {[
            [Hammer, "Handcrafted Quality"],
            [PackageCheck, "Durable Materials"],
            [Sparkles, "Unique African Prints"],
            [Gem, "Everyday Design"]
          ].map(([Icon, label]) => {
            const BenefitIcon = Icon as typeof Hammer;
            return (
              <div key={label as string} className="text-center">
                <BenefitIcon className="mx-auto mb-4 size-6 text-brand-brown" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">
                  {label as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-green px-5 py-24 text-brand-cream lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center text-brand-gold">
            Carried with love
          </p>
          <blockquote className="font-display text-4xl leading-tight sm:text-5xl">
            “The craftsmanship is beautiful, but it&apos;s how effortlessly the bag
            fits my day that made it an everyday favourite.”
          </blockquote>
          <p className="mt-7 text-xs uppercase tracking-[0.2em] text-brand-gold-light">
            Wanjiku M. · Nairobi
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-360">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="eyebrow">@tendaitreasurecraft</p>
              <h2 className="section-title">From the studio, to the street.</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {["/tendai-hero.jpg", "/tendai-products.jpg", "/tendai-craft.jpg", "/tendai-lifestyle.jpg"].map(
              (image, index) => (
                <div
                  key={index}
                  className={`group overflow-hidden ${index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-5" : ""}`}
                >
                  <Image
                    src={image}
                    alt="Tendai Treasure Craft journal"
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-green px-5 py-20 text-brand-cream lg:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="eyebrow justify-center text-brand-gold">
            Letters from Tendai
          </p>
          <h2 className="font-display text-5xl">Stay Close to the Craft.</h2>
          <p className="mt-4 text-brand-cream/70">
            New releases, limited drops and stories from Tendai.
          </p>
          <form
            className="mt-8 flex w-full max-w-xl border-b border-brand-gold"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Your email address"
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-brand-cream outline-none placeholder:text-brand-cream/50"
            />
            <Button
              type="submit"
              variant="ghost"
              className="h-14 text-brand-gold hover:bg-transparent hover:text-brand-gold-light"
            >
              Join us <ArrowRight />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
