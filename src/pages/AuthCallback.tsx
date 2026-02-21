import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function AuthCallback() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { error } = await supabase.auth.getSession();
            if (error) {
                console.error('Auth callback error:', error.message);
                navigate('/login?error=verification_failed');
            } else {
                navigate('/onboarding');
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="size-12 animate-spin text-emerald-500" />
                <p className="text-lg font-bold text-zinc-600 dark:text-zinc-400">
                    {t('auth_callback_loading')}
                </p>
            </div>
        </div>
    );
}
