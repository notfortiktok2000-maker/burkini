import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Océane Modest</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">{t("footer.links")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">{t("nav.shop")}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.shipping_returns")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("product.size_guide")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.faq")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WhatsApp: +212 7 10 90 05 02</li>
              <li>Email: contact@oceanemodest.ma</li>
              <li className="pt-4">
                <span className="inline-block px-3 py-1 bg-white/10 rounded-sm text-xs font-medium">
                  Paiement à la livraison disponible
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Océane Modest. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
