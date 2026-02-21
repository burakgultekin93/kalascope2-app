import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAuthErrorMessage } from '@/utils/authErrors';
import { supabase } from '@/lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/app');
        } catch (err: any) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
            <Link to="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors z-10">
                <ArrowLeft className="size-5 text-zinc-600 dark:text-zinc-400" />
            </Link>

            {/* Left Cover */}
            <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-zinc-900 relative overflow-hidden p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
                <Camera className="size-20 text-emerald-500 mb-8 z-10" />
                <h2 className="text-4xl font-bold text-white mb-4 z-10 font-[Plus_Jakarta_Sans]">KaloScope'a Tekrar Hoş Geldin</h2>
                <p className="text-emerald-50 max-w-sm z-10">
                    Kalori takibine kaldığın yerden devam et. Türk mutfağı seni bekliyor.
                </p>
            </div>

            {/* Right Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white dark:bg-zinc-950 min-h-screen">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Giriş Yap</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Hesabınıza erişmek için bilgilerinizi girin.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ornek@mail.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                className="h-12 rounded-xl border-zinc-300 dark:border-zinc-800 focus-visible:ring-emerald-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Şifre</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                                className="h-12 rounded-xl border-zinc-300 dark:border-zinc-800 focus-visible:ring-emerald-500"
                            />
                        </div>

                        {error && (
                            <div className="text-sm font-medium text-red-500">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/20 rounded-xl text-white font-semibold transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin size-5" /> : 'Giriş Yap'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Hesabın yok mu?{' '}
                        <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
                            Kayıt Ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
