import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import CookieBanner from './components/CookieBanner';
import Landing from './pages/Landing';
import Analyse from './pages/Analyse';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';
import Success from './pages/Success';
import MentionsLegales from './pages/MentionsLegales';
import CGU from './pages/CGU';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <CookieBanner />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/analyse" element={<Analyse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;