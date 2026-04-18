import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

export default function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fxcoach_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('fxcoach_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('fxcoach_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          {lang === 'EN'
            ? 'We use cookies for authentication and payments (Stripe, Supabase). No advertising cookies.'
            : 'Nous utilisons des cookies pour l\'authentification et les paiements (Stripe, Supabase). Aucun cookie publicitaire.'}
          {' '}
          <a href="/mentions-legales" className="underline hover:text-gray-900">
            {lang === 'EN' ? 'Learn more' : 'En savoir plus'}
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            {lang === 'EN' ? 'Decline' : 'Refuser'}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-white font-semibold rounded-lg transition hover:opacity-90"
            style={{backgroundColor: '#c9a84c'}}
          >
            {lang === 'EN' ? 'Accept' : 'Accepter'}
          </button>
        </div>
      </div>
    </div>
  );
}