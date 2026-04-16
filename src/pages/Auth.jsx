import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { lang, changeLang } = useLang();
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const error = await signIn(email, password);
    if (error) {
      setMessage(lang === 'FR' ? 'Email ou mot de passe incorrect' : 'Invalid email or password');
    } else {
      navigate('/analyse');
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage('');
    const error = await signUp(email, password);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage(lang === 'FR'
        ? '📧 Compte créé ! Vérifie ton email avant de te connecter.'
        : '📧 Account created! Check your email before logging in.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900">FXCoach</button>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => changeLang('EN')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'EN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>EN</button>
          <button onClick={() => changeLang('FR')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'FR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>FR</button>
        </div>
      </nav>

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {tab === 'login'
              ? (lang === 'FR' ? 'Connexion' : 'Login')
              : (lang === 'FR' ? 'Créer un compte' : 'Create account')}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            {tab === 'login'
              ? (lang === 'FR' ? 'Accède à ton espace FXCoach' : 'Access your FXCoach space')
              : (lang === 'FR' ? 'Rejoins FXCoach gratuitement' : 'Join FXCoach for free')}
          </p>

          {/* TABS */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
            <button onClick={() => setTab('login')}
              className={`flex-1 text-sm font-semibold py-2 rounded-md transition ${tab === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>
              {lang === 'FR' ? 'Se connecter' : 'Login'}
            </button>
            <button onClick={() => setTab('signup')}
              className={`flex-1 text-sm font-semibold py-2 rounded-md transition ${tab === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>
              {lang === 'FR' ? "S'inscrire" : 'Sign up'}
            </button>
          </div>

          {/* INPUTS */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-300"
                placeholder="trader@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'FR' ? 'Mot de passe' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (tab === 'login' ? handleLogin() : handleSignup())}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
              {message}
            </div>
          )}

          {/* BOUTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={tab === 'login' ? handleLogin : handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold disabled:opacity-50"
            style={{backgroundColor: '#c9a84c'}}
          >
            {loading ? '⏳...' : tab === 'login'
              ? (lang === 'FR' ? 'Se connecter →' : 'Login →')
              : (lang === 'FR' ? 'Créer mon compte →' : 'Create my account →')}
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-6">
            {lang === 'FR'
              ? "En continuant, tu acceptes nos conditions d'utilisation."
              : 'By continuing, you agree to our terms of service.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}