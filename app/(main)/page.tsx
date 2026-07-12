"use client";
import Link from "next/link";
import { ProductCard } from "../components/ProductCard";
import { StoreShell } from "../components/StoreShell";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@heroui/react";

const featuredProducts = [
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
];

export default function Home() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1B3022",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
          },
        }}
      />
      <div>
        <Spinner color="danger" size="sm" className="text-app-green" />
      </div>
      {/* <StoreShell
        title="Fresh groceries, delivered fast"
        description="Home page"
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-500 p-6 text-white shadow-xl shadow-emerald-600/20 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-50/80">
              New this week
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Build your cart with essentials in under 10 minutes.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/90 sm:text-base">
              Enjoy fresh produce, pantry staples, and wellness picks with
              friendly delivery and live order updates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-white px-5 py-3 font-semibold text-emerald-700"
              >
                Shop now
              </Link>
              <Link
                href="/flash-deals"
                className="rounded-full border border-white/70 px-5 py-3 font-semibold text-white"
              >
                View deals
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Why FreshCart
            </h3>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="rounded-[20px] bg-slate-50 p-4">
                • Fast delivery in under 30 minutes.
              </div>
              <div className="rounded-[20px] bg-slate-50 p-4">
                • Real-time order tracking from store to doorstep.
              </div>
              <div className="rounded-[20px] bg-slate-50 p-4">
                • Trusted local products and simple checkout.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Featured picks
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Popular items chosen for weekly grocery runs.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-emerald-600"
            >
              View all products
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </StoreShell> */}
    </>
  );
}
