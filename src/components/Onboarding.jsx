import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Target, HeartPulse } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Onboarding = () => {
  const { completeOnboarding } = useAppContext();
  
  const [formData, setFormData] = useState({
    age: 28,
    gender: 'Male',
    height: 175,
    weight: 75,
    activity: 'Moderately Active',
    goal: 'Weight Loss',
    cuisine: 'North Indian',
    medical: 'None'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeOnboarding(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card glass-panel"
      style={{ maxWidth: '700px', margin: '40px auto', padding: '40px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--primary-color)' }}>Welcome to PoshanSarthi</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Let's personalize your nutrition plan.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="glass-input">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="glass-input" required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} className="glass-input" required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="glass-input" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Activity Level</label>
            <select name="activity" value={formData.activity} onChange={handleChange} className="glass-input">
              <option value="Sedentary">Sedentary (Office job, little exercise)</option>
              <option value="Lightly Active">Lightly Active (1-3 days/wk)</option>
              <option value="Moderately Active">Moderately Active (3-5 days/wk)</option>
              <option value="Very Active">Very Active (6-7 days/wk)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="glass-input">
              <option value="Weight Loss">Weight Loss</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Weight Gain">Weight Gain</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Cuisine Preference</label>
            <select name="cuisine" value={formData.cuisine} onChange={handleChange} className="glass-input">
              <option value="North Indian">North Indian (Veg & Non-Veg)</option>
              <option value="South Indian">South Indian</option>
              <option value="Bengali">Bengali</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Maharashtrian">Maharashtrian</option>
              <option value="Jain / Satvik">Jain / Satvik</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Medical Flags</label>
            <input type="text" name="medical" value={formData.medical} onChange={handleChange} className="glass-input" placeholder="e.g. PCOS, Diabetes, None" />
          </div>
        </div>

        <button type="submit" className="glass-button" style={{ marginTop: '10px', fontSize: '18px', padding: '16px' }}>
          Calculate Targets & Generate Plan
        </button>
      </form>
    </motion.div>
  );
};

export default Onboarding;
