import { productImages } from "../data/imageManifest";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, CreditCard, RefreshCw } from "lucide-react";
import { products as localProducts } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import { ProductImage } from "../components/ProductImage";
import { useShopify } from "../context/ShopifyContext";
import { mapShopifyProducts } from "../lib/shopifyAdapter";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t, language } = useLanguage();
  const { products: shopifyProducts, isReady } = useShopify();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const displayProducts = shopifyProducts.length > 0
    ? mapShopifyProducts(shopifyProducts)
    : localProducts;

  useEffect(() => {
    // Hero Animation
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" }
    )
      .fromTo(
        titleRef.current,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    // Features ScrollTrigger
    gsap.fromTo(
      featuresRef.current?.children ? Array.from(featuresRef.current.children) : [],
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
      }
    );

    // Products Stagger Reveal
    if (productGridRef.current) {
      gsap.fromTo(
        productGridRef.current.children,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productGridRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000&ar=16:9"
            alt="Elegant Women's Clothing Hero"
            className="w-full h-full object-contain object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-medium tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
          >
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto opacity-90">
            {t("hero.subtitle")}
          </p>
          <Link
            ref={ctaRef}
            to="/catalog"
            className="inline-block bg-white text-[#1D1D1F] px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#F5F5F7] transition-colors rounded-full"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Value Strip */}
      <section className="bg-[#1D1D1F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 mb-4 text-[#1D1D1F]" />
              <h3 className="font-bold text-lg mb-2">{t("features.delivery.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.delivery.desc")}</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-8 h-8 mb-4 text-[#1D1D1F]" />
              <h3 className="font-bold text-lg mb-2">{t("features.cod.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.cod.desc")}</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-8 h-8 mb-4 text-[#1D1D1F]" />
              <h3 className="font-bold text-lg mb-2">{t("features.exchange.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.exchange.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium tracking-wide mb-4">Boutique</h2>
          <div className="w-16 h-1 bg-[#1D1D1F] mx-auto rounded-full"></div>
        </div>

        <div ref={productGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card: Ensemble Alma */}
          {displayProducts.filter(p => p.slug === 'ensemble-alma').map((product) => (
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
              </div>
              <h3 className="font-bold text-[#1D1D1F] mb-1 text-lg">{product.name[language]}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.hook[language]}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1D1D1F]">{product.price} DH</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice} DH</span>
                )}
              </div>
            </Link>
          ))}

          {/* Card: Sandales Maya */}
          {displayProducts.filter(p => p.slug === 'sandales-maya').map((product) => (
            <div key={product.id} className="group block">
              <Link to={`/product/${product.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F7] mb-4 rounded-2xl">
                  <ProductImage
                    color={product.colors[0]}
                    type="main"
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
                  />
                  <ProductImage
                    color={product.colors[1] || product.colors[0]}
                    type="main"
                    alt={`${product.name[language]} angle`}
                    className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
              </Link>
              <h3 className="font-bold text-[#1D1D1F] mb-1 text-lg">{product.name[language]}</h3>
              <p className="text-gray-500 text-sm mb-2">Trois couleurs faciles à porter</p>
              <p className="text-gray-400 text-xs mb-2">Noir • Blanc • Marron cognac</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-[#1D1D1F]">{product.price} DH</span>
              </div>
              <div className="flex gap-2">
                <Link to={`/product/${product.slug}`} className="flex-1 text-center bg-[#1D1D1F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1D1D1F]/90 transition">
                  Voir les sandales
                </Link>
                <Link to={`/product/${product.slug}`} className="flex-1 text-center bg-gray-100 text-[#1D1D1F] px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                  Choisir ma couleur
                </Link>
              </div>
            </div>
          ))}

          {/* Card: Look Alma Complet */}
          <div className="group block border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
            <Link to="/product/look-alma-complet">
              <div className="relative aspect-[3/4] overflow-hidden bg-white mb-4 rounded-xl flex">
                <div className="w-1/2 h-full border-r border-gray-100 relative">
                   <img src={productImages.ensembleAlma.blue.main.src} alt="Ensemble" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 h-full flex flex-col">
                  <div className="h-1/2 border-b border-gray-100 relative">
                    <img src={productImages.sandalesMaya.white.main.src} alt="Sandales" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-1/2 relative">
                    <img src={productImages.ensembleAlma.blue.lifestyle.src} alt="Lifestyle" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-[#1D1D1F] text-white text-xs font-bold px-2 py-1 rounded">
                  Offre look complet
                </div>
              </div>
            </Link>
            <h3 className="font-bold text-[#1D1D1F] mb-1 text-lg">Look Alma Complet</h3>
            <p className="text-gray-500 text-sm mb-2">Ensemble Alma + Sandales Maya</p>
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1D1D1F]">429 DH</span>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">Économisez 79 DH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">Valeur : 508 DH livraison comprise</span>
                <span className="text-xs font-medium text-[#1D1D1F]">Livraison offerte</span>
              </div>
            </div>
            <Link to="/product/look-alma-complet" className="block text-center w-full bg-[#1D1D1F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1D1D1F]/90 transition">
              Découvrir le look complet
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F5F7] py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-medium tracking-wide mb-12">{t("home.testimonials.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 shadow-sm rounded-2xl border border-gray-100">
              <div className="text-[#1D1D1F] mb-4">★★★★★</div>
              <p className="italic text-gray-700 mb-4">
                {t("home.testimonials.1")}
              </p>
              <p className="font-bold text-sm uppercase">— Salma T.</p>
            </div>
            <div className="bg-white p-8 shadow-sm rounded-2xl border border-gray-100">
              <div className="text-[#1D1D1F] mb-4">★★★★★</div>
              <p className="italic text-gray-700 mb-4">
                {t("home.testimonials.2")}
              </p>
              <p className="font-bold text-sm uppercase">— Fatima Z.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
