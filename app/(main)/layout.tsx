import { Suspense } from "react";
import Banner from "../components/Banner";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CartProvider>
        <Banner />
        <Navbar />
        <div>
          <Suspense>{children}</Suspense>
        </div>
        <Footer />
        <CartSidebar />
      </CartProvider>
    </>
  );
}
