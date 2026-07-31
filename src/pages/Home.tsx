import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, CreditCard, RefreshCw } from "lucide-react";
import { products } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

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
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6 max-w-4xl mx-auto leading-tight"
          >
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto opacity-90">
            {t("hero.subtitle")}
          </p>
          <Link
            ref={ctaRef}
            to="/catalog"
            className="inline-block bg-white text-brand-navy px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-sand transition-colors rounded-xl shadow-lg"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Value Strip */}
      <section className="bg-brand-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 mb-4 text-brand-accent" />
              <h3 className="font-bold text-lg mb-2">{t("features.delivery.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.delivery.desc")}</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-8 h-8 mb-4 text-brand-accent" />
              <h3 className="font-bold text-lg mb-2">{t("features.cod.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.cod.desc")}</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-8 h-8 mb-4 text-brand-accent" />
              <h3 className="font-bold text-lg mb-2">{t("features.exchange.title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.exchange.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-4">{t("home.new_arrivals")}</h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full"></div>
        </div>

        <div ref={productGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              </div>
              <h3 className="font-bold text-brand-navy mb-1 text-lg">{product.name[language]}</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-accent">{product.price} DH</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice} DH</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-sand py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-12">{t("home.testimonials.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100">
              <div className="text-brand-accent mb-4">★★★★★</div>
              <p className="italic text-gray-700 mb-4">
                {t("home.testimonials.1")}
              </p>
              <p className="font-bold text-sm uppercase">— Salma T.</p>
            </div>
            <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100">
              <div className="text-brand-accent mb-4">★★★★★</div>
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
