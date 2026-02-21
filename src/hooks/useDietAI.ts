import { useMemo } from 'react';
import { useTranslation } from './useTranslation';
import type { DietPreference } from '@/utils/calories';

interface DietFeedback {
    message: string;
    type: 'warning' | 'tip' | 'info';
    icon: 'sugar' | 'keto' | 'protein' | 'info';
}

export const useDietAI = (profile: any, dailyTotals: { calories: number; carbs: number; protein: number; fat: number; sugar?: number }): DietFeedback | null => {
    const { t } = useTranslation();

    return useMemo(() => {
        if (!profile || !dailyTotals) return null;

        const diet = profile.diet_preference as DietPreference;
        const calories = dailyTotals.calories;
        const carbs = dailyTotals.carbs;
        const protein = dailyTotals.protein;

        // 1. Diabetic Logic: Sugar/Carb Warning
        if (diet === 'diabetic') {
            const carbLimit = profile.daily_carb_goal * 0.9; // 90% of target is warning zone
            if (carbs > carbLimit) {
                return {
                    message: t('ai_diet_warning_sugar'),
                    type: 'warning',
                    icon: 'sugar'
                };
            }
        }

        // 2. Ketogenic Logic: Carb Warning
        if (diet === 'ketogenic') {
            const carbLimit = 40; // Keto typically < 50g
            if (carbs > carbLimit) {
                return {
                    message: t('ai_diet_warning_keto'),
                    type: 'warning',
                    icon: 'keto'
                };
            }
        }

        // 3. High Protein Logic: Tip to reach goal
        if (diet === 'high_protein') {
            const proteinGoal = profile.daily_protein_goal;
            if (protein < proteinGoal * 0.7 && calories > profile.daily_calorie_goal * 0.8) {
                return {
                    message: t('ai_diet_tip_protein'),
                    type: 'tip',
                    icon: 'protein'
                };
            }
        }

        // 4. Standard/Default Info
        if (calories > profile.daily_calorie_goal * 0.5) {
            return {
                message: t('ai_diet_tip_standard'),
                type: 'info',
                icon: 'info'
            };
        }

        return null;
    }, [profile, dailyTotals, t]);
};
