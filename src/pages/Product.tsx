import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Truck, ShieldCheck, Check, MessageCircle, AlertCircle, TrendingDown, PackagePlus, Globe, Clock, Award } from "lucide-react";
import { ProductImage } from "../components/ProductImage";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cn, getImageList, getMainImage, getSecondaryImage } from "../utils";

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  
  const product = products.find((p) => p.slug === slug);
  
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
          <h1 className="text-2xl font-bold mb-4">{t("product.not_found")}</h1>
          <button onClick={() => navigate("/catalog")} className="text-brand-accent underline">
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
                  "flex-shrink-0 w-20 h-24 md:w-24 md:h-32 overflow-hidden border-2 rounded-xl transition-all",
                  activeImage === idx ? "border-brand-navy" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <ProductImage color={currentColor!} type={media.type as any} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] bg-gray-100 overflow-hidden relative rounded-xl shadow-sm">
            <ProductImage
              key={activeImage} // Force re-render for simple crossfade
              color={currentColor!}
              type={imagesList[activeImage]?.type as any}
              alt={product.name[language]}
              className="w-full h-full object-contain md:object-cover animate-fade-in"
              fetchpriority="high"
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-2">
            {product.name[language]}
          </h1>
          <p className="text-lg text-gray-500 mb-6 font-medium">{product.hook[language]}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-brand-accent">{product.price} MAD</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{product.originalPrice} MAD</span>
            )}
            <span className="mx-auto md:ml-auto md:mr-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg flex items-center gap-1">
              <Check className="w-4 h-4" /> {t("product.in_stock")}
            </span>
          </div>

          {/* Upsell Promo block */}
          {product.originalPrice && (
            <div className="flex items-center gap-2 text-brand-accent font-bold mb-6 bg-brand-accent/10 px-4 py-2 rounded-lg">
              <TrendingDown className="w-5 h-5" />
              {t("product.promo_saved")}
            </div>
          )}

          {/* Trust Block */}
          <div className="flex justify-between items-start gap-4 mb-8 py-6 border-y border-gray-100">
            <div className="flex flex-col items-center text-center gap-2 flex-1">
              <Globe className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />
              <span className="text-[11px] font-bold uppercase tracking-wider leading-tight">
                {language === "ar" ? (
                  <>توصيل مجاني<br/>لجميع المدن</>
                ) : (
                  <>Livraison gratuite<br/>partout</>
                )}
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 flex-1 border-x border-gray-100 px-2">
              <div className="relative">
                <Truck className="w-10 h-10 text-brand-navy" strokeWidth={1.5} />
                <Clock className="w-5 h-5 text-brand-accent absolute -bottom-1 -right-2 bg-white rounded-full" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider leading-tight">Livraison<br/>Express</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 flex-1">
              <Award className="w-10 h-10 text-yellow-500" strokeWidth={1.5} />
              <span className="text-[11px] font-bold uppercase tracking-wider leading-tight">100% Satisfaction<br/>Guarantee</span>
            </div>
          </div>
          
          <div className="bg-brand-sand p-4 rounded-xl mb-8 space-y-3 border border-gray-100">
            <div className="flex items-start gap-3 font-medium text-brand-navy">
              <PackagePlus className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold bg-white px-2 py-1 rounded-md border border-gray-200">
                {t("product.upsell_offer")}
              </span>
            </div>
            {product.stockCount < 10 && (
              <div className="flex items-center gap-3 text-sm font-bold text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{t("product.stock_left", { stock: product.stockCount })}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">
              <span>{language === 'ar' ? 'اللون' : 'Couleur'}</span>
            </h3>
            <div className="flex gap-4">
              {product.colors?.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={cn(
                    "relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedColor === color.id
                      ? "border-brand-navy shadow-md scale-105"
                      : "border-transparent hover:border-gray-300"
                  )}
                  title={color.name[language]}
                >
                  <ProductImage color={color} type="main" alt={color.name[language]} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 flex justify-between">
              <span>{t("product.size")}</span>
              <button className="text-gray-500 underline text-xs normal-case">{t("product.size_guide")}</button>
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(""); }}
                  className={cn(
                    "py-3 font-bold uppercase transition-all border rounded-xl",
                    selectedSize === size
                      ? "bg-brand-navy text-white border-brand-navy shadow-md"
                      : "bg-white text-brand-navy border-gray-200 hover:border-brand-navy"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
          </div>

          <div className="mb-8">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">{t("product.quantity")}</h3>
            <div className="flex items-center border border-gray-300 w-32 h-12 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-medium text-lg"
              >
                -
              </button>
              <span className="flex-1 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-medium text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand-navy text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-all shadow-md"
            >
              {t("product.add_to_cart")}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-bold uppercase tracking-wider mb-4">{t("product.description")}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-10 text-center">{t("product.related")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
            <div key={p.id} className="group block cursor-pointer" onClick={() => navigate(`/product/${p.slug}`)}>
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-xl shadow-sm">
                <ProductImage
                  color={p.colors[0]}
                  type="main"
                  alt={p.name[language]}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
                />
                <ProductImage
                  color={p.colors[0]}
                  type="lifestyle"
                  alt={`${p.name[language]} angle`}
                  className="w-full h-full object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <h3 className="font-bold text-brand-navy mb-1 text-lg">{p.name[language]}</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-accent">{p.price} DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
