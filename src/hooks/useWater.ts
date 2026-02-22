import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useWater = (dateStr?: string) => {
    const { user } = useAuth();
    const [water, setWater] = useState(0);
    const [loading, setLoading] = useState(false);

    const targetDate = dateStr || new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (user) {
            fetchWater();
        }
    }, [user, targetDate]);

    const fetchWater = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Logged_date field comparison
            const { data, error } = await supabase
                .from('water_logs')
                .select('amount_ml')
                .eq('user_id', user.id)
                .eq('logged_date', targetDate);

            if (error) throw error;

            if (data) {
                const total = data.reduce((acc: number, curr: { amount_ml: number }) => acc + curr.amount_ml, 0);
                setWater(total);
            } else {
                setWater(0);
            }
        } catch (error) {
            console.error('Error fetching water:', error);
        } finally {
            setLoading(false);
        }
    };

    const addWater = async (amount: number) => {
        if (!user) return;
        try {
            const { error } = await supabase.from('water_logs').insert([{
                user_id: user.id,
                amount_ml: amount,
                logged_date: targetDate
            }]);
            if (error) throw error;
            setWater((prev: number) => prev + amount);
        } catch (error) {
            console.error('Error adding water:', error);
            throw error;
        }
    };

    return { water, loading, fetchWater, addWater };
};
