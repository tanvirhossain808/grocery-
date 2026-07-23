import { categoriesData } from "@/public/grocery-assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeCategories = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold">Browse Categories</h2>
          <p className="text-sm text-app-light mt-1">
            Find exactly what you need using
          </p>
        </div>
      </div>
      <div className="flex items-center mt-8 overflow-x-scroll no-scrollbar">
        {categoriesData.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            onClick={() => scrollTo(0, 0)}
            className="group flex flex-col items-center gap-3 p-4"
          >
            <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-x-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all">
              <Image
                src={cat.image}
                className="w-full h-full object-contain rounded-full transition-all"
                width={104}
                height={104}
                alt={cat.slug}
              />
            </div>
            <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
