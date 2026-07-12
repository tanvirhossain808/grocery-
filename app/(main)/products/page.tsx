import { ProductCard } from "../../components/ProductCard";
import { StoreShell } from "../../components/StoreShell";

const products = [
  {
    title: "Organic Bananas",
    price: "$2.49",
    unit: "Per bunch",
    badge: "Fresh",
    href: "/product",
  },
  {
    title: "Avocado Pack",
    price: "$5.80",
    unit: "2 pieces",
    badge: "Popular",
    href: "/product",
  },
  {
    title: "Whole Milk",
    price: "$3.20",
    unit: "1 liter",
    badge: "Daily",
    href: "/product",
  },
  {
    title: "Granola Cereal",
    price: "$4.10",
    unit: "500g",
    badge: "New",
    href: "/product",
  },
];

export default function ProductsPage() {
  return (
    <StoreShell title="Shop fresh groceries" description="Products catalog">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Filter products
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">
              • Fruits & Vegetables
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">• Dairy & Eggs</div>
            <div className="rounded-2xl bg-slate-50 p-3">
              • Pantry Essentials
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">• Snacks & Drinks</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </StoreShell>
  );
}
