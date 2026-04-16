import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Analyse from './pages/Analyse';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analyse" element={<Analyse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;