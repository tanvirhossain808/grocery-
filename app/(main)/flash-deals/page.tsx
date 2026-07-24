"use client";
import { Product } from "@/app/types";
import { dummyProducts } from "@/public/grocery-assets/assets";
import { Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dummyProducts.filter((p) => p.stock > 0));
    setTimeout(() => setLoading(false), 0);
  }, []);

  return (
    <div className="min-h bg-app-cream">
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:-px-6 lg:px-8 text-center">
          <div className="flex-center gap-2 mb-3">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">Flash Deals</h1>
            <Zap className="size-6 fill-white" />
            <p className="text-white/80 mx-auto max-w-md">
              Limited-time offers on your favorite organic products. Grab them
              before they`&apos;`re gone!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;
