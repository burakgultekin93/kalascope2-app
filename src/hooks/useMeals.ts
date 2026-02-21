import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface MealRecord {
    id: string;
    food_name: string;
    food_name_en?: string;
    portion_grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal_type: string;
    logged_date: string;
    created_at: string;
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
            const targetDateStr = targetDate.split('T')[0];

            const { data, error } = await supabase
                .from('meals')
                .select('*')
                .eq('user_id', user.id)
                .eq('logged_date', targetDateStr)
                .order('created_at', { ascending: false });

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
        calories: acc.calories + (curr.calories || 0),
        protein: acc.protein + (curr.protein || 0),
        carbs: acc.carbs + (curr.carbs || 0),
        fat: acc.fat + (curr.fat || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return { meals, dailyTotals, loading, fetchMeals, deleteMeal };
};
