import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, Type, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const MealLogger = () => {
  const [mealInput, setMealInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [nudge, setNudge] = useState(null);

  const handleLog = () => {
    if (!mealInput) return;
    setAnalyzing(true);
    
    // Simulate AI parsing and deviation engine
    setTimeout(() => {
      setAnalyzing(false);
      const text = mealInput.toLowerCase();
      
      if (text.includes('bhatura') || text.includes('pizza') || text.includes('sweet') || text.includes('cola')) {
        setNudge({
          type: 'warning',
          title: 'Significant Deviation Detected',
          message: 'This meal puts you 450 kcal over your target for the day. How would you like to proceed?',
          options: [
            { id: 'strict', label: 'Strict Correction', desc: 'Reduce tomorrow\'s calories to stay on the exact same milestone date.' },
            { id: 'flexible', label: 'Sustainable Extension', desc: 'Keep daily limits the same and push the goal date back by 2 days.' }
          ]
        });
      } else {
        setNudge({
          type: 'success',
          title: 'Meal Logged Successfully',
          message: 'Great choice! This perfectly fits your macro targets for the day.',
          options: []
        });
      }
    }, 1500);
  };

  const handleOptionSelect = () => {
    setNudge(null);
    setMealInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-grid"
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', gap: '30px' }}
    >
      <div className="card glass-panel">
        <h2 style={{ marginBottom: '20px', fontWeight: '600' }}>Log a Meal</h2>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <button className="glass-button secondary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Camera size={20} /> Snap Photo
          </button>
          <button className="glass-button secondary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Mic size={20} /> Voice Note
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Type size={18} style={{ position: 'absolute', left: '15px', top: '14px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="glass-input" 
              style={{ paddingLeft: '45px' }}
              placeholder="E.g. 2 Chole Bhature and a Diet Coke" 
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
            />
          </div>
          <button className="glass-button" onClick={handleLog} disabled={analyzing}>
            {analyzing ? 'Analyzing...' : 'Log It'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {nudge && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card glass-panel"
            style={{ 
              borderLeft: \`4px solid \${nudge.type === 'warning' ? 'var(--warning)' : 'var(--success)'}\`,
              background: nudge.type === 'warning' ? 'rgba(241, 196, 15, 0.05)' : 'rgba(46, 204, 113, 0.05)'
            }}
          >
            <div className="card-title" style={{ color: nudge.type === 'warning' ? 'var(--warning)' : 'var(--success)' }}>
              {nudge.type === 'warning' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
              {nudge.title}
            </div>
            <p style={{ marginTop: '10px', fontSize: '15px' }}>{nudge.message}</p>
            
            {nudge.options.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                {nudge.options.map(opt => (
                  <button 
                    key={opt.id}
                    className="glass-button secondary" 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', padding: '15px' }}
                    onClick={handleOptionSelect}
                  >
                    <div>
                      <div style={{ fontWeight: '600', color: 'white', marginBottom: '4px' }}>{opt.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '400' }}>{opt.desc}</div>
                    </div>
                    <ArrowRight size={20} color="var(--primary-color)" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MealLogger;
