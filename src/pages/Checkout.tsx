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
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-medium tracking-wide">{t("checkout.title")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 rounded-2xl">
            <h2 className="text-xl font-medium tracking-wide mb-6">{t("checkout.delivery_info")}</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">{t("checkout.name")}</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-brand-navy transition-all"
                    placeholder="ex: Fatima Zahra"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">{t("checkout.phone")}</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-brand-navy transition-all"
                    placeholder="ex: 06 00 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">{t("checkout.city")}</label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  required
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-brand-navy transition-all"
                  placeholder="ex: Casablanca"
                />
              </div>

              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">{t("checkout.address")}</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  required
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-brand-navy transition-all"
                  placeholder={language === 'ar' ? 'الحي، الشارع، رقم المنزل...' : 'Quartier, rue, numéro de maison...'}
                />
              </div>
            </div>

            <h2 className="text-xl font-medium tracking-wide mt-10 mb-6">{t("checkout.payment_method")}</h2>
            <div className="border border-[#1D1D1F] bg-[#F5F5F7]/50 p-4 rounded-2xl flex items-center gap-4 cursor-pointer">
              <input type="radio" id="cod" name="payment" defaultChecked className="w-5 h-5 text-[#1D1D1F] focus:ring-brand-navy" />
              <label htmlFor="cod" className="flex-1 font-medium cursor-pointer">
                {t("checkout.cod")}
                <span className="block text-sm text-gray-500 font-normal mt-1">{t("checkout.cod_desc")}</span>
              </label>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-[#1D1D1F] text-white h-14 rounded-full font-medium tracking-tight hover:bg-[#1D1D1F]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {t("checkout.confirm")}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div ref={summaryRef} className="bg-[#F5F5F7] p-6 md:p-8 rounded-2xl sticky top-24">
            <h2 className="text-xl font-medium tracking-wide mb-6">{t("checkout.summary")}</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative shrink-0">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-gray-200 rounded-lg" />
                    <span className="absolute -top-2 -right-2 bg-[#1D1D1F] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-bold text-[#1D1D1F]">{item.name}</h4>
                    {item.isBundle ? (
                      <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                        {item.components?.map(c => (
                          <div key={c.productId}>- {c.name} : {c.colorName} ({c.size})</div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">{item.colorName} • {t("product.size")}: {item.size}</p>
                    )}
                    <p className="font-semibold mt-1 text-[#1D1D1F]">{item.price} MAD</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.subtotal")}</span>
                <span className="font-semibold">{totalPrice} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.shipping")}</span>
                <span className={isShippingFree ? "text-green-600 font-medium text-right" : "text-[#1D1D1F] font-medium text-right"}>
                  {isShippingFree ? t("cart.free") : "40 MAD"}
                  {isShippingFree && (
                    <><br/><span className="text-xs text-gray-500 font-normal">24-48h partout au Maroc</span></>
                  )}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
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
