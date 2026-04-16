import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

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
          Welcome to Premium!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your account has been upgraded. You now have access to all FXCoach features — full coach report, all biases, chat and FTMO tracking.
        </p>
        <div className="text-sm text-gray-400 mb-6">
          Redirecting to your analysis in 5 seconds...
        </div>
        <button
          onClick={() => navigate('/analyse')}
          className="px-8 py-3 rounded-xl text-white font-semibold"
          style={{backgroundColor: '#c9a84c'}}
        >
          Start analyzing now →
        </button>
      </motion.div>
    </div>
  );
}