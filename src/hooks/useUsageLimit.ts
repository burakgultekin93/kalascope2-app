import { useProfile } from './useProfile';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useTranslation } from './useTranslation';

export const useUsageLimit = () => {
    const { profile, refreshProfile } = useProfile();
    const { t } = useTranslation();

    const checkLimit = () => {
        if (!profile) return false;

        const limit = profile.is_pro ? 25 : 3;
        const current = profile.daily_scans_count || 0;

        if (current >= limit) {
            toast.error(
                profile.is_pro
                    ? t('limit_reached_pro') || 'Günlük 25 tarama limitine ulaştınız.'
                    : t('limit_reached_free') || 'Günlük 3 tarama limitine ulaştınız. Devam etmek için Pro\'ya geçin.'
            );
            return false;
        }

        return true;
    };

    const incrementUsage = async () => {
        if (!profile) return;

        try {
            const { error } = await supabase.rpc('increment_scan_count', {
                user_id_param: profile.id
            });

            if (error) throw error;
            await refreshProfile();
        } catch (error) {
            console.error('Error incrementing usage:', error);
        }
    };

    return {
        checkLimit,
        incrementUsage,
        remaining: profile ? (profile.is_pro ? 25 : 3) - (profile.daily_scans_count || 0) : 0,
        limit: profile ? (profile.is_pro ? 25 : 3) : 3,
        current: profile?.daily_scans_count || 0
    };
};
