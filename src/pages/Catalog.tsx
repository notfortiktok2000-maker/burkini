import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Catalog() {
  const { t, language } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">{t("catalog.title")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("catalog.subtitle")}
        </p>
      </div>

      {/* Filter Bar - Visual Only */}
      <div className="flex justify-between items-center py-4 border-y border-gray-200 mb-10">
        <button className="flex items-center gap-2 text-sm font-medium hover:text-brand-accent transition-colors">
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
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-xl shadow-sm">
              <img
                src={product.colors[0].images.front}
                alt={product.name[language]}
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
              />
              <img
                src={product.colors[0].images.angle}
                alt={`${product.name[language]} angle`}
                className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              {product.stockCount < 5 && (
                <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-md">
                  {t("catalog.almost_sold_out")}
                </div>
              )}
            </div>
            <h3 className="font-bold text-brand-navy mb-1 text-lg">{product.name[language]}</h3>
            <p className="text-sm text-gray-500 mb-2 truncate">{product.hook[language]}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-brand-accent">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{product.originalPrice} DH</span>
              )}
            </div>
            <div className="w-full text-center border border-brand-navy py-3 text-sm font-semibold uppercase tracking-wider rounded-xl group-hover:bg-brand-navy group-hover:text-white transition-colors">
              {t("catalog.view_product")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
