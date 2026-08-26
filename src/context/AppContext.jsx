import React, { createContext, useState, useContext } from 'react';
import { generateDietPlan } from '../services/ai';
import { calculateTargets } from '../utils/planEngine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [profile, setProfile] = useState(null);
  
  const [dietPlan, setDietPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [dailyIntake, setDailyIntake] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [milestoneOffset, setMilestoneOffset] = useState(0); 
  const [targetCaloriesOffset, setTargetCaloriesOffset] = useState(0); 

  const completeOnboarding = async (userProfile) => {
    setProfile(userProfile);
    setIsOnboarded(true);
    setLoadingPlan(true);
    
    // Deterministic Math Calculations First!
    const targets = calculateTargets(userProfile);
    
    try {
      // Then ask AI to compose meals to fit these strict targets
      const plan = await generateDietPlan(userProfile, targets.targetCalories);
      // Merge deterministic targets with AI's generated meals
      setDietPlan({
        tdee: targets.tdee,
        targetCalories: targets.targetCalories,
        plan: plan.plan
      });
    } catch (err) {
      console.error("Failed to fetch plan on load", err);
      // Fallback dummy plan if AI fails completely, so UI doesn't crash during demo
      setDietPlan({
        tdee: targets.tdee,
        targetCalories: targets.targetCalories,
        plan: [
          { meal: "Breakfast", time: "8:30 AM", items: "Poha, Chai", calories: 350 },
          { meal: "Lunch", time: "1:30 PM", items: "2 Roti, Dal, Sabzi", calories: 600 },
          { meal: "Dinner", time: "8:00 PM", items: "Rice, Paneer", calories: 550 }
        ]
      });
    } finally {
      setLoadingPlan(false);
    }
  };

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
      isOnboarded, completeOnboarding,
      profile, 
      dietPlan, loadingPlan, 
      dailyIntake, addMealToLog,
      applyReplanning, milestoneOffset, targetCaloriesOffset
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
