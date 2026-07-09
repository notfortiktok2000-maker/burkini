import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "nav.home": "Accueil",
    "nav.shop": "Boutique",
    "nav.cart": "Panier",
    "hero.title": "L'Élégance à la plage",
    "hero.subtitle": "Découvrez notre nouvelle collection de maillots de bain couvrants. Confort, style et pudeur.",
    "hero.cta": "Découvrir la collection",
    "features.delivery.title": "Livraison 24-48h",
    "features.delivery.desc": "Partout au Maroc",
    "features.cod.title": "Paiement à la livraison",
    "features.cod.desc": "Achetez en toute sécurité",
    "features.exchange.title": "Échanges faciles",
    "features.exchange.desc": "La taille ne convient pas ?",
    "home.new_arrivals": "Nouveautés",
    "home.testimonials.title": "Elles l'ont adopté",
    "home.testimonials.1": "\"Super qualité, sèche très vite et la coupe est parfaite. Livraison très rapide sur Casa, merci Océane !\"",
    "home.testimonials.2": "\"J'ai pris l'ensemble Modalina pour mes vacances. Magnifique, très classe et le tissu est top. Je recommande.\"",
    "catalog.title": "Notre Collection",
    "catalog.subtitle": "Découvrez notre sélection de maillots de bain modestes. Pensés pour allier élégance, confort et liberté de mouvement.",
    "catalog.filters": "Filtres",
    "catalog.sort_by": "Trier par:",
    "catalog.sort.new": "Nouveautés",
    "catalog.sort.price_asc": "Prix croissant",
    "catalog.sort.price_desc": "Prix décroissant",
    "catalog.almost_sold_out": "Bientôt épuisé",
    "catalog.view_product": "Voir le produit",
    "product.not_found": "Produit introuvable",
    "product.back_to_shop": "Retour à la boutique",
    "product.in_stock": "En stock",
    "product.stock_left": "Il reste seulement {stock} en stock !",
    "product.delivery_info": "Livraison 24-48h partout au Maroc",
    "product.cod_info": "Paiement à la livraison disponible",
    "product.promo_saved": "Vous avez économisé 120 DH sur ce produit",
    "product.upsell_offer": "Offre spéciale: Achetez 2 articles pour bénéficier de la livraison gratuite et -10% sur votre prochaine commande !",
    "product.size": "Taille",
    "product.size_guide": "Guide des tailles",
    "product.quantity": "Quantité",
    "product.add_to_cart": "Ajouter au panier",
    "product.order_whatsapp": "Commander via WhatsApp",
    "product.description": "Description",
    "product.related": "Vous aimerez aussi",
    "cart.title": "Votre Panier",
    "cart.empty": "Votre panier est vide.",
    "cart.back_to_shop": "Retour au catalogue",
    "cart.subtotal": "Sous-total",
    "cart.shipping": "Livraison (partout au Maroc)",
    "cart.free": "Gratuite",
    "cart.shipping_calc": "Calculée à l'étape suivante",
    "cart.total": "Total",
    "cart.checkout": "Passer la commande",
    "cart.cod_available": "Paiement à la livraison disponible",
    "checkout.title": "Finaliser la commande",
    "checkout.delivery_info": "Informations de livraison",
    "checkout.name": "Nom Complet",
    "checkout.phone": "Téléphone (WhatsApp)",
    "checkout.city": "Ville",
    "checkout.address": "Adresse Complète",
    "checkout.payment_method": "Mode de paiement",
    "checkout.cod": "Paiement à la livraison",
    "checkout.cod_desc": "Vous paierez en espèces à la réception de votre commande.",
    "checkout.confirm": "Confirmer la commande",
    "checkout.summary": "Résumé",
    "thank_you.title": "Commande Confirmée !",
    "thank_you.message": "Merci {name} ! Votre commande a bien été enregistrée.",
    "thank_you.steps": "Prochaines étapes",
    "thank_you.step_1": "Notre équipe va préparer votre commande aujourd'hui.",
    "thank_you.step_2": "Vous recevrez un appel de confirmation sur le {phone}.",
    "thank_you.step_3": "Livraison estimée sous 24 à 48 heures à {city}.",
    "thank_you.step_4": "Paiement en espèces à la livraison.",
    "thank_you.whatsapp_confirm": "Confirmer sur WhatsApp",
    "thank_you.continue_shopping": "Continuer mes achats",
    "footer.desc": "La marque de maillots de bain couvrants pensée pour la femme moderne au Maroc. Élégance, confort et qualité.",
    "footer.links": "Liens Utiles",
    "footer.shipping_returns": "Livraison & Retours",
    "footer.faq": "FAQ",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.cart": "السلة",
    "hero.title": "أناقة على الشاطئ",
    "hero.subtitle": "اكتشفي تشكيلتنا الجديدة من ملابس السباحة المحتشمة. راحة، أناقة وحشمة.",
    "hero.cta": "استكشفي التشكيلة",
    "features.delivery.title": "توصيل خلال 24-48 ساعة",
    "features.delivery.desc": "في جميع أنحاء المغرب",
    "features.cod.title": "الدفع عند الاستلام",
    "features.cod.desc": "تسوقي بكل أمان",
    "features.exchange.title": "استبدال سهل",
    "features.exchange.desc": "المقاس غير مناسب؟",
    "home.new_arrivals": "وصل حديثاً",
    "home.testimonials.title": "آراء الزبناء",
    "home.testimonials.1": "\"جودة رائعة، تنشف بسرعة والفصالة ممتازة. توصيل سريع جداً في كازا، شكراً Océane!\"",
    "home.testimonials.2": "\"خديت أونسومبل Modalina للعطلة. رائع وأنيق بزاف والثوب ممتاز. كننصح بيه.\"",
    "catalog.title": "تشكيلتنا",
    "catalog.subtitle": "اكتشفي تشكيلتنا من ملابس السباحة المحتشمة. مصممة لتجمع بين الأناقة والراحة وحرية الحركة.",
    "catalog.filters": "تصفية",
    "catalog.sort_by": "ترتيب حسب:",
    "catalog.sort.new": "الجديد",
    "catalog.sort.price_asc": "السعر: من الأقل للأكثر",
    "catalog.sort.price_desc": "السعر: من الأكثر للأقل",
    "catalog.almost_sold_out": "قارب على النفاذ",
    "catalog.view_product": "عرض المنتج",
    "product.not_found": "المنتج غير موجود",
    "product.back_to_shop": "العودة للمتجر",
    "product.in_stock": "متوفر",
    "product.stock_left": "بقي {stock} فقط في المخزون!",
    "product.delivery_info": "توصيل 24-48 ساعة في جميع أنحاء المغرب",
    "product.cod_info": "الدفع عند الاستلام متوفر",
    "product.promo_saved": "لقد وفرت 120 درهم على هذا المنتج",
    "product.upsell_offer": "عرض خاص: اشتري قطعتين واحصلي على توصيل مجاني وخصم 10% على طلبيتك القادمة!",
    "product.size": "المقاس",
    "product.size_guide": "دليل المقاسات",
    "product.quantity": "الكمية",
    "product.add_to_cart": "أضف إلى السلة",
    "product.order_whatsapp": "الطلب عبر واتساب",
    "product.description": "الوصف",
    "product.related": "قد يعجبك أيضاً",
    "cart.title": "سلة التسوق",
    "cart.empty": "سلة التسوق فارغة.",
    "cart.back_to_shop": "العودة للمتجر",
    "cart.subtotal": "المجموع الفرعي",
    "cart.shipping": "التوصيل (لجميع أنحاء المغرب)",
    "cart.free": "مجاني",
    "cart.shipping_calc": "يُحسب في المرحلة التالية",
    "cart.total": "المجموع الإجمالي",
    "cart.checkout": "إتمام الطلب",
    "cart.cod_available": "الدفع عند الاستلام متوفر",
    "checkout.title": "إتمام الطلب",
    "checkout.delivery_info": "معلومات التوصيل",
    "checkout.name": "الاسم الكامل",
    "checkout.phone": "رقم الهاتف (واتساب)",
    "checkout.city": "المدينة",
    "checkout.address": "العنوان الكامل",
    "checkout.payment_method": "طريقة الدفع",
    "checkout.cod": "الدفع عند الاستلام",
    "checkout.cod_desc": "ستدفعين نقداً عند استلام طلبيتك.",
    "checkout.confirm": "تأكيد الطلب",
    "checkout.summary": "ملخص الطلب",
    "thank_you.title": "تم تأكيد الطلب!",
    "thank_you.message": "شكراً {name}! لقد تم تسجيل طلبيتك بنجاح.",
    "thank_you.steps": "الخطوات التالية",
    "thank_you.step_1": "سيقوم فريقنا بتجهيز طلبيتك اليوم.",
    "thank_you.step_2": "ستتلقين مكالمة تأكيد على الرقم {phone}.",
    "thank_you.step_3": "التوصيل المتوقع خلال 24 إلى 48 ساعة إلى {city}.",
    "thank_you.step_4": "الدفع نقداً عند الاستلام.",
    "thank_you.whatsapp_confirm": "التأكيد عبر واتساب",
    "thank_you.continue_shopping": "متابعة التسوق",
    "footer.desc": "علامة تجارية لملابس السباحة المحتشمة مصممة للمرأة العصرية في المغرب. أناقة، راحة وجودة.",
    "footer.links": "روابط مفيدة",
    "footer.shipping_returns": "التوصيل والاسترجاع",
    "footer.faq": "أسئلة شائعة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("modest_swim_lang") as Language;
      return saved === "ar" || saved === "fr" ? saved : "fr";
    } catch {
      return "fr";
    }
  });

  useEffect(() => {
    localStorage.setItem("modest_swim_lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string, variables?: Record<string, string | number>) => {
    let text = translations[language][key] || key;
    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        text = text.replace(`{${varKey}}`, String(variables[varKey]));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
