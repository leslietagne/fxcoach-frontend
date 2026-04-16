import { useNavigate } from 'react-router-dom';

export default function CGU() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900">FXCoach</button>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 transition">← Retour</button>
      </nav>

      <div className="max-w-3xl mx-auto pt-28 pb-16 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>

        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Objet</h2>
            <p>Les présentes CGU régissent l'utilisation de la plateforme FXCoach, accessible à l'adresse https://fxcoach-vert.vercel.app. En utilisant FXCoach, vous acceptez sans réserve les présentes conditions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Description du service</h2>
            <p>FXCoach est une plateforme d'analyse comportementale du trading. Elle permet à l'utilisateur d'importer ses données de trades au format CSV et d'obtenir une analyse de ses biais comportementaux à des fins éducatives. FXCoach ne fournit pas de conseils financiers ou d'investissement.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Inscription et compte</h2>
            <p>L'accès à certaines fonctionnalités nécessite la création d'un compte via une adresse email valide. L'utilisateur est responsable de la confidentialité de ses identifiants. FXCoach se réserve le droit de suspendre tout compte en cas d'utilisation frauduleuse ou abusive.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Offres et tarification</h2>
            <p><strong>Offre gratuite :</strong> accès limité à une analyse de base, détection d'un biais et aperçu du rapport coach.</p>
            <p className="mt-2"><strong>Offre Premium (€19/mois) :</strong> accès complet à tous les biais détectés, rapport coach complet, chat IA, suivi de progression et calendrier de trading.</p>
            <p className="mt-2">Les prix sont indiqués en euros TTC. FXCoach se réserve le droit de modifier ses tarifs avec un préavis de 30 jours.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Paiement et abonnement</h2>
            <p>Les paiements sont traités de manière sécurisée par Stripe. L'abonnement Premium est renouvelé automatiquement chaque mois. L'utilisateur peut résilier à tout moment depuis son espace client ou en contactant fxcoachh@gmail.com. Aucun remboursement ne sera effectué pour la période en cours.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Données de trading</h2>
            <p>Les fichiers CSV importés sont traités uniquement pour générer l'analyse. Ils ne sont pas stockés de manière permanente sur nos serveurs. L'utilisateur garantit être l'ayant droit des données importées.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation de responsabilité</h2>
            <p>FXCoach est un outil éducatif. Les analyses produites ne constituent pas des conseils financiers. FXCoach ne peut être tenu responsable des décisions de trading prises sur la base des analyses fournies, ni des pertes financières qui pourraient en résulter.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Propriété intellectuelle</h2>
            <p>L'ensemble des éléments de la plateforme (algorithmes, design, contenus) est la propriété de FXCoach. Toute reproduction ou utilisation sans autorisation est interdite.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Modification des CGU</h2>
            <p>FXCoach se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email en cas de modification substantielle. La poursuite de l'utilisation du service vaut acceptation des nouvelles conditions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents de France.</p>
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