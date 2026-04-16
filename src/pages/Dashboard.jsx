import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const GOLD = '#c9a84c';

const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS_EN = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DAYS_FR = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

function getCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const weeks = [];
  let week = Array(startDow).fill(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { lang, changeLang } = useLang();
  const { isPremium } = useAuth();

  const [capital, setCapital] = useState(10000);
  const [targetPct, setTargetPct] = useState(10);
  const [drawdownPct, setDrawdownPct] = useState(10);
  const [currentPnl, setCurrentPnl] = useState(0);
  const [notes, setNotes] = useState('');

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const rawDailyPnl = JSON.parse(localStorage.getItem('fxcoach_daily_pnl') || '[]');
  const savedBiases = JSON.parse(localStorage.getItem('fxcoach_biases') || '[]');

  const dailyMap = {};
  rawDailyPnl.forEach(({ date, pnl }) => { dailyMap[date] = pnl; });

  const targetAmount = capital * targetPct / 100;
  const drawdownAmount = capital * drawdownPct / 100;
  const progressPct = Math.min(Math.max((currentPnl / targetAmount) * 100, 0), 100);

  const monthStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}`;
  const monthEntries = Object.entries(dailyMap).filter(([d]) => d.startsWith(monthStr));
  const monthPnl = monthEntries.reduce((sum, [, v]) => sum + v, 0);
  const greenDays = monthEntries.filter(([, v]) => v > 0).length;
  const redDays = monthEntries.filter(([, v]) => v < 0).length;

  const disciplineScore = Math.max(0, savedBiases.reduce((score, b) => {
    if (b.severity === 'CRITICAL') return score - 30;
    if (b.severity === 'HIGH') return score - 20;
    if (b.severity === 'MEDIUM') return score - 10;
    return score;
  }, 100));

  const scoreLabel = disciplineScore >= 80
    ? (lang === 'EN' ? 'Excellent' : 'Excellent')
    : disciplineScore >= 60
    ? (lang === 'EN' ? 'Good' : 'Bon')
    : disciplineScore >= 40
    ? (lang === 'EN' ? 'Needs work' : 'À améliorer')
    : (lang === 'EN' ? 'Critical' : 'Critique');

  const scoreColor = disciplineScore >= 70 ? '#4caf7d' : disciplineScore >= 40 ? GOLD : '#e8604c';

  const t = {
    title: lang === 'EN' ? 'Dashboard — Challenge Tracker' : 'Dashboard — Suivi de challenge',
    params: lang === 'EN' ? '⚙️ Your challenge parameters' : '⚙️ Paramètres de ton challenge',
    capital: lang === 'EN' ? 'Account capital (€)' : 'Capital du compte (€)',
    target: lang === 'EN' ? 'Profit target (%)' : 'Objectif de profit (%)',
    drawdown: lang === 'EN' ? 'Max drawdown (%)' : 'Drawdown maximum (%)',
    currentPnlLabel: lang === 'EN' ? 'Current P&L (€)' : 'P&L actuel (€)',
    progress: lang === 'EN' ? '📈 Progress toward target' : '📈 Progression vers l\'objectif',
    score: lang === 'EN' ? '🎯 Discipline score' : '🎯 Score de discipline',
    keypoints: lang === 'EN' ? '✅ Key points for your next trades' : '✅ Key points pour tes prochains trades',
    calendar: lang === 'EN' ? '📅 Trading calendar' : '📅 Calendrier de trading',
    notes: lang === 'EN' ? '📝 My personal notes' : '📝 Mes notes personnelles',
    notesPlaceholder: lang === 'EN' ? 'Write your observations, resolutions, focus points...' : 'Écris tes observations, tes résolutions, tes points d\'attention...',
    back: lang === 'EN' ? '← Back' : '← Retour',
    analyse: lang === 'EN' ? 'Run new analysis →' : 'Lancer une analyse →',
    pnlLabel: lang === 'EN' ? 'Current P&L' : 'P&L actuel',
    targetLabel: lang === 'EN' ? 'Target' : 'Objectif',
    maxDD: 'Max drawdown',
    monthPnl: lang === 'EN' ? 'Month P&L' : 'P&L du mois',
    greenDays: lang === 'EN' ? 'Green days' : 'Jours verts',
    redDays: lang === 'EN' ? 'Red days' : 'Jours rouges',
    noData: lang === 'EN' ? 'Run an analysis to see your trading calendar.' : 'Lance une analyse pour voir ton calendrier de trading.',
    premiumLock: lang === 'EN' ? '🔒 Premium feature — upgrade to unlock' : '🔒 Fonctionnalité Premium — upgrade pour débloquer',
    upgradeBtn: lang === 'EN' ? '✨ Upgrade to Premium — €19/mo' : '✨ Passer Premium — €19/mois',
  };

  const getProgressStatus = () => {
    if (progressPct >= 100) return { msg: lang === 'EN' ? '🎉 Target reached! You can request your payout.' : '🎉 Objectif atteint ! Tu peux demander ton payout.', color: 'bg-green-50 border-green-200 text-green-700' };
    if (progressPct >= 70) return { msg: lang === 'EN' ? '🔥 Almost there! Stay disciplined.' : '🔥 Presque ! Reste discipliné.', color: 'bg-blue-50 border-blue-200 text-blue-700' };
    if (progressPct >= 30) return { msg: lang === 'EN' ? '💪 Keep going, stay consistent.' : '💪 Continue, reste consistant.', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' };
    return { msg: lang === 'EN' ? '📉 Early stage — focus on discipline, not profit.' : '📉 Début du challenge — focus sur la discipline, pas le profit.', color: 'bg-red-50 border-red-200 text-red-700' };
  };

  const status = getProgressStatus();
  const weeks = getCalendarWeeks(calYear, calMonth);
  const months = lang === 'EN' ? MONTHS_EN : MONTHS_FR;
  const days = lang === 'EN' ? DAYS_EN : DAYS_FR;

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

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
              { label: t.currentPnlLabel, value: currentPnl, setter: setCurrentPnl, min: -50000, max: 200000, step: 100 },
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
          <div className={`p-4 rounded-xl border text-sm font-medium ${status.color}`}>
            {status.msg}
          </div>
        </motion.div>

        {/* CALENDRIER — FREE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.calendar}</h2>
          {rawDailyPnl.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm mb-4">{t.noData}</p>
              <button onClick={() => navigate('/analyse')}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: GOLD }}>
                {t.analyse}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 font-bold">←</button>
                <span className="font-semibold text-gray-900">{months[calMonth]} {calYear}</span>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 font-bold">→</button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {days.map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                  {week.map((day, di) => {
                    if (!day) return <div key={di} />;
                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const pnl = dailyMap[dateStr];
                    const isToday = dateStr === today.toISOString().split('T')[0];
                    if (pnl !== undefined) {
                      const isGreen = pnl >= 0;
                      return (
                        <div key={di} className={`rounded-lg p-1 text-center ${isGreen ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className="text-xs text-gray-400">{day}</div>
                          <div className={`text-xs font-bold ${isGreen ? 'text-green-600' : 'text-red-500'}`}>
                            {isGreen ? '+' : ''}{pnl}
                          </div>
                        </div>
                      );
                    }
                    if (isToday) {
                      return (
                        <div key={di} className="rounded-lg p-1 text-center border-2" style={{ borderColor: GOLD }}>
                          <div className="text-xs font-bold" style={{ color: GOLD }}>{day}</div>
                        </div>
                      );
                    }
                    return (
                      <div key={di} className="rounded-lg p-1 text-center bg-gray-50">
                        <div className="text-xs text-gray-300">{day}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
              {monthEntries.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                  {[
                    { label: t.monthPnl, value: `€${monthPnl.toFixed(2)}`, color: monthPnl >= 0 ? 'text-green-600' : 'text-red-500' },
                    { label: t.greenDays, value: greenDays, color: 'text-green-600' },
                    { label: t.redDays, value: redDays, color: 'text-red-500' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center">
                      <div className={`text-xl font-bold ${color}`}>{value}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* DISCIPLINE SCORE — PREMIUM ONLY */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.score}</h2>
          {!isPremium ? (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-4">{t.premiumLock}</p>
              <button onClick={() => navigate('/pricing')}
                className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: GOLD }}>
                {t.upgradeBtn}
              </button>
            </div>
          ) : savedBiases.length === 0 ? (
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold" style={{ color: GOLD }}>—</div>
              <p className="text-sm text-gray-400">
                {lang === 'EN' ? 'Run an analysis first to get your discipline score.' : 'Lance d\'abord une analyse pour obtenir ton score.'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-6 mb-4">
                <div className="text-6xl font-bold" style={{ color: scoreColor }}>{disciplineScore}</div>
                <div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">/100</div>
                  <div className="font-semibold text-lg" style={{ color: scoreColor }}>{scoreLabel}</div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${disciplineScore}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-3 rounded-full"
                  style={{ backgroundColor: scoreColor }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { label: 'Score', value: `${disciplineScore}/100` },
                  { label: 'Status', value: scoreLabel },
                  { label: lang === 'EN' ? 'Biases' : 'Biais', value: savedBiases.filter(b => b.severity !== 'POSITIVE').length },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl bg-gray-50 text-center">
                    <div className="font-bold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {isPremium && (
            <button onClick={() => navigate('/analyse')}
              className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
              style={{ backgroundColor: GOLD }}>
              {t.analyse}
            </button>
          )}
        </motion.div>

        {/* KEY POINTS — PREMIUM ONLY */}
        {isPremium && savedBiases.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="p-6 rounded-2xl border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.keypoints}</h2>
            <div className="space-y-3">
              {savedBiases
                .filter(b => b.severity !== 'POSITIVE')
                .map((b, i) => {
                  const styles = {
                    CRITICAL: 'bg-red-50 border-red-200 text-red-700',
                    HIGH: 'bg-orange-50 border-orange-200 text-orange-700',
                    MEDIUM: 'bg-blue-50 border-blue-200 text-blue-700',
                  };
                  const icons = { CRITICAL: '🔴', HIGH: '🟠', MEDIUM: '🔵' };
                  return (
                    <div key={i} className={`p-4 rounded-xl border text-sm ${styles[b.severity] || 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                      <span className="mr-2">{icons[b.severity] || '⚪'}</span>
                      <strong>{b.name}</strong> — {b.advice}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* NOTES — FREE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
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

      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        FXCoach © 2026 — {lang === 'EN' ? 'Built for prop traders, by a prop trader.' : 'Conçu pour les prop traders, par une prop trader.'}
      </footer>
    </div>
  );
}