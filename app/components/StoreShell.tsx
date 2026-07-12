import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Deals", href: "/flash-deals" },
  { label: "My Orders", href: "/my-orders" },
];

type StoreShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function StoreShell({ title, description, children }: StoreShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_35%),linear-gradient(135deg,_#f8fff9_0%,_#fdfcf7_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-emerald-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20">
              FC
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">FreshCart</p>
              <p className="text-sm text-slate-500">Grocery delivery</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search?q=milk"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm sm:inline-flex"
            >
              Search
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[28px] border border-emerald-100 bg-white/90 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-emerald-600">
            {description}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Shop staples, fresh produce, and pantry essentials in minutes with
            reliable delivery and clear order tracking.
          </p>
        </section>

        {children}
      </main>

      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 FreshCart. Fast grocery delivery for modern households.</p>
          <div className="flex gap-4">
            <Link href="/products" className="hover:text-emerald-600">
              Browse products
            </Link>
            <Link href="/checkout" className="hover:text-emerald-600">
              Checkout
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
