import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Tendai Treasure Craft home">
      <span className="grid size-10 place-items-center border border-brand-gold text-lg font-display text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-green">TT</span>
      <span className="leading-none"><strong className="block font-display text-xl font-medium text-brand-cream">Tendai</strong><span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-brand-gold-light">Treasure Craft</span></span>
    </Link>
  );
}