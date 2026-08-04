import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";

export default function ThankYou() {
  const location = useLocation();
  const { t, language } = useLanguage();
  const orderData = location.state?.orderData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      containerRef.current,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const firstName = orderData?.nom ? orderData.nom.split(' ')[0] : '';
  const phone = orderData?.telephone || (language === 'ar' ? 'الرقم الذي أدخلته' : 'numéro fourni');
  const city = orderData?.ville || (language === 'ar' ? 'عنوانك' : 'votre adresse');

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-6 min-h-screen flex flex-col items-center justify-center">
      <div ref={containerRef} className="w-full text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-6 text-black">
          {t("thank_you.title")}
        </h1>
        
        <p className="font-sans text-sm font-light text-black/60 mb-12 tracking-wide leading-relaxed">
          {t("thank_you.message", { name: firstName })}
        </p>

        <div className="bg-[var(--color-luxury-cream)] p-8 md:p-12 text-left mb-12 border border-black/5">
          <h3 className="font-sans text-xs uppercase tracking-widest text-black mb-8 text-center">
            {t("thank_you.steps")}
          </h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <span className="font-serif text-xl italic text-black/40">01</span>
              <span className="font-sans text-sm font-light text-black pt-1">{t("thank_you.step_1")}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-serif text-xl italic text-black/40">02</span>
              <span className="font-sans text-sm font-light text-black pt-1">{t("thank_you.step_2", { phone })}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-serif text-xl italic text-black/40">03</span>
              <span className="font-sans text-sm font-light text-black pt-1">{t("thank_you.step_3", { city })}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-serif text-xl italic text-black/40">04</span>
              <span className="font-sans text-sm font-light text-black pt-1">{t("thank_you.step_4")}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/212710900502?text=${language === 'ar' ? encodeURIComponent('مرحبا، لقد قمت للتو بتقديم طلب وأود تأكيده.') : encodeURIComponent('Bonjour, je viens de passer une commande et je souhaite la confirmer.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-black text-white px-8 py-4 font-sans text-xs font-medium tracking-widest uppercase hover:bg-black/80 transition-colors duration-300 flex items-center justify-center"
          >
            {t("thank_you.whatsapp_confirm")}
          </a>
          
          <Link
            to="/catalog"
            className="w-full sm:w-auto border border-black bg-transparent text-black px-8 py-4 font-sans text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center"
          >
            {t("thank_you.continue_shopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
