import Link from "next/link";
// import { ProductCard } from "../../components/ProductCard";
import { StoreShell } from "../../components/StoreShell";

const results = [
  {
    title: "Organic Apples",
    price: "$4.20",
    unit: "1 kg",
    badge: "Seasonal",
    href: "/product",
  },
  {
    title: "Fresh Spinach",
    price: "$2.90",
    unit: "200g",
    badge: "Leafy",
    href: "/product",
  },
  {
    title: "Cold Pressed Juice",
    price: "$6.50",
    unit: "500ml",
    badge: "Trending",
    href: "/product",
  },
];

export default function SearchResultsPage() {
  return (
    <StoreShell title="Search results" description="Find what you need quickly">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Results for “fresh”
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              3 products matched your search.
            </p>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600"
          >
            Browse all
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* {results.map((result) => (
            <ProductCard key={result.title} {...result} />
          ))} */}
        </div>
      </div>
    </StoreShell>
  );
}
