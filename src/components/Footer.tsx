import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Océane Modest</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              La marque de maillots de bain couvrants pensée pour la femme moderne au Maroc. Élégance, confort et qualité.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Liens Utiles</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Boutique</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guide des tailles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
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
