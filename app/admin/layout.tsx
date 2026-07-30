"use client";
import {
  BarChart3Icon,
  LogOutIcon,
  PackageSearchIcon,
  PlusIcon,
  ShieldIcon,
  ShoppingBagIcon,
  Truck,
} from "lucide-react";
import Banner from "../components/Banner";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "../context/authContext";
import Loading from "../components/Loading";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, loading } = useAuthContext();
  const pathName = usePathname();
  const navigation = useRouter();
  const AdminLinkData = [
    { to: "/admin", label: "Dashboard", icon: BarChart3Icon },
    { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
    { to: "/admin/products", label: "Products", icon: PackageSearchIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
    { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
    { to: "/", label: "Exit", icon: LogOutIcon },
  ];
  if (loading) return <Loading />;
  if (!user?.isAdmin) return navigation.replace("/login");
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="max-lg:hidden">
          <Navbar />
        </div>
        <div className="flex flex-col h-full lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          {/* Admin Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 h-fit bg-white rounded-2xl p-4 border border-app-border">
            <div className="pb-4 mb-4 border-b border-app-border">
              <h2 className="text-lg font-semibold text-app-green flex items-center gap-2 px-2">
                <ShieldIcon className="size-5 text-green-900" /> Admin Panel
              </h2>
            </div>
            <nav className="flex flex-col gap-1.5">
              {AdminLinkData.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  //   end={true}
                  className={`flex items-center gap-3 p-2.5 rounded-md text-sm transition-colors ${
                    pathName === link.to
                      ? "bg-app-green text-white"
                      : "text-app-text-light hover:bg-orange-50 hover:text-zinc-900"
                  }`}
                >
                  <link.icon className="size-4" /> {link.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
