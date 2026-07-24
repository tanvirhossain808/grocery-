"use client";
import { Product } from "@/app/types";
import { dummyProducts } from "@/public/grocery-assets/assets";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(dummyProducts.slice(0, 10));
  }, []);
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Popular Products</h2>
            <p className="text-sm text-app-text-light mt-1">
              Top rotated products this season
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-app-orange flex items-center gap-1 transition-colors hover:text-app-orange-dark"
          >
            View All <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
