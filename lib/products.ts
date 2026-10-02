
export type Product = {
  id: string;
  name: string;
  price: number;
  previousPrice?: number;
  category: "Totes" | "Pouches" | "Crossbody" | "Travel";
  material: "Leather" | "Canvas" | "African Print";
  color: "Brown" | "Cream" | "Green" | "Multi";
  badge?: string;
  available: boolean;
  image: string;
  hoverImage: string;
  position: string;
  hoverPosition: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "denka-tote",
    name: "Denka Tote Bag",
    price: 6800,
    category: "Totes",
    material: "Leather",
    color: "Brown",
    badge: "Best Seller",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "15% 42%",
    hoverPosition: "72% 45%",
    description:
      "A structured everyday tote cut from supple leather with a generous, considered interior.",
  },
  {
    id: "vibes-pouch",
    name: "Vibes Essentials Pouch",
    price: 2400,
    category: "Pouches",
    material: "African Print",
    color: "Multi",
    badge: "New",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "88% 70%",
    hoverPosition: "35% 75%",
    description:
      "A compact patterned pouch for the small things you reach for most.",
  },
  {
    id: "safari-carry",
    name: "Safari Carry Tote",
    price: 5200,
    previousPrice: 5900,
    category: "Totes",
    material: "Canvas",
    color: "Cream",
    badge: "Limited",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "69% 33%",
    hoverPosition: "20% 65%",
    description:
      "Durable natural canvas framed with joyful wax-print panels for daily movement.",
  },
  {
    id: "nomad-crossbody",
    name: "Nomad Crossbody",
    price: 4600,
    category: "Crossbody",
    material: "Leather",
    color: "Green",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "43% 73%",
    hoverPosition: "65% 35%",
    description:
      "Hands-free and quietly distinctive, with an adjustable strap and soft curved profile.",
  },
  {
    id: "heritage-print",
    name: "Heritage Print Tote",
    price: 6100,
    category: "Totes",
    material: "African Print",
    color: "Multi",
    badge: "New",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "72% 34%",
    hoverPosition: "12% 28%",
    description:
      "A celebration of pattern, balanced by a practical shape and reinforced handles.",
  },
  {
    id: "urban-craft",
    name: "Urban Craft Bag",
    price: 5700,
    category: "Crossbody",
    material: "Leather",
    color: "Brown",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "45% 68%",
    hoverPosition: "78% 30%",
    description:
      "An easy city companion with warm leather, neat stitching and just enough room.",
  },
  {
    id: "weekend-essential",
    name: "Weekend Essential",
    price: 7500,
    category: "Travel",
    material: "Canvas",
    color: "Cream",
    badge: "Best Seller",
    available: true,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "65% 38%",
    hoverPosition: "45% 48%",
    description:
      "A roomy carryall designed for market mornings, road trips and unhurried weekends.",
  },
  {
    id: "classic-pouch",
    name: "Classic Leather Pouch",
    price: 2900,
    category: "Pouches",
    material: "Leather",
    color: "Brown",
    available: false,
    image: "/tendai-products.jpg",
    hoverImage: "/tendai-craft.jpg",
    position: "18% 50%",
    hoverPosition: "74% 74%",
    description:
      "A clean-lined leather pouch finished by hand and made to age beautifully.",
  },
];

export function formatKES(value: number) {
  return `KES ${new Intl.NumberFormat("en-KE").format(value)}`;
}
