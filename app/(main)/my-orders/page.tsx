"use client";
import Link from "next/link";
import { StoreShell } from "../../components/StoreShell";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const orders = [
  { id: "#1024", date: "May 22, 2026", status: "Delivered", total: "$86.40" },
  { id: "#1019", date: "May 18, 2026", status: "On the way", total: "$54.20" },
  { id: "#1012", date: "May 14, 2026", status: "Packed", total: "$72.10" },
];

export default function MyOrdersPage() {
  useEffect(() => {
    setTimeout(() => {
      toast("Your order has been placed successfully!");
    }, 1000);
  }, []);
  return (
    <>
      <StoreShell title="My orders" description="Order history">
        <button
          onClick={() => {
            toast("Your order has been placed successfully!");
          }}
        >
          Show Toast
        </button>
        <div className="grid gap-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Recent purchases
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Track every delivery from checkout to your doorstep.
                </p>
              </div>
              <Link
                href="/order-tracking"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Track active order
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {order.id}
                    </p>
                    <p className="text-sm text-slate-500">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {order.total}
                    </span>
                    <Link
                      href="/order-tracking"
                      className="text-sm font-semibold text-emerald-600"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StoreShell>
    </>
  );
}
