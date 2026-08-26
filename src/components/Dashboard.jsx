import React from 'react';
import { motion } from 'framer-motion';
import { Target, Activity, Utensils, Droplet, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { dietPlan, loadingPlan, dailyIntake, milestoneOffset, targetCaloriesOffset } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loadingPlan || !dietPlan) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '20px' }}>
        <Loader2 size={40} className="animate-spin" color="var(--primary-color)" />
        <p style={{ color: 'var(--text-secondary)' }}>PoshanSarthi is designing your optimal thali...</p>
      </div>
    );
  }

  // Calculate dynamic targets
  const targetCals = dietPlan.targetCalories + targetCaloriesOffset;
  const calPercent = Math.min(100, Math.round((dailyIntake.calories / targetCals) * 100)) || 0;
  
  // Calculate dynamic milestone date
  const baseDate = new Date('2026-09-15');
  baseDate.setDate(baseDate.getDate() + milestoneOffset);
  const formattedDate = baseDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  // Roughly estimate protein, carbs, fats targets based on typical Indian macro splits (20% P, 50% C, 30% F)
  const targetProtein = Math.round((targetCals * 0.20) / 4);
  const targetCarbs = Math.round((targetCals * 0.50) / 4);
  const targetFats = Math.round((targetCals * 0.30) / 9);

  return (
    <motion.div 
      className="dashboard-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <motion.div className="card glass-panel" variants={itemVariants}>
          <div className="card-title">
            <Target size={24} color="var(--primary-color)" />
            Daily Targets
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Calories</p>
              <h2 style={{ fontSize: '36px', fontWeight: '700' }}>
                {dailyIntake.calories} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/ {targetCals} kcal</span>
              </h2>
            </div>
            <div style={{ width: '120px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--primary-color)', borderRadius: '5px' }}
                initial={{ width: 0 }}
                animate={{ width: `${calPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '20px' }}>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Protein</p>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>{dailyIntake.protein}g <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>/ {targetProtein}g</span></p>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div style={{ width: `${Math.min(100, (dailyIntake.protein / targetProtein) * 100)}%`, height: '100%', background: '#3498db' }}></div>
              </div>
            </div>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Carbs</p>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>{dailyIntake.carbs}g <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>/ {targetCarbs}g</span></p>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div style={{ width: `${Math.min(100, (dailyIntake.carbs / targetCarbs) * 100)}%`, height: '100%', background: '#e67e22' }}></div>
              </div>
            </div>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Fats</p>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>{dailyIntake.fats}g <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>/ {targetFats}g</span></p>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div style={{ width: `${Math.min(100, (dailyIntake.fats / targetFats) * 100)}%`, height: '100%', background: '#9b59b6' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="card glass-panel" variants={itemVariants}>
          <div className="card-title">
            <Utensils size={24} color="var(--secondary-color)" />
            AI Recommended Thali Plan
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            {dietPlan.plan && dietPlan.plan.map((slot, index) => (
              <div key={index} className="meal-item" style={{ borderLeft: index === 0 ? '3px solid var(--primary-color)' : 'none' }}>
                <div className="meal-info">
                  <h4>{slot.meal} ({slot.time})</h4>
                  <p>{slot.items}</p>
                  <p style={{ color: 'var(--primary-color)', marginTop: '4px', fontSize: '12px', fontWeight: 'bold' }}>~{slot.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <motion.div className="card glass-panel" variants={itemVariants} style={{ background: 'linear-gradient(135deg, rgba(26,26,46,0.8), rgba(46,204,113,0.1))' }}>
          <div className="card-title">
            <Activity size={24} color="var(--success)" />
            Milestone Progress
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid rgba(46,204,113,0.3)', borderTopColor: 'var(--success)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              68%
            </div>
            <p style={{ marginTop: '15px', fontWeight: '500' }}>Goal: -2 kg by {formattedDate}</p>
            {milestoneOffset > 0 && <p style={{ fontSize: '13px', color: 'var(--warning)', marginTop: '5px' }}>Milestone extended by {milestoneOffset} days.</p>}
            {targetCaloriesOffset < 0 && <p style={{ fontSize: '13px', color: 'var(--warning)', marginTop: '5px' }}>Daily limits tightened by {-targetCaloriesOffset} kcal.</p>}
            {milestoneOffset === 0 && targetCaloriesOffset === 0 && <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '5px' }}>You are on a sustainable path.</p>}
          </div>
        </motion.div>
        
        <motion.div className="card glass-panel" variants={itemVariants}>
          <div className="card-title">
            <Droplet size={24} color="#3498db" />
            Hydration
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((glass, i) => (
                <div key={i} style={{ width: '25px', height: '35px', borderRadius: '4px', background: i < 3 ? '#3498db' : 'rgba(255,255,255,0.1)', boxShadow: i < 3 ? '0 0 10px rgba(52, 152, 219, 0.4)' : 'none' }}></div>
              ))}
            </div>
            <p style={{ fontWeight: '600' }}>3 / 5 L</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
