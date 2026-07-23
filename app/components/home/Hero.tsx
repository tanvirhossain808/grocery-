import { assets, heroSectionData } from "@/public/grocery-assets/assets";
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-135 overflow-hidden rounded-3xl flex items-center mb-10">
      <Image
        src={assets.hero_bg}
        fill
        alt="hero"
        sizes="100vw"
        loading="eager"
        objectFit="cover"
        aria-label="Hero banner"
      />
      <div className="inset-0 absolute bg-linear-to-r from-app-green via-app-green/65 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 py-20 w-full">
        <div className="max-w-xl xl:pl-10">
          <span className="px-4 py-1.5 text-orange-300 bg-orange-300/10 inline-flex items-center mb-5 rounded-full gap-1.5">
            <LeafIcon size={12} /> Farm-Fresh & Organic
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-white mb-5">
            Nourish your home with <span>Earth&apos;s finest</span>
          </h1>
          <p className="text-base text-white/70 leading-relaxed mb-5 max-w-md">
            {heroSectionData.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="bg-orange-400 px-7 py-3 text-white font-semibold rounded-full hover:bg-orange-500 translation-all flex-center gap-2 active:scale-[0.98] "
            >
              Shop Now <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/products"
              className="bg-white/10 px-7 py-3 text-white font-semibold rounded-full hover:bg-white/20 border border-white/20 translation-all flex-center gap-2 active:scale-[0.98] "
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
