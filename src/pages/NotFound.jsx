import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 max-w-md"
      >
        <div className="text-6xl mb-6">📉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lang === 'EN' ? 'Page not found' : 'Page introuvable'}
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {lang === 'EN'
            ? 'This page doesn\'t exist. Let\'s get you back on track.'
            : 'Cette page n\'existe pas. Retournons sur la bonne voie.'}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
            style={{backgroundColor: '#c9a84c'}}
          >
            {lang === 'EN' ? '← Back to home' : '← Retour à l\'accueil'}
          </button>
          <button
            onClick={() => navigate('/analyse')}
            className="px-8 py-3 rounded-xl text-gray-600 font-semibold border border-gray-200 hover:bg-gray-50 transition"
          >
            {lang === 'EN' ? 'Analyze my trades →' : 'Analyser mes trades →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}