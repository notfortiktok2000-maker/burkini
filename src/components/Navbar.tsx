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
          "fixed top-0 w-full z-40 transition-all duration-500",
          isScrolled 
            ? "py-3 bg-[var(--color-brand-sand)]/90 backdrop-blur-md shadow-sm text-black" 
            : "py-6 bg-transparent text-black"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 mr-2 rtl:ml-2 rtl:-mr-2 md:hidden"
              >
                <Menu className="w-5 h-5" strokeWidth={1.25} />
              </button>
              <Link to="/" className="text-xl font-medium tracking-widest uppercase">
                Océane Modest
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-10 rtl:space-x-reverse">
              <Link to="/" className="text-[13px] font-medium tracking-widest uppercase hover:opacity-60 transition-opacity">
                {t("nav.home")}
              </Link>
              <Link to="/catalog" className="text-[13px] font-medium tracking-widest uppercase hover:opacity-60 transition-opacity">
                {t("nav.shop")}
              </Link>
            </nav>

            <div className="flex items-center space-x-5 rtl:space-x-reverse">
              <button
                onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
                className="flex items-center gap-1.5 p-2 text-xs font-medium tracking-widest uppercase hover:opacity-60 transition-opacity"
              >
                <Globe className="w-4 h-4" strokeWidth={1.25} />
                <span className="hidden sm:inline">{language === "fr" ? "AR" : "FR"}</span>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:opacity-60 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-medium text-white bg-black rounded-full">
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
          "fixed inset-0 z-50 bg-[var(--color-luxury-ivory)] transform transition-transform duration-500 ease-in-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-6 border-b border-black/5">
          <span className="text-lg font-medium tracking-widest uppercase">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="w-5 h-5" strokeWidth={1.25} />
          </button>
        </div>
        <div className="p-6 flex flex-col space-y-6">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif text-black hover:opacity-60 transition-opacity"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/catalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif text-black hover:opacity-60 transition-opacity"
          >
            {t("nav.shop")}
          </Link>
          
          <div className="pt-8 mt-auto border-t border-black/5 flex items-center justify-between">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-500">Langue / اللغة</span>
            <button
              onClick={() => {
                setLanguage(language === "fr" ? "ar" : "fr");
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-3 bg-white shadow-sm rounded-full font-medium text-xs tracking-widest uppercase transition-all active:scale-95"
            >
              {language === "fr" ? "عربي" : "Français"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
