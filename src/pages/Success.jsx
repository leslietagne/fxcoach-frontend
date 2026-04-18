import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function Success() {
  const navigate = useNavigate();
  const { lang } = useLang();

  useEffect(() => {
    setTimeout(() => navigate('/analyse'), 5000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 max-w-md"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lang === 'EN' ? 'Welcome to Premium!' : 'Bienvenue en Premium !'}
        </h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          {lang === 'EN'
            ? 'Your account has been upgraded. You now have access to all FXCoach features — full coach report, all biases detected, AI chat and FTMO tracking.'
            : 'Ton compte a été upgradé. Tu as maintenant accès à toutes les fonctionnalités FXCoach — rapport coach complet, tous les biais détectés, chat IA et suivi FTMO.'}
        </p>
        <div className="text-sm text-gray-400 mb-8">
          {lang === 'EN' ? 'Redirecting to your analysis in 5 seconds...' : 'Redirection vers ton analyse dans 5 secondes...'}
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/analyse')}
            className="px-8 py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
            style={{backgroundColor: '#c9a84c'}}
          >
            {lang === 'EN' ? 'Start analyzing now →' : 'Analyser maintenant →'}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-xl text-gray-600 font-semibold border border-gray-200 hover:bg-gray-50 transition"
          >
            {lang === 'EN' ? 'Go to Dashboard →' : 'Aller au Dashboard →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}