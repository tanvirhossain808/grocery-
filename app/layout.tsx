import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import { AuthProvider } from "./context/authContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
const g = Geist_Mono({
  variable: "--font-f",
  subsets: ["latin"],
});

const dm_serif = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FreshCart | Grocery Delivery",
  description:
    "Professional grocery delivery storefront with products, deals, checkout, and order tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${g.variable} ${dm_serif.variable} h-full antialiased`}
    >
      {/* // <html lang="en" className={`h-full antialiased`}> */}
      <body className="min-h-full flex flex-col">
        <ToastProvider />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
