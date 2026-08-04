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
import { ProcessSection } from "../components/ProcessSection";

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
    <div className="pb-24 bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] flex flex-col justify-end pb-24 lg:justify-center lg:pb-0 items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/CKggfGSF/Website-hero-banner-design-Oc-ane-202608041530.jpg"
            alt="Océane Modest Collection"
            className="w-full h-full object-cover object-[center_top] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 w-full flex flex-col items-center">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/80 mb-6 font-sans">
            {t("hero.eyebrow")}
          </p>
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light mb-8 max-w-4xl mx-auto leading-[1.05]"
          >
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-lg font-light mb-12 max-w-xl mx-auto opacity-90 font-sans leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <Link
            ref={ctaRef}
            to="/catalog"
            className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-xs font-medium tracking-[0.1em] uppercase hover:bg-black hover:text-white transition-all duration-500 rounded-none w-full md:w-auto"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      <ProcessSection />

      {/* Value Strip */}
      <section className="bg-[var(--color-luxury-sand)] text-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-black/10 rtl:divide-x-reverse">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <Truck className="w-6 h-6 mb-6 text-black" strokeWidth={1} />
              <h3 className="font-serif text-xl mb-3">{t("features.delivery.title")}</h3>
              <p className="text-black/60 text-sm font-light tracking-wide">{t("features.delivery.desc")}</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <CreditCard className="w-6 h-6 mb-6 text-black" strokeWidth={1} />
              <h3 className="font-serif text-xl mb-3">{t("features.cod.title")}</h3>
              <p className="text-black/60 text-sm font-light tracking-wide">{t("features.cod.desc")}</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <RefreshCw className="w-6 h-6 mb-6 text-black" strokeWidth={1} />
              <h3 className="font-serif text-xl mb-3">{t("features.exchange.title")}</h3>
              <p className="text-black/60 text-sm font-light tracking-wide">{t("features.exchange.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1400px] mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/40 mb-4 font-sans">
            La Sélection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Boutique</h2>
        </div>
        
        <div ref={productGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {/* Card: Ensemble Alma */}
          {displayProducts.filter(p => p.slug === 'ensemble-alma').map((product) => (
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
              </div>
              <div className="text-center px-4">
                <h3 className="font-serif text-xl text-black mb-2">{product.name[language]}</h3>
                <p className="text-black/50 text-sm mb-4 font-light">{product.hook[language]}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-medium text-black tracking-wide">{product.price} DH</span>
                  {product.originalPrice && (
                    <span className="text-sm text-black/40 line-through">{product.originalPrice} DH</span>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* Card: Sandales Maya */}
          {displayProducts.filter(p => p.slug === 'sandales-maya').map((product) => (
            <div key={product.id} className="group block">
              <Link to={`/product/${product.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-luxury-ivory)] mb-6">
                  <ProductImage
                    color={product.colors[0]}
                    type="main"
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 absolute inset-0 z-10"
                  />
                  <ProductImage
                    color={product.colors[1] || product.colors[0]}
                    type="main"
                    alt={`${product.name[language]} angle`}
                    className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                </div>
              </Link>
              <div className="text-center px-4 mb-6">
                <h3 className="font-serif text-xl text-black mb-2">{product.name[language]}</h3>
                <p className="text-black/50 text-sm mb-2 font-light">Trois couleurs faciles à porter</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="font-medium text-black tracking-wide">{product.price} DH</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-4">
                <Link to={`/product/${product.slug}`} className="w-full text-center bg-black text-white px-6 py-4 text-xs font-medium tracking-widest uppercase hover:bg-black/80 transition-all duration-300">
                  Voir les sandales
                </Link>
              </div>
            </div>
          ))}

          {/* Card: Look Alma Complet */}
          <div className="group block bg-[var(--color-luxury-cream)] p-6">
            <Link to="/product/look-alma-complet">
              <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6 flex">
                <div className="w-1/2 h-full border-r border-black/5 relative">
                   <img src={productImages.ensembleAlma.blue.main.src} alt="Ensemble" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 h-full flex flex-col">
                  <div className="h-1/2 border-b border-black/5 relative">
                    <img src={productImages.sandalesMaya.white.main.src} alt="Sandales" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-1/2 relative">
                    <img src={productImages.ensembleAlma.blue.lifestyle.src} alt="Lifestyle" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-medium px-4 py-2">
                  L'Offre Complète
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h3 className="font-serif text-xl text-black mb-2">Look Alma Complet</h3>
              <p className="text-black/50 text-sm mb-4 font-light">Ensemble Alma + Sandales Maya</p>
              
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-medium text-black tracking-wide">429 DH</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#7C9A92] font-medium bg-[#7C9A92]/10 px-3 py-1">-79 DH</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs text-black/40 line-through">Valeur : 508 DH</span>
                  <span className="text-[10px] uppercase tracking-widest font-medium text-black">Livraison offerte</span>
                </div>
              </div>
              
              <Link to="/product/look-alma-complet" className="block text-center w-full bg-transparent border border-black text-black px-6 py-4 text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300">
                Découvrir le look
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--color-luxury-ivory)] py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/40 mb-4 font-sans">
            Témoignages
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-20">{t("home.testimonials.title")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-8 text-black">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-2xl lg:text-3xl font-light italic text-black leading-relaxed mb-8">
                {t("home.testimonials.1")}
              </p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-black/50">— Salma T.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-8 text-black">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-2xl lg:text-3xl font-light italic text-black leading-relaxed mb-8">
                {t("home.testimonials.2")}
              </p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-black/50">— Fatima Z.</p>
            </div>
        </div>
        </div>
      </section>
    </div>
  );
}
