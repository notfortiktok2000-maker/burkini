import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ShieldCheck, Truck, PackagePlus, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils";

gsap.registerPlugin(ScrollTrigger);

export default function LandingAlma() {
  const { t, language } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  
  const product = products.find(p => p.slug === "ensemble-alma");
  if (!product) return <div>Product not found</div>;

  const colors = product.colors;
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [selectedSize, setSelectedSize] = useState("");
  
  // Bundle sizes
  const [bundleSizeBlue, setBundleSizeBlue] = useState("");
  const [bundleSizeBordeaux, setBundleSizeBordeaux] = useState("");
  const [isBundleActive, setIsBundleActive] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState("");
  const [bundleError, setBundleError] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  
  const currentColor = colors.find(c => c.id === selectedColor) || colors[0];
  const imagesList = [currentColor.images.front];

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBundleAddToCart = () => {
    if (!bundleSizeBlue || !bundleSizeBordeaux) {
      setBundleError(language === "ar" ? "يرجى اختيار مقاسين" : "Veuillez sélectionner les deux tailles.");
      return;
    }
    setBundleError("");
    
    addToCart({
      productId: product.id,
      name: product.name[language],
      price: 174.5, // 349 / 2
      image: colors[0].images.front,
      size: bundleSizeBlue,
      colorId: colors[0].id,
      colorName: colors[0].name[language],
      quantity: 1,
    });
    
    addToCart({
      productId: product.id,
      name: product.name[language],
      price: 174.5,
      image: colors[1].images.front,
      size: bundleSizeBordeaux,
      colorId: colors[1].id,
      colorName: colors[1].name[language],
      quantity: 1,
    });
    
    setIsCartOpen(true);
  };

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    ville: "",
    adresse: "",
    quartier: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBundleActive && !selectedSize) {
      setError(language === "ar" ? "يرجى اختيار المقاس." : "Sélectionnez votre taille pour continuer.");
      return;
    }
    if (isBundleActive && (!bundleSizeBlue || !bundleSizeBordeaux)) {
      setBundleError(language === "ar" ? "يرجى اختيار المقاسين." : "Veuillez sélectionner les deux tailles.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/thank-you", { state: { orderData: formData } });
    }, 1500);
  };
  
  const handleWhatsApp = () => {
    let message = "";
    if (isBundleActive) {
      message = `Bonjour, je souhaite commander Le Duo Alma à 349 DH : Bleu floral en taille ${bundleSizeBlue || "[TAILLE 1]"} et Bordeaux floral en taille ${bundleSizeBordeaux || "[TAILLE 2]"}. Pouvez-vous confirmer la disponibilité et la livraison offerte vers ${formData.ville || "[VILLE]"} ?`;
    } else {
      message = `Bonjour, je suis intéressée par l’Ensemble Alma en ${currentColor.name.fr}, taille ${selectedSize || "[TAILLE]"}, à 199 DH. Pouvez-vous confirmer la disponibilité et la livraison vers ${formData.ville || "[VILLE]"} ?`;
    }
    window.open(`https://wa.me/212710900502?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-brand-sand min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-brand-navy text-white text-center py-2 text-xs md:text-sm font-medium tracking-wide">
        Nouvelle collection • Livraison disponible partout au Maroc
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
            <img 
              src={currentColor.images.front} 
              alt={`Ensemble Alma ${currentColor.name.fr} porté par une femme`}
              className="w-full h-full object-cover animate-fade-in"
              key={currentColor.id}
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Nouvelle collection</span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight text-brand-navy">
              L’ensemble qui fait toute la tenue.
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Un haut fluide, un pantalon large et deux imprimés pensés pour vous accompagner partout.
            </p>
            
            <div className="text-2xl font-bold text-brand-navy mb-8">
              L’ensemble complet à 199 DH
            </div>
            
            <button 
              onClick={handleScrollToForm}
              className="w-full bg-brand-navy text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-all shadow-md mb-4"
            >
              Choisir ma couleur
            </button>
            <button 
              onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-center text-sm font-medium underline text-gray-600 mb-6 hover:text-brand-navy"
            >
              Voir les détails
            </button>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <ShieldCheck className="w-5 h-5 text-brand-brown" />
                Livraison partout au Maroc • Paiement à la livraison
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Check className="w-5 h-5 text-brand-brown" />
                Haut et pantalon inclus
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Check className="w-5 h-5 text-brand-brown" />
                Taille élastiquée
              </div>
            </div>
          </div>
        </div>

        {/* Color & Size Selector Inline */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-16 border border-gray-100">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Personnalisez votre ensemble</h2>
          
          <div className="mb-8">
            <h3 className="font-medium text-sm text-gray-500 mb-3 uppercase tracking-wider">
              Couleur sélectionnée : <span className="font-bold text-brand-navy">{currentColor.name.fr}</span>
            </h3>
            <div className="flex gap-4">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedColor(c.id);
                    setIsBundleActive(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all w-24",
                    selectedColor === c.id && !isBundleActive
                      ? "border-brand-navy bg-gray-50"
                      : "border-transparent hover:border-gray-200"
                  )}
                  aria-pressed={selectedColor === c.id}
                >
                  <img src={c.images.front} alt={c.name.fr} className="w-full aspect-[3/4] object-cover rounded-lg" />
                  <span className="text-xs font-bold text-center leading-tight">{c.name.fr}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Choisissez votre taille</h3>
              <button className="text-sm underline text-gray-500 hover:text-brand-navy">Guide des tailles</button>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { 
                    setSelectedSize(size); 
                    setError(""); 
                    setIsBundleActive(false);
                  }}
                  className={cn(
                    "py-3 font-bold uppercase transition-all border rounded-xl",
                    selectedSize === size && !isBundleActive
                      ? "bg-brand-navy text-white border-brand-navy shadow-md"
                      : "bg-white text-brand-navy border-gray-200 hover:border-brand-navy"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>}
            <p className="text-sm text-gray-500 mt-3">Vous hésitez entre deux tailles ? Écrivez-nous sur WhatsApp.</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-10 text-brand-navy">Élégante sans avoir à y penser</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Une tenue déjà coordonnée</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Plus besoin de chercher quoi associer : le haut et le pantalon sont pensés pour être portés ensemble.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Une coupe facile à porter</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Le haut légèrement ample et le pantalon large créent une silhouette fluide et naturelle.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Du matin jusqu’au soir</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Adaptez simplement les chaussures, le sac et les accessoires selon l’occasion.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Ensemble ou séparément</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Portez le pantalon avec un haut uni, ou le haut avec un jean pour multiplier les tenues.</p>
            </div>
          </div>
        </div>

        {/* Occasion Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-navy mb-4">Un ensemble, plusieurs moments</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["Déjeuner", "Sortie", "Voyage", "Vacances", "Dîner", "Occasion familiale"].map(occ => (
              <span key={occ} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-brand-navy">{occ}</span>
            ))}
          </div>
          <p className="text-gray-600 max-w-lg mx-auto">Avec des sandales et un panier pour la journée. Avec des bijoux, un sac structuré et des chaussures habillées pour le soir.</p>
        </div>

        {/* Interactive "Quelle Alma êtes-vous ?" */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-3">Quelle Alma êtes-vous ?</h2>
            <p className="text-gray-600">Deux couleurs, deux énergies. Choisissez celle qui correspond à votre moment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cn(
              "p-6 md:p-8 rounded-3xl transition-all border-2",
              selectedColor === "bleu-floral" && !isBundleActive ? "bg-blue-50 border-[#4968A8]" : "bg-white border-transparent hover:border-gray-200"
            )}>
              <h3 className="text-2xl font-serif font-bold text-[#4968A8] mb-3">Fraîche et lumineuse</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Pour les déjeuners, les vacances, les journées ensoleillées et les looks frais.</p>
              <button 
                onClick={() => {
                  setSelectedColor("bleu-floral");
                  setIsBundleActive(false);
                  handleScrollToForm();
                }}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm border-2 border-[#4968A8] text-[#4968A8] hover:bg-[#4968A8] hover:text-white transition-colors"
              >
                Choisir le bleu
              </button>
            </div>
            
            <div className={cn(
              "p-6 md:p-8 rounded-3xl transition-all border-2",
              selectedColor === "bordeaux-floral" && !isBundleActive ? "bg-red-50 border-[#7A2735]" : "bg-white border-transparent hover:border-gray-200"
            )}>
              <h3 className="text-2xl font-serif font-bold text-[#7A2735] mb-3">Chaleureuse et élégante</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Pour les sorties, les dîners, les occasions et les looks plus sophistiqués.</p>
              <button 
                onClick={() => {
                  setSelectedColor("bordeaux-floral");
                  setIsBundleActive(false);
                  handleScrollToForm();
                }}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm border-2 border-[#7A2735] text-[#7A2735] hover:bg-[#7A2735] hover:text-white transition-colors"
              >
                Choisir le bordeaux
              </button>
            </div>
          </div>
        </div>

        {/* Bundle Upsell */}
        <div className="bg-brand-teal/30 border border-brand-brown/20 rounded-3xl p-6 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-brown text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
            Recommandé
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-brand-navy mb-2">Le Duo Alma</h2>
          <p className="text-gray-700 font-medium mb-6">Une couleur lumineuse pour la journée, une couleur élégante pour le soir.</p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
              <Check className="w-5 h-5 text-brand-brown" /> 1 Ensemble Alma Bleu floral
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
              <Check className="w-5 h-5 text-brand-brown" /> 1 Ensemble Alma Bordeaux floral
            </li>
            <li className="flex items-center gap-3 text-sm font-bold text-brand-navy">
              <Truck className="w-5 h-5 text-brand-navy" /> Livraison offerte avec Le Duo Alma
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10 mb-8">
            <div className="flex-1 w-full bg-white p-5 rounded-2xl border border-brand-brown/10">
              <h4 className="font-bold text-sm mb-3">Taille Bleu floral</h4>
              <select 
                value={bundleSizeBlue} 
                onChange={(e) => setBundleSizeBlue(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 outline-none focus:border-brand-brown transition-colors"
              >
                <option value="">Sélectionner</option>
                {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="flex-1 w-full bg-white p-5 rounded-2xl border border-brand-brown/10">
              <h4 className="font-bold text-sm mb-3">Taille Bordeaux floral</h4>
              <select 
                value={bundleSizeBordeaux} 
                onChange={(e) => setBundleSizeBordeaux(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 outline-none focus:border-brand-brown transition-colors"
              >
                <option value="">Sélectionner</option>
                {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          
          {bundleError && <p className="text-red-500 text-sm mb-4 font-medium">{bundleError}</p>}

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-3xl font-bold text-brand-navy">349 DH</div>
              <div className="text-sm text-brand-brown font-bold mt-1">Vous économisez 49 DH</div>
            </div>
            <button 
              onClick={() => {
                setIsBundleActive(true);
                handleScrollToForm();
              }}
              className="w-full md:w-auto bg-brand-brown text-white px-8 h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-brown/90 transition-colors shadow-md"
            >
              Choisir les deux couleurs — 349 DH
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div id="details" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-16 border border-gray-100">
          <h2 className="text-2xl font-serif font-bold mb-6">Détails du produit</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-brand-navy">Coupe</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Haut sans manches</li>
                <li>Décolleté en V</li>
                <li>Coupe légèrement ample</li>
                <li>Longueur légèrement sous le nombril</li>
                <li>Pantalon large</li>
                <li>Taille élastiquée</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-brand-navy">Contenu de la commande</h4>
              <p className="font-bold text-brand-brown text-sm bg-brand-brown/10 inline-block px-3 py-1.5 rounded-lg">1 haut + 1 pantalon assorti</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-brand-navy">Matière</h4>
                <p className="text-gray-600 text-sm">[COMPOSITION DU TISSU À CONFIRMER]</p>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-brand-navy">Entretien</h4>
                <p className="text-gray-600 text-sm">[TEMPÉRATURE DE LAVAGE] • [RECOMMANDATION DE REPASSAGE] • [SÉCHAGE]</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-navy mb-4">La collection vient d’arriver</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">Soyez parmi les premières à porter l’Ensemble Alma et à partager votre look avec nous.</p>
          <button 
            onClick={handleScrollToForm}
            className="text-brand-brown font-bold uppercase tracking-wider border-b-2 border-brand-brown pb-1 hover:text-brand-brown/80"
          >
            Découvrir les deux couleurs
          </button>
        </div>

        {/* Order Form */}
        <div ref={formRef} className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100 mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-2 text-brand-navy">Finalisez votre commande</h2>
          <p className="text-center text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Remplissez vos informations. Notre équipe vous contactera pour confirmer la commande avant l’envoi.
          </p>

          <div className="bg-brand-sand/50 p-4 rounded-xl mb-8 border border-brand-brown/10">
            <h4 className="font-bold text-sm uppercase tracking-wider text-brand-navy mb-3">Votre sélection</h4>
            {isBundleActive ? (
              <div className="space-y-1 text-sm text-gray-700 font-medium">
                <p className="font-bold text-brand-brown mb-2">Le Duo Alma</p>
                <p>• Bleu floral — Taille {bundleSizeBlue || "-"}</p>
                <p>• Bordeaux floral — Taille {bundleSizeBordeaux || "-"}</p>
                <p className="text-green-700 mt-2 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Livraison offerte</p>
                <p className="font-bold text-lg mt-2 pt-2 border-t border-brand-brown/10">Total: 349 DH</p>
              </div>
            ) : (
              <div className="space-y-1 text-sm text-gray-700 font-medium">
                <p className="font-bold text-brand-navy mb-2">Ensemble Alma</p>
                <p>• {currentColor.name.fr} — Taille {selectedSize || "-"}</p>
                <p>• Quantité: 1</p>
                <p className="text-gray-500 mt-2">Livraison calculée selon la ville</p>
                <p className="font-bold text-lg mt-2 pt-2 border-t border-brand-brown/10">Total: 199 DH</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Prénom et nom *</label>
                <input 
                  required
                  type="text" 
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                  placeholder="Ex: Fatima Zahra"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone (WhatsApp) *</label>
                <input 
                  required
                  type="tel" 
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                  placeholder="Ex: 06 00 00 00 00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Ville *</label>
                <input 
                  required
                  type="text" 
                  value={formData.ville}
                  onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                  placeholder="Ex: Casablanca"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Quartier *</label>
                <input 
                  required
                  type="text" 
                  value={formData.quartier}
                  onChange={(e) => setFormData({...formData, quartier: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                  placeholder="Ex: Maarif"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Adresse complète *</label>
              <input 
                required
                type="text" 
                value={formData.adresse}
                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                placeholder="Rue, numéro de maison..."
              />
            </div>

            <div className="border border-brand-navy/10 bg-brand-navy/5 p-4 rounded-xl mt-6 flex items-center gap-3">
              <input type="radio" checked readOnly className="w-5 h-5 accent-brand-navy" />
              <div>
                <div className="font-bold text-brand-navy">Paiement à la livraison</div>
                <div className="text-xs text-gray-500">Vous paierez en espèces à la réception de votre commande.</div>
              </div>
            </div>
            
            {(!isBundleActive && error) && <p className="text-red-500 text-sm font-bold text-center mt-4">{error}</p>}
            {(isBundleActive && bundleError) && <p className="text-red-500 text-sm font-bold text-center mt-4">{bundleError}</p>}

            <div className="mt-8 pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-navy text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Envoi en cours..." : (isBundleActive ? "Confirmer Le Duo Alma — 349 DH" : "Confirmer ma commande — 199 DH")}
              </button>
              
              <button 
                type="button"
                onClick={handleWhatsApp}
                className="w-full mt-4 bg-green-500 text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-green-600 transition-all shadow-md"
              >
                Commander sur WhatsApp
              </button>
            </div>
          </form>
        </div>
        
        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-10 text-brand-navy">Questions fréquentes</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <FaqItem 
              q="Que contient l’Ensemble Alma ?" 
              a="La commande comprend le haut sans manches et le pantalon assorti." 
            />
            <FaqItem 
              q="Quel est le prix de l’ensemble ?" 
              a="Un Ensemble Alma coûte 199 DH." 
            />
            <FaqItem 
              q="Qu’est-ce que Le Duo Alma ?" 
              a="Le Duo Alma comprend les deux coloris, Bleu floral et Bordeaux floral, pour 349 DH au lieu de 398 DH." 
            />
            <FaqItem 
              q="La livraison est-elle offerte ?" 
              a="La livraison est offerte avec Le Duo Alma. Pour une commande simple, les frais sont indiqués avant la confirmation." 
            />
            <FaqItem 
              q="Le haut est-il court ?" 
              a="Le haut possède une coupe légèrement ample et descend légèrement sous le nombril." 
            />
            <FaqItem 
              q="La taille du pantalon est-elle élastiquée ?" 
              a="Oui, le pantalon possède une taille élastiquée." 
            />
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 md:hidden flex items-center justify-between gap-3">
        {isBundleActive ? (
          <>
            <div className="flex-1">
              <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">Le Duo Alma</div>
              <div className="flex items-center gap-2">
                <span className="font-bold">349 DH</span>
                <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold uppercase">Livraison offerte</span>
              </div>
            </div>
            <button 
              onClick={handleScrollToForm}
              className="bg-brand-brown text-white px-4 h-10 rounded-lg font-bold text-xs uppercase tracking-wider"
            >
              Commander
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <img src={currentColor.images.front} alt="" className="w-10 h-10 rounded object-cover" />
              <div>
                <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">Ensemble Alma</div>
                <div className="font-bold text-sm text-gray-700">199 DH</div>
              </div>
            </div>
            <button 
              onClick={handleScrollToForm}
              className="bg-brand-navy text-white px-5 h-10 rounded-lg font-bold text-xs uppercase tracking-wider"
            >
              Commander
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left font-bold text-brand-navy"
      >
        <span>{q}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {isOpen && <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>}
    </div>
  );
}
