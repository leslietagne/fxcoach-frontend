import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function MentionsLegales() {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900">FXCoach</button>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 transition">← Retour</button>
      </nav>

      <div className="max-w-3xl mx-auto pt-28 pb-16 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions légales</h1>

        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Éditeur du site</h2>
            <p>Nom : FXCoach</p>
            <p>Adresse : Paris, France</p>
            <p>Email : fxcoachh@gmail.com</p>
            <p>Site web : https://fxcoach-vert.vercel.app</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Hébergement</h2>
            <p>Frontend : Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
            <p>Backend : Railway Corp., San Francisco, CA, USA</p>
            <p>Base de données : Supabase Inc.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, logiciels, algorithmes) est la propriété exclusive de FXCoach et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans autorisation écrite préalable.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Limitation de responsabilité</h2>
            <p>FXCoach est un outil d'analyse comportementale à des fins éducatives uniquement. Les informations fournies ne constituent en aucun cas des conseils financiers ou d'investissement. L'utilisateur est seul responsable de ses décisions de trading. FXCoach ne saurait être tenu responsable des pertes financières résultant de l'utilisation de la plateforme.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Données personnelles</h2>
            <p>Les données personnelles collectées (email, données de trading) sont utilisées uniquement pour fournir le service FXCoach. Elles ne sont jamais vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant fxcoachh@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies</h2>
            <p>Ce site utilise des cookies techniques nécessaires au fonctionnement du service (authentification, préférences de langue). Aucun cookie publicitaire n'est utilisé.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Droit applicable</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>

          <p className="text-gray-400 text-xs">Dernière mise à jour : avril 2026</p>
        </div>
      </div>

      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        FXCoach © 2026 — Conçu pour les prop traders, par une prop trader.
      </footer>
    </div>
  );
}