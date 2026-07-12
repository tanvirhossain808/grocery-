import { StoreShell } from "../../components/StoreShell";

const steps = [
  {
    title: "Order placed",
    detail: "Your basket was confirmed 10 minutes ago.",
  },
  { title: "Ready for pickup", detail: "The store is preparing your items." },
  { title: "Out for delivery", detail: "A rider is heading to your address." },
  { title: "Delivered", detail: "Enjoy your fresh groceries." },
];

export default function OrderTrackingPage() {
  return (
    <StoreShell title="Order tracking" description="Live delivery status">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
                Delivery #1024
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Your order is on the way
              </h2>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              12 mins left
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4"
              >
                <div
                  className={`mt-1 h-3 w-3 rounded-full ${index < 2 ? "bg-emerald-500" : "bg-slate-300"}`}
                />
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Delivery summary
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Driver: Omar K.</li>
            <li>• Phone: +1 555-0142</li>
            <li>• Address: 12 Orchard Street, Apt 4</li>
            <li>• ETA: 12:15 PM</li>
          </ul>
        </div>
      </div>
    </StoreShell>
  );
}
