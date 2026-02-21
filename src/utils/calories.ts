export type DietPreference = 'standard' | 'ketogenic' | 'vegan' | 'vegetarian' | 'diabetic' | 'high_protein' | 'mediterranean';

export interface UserProfileParams {
    gender: 'male' | 'female' | 'other'
    weight_kg: number
    height_cm: number
    age: number
    activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
    goal_type: 'lose' | 'maintain' | 'gain'
    diet_preference?: DietPreference
    weekly_goal_kg?: number
}

const ACTIVITY_MULTIPLIERS = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
}

export const calculateBMR = (profile: UserProfileParams): number => {
    const { gender, weight_kg, height_cm, age } = profile

    // Mifflin-St Jeor Equation
    const base = (10 * weight_kg) + (6.25 * height_cm) - (5 * age)

    if (gender === 'female') {
        return Math.max(1200, base - 161)
    }

    // Male and 'other' default to male calculation for safety bounds
    return Math.max(1500, base + 5)
}

export const calculateTDEE = (profile: UserProfileParams): number => {
    const bmr = calculateBMR(profile)
    const multiplier = ACTIVITY_MULTIPLIERS[profile.activity_level] || 1.2
    return Math.round(bmr * multiplier)
}

export const calculateDailyGoals = (profile: UserProfileParams) => {
    const tdee = calculateTDEE(profile)
    let targetCalories = tdee

    // 1 kg of fat is roughly 7700 kcal
    const weeklyGoalDeficit = (profile.weekly_goal_kg || 0.5) * 7700
    const dailyAdjust = Math.round(weeklyGoalDeficit / 7)

    if (profile.goal_type === 'lose') {
        targetCalories = Math.max(profile.gender === 'female' ? 1200 : 1500, tdee - dailyAdjust)
    } else if (profile.goal_type === 'gain') {
        targetCalories = tdee + dailyAdjust
    }

    // Macros Calculation Baseline
    let targetProtein = 0;
    let targetFat = 0;
    let targetCarbs = 0;

    const diet = profile.diet_preference || 'standard';

    if (diet === 'ketogenic') {
        // Keto: Extremely low carbs (max ~5-10% or fixed 30-50g), Moderate Protein (20%), High Fat (70%+)
        targetCarbs = 30; // Fixed 30g carbs for strict keto
        targetProtein = Math.round(profile.weight_kg * 1.5); // Slightly lower protein to prevent gluconeogenesis
        const remainingCals = targetCalories - ((targetProtein * 4) + (targetCarbs * 4));
        targetFat = Math.max(0, Math.round(remainingCals / 9));
    }
    else if (diet === 'diabetic') {
        // Diabetic: Focus on balancing macros to prevent sugar spikes. 30% Carbs, 30% Protein, 40% Fat.
        targetCarbs = Math.round((targetCalories * 0.30) / 4);
        targetProtein = Math.round((targetCalories * 0.30) / 4);
        targetFat = Math.round((targetCalories * 0.40) / 9);
    }
    else if (diet === 'high_protein') {
        // High Protein: Focus on muscle gain/retention. 35% Protein, 25% Fat, 40% Carbs.
        targetProtein = Math.round((targetCalories * 0.35) / 4);
        targetFat = Math.round((targetCalories * 0.25) / 9);
        targetCarbs = Math.round((targetCalories * 0.40) / 4);
    }
    else {
        // Standard, Vegan, Vegetarian, Mediterranean (Can be refined later, but standard ratios hold well)
        // Protein 1.8g/kg, Fat 25%, Carbs rest
        targetProtein = Math.round(profile.weight_kg * 1.8);
        targetFat = Math.round((targetCalories * 0.25) / 9);
        const remainingCals = targetCalories - ((targetProtein * 4) + (targetFat * 9));
        targetCarbs = Math.max(0, Math.round(remainingCals / 4));
    }

    return {
        calories: targetCalories,
        protein: targetProtein,
        fat: targetFat,
        carbs: targetCarbs,
        water: 2500, // Fixed default or can be calculated (weight_kg * 35)
    }
}
