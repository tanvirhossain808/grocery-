"use client";
import { DeliveryPartner } from "@/app/types";
import { LogOutIcon, TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeliveryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [partner, setPartner] = useState<DeliveryPartner | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("delivery_partner");
    const token = localStorage.getItem("delivery_token");
    if (!saved || !token) return router.push("/delivery/login");
    setPartner(JSON.parse(saved));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("delivery_partner");
    localStorage.removeItem("delivery_token");
    setPartner(null);
    router.replace("/delivery/login");
  };

  if (!partner) return null;
  return (
    <div className="min-h-screen bg-app-cream">
      {/* Top Bar */}
      <header className="bg-white border-b border-app-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon className="size-6 text-app-green" />
            <span className="text-lg font-semibold text-app-green">
              Instacart Delivery
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-600">
              {partner?.name}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
