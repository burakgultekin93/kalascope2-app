import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { calculateDailyGoals } from '@/utils/calories';
import type { UserProfileParams } from '@/utils/calories';
import type { UserProfile } from '@/types/profile';

export const useProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);

    const getProfile = useCallback(async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setProfile(data as UserProfile);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }, [user]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

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
            setProfile(prev => prev ? { ...prev, ...updates } : null);
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
            const newProfileData = { ...profile, ...updates } as UserProfile;
            const goals = calculateDailyGoals(newProfileData);

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
            setProfile(prev => prev ? { ...prev, ...finalUpdates } : null);
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
