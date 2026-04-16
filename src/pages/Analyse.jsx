import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default function Analyse() {
  const navigate = useNavigate();
  const { user, isPremium, signOut } = useAuth();
  const { lang, changeLang } = useLang();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [biases, setBiases] = useState(null);
  const [hourStats, setHourStats] = useState(null);
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [question, setQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const t = {
    title: lang === 'EN' ? 'Your trade analysis' : 'Analyse de tes trades',
    upload: lang === 'EN' ? 'Upload your CSV trade journal' : 'Upload ton journal de trades CSV',
    analyze: lang === 'EN' ? 'Analyze my trades →' : 'Analyser mes trades →',
    overview: lang === 'EN' ? 'Overview' : 'Vue générale',
    biasesTitle: lang === 'EN' ? 'Behavioral biases detected' : 'Biais comportementaux détectés',
    coachTitle: lang === 'EN' ? 'Coach report' : 'Rapport coach',
    generateReport: lang === 'EN' ? 'Generate my coach report →' : 'Générer mon rapport coach →',
    chatTitle: lang === 'EN' ? 'Chat with your coach' : 'Chat avec ton coach',
    chatPlaceholder: lang === 'EN' ? 'Ask your coach anything...' : 'Pose une question à ton coach...',
    premiumLock: lang === 'EN' ? '🔒 Premium feature — upgrade to unlock' : '🔒 Fonctionnalité Premium — upgrade pour débloquer',
    loading: lang === 'EN' ? 'Analyzing your trades...' : 'Analyse en cours...',
    upgradeBtn: lang === 'EN' ? '✨ Upgrade to Premium — €19/mo' : '✨ Passer Premium — €19/mois',
    logout: lang === 'EN' ? 'Logout' : 'Déconnexion',
    login: lang === 'EN' ? 'Login' : 'Connexion',
    dashboardTitle: lang === 'EN' ? '📊 Track your challenge progress' : '📊 Suis ta progression de challenge',
    dashboardSub: lang === 'EN' ? 'Set your targets and monitor your P&L over time.' : 'Définis tes objectifs et suis ton P&L dans le temps.',
    dashboardBtn: lang === 'EN' ? 'Open Dashboard →' : 'Ouvrir le Dashboard →',
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setStats(null);
    setBiases(null);
    setReport(null);
    setChat([]);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('lang', lang);
    try {
      const res = await axios.post(`${API}/analyze`, formData);
      setStats(res.data.stats);
      setBiases(res.data.biases);
      setHourStats(res.data.hour_stats);
      localStorage.setItem('fxcoach_daily_pnl', JSON.stringify(res.data.daily_pnl || []));
      localStorage.setItem('fxcoach_biases', JSON.stringify(res.data.biases || [])); // ← ajouter
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setReportLoading(true);
    try {
      const res = await axios.post(`${API}/coach-report`, {
        stats, biases, hour_stats: hourStats, lang
      });
      setReport(res.data.report);
    } catch (e) {
      console.error(e);
    } finally {
      setReportLoading(false);
    }
  };

  const handleChat = async () => {
    if (!question.trim()) return;
    const newChat = [...chat, { role: 'user', content: question }];
    setChat(newChat);
    setQuestion('');
    setChatLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        question, stats, biases, lang
      });
      setChat([...newChat, { role: 'assistant', content: res.data.answer }]);
    } catch (e) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  const severityColor = (s) => {
    if (s === 'CRITICAL') return 'border-red-200 bg-red-50';
    if (s === 'HIGH') return 'border-orange-200 bg-orange-50';
    if (s === 'MEDIUM') return 'border-blue-100 bg-blue-50';
    return 'border-green-200 bg-green-50';
  };

  const severityDot = (s) => {
    if (s === 'CRITICAL') return 'bg-red-500';
    if (s === 'HIGH') return 'bg-orange-400';
    if (s === 'MEDIUM') return 'bg-blue-400';
    return 'bg-green-400';
  };

  const markdownComponents = {
    h1: ({children}) => <h1 style={{fontSize: '16px', fontWeight: '700', marginBottom: '8px', marginTop: '16px', color: '#111827'}}>{children}</h1>,
    h2: ({children}) => <h2 style={{fontSize: '15px', fontWeight: '700', marginBottom: '6px', marginTop: '14px', color: '#111827'}}>{children}</h2>,
    h3: ({children}) => <h3 style={{fontSize: '14px', fontWeight: '600', marginBottom: '4px', marginTop: '12px', color: '#111827'}}>{children}</h3>,
    p: ({children}) => <p style={{marginBottom: '10px'}}>{children}</p>,
    strong: ({children}) => <strong style={{fontWeight: '600', color: '#111827'}}>{children}</strong>,
    em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
    ul: ({children}) => <ul style={{paddingLeft: '16px', marginBottom: '10px'}}>{children}</ul>,
    ol: ({children}) => <ol style={{paddingLeft: '16px', marginBottom: '10px'}}>{children}</ol>,
    li: ({children}) => <li style={{marginBottom: '4px', listStyleType: 'disc'}}>{children}</li>,
    hr: () => <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', margin: '12px 0'}} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900">FXCoach</button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => changeLang('EN')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'EN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>EN</button>
            <button onClick={() => changeLang('FR')} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${lang === 'FR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>FR</button>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{user.email}</span>
              <button
                onClick={async () => { await signOut(); navigate('/'); }}
                className="text-xs text-gray-400 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/auth')} className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
              {t.login}
            </button>
          )}
          {!isPremium && (
            <button
              onClick={() => navigate('/pricing')}
              className="text-sm text-white px-4 py-2 rounded-lg font-semibold transition"
              style={{backgroundColor: '#c9a84c'}}
            >
              {lang === 'EN' ? '✨ Premium — €19/mo' : '✨ Premium — €19/mois'}
            </button>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto pt-28 pb-16 px-6">

        {/* UPLOAD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
          <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-300 transition">
            <div className="text-3xl mb-3">📁</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{t.upload}</div>
            <div className="text-xs text-gray-400">CSV — MetaTrader, FTMO, TradingView</div>
            {file && <div className="mt-3 text-sm text-green-600 font-semibold">✅ {file.name}</div>}
            <input type="file" accept=".csv" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-6 w-full py-4 rounded-xl text-white font-semibold text-lg transition disabled:opacity-50"
            style={{backgroundColor: '#c9a84c'}}
          >
            {loading ? t.loading : t.analyze}
          </motion.button>
        </motion.div>

        {/* STATS */}
        {stats && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">📊 {t.overview}</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Total trades', value: stats.total_trades },
                { label: 'Win rate', value: `${stats.win_rate}%` },
                { label: 'Net profit', value: `$${stats.net_profit}` },
                { label: 'Avg win', value: `$${stats.avg_win}` },
                { label: 'Avg loss', value: `$${stats.avg_loss}` },
                { label: 'R/R ratio', value: stats.rr_ratio },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-xl font-bold text-gray-900">{s.value}</div>
                </div>
              ))}
            </div>
            {stats.trades_no_sl > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                ⚠️ {stats.trades_no_sl} {lang === 'EN' ? 'trades with no stop loss — P&L:' : 'trades sans stop loss — P&L:'} ${stats.pnl_no_sl}
              </div>
            )}
          </motion.div>
        )}

        {/* DASHBOARD CTA */}
        {stats && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-gray-900 mb-1">{t.dashboardTitle}</div>
              <div className="text-sm text-gray-400">{t.dashboardSub}</div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 whitespace-nowrap"
              style={{backgroundColor: '#c9a84c'}}
            >
              {t.dashboardBtn}
            </button>
          </motion.div>
        )}

        {/* BIAIS */}
        {biases && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">🧠 {t.biasesTitle}</h2>
            {isPremium
              ? biases.map((b, i) => (
                <div key={i} className={`border rounded-xl p-5 mb-4 ${severityColor(b.severity)}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${severityDot(b.severity)}`}></div>
                    <span className="font-semibold text-gray-900">{String(b.name)}</span>
                    <span className="text-xs text-gray-500 uppercase">{String(b.severity)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{String(b.detail)}</p>
                  <p className="text-sm text-gray-500 italic">💡 {String(b.advice)}</p>
                </div>
              ))
              : (
                <>
                  {biases.slice(0, 1).map((b, i) => (
                    <div key={i} className={`border rounded-xl p-5 mb-4 ${severityColor(b.severity)}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${severityDot(b.severity)}`}></div>
                        <span className="font-semibold text-gray-900">{String(b.name)}</span>
                        <span className="text-xs text-gray-500 uppercase">{String(b.severity)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{String(b.detail)}</p>
                      <p className="text-sm text-gray-500 italic">💡 {String(b.advice)}</p>
                    </div>
                  ))}
                  <div className="border border-gray-200 rounded-xl p-5 text-center bg-gray-50">
                    <p className="text-sm text-gray-500 mb-3">{t.premiumLock}</p>
                    <button
                      onClick={() => navigate('/pricing')}
                      className="px-6 py-2 rounded-lg text-white text-sm font-semibold"
                      style={{backgroundColor: '#c9a84c'}}
                    >
                      {t.upgradeBtn}
                    </button>
                  </div>
                </>
              )
            }
          </motion.div>
        )}

        {/* RAPPORT COACH */}
        {stats && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">🎯 {t.coachTitle}</h2>
            {!isPremium ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">{t.premiumLock}</p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-6 py-3 rounded-xl text-white font-semibold"
                  style={{backgroundColor: '#c9a84c'}}
                >
                  {t.upgradeBtn}
                </button>
              </div>
            ) : (
              <>
                {!report && (
                  <button
                    onClick={handleGenerateReport}
                    disabled={reportLoading}
                    className="w-full py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                    style={{backgroundColor: '#c9a84c'}}
                  >
                    {reportLoading ? '⏳ Generating...' : t.generateReport}
                  </button>
                )}
                {report && (
                  <div style={{fontSize: '14px', lineHeight: '1.8', color: '#374151'}}>
                    <ReactMarkdown components={markdownComponents}>{report}</ReactMarkdown>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* CHAT */}
        {stats && isPremium && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">💬 {t.chatTitle}</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {chat.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-br-sm'
                        : 'bg-gray-50 text-gray-700 rounded-bl-sm border border-gray-100'
                    }`}
                    style={msg.role === 'user' ? {backgroundColor: '#c9a84c'} : {}}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown components={markdownComponents}>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{backgroundColor: '#c9a84c'}}
                  >
                    FX
                  </motion.div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-3">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-300"
              />
              <button
                onClick={handleChat}
                disabled={chatLoading}
                className="px-4 py-3 rounded-xl text-white font-semibold disabled:opacity-50 transition"
                style={{backgroundColor: '#c9a84c'}}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}