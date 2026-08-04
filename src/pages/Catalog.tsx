import { productImages } from "../data/imageManifest";
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
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div ref={headerRef} className="text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-serif font-light mb-6 tracking-wide">{t("catalog.title")}</h1>
        <p className="text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
          {t("catalog.subtitle")}
        </p>
      </div>

      {/* Filter Bar - Visual Only */}
      <div className="flex justify-between items-center py-6 border-y border-black/10 mb-16">
        <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-black/70 hover:text-black transition-colors">
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1} />
          {t("catalog.filters")}
        </button>
        <div className="text-[10px] uppercase tracking-[0.2em] flex items-center">
          <span className="text-black/50 mr-4">{t("catalog.sort_by")}</span>
          <select className="bg-transparent text-black border-none focus:outline-none cursor-pointer tracking-widest uppercase">
            <option>{t("catalog.sort.new")}</option>
            <option>{t("catalog.sort.price_asc")}</option>
            <option>{t("catalog.sort.price_desc")}</option>
          </select>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {displayProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-luxury-ivory)] mb-6">
              <ProductImage
                color={product.colors[0]}
                type="main"
                alt={product.name[language]}
                className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 absolute inset-0 z-10"
              />
              <ProductImage
                color={product.colors[0]}
                type="lifestyle"
                alt={`${product.name[language]} angle`}
                className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              {product.stockCount < 5 && (
                <div className="absolute top-4 left-4 z-20 bg-black/5 backdrop-blur-md border border-black/10 text-black text-[9px] uppercase tracking-widest px-3 py-1">
                  {t("catalog.almost_sold_out")}
                </div>
              )}
            </div>
            <h3 className="font-serif text-lg text-black mb-2">{product.name[language]}</h3>
            <p className="text-xs text-black/50 font-light mb-4 truncate">{product.hook[language]}</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans font-medium text-black">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-xs text-black/40 line-through">{product.originalPrice} DH</span>
              )}
            </div>
            <div className="w-full text-center border border-black/10 py-3 text-[10px] uppercase tracking-[0.2em] group-hover:bg-black group-hover:text-white transition-colors duration-500">
              {t("catalog.view_product")}
            </div>
          </Link>
        ))}

        {/* Bundle Product Card */}
        <Link to="/product/look-alma-complet" className="group block">
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-luxury-cream)] mb-6 flex border border-black/5">
            <div className="w-1/2 h-full border-r border-black/5 relative">
                <img src={productImages.ensembleAlma.blue.main.src} alt="Ensemble" className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 absolute inset-0 z-10" />
                <img src={productImages.ensembleAlma.blue.lifestyle.src} alt="Ensemble Angle" className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
            </div>
            <div className="w-1/2 h-full flex flex-col relative">
                <div className="h-1/2 border-b border-black/5 relative">
                  <img src={productImages.sandalesMaya.white.main.src} alt="Sandales" className="w-full h-full object-cover absolute inset-0 z-10 transition-opacity duration-700 group-hover:opacity-0" />
                  <img src={productImages.sandalesMaya.white.detail.src} alt="Sandales Detail" className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                </div>
                <div className="h-1/2 relative">
                  <img src={productImages.ensembleAlma.blue.lifestyle.src} alt="Lifestyle" className="w-full h-full object-cover absolute inset-0" />
                </div>
            </div>
            <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md border border-black/10 text-black text-[9px] uppercase tracking-widest px-3 py-1">
              Offre Complète
            </div>
          </div>
          <h3 className="font-serif text-lg italic text-black mb-2">Look Alma Complet</h3>
          <p className="text-xs text-black/50 font-light mb-4 truncate">Ensemble + Sandales</p>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans font-medium text-black">429 DH</span>
            <span className="text-xs text-black/40 line-through">508 DH</span>
          </div>
          <div className="w-full text-center border border-black/10 py-3 text-[10px] uppercase tracking-[0.2em] group-hover:bg-black group-hover:text-white transition-colors duration-500">
            {t("catalog.view_product")}
          </div>
        </Link>
      </div>
    </div>
  );
}
