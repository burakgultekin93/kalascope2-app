import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface StreakData {
    current_streak: number;
    longest_streak: number;
    last_login_date: string | null;
}

export const useStreak = () => {
    const { user } = useAuth();
    const [streakData, setStreakData] = useState<StreakData>({
        current_streak: 0,
        longest_streak: 0,
        last_login_date: null
    });
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            checkAndUpdateStreak();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const checkAndUpdateStreak = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('current_streak, longest_streak, last_login_date')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const lastLoginDay = profile?.last_login_date ? new Date(profile.last_login_date) : null;
            if (lastLoginDay) {
                lastLoginDay.setHours(0, 0, 0, 0);
            }

            let newCurrentStreak = profile?.current_streak || 0;
            let newLongestStreak = profile?.longest_streak || 0;
            let triggerConfetti = false;

            // Calculate day difference
            const diffDays = lastLoginDay ? Math.round((today.getTime() - lastLoginDay.getTime()) / (1000 * 3600 * 24)) : -1;

            if (diffDays === 1 || !lastLoginDay) {
                // Logged in yesterday or first login ever
                newCurrentStreak += 1;

                // Show confetti exactly at milestones like 3, 7, 30 days
                if ([3, 7, 30].includes(newCurrentStreak)) {
                    triggerConfetti = true;
                }
            } else if (diffDays > 1) {
                // Missed a day, streak reset
                newCurrentStreak = 1;
            } else if (diffDays === 0) {
                // Already logged in today, do nothing but load current values
                // Keep confetti triggered in local state if hit today? Let's just avoid re-triggering.
            }

            // Update longest if current beats it
            if (newCurrentStreak > newLongestStreak) {
                newLongestStreak = newCurrentStreak;
            }

            // Sync with DB if changes occurred
            if (diffDays !== 0) {
                await supabase
                    .from('profiles')
                    .update({
                        current_streak: newCurrentStreak,
                        longest_streak: newLongestStreak,
                        last_login_date: new Date().toISOString()
                    })
                    .eq('id', user.id);
            }

            setStreakData({
                current_streak: newCurrentStreak,
                longest_streak: newLongestStreak,
                last_login_date: new Date().toISOString() // Show optimistic
            });
            setShowConfetti(triggerConfetti);

        } catch (error) {
            console.error('Error handling streak:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        ...streakData,
        loading,
        showConfetti,
        setShowConfetti // Export setter to close confetti early if needed
    };
};
