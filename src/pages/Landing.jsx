import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

const featuresEN = [
  { icon: "🧠", title: "Zero journaling required", desc: "Our AI detects your biases directly from raw trade data." },
  { icon: "🎯", title: "100% personalized", desc: "Every report is unique — based on YOUR trades and YOUR patterns." },
  { icon: "⚡", title: "Results in 30 seconds", desc: "Upload your CSV and get your full report instantly." },
  { icon: "🏆", title: "Built for prop traders", desc: "FTMO, The5ers, MyFundedFX — we speak your language." },
  { icon: "🌍", title: "Multilingual", desc: "Analysis available in English and French." },
  { icon: "📈", title: "Track your progress", desc: "Visualize your improvement challenge after challenge." },
];

const featuresFR = [
  { icon: "🧠", title: "Zéro journal requis", desc: "Notre IA détecte tes biais directement dans tes données brutes." },
  { icon: "🎯", title: "100% personnalisé", desc: "Chaque rapport est unique — basé sur TES trades et TES patterns." },
  { icon: "⚡", title: "Résultats en 30 secondes", desc: "Upload ton CSV et reçois ton rapport complet instantanément." },
  { icon: "🏆", title: "Conçu pour les prop traders", desc: "FTMO, The5ers, MyFundedFX — on parle ton langage." },
  { icon: "🌍", title: "Multilingue", desc: "Analyse disponible en français et en anglais." },
  { icon: "📈", title: "Suis ta progression", desc: "Visualise ton évolution challenge après challenge." },
];

export default function Landing() {
  const navigate = useNavigate();
  const { lang, changeLang } = useLang();

  const features = lang === 'EN' ? featuresEN : featuresFR;

  const t = {
    badge: lang === 'EN' ? 'AI-Powered Trading Coach' : 'Coach Trading IA',
    h1a: lang === 'EN' ? 'Stop losing your challenges' : 'Arrête de perdre tes challenges',
    h1b: lang === 'EN' ? 'because of yourself.' : 'à cause de toi-même.',
    sub: lang === 'EN'
      ? 'FXCoach analyzes your trades and detects exactly which behavioral patterns are costing you money. No journaling. No effort. In 30 seconds.'
      : 'FXCoach analyse tes trades et détecte exactement quels comportements te coûtent de l\'argent. Sans journal. Sans effort. En 30 secondes.',
    cta: lang === 'EN' ? 'Analyze my trades for free →' : 'Analyser mes trades gratuitement →',
    howItWorks: lang === 'EN' ? 'See how it works' : 'Comment ça marche',
    whyTitle: lang === 'EN' ? 'Why FXCoach?' : 'Pourquoi FXCoach ?',
    whySub: lang === 'EN' ? 'Everything you need to understand and fix your trading behavior.' : 'Tout ce qu\'il faut pour comprendre et corriger ton comportement de trader.',
    testimonialTitle: lang === 'EN' ? 'What traders say' : 'Ce que disent les traders',
    pricingTitle: lang === 'EN' ? 'Simple pricing' : 'Tarifs simples',
    pricingSub: lang === 'EN' ? 'Start for free. Upgrade when you\'re ready.' : 'Commence gratuitement. Upgrade quand tu es prêt.',
    ctaFinal: lang === 'EN' ? 'Ready to understand your trading?' : 'Prêt à comprendre ton trading ?',
    ctaFinalSub: lang === 'EN' ? 'Upload your CSV. Get your report. Fix your behavior.' : 'Upload ton CSV. Reçois ton rapport. Corrige ton comportement.',
    login: lang === 'EN' ? 'Login' : 'Connexion',
    getStarted: lang === 'EN' ? 'Get started' : 'Commencer',
    free: lang === 'EN' ? 'Free' : 'Gratuit',
    monthly: lang === 'EN' ? '/month' : '/mois',
    popular: lang === 'EN' ? 'MOST POPULAR' : 'LE PLUS POPULAIRE',
    startFree: lang === 'EN' ? 'Get started free' : 'Commencer gratuitement',
    startPremium: lang === 'EN' ? 'Start Premium →' : 'Démarrer Premium →',
    footer: lang === 'EN' ? 'FXCoach © 2026 — Built for prop traders, by a prop trader.' : 'FXCoach © 2026 — Conçu pour les prop traders, par une prop trader.',
  };

  const freeFeatures = lang === 'EN'
    ? ["✅ Basic stats (win rate, R/R, net profit)", "✅ 1 bias detected — the most critical", "✅ Coach message preview", "🔒 Full coach report", "🔒 All biases detected", "🔒 Interactive charts", "🔒 Chat with AI coach", "🔒 FTMO progress tracking"]
    : ["✅ Stats de base (win rate, R/R, profit net)", "✅ 1 biais détecté — le plus critique", "✅ Aperçu du message coach", "🔒 Rapport coach complet", "🔒 Tous les biais détectés", "🔒 Graphiques interactifs", "🔒 Chat avec le coach IA", "🔒 Suivi progression FTMO"];

  const premiumFeatures = lang === 'EN'
    ? ["✅ Full stats + interactive charts", "✅ All biases detected (personalized AI)", "✅ Full coach report in natural language", "✅ Chat with AI coach", "✅ Progress tracking + FTMO countdown", "✅ Key points for your next trades", "✅ Personal notes", "✅ Multilingual"]
    : ["✅ Stats complètes + graphiques interactifs", "✅ Tous les biais détectés (IA personnalisée)", "✅ Rapport coach complet en langage naturel", "✅ Chat avec le coach IA", "✅ Suivi progression + countdown FTMO", "✅ Key points pour tes prochains trades", "✅ Notes personnelles", "✅ Multilingue"];

  const testimonials = lang === 'EN'
    ? [
        { quote: "I almost passed my FTMO by £71. FXCoach showed me exactly why I failed.", name: "Leslie T.", role: "XAUUSD Trader" },
        { quote: "I was increasing my position size by 52% after every loss without realizing it.", name: "Marc D.", role: "Forex Trader" },
        { quote: "Finally a tool that speaks the prop trader language. Not generic advice.", name: "Sofia R.", role: "FTMO Funded" },
      ]
    : [
        { quote: "J'ai failli passer mon FTMO à £71 près. FXCoach m'a montré exactement pourquoi.", name: "Leslie T.", role: "Trader XAUUSD" },
        { quote: "J'augmentais ma mise de 52% après chaque perte sans m'en rendre compte.", name: "Marc D.", role: "Trader Forex" },
        { quote: "Enfin un outil qui parle le langage des prop traders. Pas du blabla générique.", name: "Sofia R.", role: "FTMO Funded" },
      ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-900">FXCoach</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => changeLang('EN')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'EN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => changeLang('FR')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'FR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              FR
            </button>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            {t.login}
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="text-sm text-white px-4 py-2 rounded-lg font-semibold transition"
            style={{backgroundColor: '#c9a84c'}}
          >
            {t.getStarted}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border mb-6"
            style={{color: '#c9a84c', borderColor: '#c9a84c', backgroundColor: '#c9a84c10'}}>
            {t.badge}
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            {t.h1a}<br />
            <span style={{color: '#c9a84c'}}>{t.h1b}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">{t.sub}</p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/analyse')}
              className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition"
              style={{backgroundColor: '#c9a84c'}}
            >
              {t.cta}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-4 rounded-xl text-gray-700 font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              {t.howItWorks}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 text-center px-6">
          {[
            { value: "500+", label: "Traders" },
            { value: "8", label: lang === 'EN' ? "Biases detected" : "Biais détectés" },
            { value: "30s", label: lang === 'EN' ? "Analysis time" : "Temps d'analyse" },
            { value: "FR/EN", label: lang === 'EN' ? "Languages" : "Langues" },
          ].map((stat, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="text-3xl font-bold mb-1" style={{color: '#c9a84c'}}>{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-center text-gray-900 mb-4">
          {t.whyTitle}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-500 mb-16">
          {t.whySub}
        </motion.p>
        <div className="grid grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all cursor-pointer">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-center text-gray-900 mb-16">
            {t.testimonialTitle}
          </motion.h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="text-2xl mb-4" style={{color: '#c9a84c'}}>❝</div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">{t.quote}</p>
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-center text-gray-900 mb-4">
          {t.pricingTitle}
        </motion.h2>
        <p className="text-center text-gray-500 mb-16">{t.pricingSub}</p>
        <div className="grid grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl border border-gray-200">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.free}</div>
            <div className="text-4xl font-bold text-gray-900 mb-8">€0</div>
            {freeFeatures.map((f, i) => (
              <div key={i} className="text-sm text-gray-600 py-2 border-b border-gray-50">{f}</div>
            ))}
            <button onClick={() => navigate('/analyse')} className="mt-8 w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition">
              {t.startFree}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl border-2 relative" style={{borderColor: '#c9a84c'}}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{backgroundColor: '#c9a84c'}}>
              {t.popular}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{color: '#c9a84c'}}>Premium</div>
            <div className="text-4xl font-bold text-gray-900 mb-8">€19<span className="text-lg font-normal text-gray-500">{t.monthly}</span></div>
            {premiumFeatures.map((f, i) => (
              <div key={i} className="text-sm text-gray-700 py-2 border-b border-gray-50">{f}</div>
            ))}
            <button onClick={() => navigate('/auth')} className="mt-8 w-full py-3 rounded-xl text-white font-semibold transition" style={{backgroundColor: '#c9a84c'}}>
              {t.startPremium}
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 text-center" style={{backgroundColor: '#c9a84c10'}}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaFinal}</h2>
          <p className="text-gray-500 mb-8">{t.ctaFinalSub}</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/analyse')}
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg" style={{backgroundColor: '#c9a84c'}}>
            {t.cta}
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
  <p className="mb-2">{t.footer}</p>
  <div className="flex justify-center gap-6">
    <button onClick={() => navigate('/mentions-legales')} className="hover:text-gray-600 transition">Mentions légales</button>
    <button onClick={() => navigate('/cgu')} className="hover:text-gray-600 transition">CGU</button>
    <a href="mailto:fxcoachh@gmail.com" className="hover:text-gray-600 transition">Contact</a>
  </div>
</footer>
  );
}