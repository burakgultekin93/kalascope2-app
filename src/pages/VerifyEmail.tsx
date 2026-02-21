import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from '@/components/brand';

export default function VerifyEmail() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-zinc-50 dark:bg-zinc-950">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-8">
                <div className="flex justify-center">
                    <Logo size={80} />
                </div>

                <div className="space-y-4">
                    <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
                        <Mail className="size-10" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                        {t('auth_verify_email_title')}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                        {t('auth_verify_email_desc')}
                    </p>
                </div>

                <div className="pt-4">
                    <Button asChild className="w-full h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-lg hover:scale-[1.02] transition-transform">
                        <Link to="/login">
                            {t('Giriş Yap')}
                            <ArrowRight className="ml-2 size-5" />
                        </Link>
                    </Button>
                </div>

                <p className="text-xs text-zinc-400 font-medium">
                    KaloScope &copy; {new Date().getFullYear()} - {t('footer_rights')}
                </p>
            </div>
        </div>
    );
}
