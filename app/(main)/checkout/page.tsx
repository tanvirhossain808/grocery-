import Link from "next/link";
import { StoreShell } from "../../components/StoreShell";

export default function CheckoutPage() {
  return (
    <StoreShell title="Checkout" description="Secure payment and delivery">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Review your order
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Organic Bananas</p>
                <p className="text-sm text-slate-500">Qty 2</p>
              </div>
              <p className="font-semibold text-slate-900">$4.98</p>
            </div>
            <div className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Fresh Milk</p>
                <p className="text-sm text-slate-500">Qty 1</p>
              </div>
              <p className="font-semibold text-slate-900">$3.20</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-[24px] border border-slate-200 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>$8.18</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Delivery</span>
              <span>$2.00</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>$10.18</span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Delivery details
          </h3>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Address</p>
              <p>12 Orchard Street, Apt 4</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Payment</p>
              <p>Visa ending in 4242</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Time slot</p>
              <p>Today • 6:00 PM - 7:00 PM</p>
            </div>
          </div>

          <Link
            href="/order-tracking"
            className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Place order
          </Link>
        </div>
      </div>
    </StoreShell>
  );
}
