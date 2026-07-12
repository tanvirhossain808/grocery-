import { StoreShell } from "../../components/StoreShell";

const addresses = [
  { label: "Home", detail: "12 Orchard Street, Apt 4, Brooklyn" },
  { label: "Office", detail: "88 Market Plaza, Floor 9, Manhattan" },
];

export default function AddressPage() {
  return (
    <StoreShell title="Saved addresses" description="Delivery locations">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Choose a delivery address
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Use your preferred address for future orders.
              </p>
            </div>
            <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Add address
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {addresses.map((address) => (
              <div
                key={address.label}
                className="rounded-[20px] border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-900">{address.label}</p>
                <p className="mt-1 text-sm text-slate-600">{address.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">Quick tips</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Add a landmark to help your rider find you faster.</li>
            <li>• Save a backup address for office or weekend delivery.</li>
            <li>• Keep your contact number updated for smoother handoff.</li>
          </ul>
        </div>
      </div>
    </StoreShell>
  );
}
