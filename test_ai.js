import { generateDietPlan, parseMealLog } from './src/services/ai.js';

async function test() {
  console.log("Testing Diet Plan Generation...");
  try {
    const profile = { gender: 'Female', age: 30, weight: 65, height: 160, activity: 'Sedentary', goal: 'Weight Loss' };
    const plan = await generateDietPlan(profile);
    console.log("Plan generated successfully:", plan.targetCalories);
  } catch (e) {
    console.error("Plan Gen Error:", e);
  }

  console.log("Testing Meal Parsing...");
  try {
    const meal = await parseMealLog("2 Chole Bhature with extra butter and a large coke");
    console.log("Meal parsed successfully:", meal.calories, meal.isSignificantDeviation);
  } catch (e) {
    console.error("Meal Parse Error:", e);
  }
}

test();
