import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { Truck, Lock } from "lucide-react";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    ville: "",
    adresse: "",
  });

  const hasBundle = items.some(i => i.isBundle);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const isShippingFree = hasBundle || totalQuantity >= 2;
  const shippingCost = isShippingFree ? 0 : 40;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0) {
      navigate("/catalog");
      return;
    }

    gsap.fromTo(
      formRef.current,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      summaryRef.current,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, [items.length, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalToPay = totalPrice + shippingCost;
    
    let message = language === 'ar' 
      ? `*طلب جديد*\n\n*الاسم:* ${formData.nom}\n*الهاتف:* ${formData.telephone}\n*المدينة:* ${formData.ville}\n*العنوان:* ${formData.adresse}\n\n*المنتجات:*\n`
      : `*Nouvelle commande*\n\n*Nom:* ${formData.nom}\n*Téléphone:* ${formData.telephone}\n*Ville:* ${formData.ville}\n*Adresse:* ${formData.adresse}\n\n*Articles:*\n`;

    items.forEach(item => {
      if (item.isBundle) {
        message += `- ${item.quantity}x ${item.name} (${item.price} MAD)\n`;
        item.components?.forEach(c => {
          message += `  • ${c.name} : ${c.colorName}, ${language === 'ar' ? 'المقاس' : 'Taille'}: ${c.size}\n`;
        });
      } else {
        message += `- ${item.quantity}x ${item.name} (${item.colorName} • ${language === 'ar' ? 'المقاس' : 'Taille'}: ${item.size}) - ${item.price} MAD\n`;
      }
    });

    message += language === 'ar'
      ? `\n*الإجمالي:* ${totalToPay} درهم`
      : `\n*Total:* ${totalToPay} MAD`;

    const whatsappUrl = `https://wa.me/212710900502?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Animate out
    gsap.to([formRef.current, summaryRef.current], {
      y: -30,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        clearCart();
        navigate("/thank-you", { state: { orderData: formData } });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (items.length === 0) return null;

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-light tracking-wide">{t("checkout.title")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 md:p-10 shadow-sm border border-black/10">
            <h2 className="font-serif text-2xl font-light mb-8">{t("checkout.delivery_info")}</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block font-sans text-[10px] uppercase tracking-widest text-black/70 mb-3">{t("checkout.name")}</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border-b border-black/20 py-3 bg-transparent font-sans text-sm font-light text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                    placeholder="ex: Fatima Zahra"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block font-sans text-[10px] uppercase tracking-widest text-black/70 mb-3">{t("checkout.phone")}</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full border-b border-black/20 py-3 bg-transparent font-sans text-sm font-light text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                    placeholder="ex: 06 00 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ville" className="block font-sans text-[10px] uppercase tracking-widest text-black/70 mb-3">{t("checkout.city")}</label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  required
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full border-b border-black/20 py-3 bg-transparent font-sans text-sm font-light text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                  placeholder="ex: Casablanca"
                />
              </div>

              <div>
                <label htmlFor="adresse" className="block font-sans text-[10px] uppercase tracking-widest text-black/70 mb-3">{t("checkout.address")}</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  required
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full border-b border-black/20 py-3 bg-transparent font-sans text-sm font-light text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                  placeholder={language === 'ar' ? 'الحي، الشارع، رقم المنزل...' : 'Quartier, rue, numéro de maison...'}
                />
              </div>
            </div>

            <h2 className="font-serif text-2xl font-light mt-12 mb-8">{t("checkout.payment_method")}</h2>
            <div className="border border-black bg-[var(--color-luxury-ivory)] p-6 flex items-center gap-4 cursor-pointer">
              <input type="radio" id="cod" name="payment" defaultChecked className="w-4 h-4 text-black focus:ring-black accent-black" />
              <label htmlFor="cod" className="flex-1 font-sans text-sm font-medium tracking-wide text-black cursor-pointer">
                {t("checkout.cod")}
                <span className="block font-sans text-xs font-light text-black/60 mt-1">{t("checkout.cod_desc")}</span>
              </label>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-black text-white h-14 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-black/80 transition-colors duration-300 flex items-center justify-center gap-3 shadow-xl"
              >
                <Lock className="w-4 h-4" />
                {t("checkout.confirm")}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div ref={summaryRef} className="bg-[var(--color-luxury-cream)] p-8 md:p-10 sticky top-24 border border-black/5">
            <h2 className="font-serif text-2xl font-light mb-8">{t("checkout.summary")}</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative shrink-0">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-black/5" />
                    <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center font-sans text-[10px] tracking-wider">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-serif text-base text-black mb-1">{item.name}</h4>
                    {item.isBundle ? (
                      <div className="font-sans text-[10px] uppercase tracking-widest text-black/60 mt-1 space-y-0.5">
                        {item.components?.map(c => (
                          <div key={c.productId}>- {c.name} : {c.colorName} ({c.size})</div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-sans text-[10px] uppercase tracking-widest text-black/60">{item.colorName} • {t("product.size")}: {item.size}</p>
                    )}
                    <p className="font-sans text-xs font-medium tracking-wide text-black mt-2">{item.price} MAD</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 pt-6 space-y-4 text-sm mt-6">
              <div className="flex justify-between">
                <span className="font-sans text-xs tracking-widest uppercase text-black/60">{t("cart.subtotal")}</span>
                <span className="font-sans text-xs tracking-widest uppercase text-black">{totalPrice} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs tracking-widest uppercase text-black/60">{t("cart.shipping")}</span>
                <span className={isShippingFree ? "font-sans text-xs tracking-widest uppercase text-black text-right" : "font-sans text-xs tracking-widest uppercase text-black text-right"}>
                  {isShippingFree ? t("cart.free") : "40 MAD"}
                  {isShippingFree && (
                    <><br/><span className="font-sans text-[9px] uppercase tracking-widest text-black/40 mt-1 block">24-48h partout au Maroc</span></>
                  )}
                </span>
              </div>
            </div>

            <div className="border-t border-black/10 mt-6 pt-6">
              <div className="flex justify-between items-center font-sans text-sm tracking-widest uppercase text-black">
                <span>{t("cart.total")}</span>
                <span>{totalPrice + shippingCost} MAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
