"use client";
import Link from "next/link";
// import { ProductCard } from "../components/ProductCard";
import { StoreShell } from "../components/StoreShell";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { useEffect } from "react";
import Banner from "../components/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HomeCategories from "../components/home/HomeCategories";
import PopularProducts from "../components/home/PopularProducts";
import AppPromoBanner from "../components/home/AppPromoBanner";
import NewsLetter from "../components/home/NewsLetter";
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
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
      <AppPromoBanner />
      <NewsLetter />
    </div>
  );
}
