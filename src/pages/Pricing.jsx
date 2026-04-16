import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PREMIUM_PRICE_ID } from '../stripe';
import axios from 'axios';
import { useLang } from '../context/LanguageContext';

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang, changeLang } = useLang();
const handleCheckout = async () => {
  if (!user) {
    navigate('/auth');
    return;
  }
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/create-checkout-session`, {
      user_id: user.id,
      price_id: PREMIUM_PRICE_ID,
    });
    window.location.href = res.data.url;
  } catch (e) {
    console.error(e);
  }
};
  const [lang, changeLang] = useLang();
  const [billing, setBilling] = useState('monthly');

  const t = {
    title: lang === 'EN' ? 'Simple, transparent pricing' : 'Tarifs simples et transparents',
    sub: lang === 'EN' ? 'Start for free. Upgrade when you\'re ready.' : 'Commence gratuitement. Upgrade quand tu es prêt.',
    monthly: lang === 'EN' ? 'Monthly' : 'Mensuel',
    yearly: lang === 'EN' ? 'Yearly' : 'Annuel',
    save: lang === 'EN' ? 'Save 20%' : 'Économise 20%',
    free: lang === 'EN' ? 'Free' : 'Gratuit',
    premium: 'Premium',
    popular: lang === 'EN' ? 'Most popular' : 'Le plus populaire',
    startFree: lang === 'EN' ? 'Get started free' : 'Commencer gratuitement',
    startPremium: lang === 'EN' ? 'Start Premium →' : 'Démarrer Premium →',
    faq: lang === 'EN' ? 'Frequently asked questions' : 'Questions fréquentes',
    back: lang === 'EN' ? '← Back' : '← Retour',
  };

  const freeFeatures = lang === 'EN'
    ? [
        "✅ Basic stats (win rate, R/R, net profit)",
        "✅ 1 bias detected — the most critical",
        "✅ Coach message preview",
        "🔒 Full coach report",
        "🔒 All biases detected",
        "🔒 Interactive charts",
        "🔒 Chat with AI coach",
        "🔒 FTMO progress tracking",
      ]
    : [
        "✅ Stats de base (win rate, R/R, profit net)",
        "✅ 1 biais détecté — le plus critique",
        "✅ Aperçu du message coach",
        "🔒 Rapport coach complet",
        "🔒 Tous les biais détectés",
        "🔒 Graphiques interactifs",
        "🔒 Chat avec le coach IA",
        "🔒 Suivi progression FTMO",
      ];

  const premiumFeatures = lang === 'EN'
    ? [
        "✅ Full stats + interactive charts",
        "✅ All biases detected (personalized AI)",
        "✅ Full coach report in natural language",
        "✅ Chat with AI coach",
        "✅ Progress tracking + FTMO countdown",
        "✅ Key points for your next trades",
        "✅ Personal notes saved",
        "✅ Multilingual (FR/EN)",
      ]
    : [
        "✅ Stats complètes + graphiques interactifs",
        "✅ Tous les biais détectés (IA personnalisée)",
        "✅ Rapport coach complet en langage naturel",
        "✅ Chat avec le coach IA",
        "✅ Suivi progression + countdown FTMO",
        "✅ Key points pour tes prochains trades",
        "✅ Notes personnelles sauvegardées",
        "✅ Multilingue (FR/EN)",
      ];

  const faqs = lang === 'EN'
    ? [
        { q: "Do I need to keep a trading journal?", a: "No — FXCoach reads your behavioral patterns directly from your raw CSV data. No journaling required." },
        { q: "Which prop firms are supported?", a: "Any firm that exports a CSV — FTMO, The5ers, MyFundedFX, Apex, and more." },
        { q: "Can I cancel anytime?", a: "Yes, absolutely. No commitment, no hidden fees. Cancel in one click." },
        { q: "How is my data protected?", a: "Your trade data is processed securely and never shared with third parties." },
        { q: "What if I don't have enough trades?", a: "We recommend at least 20 trades for meaningful analysis. The more trades, the more accurate the insights." },
      ]
    : [
        { q: "Dois-je tenir un journal de trading ?", a: "Non — FXCoach lit tes patterns comportementaux directement dans tes données CSV brutes. Aucun journal requis." },
        { q: "Quelles prop firms sont supportées ?", a: "Toute firm qui exporte un CSV — FTMO, The5ers, MyFundedFX, Apex, et plus encore." },
        { q: "Puis-je annuler à tout moment ?", a: "Oui, absolument. Sans engagement, sans frais cachés. Annulation en un clic." },
        { q: "Comment mes données sont-elles protégées ?", a: "Tes données de trading sont traitées de manière sécurisée et ne sont jamais partagées avec des tiers." },
        { q: "Et si je n'ai pas assez de trades ?", a: "Nous recommandons au moins 20 trades pour une analyse significative. Plus tu as de trades, plus les insights sont précis." },
      ];

  const monthlyPrice = 19;
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900">FXCoach</button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => changeLang('EN')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'EN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>EN</button>
            <button onClick={() => changeLang('FR')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'FR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>FR</button>
          </div>
          <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 transition">
            {t.back}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-28 pb-16 px-6">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-500 text-lg mb-8">{t.sub}</p>

          {/* BILLING TOGGLE */}
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              {t.monthly}
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${billing === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              {t.yearly}
              <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold" style={{backgroundColor: '#c9a84c'}}>
                {t.save}
              </span>
            </button>
          </div>
        </motion.div>

        {/* PLANS */}
        <div className="grid grid-cols-2 gap-8 mb-16">

          {/* FREE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl border border-gray-200"
          >
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.free}</div>
            <div className="text-5xl font-bold text-gray-900 mb-2">€0</div>
            <div className="text-sm text-gray-400 mb-8">{lang === 'EN' ? 'Forever free' : 'Gratuit pour toujours'}</div>
            <div className="space-y-3 mb-8">
              {freeFeatures.map((f, i) => (
                <div key={i} className="text-sm text-gray-600 flex items-start gap-2">{f}</div>
              ))}
            </div>
            <button
              onClick={() => navigate('/analyse')}
              className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              {t.startFree}
            </button>
          </motion.div>

          {/* PREMIUM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border-2 relative shadow-lg"
            style={{borderColor: '#c9a84c'}}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md" style={{backgroundColor: '#c9a84c'}}>
              ⭐ {t.popular}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{color: '#c9a84c'}}>{t.premium}</div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-5xl font-bold text-gray-900">
                €{billing === 'monthly' ? monthlyPrice : Math.round(yearlyPrice / 12)}
              </div>
              <div className="text-gray-400 text-sm">/{lang === 'EN' ? 'month' : 'mois'}</div>
            </div>
            <div className="text-sm text-gray-400 mb-8">
              {billing === 'yearly'
                ? `€${yearlyPrice} ${lang === 'EN' ? 'billed yearly' : 'facturé annuellement'}`
                : lang === 'EN' ? 'Billed monthly' : 'Facturé mensuellement'}
            </div>
            <div className="space-y-3 mb-8">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="text-sm text-gray-700 flex items-start gap-2">{f}</div>
              ))}
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
              style={{backgroundColor: '#c9a84c'}}
            >
              {t.startPremium}
            </button>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t.faq}</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl border border-gray-100 hover:border-yellow-200 transition"
              >
                <div className="font-semibold text-gray-900 mb-2">{faq.q}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{faq.a}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl"
          style={{backgroundColor: '#c9a84c10'}}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {lang === 'EN' ? 'Ready to fix your trading behavior?' : 'Prêt à corriger ton comportement de trader ?'}
          </h3>
          <p className="text-gray-500 mb-6">
            {lang === 'EN' ? 'Join traders who already understand their data.' : 'Rejoins les traders qui comprennent déjà leurs données.'}
          </p>
          <button
            onClick={() => navigate('/analyse')}
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
            style={{backgroundColor: '#c9a84c'}}
          >
            {lang === 'EN' ? 'Analyze my trades for free →' : 'Analyser mes trades gratuitement →'}
          </button>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        FXCoach © 2026 — {lang === 'EN' ? 'Built for prop traders, by a prop trader.' : 'Conçu pour les prop traders, par une prop trader.'}
      </footer>
    </div>
  );
}