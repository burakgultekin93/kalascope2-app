import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import type { DetectedFood } from '@/types/food';

export interface MealRecord {
    id: string;
    meal_type: string;
    foods: DetectedFood[];
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fat: number;
    logged_at: string;
}

export const useMeals = (dateStr?: string) => {
    const { user } = useAuth();
    const [meals, setMeals] = useState<MealRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const targetDate = dateStr || new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (user) {
            fetchMeals();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, targetDate]);

    const fetchMeals = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const startOfDay = new Date(targetDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(targetDate);
            endOfDay.setHours(23, 59, 59, 999);

            const { data, error } = await supabase
                .from('meals')
                .select('*')
                .eq('user_id', user.id)
                .gte('logged_at', startOfDay.toISOString())
                .lte('logged_at', endOfDay.toISOString())
                .order('logged_at', { ascending: false });

            if (error) throw error;
            setMeals(data || []);
        } catch (error) {
            console.error('Error fetching meals:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMeal = async (id: string) => {
        try {
            const { error } = await supabase.from('meals').delete().eq('id', id);
            if (error) throw error;
            setMeals(meals.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting meal:', error);
            throw error;
        }
    };

    const dailyTotals = meals.reduce((acc, curr) => ({
        calories: acc.calories + curr.total_calories,
        protein: acc.protein + curr.total_protein,
        carbs: acc.carbs + curr.total_carbs,
        fat: acc.fat + curr.total_fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return { meals, dailyTotals, loading, fetchMeals, deleteMeal };
};
