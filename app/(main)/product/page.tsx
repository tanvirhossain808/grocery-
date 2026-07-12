import Link from "next/link";
import { StoreShell } from "../../components/StoreShell";

export default function ProductPage() {
  return (
    <StoreShell title="Product details" description="Featured item">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-72 items-center justify-center rounded-[24px] bg-gradient-to-br from-emerald-100 via-white to-orange-50">
            <div className="rounded-full bg-white/80 px-5 py-3 text-lg font-semibold text-emerald-700 shadow-sm">
              Organic Bananas
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Fresh pick
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Organic Bananas
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Sweet, ripe bananas from trusted local farms. Perfect for
            breakfasts, smoothies, and healthy snacks.
          </p>

          <div className="mt-6 flex items-center justify-between rounded-[24px] bg-slate-50 p-4">
            <div>
              <p className="text-sm text-slate-500">Price</p>
              <p className="text-2xl font-semibold text-slate-900">$2.49</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              In stock
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">
              Add to cart
            </button>
            <Link
              href="/checkout"
              className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
