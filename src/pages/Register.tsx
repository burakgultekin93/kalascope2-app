import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAuthErrorMessage } from '@/utils/authErrors';
import { supabase } from '@/lib/supabase';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });

            if (error) throw error;
            navigate('/onboarding');
        } catch (err: any) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row-reverse bg-zinc-50 dark:bg-zinc-950">
            <Link to="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors z-10 md:hidden">
                <ArrowLeft className="size-5 text-zinc-600 dark:text-zinc-400" />
            </Link>
            <Link to="/" className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors z-10 hidden md:block">
                <ArrowLeft className="size-5 text-zinc-400" />
            </Link>

            {/* Right Cover */}
            <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-zinc-900 relative overflow-hidden p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                <Camera className="size-20 text-emerald-500 mb-8 z-10" />
                <h2 className="text-4xl font-bold text-white mb-4 z-10 font-[Plus_Jakarta_Sans]">Yolculuğun Başlıyor</h2>
                <p className="text-emerald-50 max-w-sm z-10">
                    İlk taramanla birlikte hedeflerine bir adım daha yaklaşacaksın.
                </p>
            </div>

            {/* Left Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white dark:bg-zinc-950 min-h-screen">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Hesap Oluştur</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Daha sağlıklı bir hayata ilk adımı atın.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Ad Soyad</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ahmet Yılmaz"
                                value={fullName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                                required
                                className="h-12 rounded-xl border-zinc-300 dark:border-zinc-800 focus-visible:ring-emerald-500"
                            />
                        </div>
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
                                minLength={6}
                                className="h-12 rounded-xl border-zinc-300 dark:border-zinc-800 focus-visible:ring-emerald-500"
                            />
                        </div>

                        {error && (
                            <div className="text-sm font-medium text-red-500 pt-2">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-4 bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/20 rounded-xl text-white font-semibold transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin size-5" /> : 'Kayıt Ol'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Hesabın var mı?{' '}
                        <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
