// import { ProductCard } from "../../components/ProductCard";
import { StoreShell } from "../../components/StoreShell";

const deals = [
  {
    title: "Berry Basket",
    price: "$7.99",
    unit: "Limited offer",
    badge: "Save 20%",
    href: "/product",
  },
  {
    title: "Sourdough Loaf",
    price: "$3.49",
    unit: "Fresh baked",
    badge: "Deal of the day",
    href: "/product",
  },
  {
    title: "Sparkling Water",
    price: "$2.99",
    unit: "6 pack",
    badge: "Bundle",
    href: "/product",
  },
];

export default function FlashDealsPage() {
  return (
    <StoreShell title="Flash deals" description="Limited-time offers">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Today’s best offers
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Grab high-value savings before they disappear.
            </p>
          </div>
          <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
            Ends in 03:12:08
          </div>
        </div>

        {/* <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {deals.map((deal) => (
            <ProductCard key={deal.title} {...deal} />
          ))}
        </div> */}
      </div>
    </StoreShell>
  );
}
