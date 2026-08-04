import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../utils";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t, language } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(drawerRef.current, { x: language === "ar" ? "-100%" : "100%", duration: 0.4, ease: "power3.in" });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, language]);

  const handleRemove = (id: string, element: HTMLElement | null) => {
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: language === "ar" ? -50 : 50,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        onComplete: () => removeFromCart(id),
      });
    } else {
      removeFromCart(id);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasEnsemble = items.some(i => i.productId === "prod_alma" && !i.isBundle);
  const hasSandals = items.some(i => i.productId === "SANDALES-MAYA" && !i.isBundle);
  const hasBundle = items.some(i => i.isBundle);

  // Bundle delivery is free, others are free if totalQuantity >= 2
  const isShippingFree = hasBundle || totalQuantity >= 2;
  const shippingCost = isShippingFree ? 0 : 40;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 z-50 invisible opacity-0 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      <div
        ref={drawerRef}
        className={cn(
          "fixed top-0 h-full w-full max-w-md bg-[var(--color-luxury-cream)] z-50 flex flex-col",
          language === "ar" ? "left-0 -translate-x-full" : "right-0 translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <h2 className="font-serif text-2xl font-light tracking-wide">{t("cart.title")}</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300">
            <X className="w-5 h-5 text-black" strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <p className="font-serif text-xl font-light text-black/50">{t("cart.empty")}</p>
              <Link
                to="/catalog"
                onClick={() => setIsCartOpen(false)}
                className="font-sans text-[10px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors"
              >
                {t("cart.back_to_shop")}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {totalQuantity >= 2 && !hasBundle && (
                <div className="bg-[var(--color-luxury-ivory)] border border-black/5 text-black font-sans text-xs uppercase tracking-widest px-4 py-3 text-center">
                  Livraison gratuite activée
                </div>
              )}
              {items.map((item) => (
                <div key={item.id} id={`cart-item-${item.id}`} className="flex gap-6 border-b border-black/5 pb-6">
                  <img src={item.image} alt={item.name} className="w-24 h-32 object-cover border border-black/5" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg text-black leading-tight pr-4">{item.name}</h3>
                        <button
                          onClick={() => handleRemove(item.id, document.getElementById(`cart-item-${item.id}`))}
                          className="text-black/40 hover:text-black transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1} />
                        </button>
                      </div>
                      
                      {item.isBundle ? (
                        <div className="font-sans text-[10px] uppercase tracking-widest text-black/60 mt-3 space-y-1">
                          {item.components?.map(c => (
                            <div key={c.productId}>- {c.name} : {c.colorName} ({c.size})</div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-sans text-[10px] uppercase tracking-widest text-black/60 mt-3">{item.colorName} • {item.size}</p>
                      )}
                      
                      <div className="flex items-center gap-3 mt-3">
                        <p className="font-sans text-xs font-medium tracking-wide text-black">{item.price} MAD</p>
                        {item.isBundle && (
                           <span className="font-sans text-[9px] uppercase tracking-widest text-black/60 border border-black/20 px-2 py-1">-79 DH</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-black/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-black/50 hover:bg-black/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1} />
                        </button>
                        <span className="px-3 font-sans text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-black/50 hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cross-Sell */}
              {hasEnsemble && !hasSandals && !hasBundle && (
                <div className="bg-[var(--color-luxury-ivory)] p-6 border border-black/5 text-center mt-8">
                  <h4 className="font-serif text-xl italic text-black mb-3">Le Look Alma</h4>
                  <p className="font-sans text-xs font-light tracking-wide text-black/70 mb-5 leading-relaxed">
                    Ajoutez les Sandales Maya et profitez de la tenue complète à 429 DH. Livraison offerte.
                  </p>
                  <Link
                    to="/product/look-alma-complet"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block w-full bg-transparent text-black border border-black py-3 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500"
                  >
                    Découvrir l'offre
                  </Link>
                </div>
              )}
              {hasSandals && !hasEnsemble && !hasBundle && (
                <div className="bg-[var(--color-luxury-ivory)] p-6 border border-black/5 text-center mt-8">
                  <h4 className="font-serif text-xl italic text-black mb-3">Le Look Alma</h4>
                  <p className="font-sans text-xs font-light tracking-wide text-black/70 mb-5 leading-relaxed">
                    Ajoutez l’Ensemble Alma et profitez de la tenue complète à 429 DH. Livraison offerte.
                  </p>
                  <Link
                    to="/product/look-alma-complet"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block w-full bg-transparent text-black border border-black py-3 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500"
                  >
                    Découvrir l'offre
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-white">
            <div className="flex justify-between mb-3 font-sans text-xs tracking-widest text-black/60 uppercase">
              <span>{t("cart.subtotal")}</span>
              <span className="text-black">{totalPrice} MAD</span>
            </div>
            <div className="flex justify-between mb-6 font-sans text-xs tracking-widest text-black/60 uppercase">
              <span>{t("cart.shipping")}</span>
              <span className={isShippingFree ? "text-black" : "text-black"}>
                {isShippingFree ? t("cart.free") : "40 MAD"}
              </span>
            </div>
            <div className="flex justify-between mb-8 font-sans text-sm tracking-widest text-black uppercase">
              <span>{t("cart.total")}</span>
              <span>{totalPrice + shippingCost} MAD</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-black/80 transition-colors duration-300 shadow-xl"
            >
              {t("cart.checkout")}
            </button>
            <p className="text-center font-sans text-[9px] uppercase tracking-widest text-black/40 mt-4">
              {t("cart.cod_available")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
