"use client";

import Loading from "@/app/components/Loading";
import ProductCard from "@/app/components/ProductCard";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types";
import { dummyProducts } from "@/public/grocery-assets/assets";
import DummyReviewsSection from "@/public/grocery-assets/DummyReviewsSection";
import { Button } from "@heroui/react";
import api from "@/app/config/api";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const { id } = useParams();
  const router = useRouter();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);
  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);

    const products = api
      .get(`/products/${id}`)
      .then(({ data }) => {
        console.log(data, "data");
        setProduct(data.product);
        return api.get(`/products?category=${data.product.category}`);
      })
      .then(({ data }) => {
        setRelatedProduct(data.products.filter((p: Product) => p.id !== id));
      })
      .catch((error) => {
        console.error(error);
        router.push("/products");
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <Loading />;
  if (!product) return null;

  const cartItem = items.find((item) => item.product.id === id);
  const inCart = !!cartItem;
  const displayLocalQuantity = inCart ? cartItem.quantity : localQuantity;
  const categoryLabel = product.category.replace(/-/, " ");
  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product.id, cartItem.quantity - 1);
      else removeFromCart(product.id);
    } else setLocalQuantity(Math.max(1, localQuantity - 1));
  };
  const handlePlus = () => {
    if (inCart) updateQuantity(product.id, cartItem.quantity + 1);
    else setLocalQuantity(localQuantity + 1);
  };
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
        <Link href="/" className="hover:text-app-green transition-colors">
          <HomeIcon className="size-4" />
        </Link>
        <span>/</span>
        <Link
          className="hover:text-app-green transition-colors"
          href="/products"
        >
          Products
        </Link>
        <span>/</span>
        <Link
          className="hover:text-app-green transition-colors"
          href={`/products?category=${product.category}`}
        >
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-app-green font-medium truncate max-w-[200]">
          {product.name}
        </span>
      </nav>
      {/* 
      back button
      */}
      <Button
        onClick={() => router.back()}
        isIconOnly
        className="mb-6 bg-transparent flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
      </Button>

      {/* Product details section */}
      <div className="bg-white/50 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* image */}
          <div className="relative flex-center p-8 md:p-12 min-h-80 md:min-h-120">
            <Image
              objectFit="contain"
              src={product.image}
              width={360}
              height={360}
              className="max-h-90 w-auto"
              alt={product.name}
            />
            {/* badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
              {product.isOrganic && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                  <LeafIcon className="w-3 h-3" />
                  Organic
                </span>
              )}
              {product.discount > 0 && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span className="text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize">
              {categoryLabel}
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">
              {product.name}
            </h1>

            {/* rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                      key={star}
                    ></StarIcon>
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-app-text-light">
                  {product.reviewCount} reviews
                </span>
              </div>
            )}
            {/* price */}
            <div>
              <span className="text-3xl md:text-4xl font-semibold text-app-green">
                {currency}
                {product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-app-text-light line-through">
                  {currency}
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {/* description */}
            <p className="text-sm text-app-text-light leading-relaxed mb-6">
              {product.description}
            </p>
            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-app-success font-medium">
                  ✓ In Stock {product.stock} available
                </span>
              ) : (
                <span className="text-sm text-app-error font-medium">
                  Out of Stock
                </span>
              )}
            </div>
            {/* quantity to add cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border-app-border rounded-xl overflow-hidden">
                {" "}
                <Button
                  onClick={handleMinus}
                  isIconOnly
                  className="p-3 bg-inherit text-black hover:bg-app-cream transition-colors"
                >
                  <MinusIcon className="size-4" />
                </Button>
                <span className="px-5 text-sm font-semibold min-w-10 text-center">
                  {displayLocalQuantity}
                </span>
                <Button
                  onClick={handlePlus}
                  isIconOnly
                  className="p-3 text-black bg-inherit hover:bg-app-cream transition-colors"
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (!inCart) addToCart(product, localQuantity);
                }}
                isDisabled={product.stock === 0}
                className={`flex-1 py-3 min-h-0 font-semibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"}`}
              >
                <ShoppingCartIcon className="size-4" />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* customer review */}
      {product.reviewCount > 0 && <DummyReviewsSection product={product} />}
      {/* Related products */}
      {relatedProduct.length > 0 && (
        <section className="mt-12 mb-44">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-app-green">
                Related products
              </h2>
              <p className="text-sm text-app-text-light mt-1">
                More from {categoryLabel}
              </p>
            </div>
            <Link
              className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
              href={`/products?category${product.category}`}
            >
              View All <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cold-5 gap-4 xl:gap-8">
        {relatedProduct.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
