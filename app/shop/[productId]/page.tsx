import { redirect } from "next/navigation";

import { products } from "@/lib/products";
import ProductPage from "./ProductPage";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function Page({
  params,
}: ProductPageProps) {
  const { productId } = await params;

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    redirect("/shop");
  }

  return <ProductPage product={product} />;
}