"use client";
import FilterPanel from "@/app/components/FilterPanel";
import Loading from "@/app/components/Loading";
import ProductCard from "@/app/components/ProductCard";
import api from "@/app/config/api";
import { Product } from "@/app/types";
import { categoriesData, dummyProducts } from "@/public/grocery-assets/assets";
import { Button } from "@heroui/react";
import { ChevronDown, Home, SlidersHorizontal, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Products = () => {
  const searchParams = useSearchParams();
  // console.log(rest, "rest");
  const pathName = usePathname();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const {
    category = "",
    page: pageString = "1",
    organic = "",
    sort = "",
    minPrice = "",
    maxPrice = "",
  } = Object.fromEntries(searchParams.entries());
  const page = Number(pageString);
  const fetchProducts = async () => {
    setLoading(true);
    // setProducts(
    //   dummyProducts.filter((p) => p.category === category || category === ""),
    // );
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (organic) params.set("organic", organic);
      if (sort) params.set("sort", sort);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      params.set("page", String(page));
      params.set("limit", "12");
      const { data } = await api.get(`/products?${params.toString()}`);
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    if (key !== "page") newParams.delete("page");
    router.push(pathName + "?" + newParams);
  };
  const clearFilters = () => router.push(pathName);
  const activeCategory = categoriesData.find((c) => c.slug === category);
  const hasFilters = minPrice || maxPrice || organic || sort || page || organic;
  console.log(activeCategory, "active");
  useEffect(() => {
    fetchProducts();
  }, [organic, minPrice, maxPrice, sort, page, category]);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* breadCrump */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link href="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
        </nav>
        <div className="flex gap-8 xl:gap-10">
          {/* sidebar-desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <FilterPanel
                categories={categoriesData}
                category={category}
                maxPrice={maxPrice}
                organic={organic}
                minPrice={minPrice}
                updateFilters={updateFilters}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
          </aside>
          {/* main-content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-app-green">
                  {activeCategory ? activeCategory.name : "All Products"}
                </h1>
                <p className="text-app-text-light mt-0.5">
                  {products.length} products found
                </p>
              </div>
              <div className="flex flex-col lg:items-center gap-3">
                {/* Mobile filter toggle */}
                <Button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-2 py-2 text-sm text-black bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors"
                >
                  <SlidersHorizontal className="size-4 " /> Filters
                </Button>
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
                    value={sort}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_dec">Price:High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
                </div>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-app-green mb-2">
                  No products found
                </p>
                <p>Try adjusting your filters or search items</p>
                <Button
                  onClick={clearFilters}
                  className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-xl hover:bg-app-green-light transition-colors"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                {products.map(
                  (product) =>
                    product.stock > 0 && (
                      <ProductCard product={product} key={product.id} />
                    ),
                )}
              </div>
            )}
            {/* pagination */}
            {totalPages > 1 && (
              <div className="flex-center gap-2 mt-16">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    className={`size-9 rounded-lg text-sm font-medium translation-colors ${page === i + 1 ? "bg-app-green text-white" : "bg-white text-app-text-light hover:bg-app-cream"}`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      {/* 
           mobile filter modal
    */}

      {mobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMobileFilterOpen(false)}
          >
            <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-up">
              <div className="flex items-center justify-between p-4 border-b border-app-border">
                <h3 className="text-lg font-semibold text-app-green">
                  Filters
                </h3>
                <Button
                  isIconOnly
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 bg-inherit text-black hover:bg-app-cream rounded-lg"
                >
                  <XIcon className="size-5" />
                </Button>
              </div>
              <div className="p-4">
                <FilterPanel
                  categories={categoriesData}
                  category={category}
                  maxPrice={maxPrice}
                  organic={organic}
                  minPrice={minPrice}
                  updateFilters={updateFilters}
                  clearFilters={clearFilters}
                  hasFilters={hasFilters}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
