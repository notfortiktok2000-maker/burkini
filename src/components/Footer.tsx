import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-black text-[var(--color-luxury-cream)] pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif tracking-widest mb-6">OCÉANE MODEST</h3>
            <p className="text-[var(--color-luxury-cream)]/70 text-xs tracking-wider leading-loose max-w-sm font-light">
              {t("footer.desc")}
            </p>
          </div>
          
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] mb-8 text-[var(--color-luxury-cream)]/50">{t("footer.links")}</h4>
            <ul className="space-y-4 text-xs font-light tracking-wide text-[var(--color-luxury-cream)]/70">
              <li><Link to="/catalog" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">{t("nav.shop")}</Link></li>
              <li><a href="#" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">{t("footer.shipping_returns")}</a></li>
              <li><a href="#" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">{t("product.size_guide")}</a></li>
              <li><a href="#" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">{t("footer.faq")}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] mb-8 text-[var(--color-luxury-cream)]/50">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-xs font-light tracking-wide text-[var(--color-luxury-cream)]/70">
              <li>WhatsApp: +212 7 10 90 05 02</li>
              <li>Email: contact@oceanemodest.ma</li>
              <li className="pt-6">
                <span className="inline-block border border-[var(--color-luxury-cream)]/30 px-4 py-2 text-[10px] tracking-widest uppercase text-[var(--color-luxury-cream)]/90">
                  {language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[10px] tracking-widest uppercase text-[var(--color-luxury-cream)]/50">
          <p>&copy; {new Date().getFullYear()} OCÉANE MODEST. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-[var(--color-luxury-cream)] transition-colors duration-300">Tiktok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
