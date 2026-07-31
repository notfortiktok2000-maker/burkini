import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../utils";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300 shadow-sm backdrop-blur-md bg-white/95 text-brand-navy",
          isScrolled ? "py-3" : "py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 mr-2 md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="text-xl font-bold tracking-tight uppercase">
                Océane Modest
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-brand-accent transition-colors">
                {t("nav.home")}
              </Link>
              <Link to="/catalog" className="text-sm font-medium hover:text-brand-accent transition-colors">
                {t("nav.shop")}
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
                className="flex items-center gap-1 p-2 text-sm font-bold uppercase hover:text-brand-accent transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">{language === "fr" ? "AR" : "FR"}</span>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:text-brand-accent transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-accent rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold uppercase">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 flex flex-col space-y-4">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/catalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium"
          >
            {t("nav.shop")}
          </Link>
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="font-medium">Langue / اللغة</span>
            <button
              onClick={() => {
                setLanguage(language === "fr" ? "ar" : "fr");
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-brand-sand rounded-xl font-bold text-sm uppercase"
            >
              {language === "fr" ? "عربي" : "Français"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
