import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

export default function ThankYou() {
  const location = useLocation();
  const { t, language } = useLanguage();
  const orderData = location.state?.orderData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const firstName = orderData?.nom ? orderData.nom.split(' ')[0] : '';
  const phone = orderData?.telephone || (language === 'ar' ? 'الرقم الذي أدخلته' : 'numéro fourni');
  const city = orderData?.ville || (language === 'ar' ? 'عنوانك' : 'votre adresse');

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 min-h-screen flex items-center justify-center">
      <div ref={containerRef} className="bg-white p-8 md:p-12 text-center shadow-md border border-gray-100 w-full rounded-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-medium tracking-wide mb-4">{t("thank_you.title")}</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          {t("thank_you.message", { name: firstName })}
        </p>

        <div className="bg-[#F5F5F7] p-6 text-left mb-8 rounded-2xl">
          <h3 className="font-bold tracking-wide text-sm mb-4">{t("thank_you.steps")}</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>{t("thank_you.step_1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>{t("thank_you.step_2", { phone })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>{t("thank_you.step_3", { city })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>{t("thank_you.step_4")}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={`https://wa.me/212710900502?text=${language === 'ar' ? encodeURIComponent('مرحبا، لقد قمت للتو بتقديم طلب وأود تأكيده.') : encodeURIComponent('Bonjour, je viens de passer une commande et je souhaite la confirmer.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white h-14 rounded-full font-medium tracking-tight flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            {t("thank_you.whatsapp_confirm")}
          </a>
          
          <Link
            to="/catalog"
            className="w-full border border-[#1D1D1F] text-[#1D1D1F] h-14 rounded-full font-medium tracking-tight flex items-center justify-center gap-2 hover:bg-[#1D1D1F] hover:text-white transition-colors"
          >
            {t("thank_you.continue_shopping")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
