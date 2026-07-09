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

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

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
    
    const totalToPay = totalQuantity >= 2 ? totalPrice : totalPrice + 40;
    
    let message = language === 'ar' 
      ? `*طلب جديد*\n\n*الاسم:* ${formData.nom}\n*الهاتف:* ${formData.telephone}\n*المدينة:* ${formData.ville}\n*العنوان:* ${formData.adresse}\n\n*المنتجات:*\n`
      : `*Nouvelle commande*\n\n*Nom:* ${formData.nom}\n*Téléphone:* ${formData.telephone}\n*Ville:* ${formData.ville}\n*Adresse:* ${formData.adresse}\n\n*Articles:*\n`;

    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${language === 'ar' ? 'المقاس' : 'Taille'}: ${item.size}) - ${item.price} MAD\n`;
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
        <h1 className="text-3xl font-bold uppercase tracking-wider">{t("checkout.title")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 rounded-xl">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">{t("checkout.delivery_info")}</h2>
            
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
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
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
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
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
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
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
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
                  placeholder={language === 'ar' ? 'الحي، الشارع، رقم المنزل...' : 'Quartier, rue, numéro de maison...'}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold uppercase tracking-wider mt-10 mb-6">{t("checkout.payment_method")}</h2>
            <div className="border border-brand-navy bg-brand-sand/50 p-4 rounded-xl flex items-center gap-4 cursor-pointer">
              <input type="radio" id="cod" name="payment" defaultChecked className="w-5 h-5 text-brand-navy focus:ring-brand-navy" />
              <label htmlFor="cod" className="flex-1 font-medium cursor-pointer">
                {t("checkout.cod")}
                <span className="block text-sm text-gray-500 font-normal mt-1">{t("checkout.cod_desc")}</span>
              </label>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-brand-navy text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {t("checkout.confirm")}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div ref={summaryRef} className="bg-brand-sand p-6 md:p-8 rounded-xl sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">{t("checkout.summary")}</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-gray-200 rounded-lg" />
                    <span className="absolute -top-2 -right-2 bg-brand-accent text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-bold text-brand-navy">{item.name}</h4>
                    <p className="text-gray-500">{t("product.size")}: {item.size}</p>
                    <p className="font-semibold mt-1">{item.price} MAD</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.subtotal")}</span>
                <span className="font-semibold">{totalPrice} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("cart.shipping")}</span>
                <span className={totalQuantity >= 2 ? "text-green-600 font-medium text-right" : "text-brand-navy font-medium text-right"}>
                  {totalQuantity >= 2 ? t("cart.free") : "40 MAD"}
                  {totalQuantity >= 2 && (
                    <><br/><span className="text-xs text-gray-500 font-normal">24-48h partout au Maroc</span></>
                  )}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{t("cart.total")}</span>
                <span>{totalQuantity >= 2 ? totalPrice : totalPrice + 40} MAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
