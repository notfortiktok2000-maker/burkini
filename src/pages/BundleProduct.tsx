import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Truck, ShieldCheck, Check, MessageCircle, AlertCircle, TrendingDown, PackagePlus, Globe, Clock, Award } from "lucide-react";
import { ProductImage } from "../components/ProductImage";
import { products, lookAlmaBundle } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cn, getImageList, getMainImage } from "../utils";

export default function BundleProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, setIsCartOpen } = useCart();
  const { t, language } = useLanguage();
  
  const ensembleProduct = products.find(p => p.id === "prod_alma")!;
  const sandalsProduct = products.find(p => p.id === "SANDALES-MAYA")!;

  const [ensembleSize, setEnsembleSize] = useState<string>("");
  const [sandalSize, setSandalSize] = useState<string>("");
  const [ensembleColor, setEnsembleColor] = useState<string>(ensembleProduct.colors[0].id);
  const [sandalColor, setSandalColor] = useState<string>(sandalsProduct.colors[0].id);
  const [activeImage, setActiveImage] = useState(0);
  
  const [error, setError] = useState("");
  
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImage(0);
  }, [ensembleColor]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setError("");

    if (location.state) {
      if (location.state.ensembleColor) setEnsembleColor(location.state.ensembleColor);
      if (location.state.ensembleSize) setEnsembleSize(location.state.ensembleSize);
      if (location.state.sandalColor) setSandalColor(location.state.sandalColor);
      if (location.state.sandalSize) setSandalSize(location.state.sandalSize);
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
  }, [language, location.state]);

  const selectedEnsembleColorObj = ensembleProduct.colors.find(c => c.id === ensembleColor) || ensembleProduct.colors[0];
  const selectedSandalColorObj = sandalsProduct.colors.find(c => c.id === sandalColor) || sandalsProduct.colors[0];

  const bundleImages = [
    ...getImageList(selectedEnsembleColorObj).map(m => ({ ...m, product: 'ensemble', colorObj: selectedEnsembleColorObj })),
    ...getImageList(selectedSandalColorObj).map(m => ({ ...m, product: 'sandal', colorObj: selectedSandalColorObj }))
  ];

  const handleAddToCart = () => {
    if (!ensembleSize) {
      setError(language === "ar" ? "يرجى اختيار مقاس الطقم." : "Veuillez sélectionner la taille de l'ensemble.");
      return;
    }
    if (!sandalSize) {
      setError(language === "ar" ? "يرجى اختيار مقاس الصندل." : "Veuillez sélectionner la pointure des sandales.");
      return;
    }
    setError("");
    
    addToCart({
      productId: lookAlmaBundle.id,
      name: lookAlmaBundle.name[language as 'fr' | 'ar'] || lookAlmaBundle.name.fr,
      price: lookAlmaBundle.price,
      image: getMainImage(selectedEnsembleColorObj),
      size: `${ensembleSize} / ${sandalSize}`,
      colorId: `${ensembleColor}-${sandalColor}`,
      colorName: `${selectedEnsembleColorObj.name[language as 'fr' | 'ar'] || selectedEnsembleColorObj.name.fr} + ${selectedSandalColorObj.name[language as 'fr' | 'ar'] || selectedSandalColorObj.name.fr}`,
      quantity: 1,
      isBundle: true,
      components: [
        {
          productId: ensembleProduct.id,
          name: ensembleProduct.name[language as 'fr' | 'ar'] || ensembleProduct.name.fr,
          colorId: ensembleColor,
          colorName: selectedEnsembleColorObj.name[language as 'fr' | 'ar'] || selectedEnsembleColorObj.name.fr,
          size: ensembleSize,
          sku: `ALMA-${ensembleColor.toUpperCase()}-${ensembleSize}`
        },
        {
          productId: sandalsProduct.id,
          name: sandalsProduct.name[language as 'fr' | 'ar'] || sandalsProduct.name.fr,
          colorId: sandalColor,
          colorName: selectedSandalColorObj.name[language as 'fr' | 'ar'] || selectedSandalColorObj.name.fr,
          size: sandalSize,
          sku: `MAYA-${sandalColor.toUpperCase()}-${sandalSize}`
        }
      ]
    });
    
    setIsCartOpen(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Images */}
        <div ref={imagesRef} className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
            {bundleImages.map((media, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "flex-shrink-0 w-20 h-24 md:w-24 md:h-32 overflow-hidden border rounded-2xl transition-all",
                  activeImage === idx ? "border-[#1D1D1F]" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <ProductImage color={media.colorObj} type={media.type as any} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] md:aspect-auto bg-[#F5F5F7] overflow-hidden relative rounded-2xl md:flex md:items-center md:justify-center">
            {bundleImages[activeImage] && (
              <ProductImage
                key={`${activeImage}-${bundleImages[activeImage].product}`}
                color={bundleImages[activeImage].colorObj}
                type={bundleImages[activeImage].type as any}
                alt={bundleImages[activeImage].product === 'ensemble' ? (ensembleProduct.name[language as 'fr' | 'ar'] || ensembleProduct.name.fr) : (sandalsProduct.name[language as 'fr' | 'ar'] || sandalsProduct.name.fr)}
                className="w-full h-full md:h-auto md:max-h-[85vh] object-cover animate-fade-in"
                imageClassName="md:w-auto md:h-auto md:max-h-[85vh] md:max-w-full md:object-contain"
                fetchPriority="high"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-medium tracking-tight mb-2">
            {lookAlmaBundle.name[language as 'fr' | 'ar'] || lookAlmaBundle.name.fr}
          </h1>
          <p className="text-lg text-gray-500 mb-6 font-medium">
            {language === 'ar' ? 'الطقم الانسيابي مع الصندل الذي يجهزانك في ثوانٍ.' : 'L’ensemble fluide et les sandales qui vous habillent en quelques secondes.'}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-3xl font-medium text-[#1D1D1F]">{lookAlmaBundle.price} MAD</span>
            <span className="text-xl text-gray-400 line-through">{lookAlmaBundle.separateProductsValue} MAD</span>
            <span className="mx-auto md:ml-auto md:mr-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 tracking-wide rounded-lg flex items-center gap-1">
              Économisez {lookAlmaBundle.customerSavings} DH
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#1D1D1F] font-medium mb-6 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
             <TrendingDown className="w-5 h-5" />
             Livraison offerte
          </div>

          <div className="bg-[#F5F5F7] p-4 md:p-6 rounded-2xl mb-8 space-y-6 border border-gray-100">
            {/* Ensemble config */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold tracking-wide text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px]">1</span>
                  Ensemble Alma
                </h3>
              </div>
              <div className="flex gap-3 mb-4">
                {ensembleProduct.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setEnsembleColor(color.id)}
                    className={cn(
                      "relative w-12 h-16 rounded-xl overflow-hidden border transition-all",
                      ensembleColor === color.id
                        ? "border-[#1D1D1F] shadow-sm scale-105"
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <ProductImage color={color} type="main" alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {ensembleProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setEnsembleSize(size); setError(""); }}
                    className={cn(
                      "py-2 text-sm font-medium transition-all border rounded-xl",
                      ensembleSize === size
                        ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm"
                        : "bg-white text-[#1D1D1F] border-gray-200 hover:border-[#1D1D1F]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* Sandales config */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold tracking-wide text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px]">2</span>
                  Sandales Maya
                </h3>
              </div>
              <div className="flex gap-3 mb-4">
                {sandalsProduct.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSandalColor(color.id)}
                    className={cn(
                      "relative w-12 h-16 rounded-xl overflow-hidden border transition-all",
                      sandalColor === color.id
                        ? "border-[#1D1D1F] shadow-sm scale-105"
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <ProductImage color={color} type="main" alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {sandalsProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSandalSize(size); setError(""); }}
                    className={cn(
                      "py-2 text-sm font-medium transition-all border rounded-xl",
                      sandalSize === size
                        ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm"
                        : "bg-white text-[#1D1D1F] border-gray-200 hover:border-[#1D1D1F]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#1D1D1F] text-white h-14 rounded-full font-medium tracking-tight hover:bg-[#1D1D1F]/90 transition-all shadow-sm"
            >
              Commander le look complet
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold tracking-wide mb-4">Ce qui est inclus</h3>
            <ul className="text-gray-600 leading-relaxed text-sm space-y-2 list-disc pl-4">
              <li>1x Ensemble Alma (Tunique et pantalon fluide)</li>
              <li>1x Sandales Maya plates et confortables</li>
              <li>Livraison rapide et gratuite partout au Maroc</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
