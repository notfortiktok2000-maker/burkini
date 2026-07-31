import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../utils";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t, language } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.to(drawerRef.current, { [language === "ar" ? "x" : "x"]: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
      gsap.to(drawerRef.current, { x: language === "ar" ? "-100%" : "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isCartOpen, language]);

  const handleRemove = (id: string, el: HTMLElement | null) => {
    if (el) {
      gsap.to(el, {
        opacity: 0,
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

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50 invisible opacity-0"
        onClick={() => setIsCartOpen(false)}
      />
      <div
        ref={drawerRef}
        className={cn(
          "fixed top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col",
          language === "ar" ? "left-0 -translate-x-full" : "right-0 translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">{t("cart.title")}</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
              <p>{t("cart.empty")}</p>
              <Link
                to="/catalog"
                onClick={() => setIsCartOpen(false)}
                className="text-brand-accent font-medium hover:underline"
              >
                {t("cart.back_to_shop")}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {totalQuantity >= 2 && (
                <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-2 rounded-lg text-center uppercase tracking-wider">
                  🎉 Livraison gratuite et -10% sur prochaine commande activées !
                </div>
              )}
              {items.map((item) => (
                <div key={item.id} id={`cart-item-${item.id}`} className="flex gap-4 border-b border-gray-50 pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm text-brand-navy">{item.name}</h3>
                        <button
                          onClick={() => handleRemove(item.id, document.getElementById(`cart-item-${item.id}`))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.colorName} • {t("product.size")}: {item.size}</p>
                      <p className="font-semibold text-brand-navy mt-1">{item.price} MAD</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t("cart.subtotal")}</span>
              <span className="font-semibold">{totalPrice} MAD</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">{t("cart.shipping")}</span>
              <span className={totalQuantity >= 2 ? "text-green-600 font-medium" : "text-brand-navy font-medium"}>
                {totalQuantity >= 2 ? t("cart.free") : "40 MAD"}
              </span>
            </div>
            <div className="flex justify-between mb-6 text-lg font-bold">
              <span>{t("cart.total")}</span>
              <span>{totalQuantity >= 2 ? totalPrice : totalPrice + 40} MAD</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-colors"
            >
              {t("cart.checkout")}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 flex justify-center items-center gap-1">
              {t("cart.cod_available")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
