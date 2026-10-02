'use client';

import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-brand-green-dark text-brand-cream">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <BrandMark />
          <p className="mt-6 max-w-sm text-sm leading-7 text-brand-cream/70">
            Modern African craftsmanship made for everyday movement. Designed
            and finished with character in Kenya.
          </p>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Explore
          </h3>
          <div className="grid gap-3 text-sm text-brand-cream/75">
            <Link href="/shop">Shop all</Link>
            <Link href="/#collections">Collections</Link>
            <Link href="/#story">Our story</Link>
            <span>Delivery & returns</span>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Come say hello
          </h3>
          <div className="grid gap-3 text-sm text-brand-cream/75">
            <a href="mailto:hello@tendaitreasure.co.ke">
              hello@tendaitreasure.co.ke
            </a>
            <a href="tel:+254700000000">+254 700 000 000</a>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-gold/20 px-6 py-5 text-center text-[10px] uppercase tracking-[0.17em] text-brand-cream/50">
        © 2026 Tendai Treasure Craft · Privacy · Terms
      </div>
    </footer>
  );
}
