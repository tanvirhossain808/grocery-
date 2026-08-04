"use client";
import React from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { Button } from "@heroui/react";
import { useCart } from "../context/CartContext";
interface Props {
  product: Product;
}
//ts
const ProductCard = ({ product }: Props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const router = useRouter();
  // const { addToCart } = { addToCart: (_data: any) => {} };
  const { addToCart } = useCart();
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md translation-all duration-300 group animate-fade-in cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={217}
          height={217}
          className="w-full h-full p-4 group group-hover:p-2 transition-all duration-300"
          objectFit="cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-app-orange text-white rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
      <div className="p-3.5 text-zinc-900">
        <h3 className="text-sm leading-snug mb-1.5 line-camp-2">
          {product.name}
        </h3>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-3 text-app-warning fill-app-warning" />
            <span className="text-xs font-medium text-app-text">
              {product.rating}
            </span>
            <span className="text-xs text-app-text-light">
              {product.reviewCount}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 truncate">
            <span className="text-base font-medium">
              {currency}
              {product.price.toFixed(1)}
            </span>
            <span className="text-xs text-app-text-light block">
              {product.unit}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-app-text-light line-through ml-1.5">
                {currency}
                {product.originalPrice.toFixed(1)}
              </span>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            isIconOnly
            className="size-7 rounded-full bg-app-orange hover:bg-app-orange-dark translation-colors text-white active:scale-95"
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
