import type { Metadata } from "next";
import ShopPage from "./shop-page";

export const metadata: Metadata = {
  title: "Shop Handcrafted Bags — Tendai Treasure Craft",
  description:
    "Browse handcrafted tote bags, pouches, travel bags and crossbody styles by Tendai Treasure Craft.",

  alternates: {
    canonical: "/shop",
  },

  openGraph: {
    title: "Shop Handcrafted Bags — Tendai Treasure Craft",
    description:
      "Find a handcrafted bag made for your everyday movement.",
    type: "website",
    url: "/shop",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop Handcrafted Bags — Tendai Treasure Craft",
    description:
      "Find a handcrafted bag made for your everyday movement.",
  },
};

export default function Page() {
  return <ShopPage />;
}