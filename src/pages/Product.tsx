import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Truck, ShieldCheck, Check, MessageCircle, AlertCircle, TrendingDown, PackagePlus, Globe, Clock, Award } from "lucide-react";
import { ProductImage } from "../components/ProductImage";
import { products as localProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cn, getImageList, getMainImage, getSecondaryImage } from "../utils";
import { useShopify } from "../context/ShopifyContext";
import { mapShopifyProducts } from "../lib/shopifyAdapter";

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const { products: shopifyProducts, isReady } = useShopify();
  
  const displayProducts = shopifyProducts.length > 0 
    ? mapShopifyProducts(shopifyProducts) 
    : localProducts;

  const product = displayProducts.find((p) => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");
  
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize("");
    setQuantity(1);
    setActiveImage(0);
    setError("");

    if (!product) return;
    
    if (!selectedColor && product.colors) {
      setSelectedColor(product.colors[0].id);
    }

    gsap.fromTo(
      imagesRef.current,
      { x: language === "ar" ? 30 : -30, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { x: language === "ar" ? -30 : 30, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, [product, slug, language, selectedColor]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">{t("product.not_found")}</h1>
          <button onClick={() => navigate("/catalog")} className="text-[#1D1D1F] underline">
            {t("product.back_to_shop")}
          </button>
        </div>
      </div>
    );
  }

  const currentColor = product.colors?.find(c => c.id === selectedColor) || product.colors?.[0];
  const imagesList = currentColor ? getImageList(currentColor) : [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(language === "ar" ? "يرجى اختيار المقاس." : "Veuillez sélectionner une taille.");
      return;
    }
    setError("");
    
    addToCart({
      productId: product.id,
      name: product.name[language],
      price: product.price,
      image: getMainImage(currentColor),
      size: selectedSize,
      colorId: currentColor.id,
      colorName: currentColor.name[language],
      quantity,
    });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Images */}
        <div ref={imagesRef} className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
            {imagesList.map((media, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "flex-shrink-0 w-20 h-24 md:w-24 md:h-32 overflow-hidden border rounded-2xl transition-all",
                  activeImage === idx ? "border-[#1D1D1F]" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <ProductImage color={currentColor!} type={media.type as any} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] md:aspect-auto bg-[#F5F5F7] overflow-hidden relative rounded-2xl md:flex md:items-center md:justify-center">
            <ProductImage
              key={activeImage} // Force re-render for simple crossfade
              color={currentColor!}
              type={imagesList[activeImage]?.type as any}
              alt={product.name[language]}
              className="w-full h-full md:h-auto md:max-h-[85vh] object-cover animate-fade-in"
              imageClassName="md:w-auto md:h-auto md:max-h-[85vh] md:max-w-full md:object-contain"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-serif font-light mb-4">
            {product.name[language]}
          </h1>
          <p className="text-lg text-black/60 mb-8 font-light">{product.hook[language]}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="text-2xl font-serif text-black">{product.price} MAD</span>
            {product.originalPrice && (
              <span className="text-lg text-black/40 line-through font-light">{product.originalPrice} MAD</span>
            )}
            <span className="mx-auto md:ml-auto md:mr-0 bg-black/5 text-black/70 text-[10px] uppercase tracking-widest px-4 py-2 flex items-center gap-2">
              <Check className="w-3 h-3" strokeWidth={1.5} /> {t("product.in_stock")}
            </span>
          </div>

          <div className="mb-10">
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/50 mb-6">
              <span>{language === 'ar' ? 'اللون' : 'Couleur'}</span>
            </h3>
            <div className="flex gap-4">
              {product.colors?.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={cn(
                    "relative w-16 h-20 overflow-hidden border transition-all duration-300",
                    selectedColor === color.id
                      ? "border-black shadow-sm"
                      : "border-transparent hover:border-black/20"
                  )}
                  title={color.name[language]}
                >
                  <ProductImage color={color} type="main" alt={color.name[language]} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/50 mb-6 flex justify-between">
              <span>{t("product.size")}</span>
              <button className="text-black/50 underline hover:text-black transition-colors">{t("product.size_guide")}</button>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(""); }}
                  className={cn(
                    "py-4 font-sans text-xs tracking-widest transition-all border duration-300",
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-black border-black/10 hover:border-black/30"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-xs mt-3 font-medium">{error}</p>}
          </div>

          <div className="mb-12">
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/50 mb-6">{t("product.quantity")}</h3>
            <div className="flex items-center border border-black/10 w-32 h-14 bg-transparent transition-colors hover:border-black/30">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center font-light text-lg text-black/70 hover:text-black transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center font-light text-black">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center font-light text-lg text-black/70 hover:text-black transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white h-14 font-sans text-xs font-medium tracking-widest uppercase hover:bg-black/80 transition-all duration-300"
            >
              {t("product.add_to_cart")}
            </button>
            
            <button
              onClick={() => {
                if (!selectedSize) {
                  setError(language === "ar" ? "يرجى اختيار المقاس." : "Veuillez sélectionner une taille.");
                  return;
                }
                handleAddToCart();
                navigate('/checkout');
              }}
              className="w-full bg-transparent text-black border border-black h-14 font-sans text-xs font-medium tracking-widest uppercase hover:bg-[var(--color-luxury-ivory)] transition-all duration-300"
            >
              {language === "ar" ? "الدفع الآن" : "Passer au paiement"}
            </button>
          </div>

          {/* Premium Trust Badges */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-4 bg-[var(--color-luxury-cream)] border border-black/5 p-5 transition-all duration-300 hover:border-black/10">
              <Truck className="w-5 h-5 text-black" strokeWidth={1} />
              <span className="text-sm font-sans font-light text-black/80">
                {language === 'ar' ? 'توصيل مجاني لطلبين فما فوق' : 'Livraison gratuite dès 2 articles'}
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[var(--color-luxury-cream)] border border-black/5 p-5 transition-all duration-300 hover:border-black/10">
              <Award className="w-5 h-5 text-black" strokeWidth={1} />
              <span className="text-sm font-sans font-light text-black/80">
                {language === 'ar' ? 'خصم 10% على طلبك القادم' : '-10% sur votre prochaine commande'}
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[var(--color-luxury-cream)] border border-black/5 p-5 transition-all duration-300 hover:border-black/10">
              <RefreshCw className="w-5 h-5 text-black" strokeWidth={1} />
              <span className="text-sm font-sans font-light text-black/80">
                {language === 'ar' ? 'إرجاع واستبدال سهل' : 'Retours simples'}
              </span>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-black/10">
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/50 mb-8">{t("product.description")}</h3>
            <p className="text-black/70 font-light leading-relaxed text-sm whitespace-pre-wrap">
              {product.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-32 pt-24 border-t border-black/10">
        <h2 className="text-4xl font-serif font-light text-center mb-16">{t("product.related")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
            <div key={p.id} className="group block cursor-pointer" onClick={() => navigate(`/product/${p.slug}`)}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-luxury-ivory)] mb-6">
                <ProductImage
                  color={p.colors[0]}
                  type="main"
                  alt={p.name[language]}
                  className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 absolute inset-0 z-10"
                />
                <ProductImage
                  color={p.colors[0]}
                  type="lifestyle"
                  alt={`${p.name[language]} angle`}
                  className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </div>
              <h3 className="font-serif text-lg text-black mb-2">{p.name[language]}</h3>
              <div className="flex items-center gap-2">
                <span className="font-sans font-medium text-black">{p.price} DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
