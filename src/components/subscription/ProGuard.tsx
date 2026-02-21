import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { Loader2 } from 'lucide-react';

interface ProGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const ProGuard = ({ children, fallback }: ProGuardProps) => {
    const { profile, loading } = useProfile();

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="size-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (!profile?.is_pro) {
        if (fallback) return <>{fallback}</>;
        return <Navigate to="/app/paywall" replace />;
    }

    return <>{children}</>;
};
