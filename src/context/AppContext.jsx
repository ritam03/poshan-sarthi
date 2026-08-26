import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateDietPlan } from '../services/ai';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    gender: 'Male',
    age: 28,
    weight: 75,
    height: 175,
    activity: 'Moderately Active',
    goal: 'Weight Loss'
  });
  
  const [dietPlan, setDietPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [dailyIntake, setDailyIntake] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [milestoneOffset, setMilestoneOffset] = useState(0); // For sustainable extension
  const [targetCaloriesOffset, setTargetCaloriesOffset] = useState(0); // For strict correction

  useEffect(() => {
    // Generate initial plan when app loads
    const fetchPlan = async () => {
      setLoadingPlan(true);
      try {
        const plan = await generateDietPlan(profile);
        setDietPlan(plan);
      } catch (err) {
        console.error("Failed to fetch plan on load", err);
      } finally {
        setLoadingPlan(false);
      }
    };
    fetchPlan();
  }, [profile]);

  const addMealToLog = (mealData) => {
    setDailyIntake(prev => ({
      calories: prev.calories + mealData.calories,
      protein: prev.protein + mealData.protein,
      carbs: prev.carbs + mealData.carbs,
      fats: prev.fats + mealData.fats
    }));
  };

  const applyReplanning = (mode) => {
    if (mode === 'strict') {
      setTargetCaloriesOffset(prev => prev - 300); // Tighter target
    } else if (mode === 'flexible') {
      setMilestoneOffset(prev => prev + 2); // Push date back 2 days
    }
  };

  return (
    <AppContext.Provider value={{ 
      profile, setProfile, 
      dietPlan, loadingPlan, 
      dailyIntake, addMealToLog,
      applyReplanning, milestoneOffset, targetCaloriesOffset
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
