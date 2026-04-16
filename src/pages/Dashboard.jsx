import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const GOLD = '#c9a84c';

export default function Dashboard() {
  const navigate = useNavigate();
  const { lang, changeLang } = useLang();

  const [capital, setCapital] = useState(10000);
  const [targetPct, setTargetPct] = useState(10);
  const [drawdownPct, setDrawdownPct] = useState(10);
  const [currentPnl, setCurrentPnl] = useState(0);
  const [notes, setNotes] = useState('');

  const targetAmount = capital * targetPct / 100;
  const drawdownAmount = capital * drawdownPct / 100;
  const progressPct = Math.min(Math.max((currentPnl / targetAmount) * 100, 0), 100);

  const t = {
    title: lang === 'EN' ? 'Dashboard — Challenge Tracker' : 'Dashboard — Suivi de challenge',
    params: lang === 'EN' ? '⚙️ Your challenge parameters' : '⚙️ Paramètres de ton challenge',
    capital: lang === 'EN' ? 'Account capital (€)' : 'Capital du compte (€)',
    target: lang === 'EN' ? 'Profit target (%)' : 'Objectif de profit (%)',
    drawdown: lang === 'EN' ? 'Max drawdown (%)' : 'Drawdown maximum (%)',
    currentPnl: lang === 'EN' ? 'Current P&L (€)' : 'P&L actuel (€)',
    progress: lang === 'EN' ? '📈 Progress toward target' : '📈 Progression vers l\'objectif',
    score: lang === 'EN' ? '🎯 Discipline score' : '🎯 Score de discipline',
    notes: lang === 'EN' ? '📝 My personal notes' : '📝 Mes notes personnelles',
    notesPlaceholder: lang === 'EN' ? 'Write your observations, resolutions, focus points...' : 'Écris tes observations, tes résolutions, tes points d\'attention...',
    back: lang === 'EN' ? '← Back' : '← Retour',
    analyse: lang === 'EN' ? 'Run new analysis →' : 'Lancer une analyse →',
    pnlLabel: lang === 'EN' ? 'Current P&L' : 'P&L actuel',
    targetLabel: lang === 'EN' ? 'Target' : 'Objectif',
    maxDD: 'Max drawdown',
  };

  const getProgressStatus = () => {
    if (progressPct >= 100) return { msg: lang === 'EN' ? '🎉 Target reached! You can request your payout.' : '🎉 Objectif atteint ! Tu peux demander ton payout.', color: 'bg-green-50 border-green-200 text-green-700' };
    if (progressPct >= 70) return { msg: lang === 'EN' ? '🔥 Almost there! Stay disciplined.' : '🔥 Presque ! Reste discipliné.', color: 'bg-blue-50 border-blue-200 text-blue-700' };
    if (progressPct >= 30) return { msg: lang === 'EN' ? '💪 Keep going, stay consistent.' : '💪 Continue, reste consistant.', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' };
    return { msg: lang === 'EN' ? '📉 Early stage — focus on discipline, not profit.' : '📉 Début du challenge — focus sur la discipline, pas le profit.', color: 'bg-red-50 border-red-200 text-red-700' };
  };

  const status = getProgressStatus();

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
          <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 transition">{t.back}</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-28 pb-16 px-6">

        {/* TITLE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">📊 {t.title}</h1>
        </motion.div>

        {/* PARAMS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.params}</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: t.capital, value: capital, setter: setCapital, min: 1000, max: 200000, step: 1000 },
              { label: t.currentPnl, value: currentPnl, setter: setCurrentPnl, min: -50000, max: 200000, step: 100 },
              { label: t.target, value: targetPct, setter: setTargetPct, min: 1, max: 20, step: 0.5 },
              { label: t.drawdown, value: drawdownPct, setter: setDrawdownPct, min: 1, max: 20, step: 0.5 },
            ].map(({ label, value, setter, min, max, step }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <input
                  type="number"
                  value={value}
                  min={min}
                  max={max}
                  step={step}
                  onChange={e => setter(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* PROGRESS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.progress}</h2>

          {/* METRICS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: t.pnlLabel, value: `€${currentPnl}`, color: currentPnl >= 0 ? 'text-green-600' : 'text-red-500' },
              { label: t.targetLabel, value: `€${targetAmount.toFixed(0)}`, color: 'text-gray-900' },
              { label: t.maxDD, value: `€${drawdownAmount.toFixed(0)}`, color: 'text-red-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="p-4 rounded-xl bg-gray-50 text-center">
                <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-3 flex justify-between text-sm text-gray-500">
            <span>{lang === 'EN' ? 'Profit target' : 'Objectif de profit'}</span>
            <span className="font-semibold" style={{ color: GOLD }}>{progressPct.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-4 rounded-full"
              style={{ backgroundColor: GOLD }}
            />
          </div>

          {/* STATUS */}
          <div className={`p-4 rounded-xl border text-sm font-medium ${status.color}`}>
            {status.msg}
          </div>
        </motion.div>

        {/* DISCIPLINE SCORE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.score}</h2>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold" style={{ color: GOLD }}>—</div>
            <p className="text-sm text-gray-400">
              {lang === 'EN'
                ? 'Run an analysis first to get your discipline score based on your detected biases.'
                : 'Lance d\'abord une analyse pour obtenir ton score de discipline basé sur tes biais détectés.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/analyse')}
            className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            {t.analyse}
          </button>
        </motion.div>

        {/* NOTES */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.notes}</h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder={t.notesPlaceholder}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm focus:outline-none focus:border-yellow-400 transition resize-none"
          />
        </motion.div>

      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        FXCoach © 2026 — {lang === 'EN' ? 'Built for prop traders, by a prop trader.' : 'Conçu pour les prop traders, par une prop trader.'}
      </footer>
    </div>
  );
}