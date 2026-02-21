import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { calculateDailyGoals } from '@/utils/calories';
import type { UserProfileParams } from '@/utils/calories';

export const useProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const completeOnboarding = async (data: UserProfileParams) => {
        if (!user) return;
        setLoading(true);
        try {
            const goals = calculateDailyGoals(data);
            const updates = {
                ...data,
                daily_calorie_goal: goals.calories,
                daily_protein_goal: goals.protein,
                daily_carb_goal: goals.carbs,
                daily_fat_goal: goals.fat,
                daily_water_goal: goals.water,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;
            setProfile({ ...profile, ...updates });
            return goals;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updates: Partial<UserProfileParams & { diet_preference: string }>) => {
        if (!user || !profile) return;
        setLoading(true);
        try {
            const newProfileData = { ...profile, ...updates };
            const goals = calculateDailyGoals(newProfileData as any);

            const finalUpdates = {
                ...updates,
                daily_calorie_goal: goals.calories,
                daily_protein_goal: goals.protein,
                daily_carb_goal: goals.carbs,
                daily_fat_goal: goals.fat,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .update(finalUpdates)
                .eq('id', user.id);

            if (error) throw error;
            setProfile({ ...profile, ...finalUpdates });
            return finalUpdates;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { profile, completeOnboarding, updateProfile, loading, refreshProfile: getProfile };
};
