import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products as localProducts } from "../data/products";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ProductImage } from "../components/ProductImage";
import { useShopify } from "../context/ShopifyContext";
import { mapShopifyProducts } from "../lib/shopifyAdapter";

gsap.registerPlugin(ScrollTrigger);

export default function Catalog() {
  const { t, language } = useLanguage();
  const { products: shopifyProducts, isReady } = useShopify();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // If Shopify has products, use them, otherwise use local fallback
  const displayProducts = shopifyProducts.length > 0 
    ? mapShopifyProducts(shopifyProducts) 
    : localProducts;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      headerRef.current,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
    );

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen mt-8">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-4xl font-medium tracking-wide mb-4">{t("catalog.title")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("catalog.subtitle")}
        </p>
      </div>

      {/* Filter Bar - Visual Only */}
      <div className="flex justify-between items-center py-4 border-y border-gray-200 mb-10">
        <button className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          {t("catalog.filters")}
        </button>
        <div className="text-sm">
          <span className="text-gray-500 mx-2">{t("catalog.sort_by")}</span>
          <select className="bg-transparent font-medium focus:outline-none cursor-pointer">
            <option>{t("catalog.sort.new")}</option>
            <option>{t("catalog.sort.price_asc")}</option>
            <option>{t("catalog.sort.price_desc")}</option>
          </select>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {displayProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F7] mb-4 rounded-2xl">
              <ProductImage
                color={product.colors[0]}
                type="main"
                alt={product.name[language]}
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
              />
              <ProductImage
                color={product.colors[0]}
                type="lifestyle"
                alt={`${product.name[language]} angle`}
                className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              {product.stockCount < 5 && (
                <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-medium px-3 py-1 tracking-wide rounded-md">
                  {t("catalog.almost_sold_out")}
                </div>
              )}
            </div>
            <h3 className="font-bold text-[#1D1D1F] mb-1 text-lg">{product.name[language]}</h3>
            <p className="text-sm text-gray-500 mb-2 truncate">{product.hook[language]}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-[#1D1D1F]">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{product.originalPrice} DH</span>
              )}
            </div>
            <div className="w-full text-center border border-[#1D1D1F] py-3 text-sm font-semibold tracking-wide rounded-2xl group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
              {t("catalog.view_product")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
