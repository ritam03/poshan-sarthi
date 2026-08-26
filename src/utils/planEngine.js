export const calculateTargets = (profile) => {
  const { gender, weight, height, age, activity, goal } = profile;
  
  // Mifflin-St Jeor Equation for BMR
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender.toLowerCase() === 'male' ? bmr + 5 : bmr - 161;

  // Activity Multiplier
  const multipliers = {
    'Sedentary': 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725
  };
  const multiplier = multipliers[activity] || 1.2;
  const tdee = Math.round(bmr * multiplier);

  // Goal calculation
  let targetCalories = tdee;
  if (goal === 'Weight Loss') {
    targetCalories -= 500; // ~0.5kg per week
  } else if (goal === 'Weight Gain') {
    targetCalories += 500;
  }

  // Safety caps
  const minCals = gender.toLowerCase() === 'male' ? 1500 : 1200;
  if (targetCalories < minCals) {
    targetCalories = minCals;
  }

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories
  };
};
