import Link from "next/link";

type ProductCardProps = {
  title: string;
  price: string;
  unit: string;
  badge: string;
  href: string;
};

export function ProductCard({
  title,
  price,
  unit,
  badge,
  href,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-36 items-center justify-center rounded-[20px] bg-gradient-to-br from-emerald-100 via-white to-orange-50">
        <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
          {badge}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{unit}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">{price}</span>
          <span className="text-sm font-semibold text-emerald-600">
            View item
          </span>
        </div>
      </div>
    </Link>
  );
}
