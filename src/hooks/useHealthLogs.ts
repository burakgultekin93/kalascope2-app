import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type HealthLogType = 'insulin' | 'blood_sugar' | 'ketones' | 'medication';

export interface HealthLog {
    id: string;
    user_id: string;
    type: HealthLogType;
    value: number;
    unit: string;
    notes: string;
    logged_at: string;
}

export const useHealthLogs = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState<HealthLog[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDailyLogs = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const { data, error } = await supabase
                .from('health_logs')
                .select('*')
                .eq('user_id', user.id)
                .gte('logged_at', `${today}T00:00:00Z`)
                .lte('logged_at', `${today}T23:59:59Z`)
                .order('logged_at', { ascending: false });

            if (error) throw error;
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching health logs:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchDailyLogs();
        }
    }, [user, fetchDailyLogs]);

    const addHealthLog = async (log: Omit<HealthLog, 'id' | 'user_id' | 'logged_at'>) => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('health_logs')
                .insert([{ ...log, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            setLogs([data, ...logs]);
            return data;
        } catch (error) {
            console.error('Error adding health log:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { logs, loading, addHealthLog, refreshLogs: fetchDailyLogs };
};
