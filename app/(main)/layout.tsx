import Banner from "../components/Banner";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/authContext";
import { CartProvider } from "../context/CartContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Banner />
          <Navbar />
          <div>{children}</div>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
