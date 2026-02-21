import { useState } from 'react';
import { CheckCircle2, Crown, ArrowLeft, CreditCard, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/brand';
import { toast } from 'sonner';

export default function Paywall() {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState<'plans' | 'checkout'>(location.state?.fromOnboarding ? 'checkout' : 'plans');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('KaloScope Pro Aktif Edildi!');
            navigate('/app');
        }, 2000);
    };

    const renderPlans = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
        >
            <div className="size-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Crown className="size-10" />
            </div>
            <h1 className="text-3xl font-black mb-4 font-[Plus_Jakarta_Sans] tracking-tight text-white">KaloScope Limitlerini Kaldır</h1>
            <p className="text-zinc-400 text-lg mb-10 max-w-sm font-medium">Daha hızlı hedefe ulaşmak için premium özellikleri kilidini aç.</p>

            <div className="w-full max-w-sm space-y-4 mb-10 text-left">
                {[
                    'Sınırsız günlük AI fotoğraf taraması',
                    'Gelişmiş makro analizi ve detaylı grafikler',
                    'Sese dayalı yemek ekleme özelliği',
                    'Diyetisyen formatında PDF raporları',
                    'Öncelikli müşteri desteği'
                ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="size-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                            <CheckCircle2 className="size-4 text-emerald-500" />
                        </div>
                        <span className="font-bold text-zinc-200">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-sm p-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-600">
                <div className="bg-zinc-950 rounded-[2.3rem] p-8 relative">
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Yıllık %50 Avantajlı
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Logo size={24} variant="dark" />
                            <h3 className="font-black text-xl uppercase tracking-wider text-white">KaloScope Pro</h3>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-white">₺899<span className="text-sm text-zinc-500 font-bold">.99</span></div>
                            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">/ yıl</div>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mt-4 mb-8 font-medium leading-relaxed">7 gün ücretsiz deneme süresi sonunda tek seferlik çekim. İstediğin zaman iptal et.</p>

                    <Button
                        onClick={() => setStep('checkout')}
                        className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95"
                    >
                        7 Gün Ücretsiz Dene
                    </Button>
                </div>
            </div>

            <button className="mt-10 text-sm font-bold text-zinc-500 hover:text-white transition-colors underline underline-offset-8 uppercase tracking-widest">
                Tüm planları gör
            </button>
        </motion.div>
    );

    const renderCheckout = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-3 tracking-tight">Ödeme Bilgileri</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                    <ShieldCheck className="size-3" /> Güvenli Ödeme Sitemi
                </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}>
                <div className="space-y-2 text-left">
                    <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]" htmlFor="card_name">Kart Üzerindeki İsim</Label>
                    <Input
                        id="card_name"
                        placeholder="AHMET YILMAZ"
                        className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl focus:ring-emerald-500 text-white font-bold"
                        required
                    />
                </div>

                <div className="space-y-2 text-left">
                    <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]" htmlFor="card_number">Kart Numarası</Label>
                    <div className="relative">
                        <Input
                            id="card_number"
                            placeholder="0000 0000 0000 0000"
                            className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl focus:ring-emerald-500 text-white font-bold pl-12"
                            required
                        />
                        <CreditCard className="size-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-left">
                        <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]" htmlFor="expiry">Son Kullanma</Label>
                        <Input
                            id="expiry"
                            placeholder="AA / YY"
                            className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl focus:ring-emerald-500 text-white font-bold"
                            required
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]" htmlFor="cvv">CVV</Label>
                        <Input
                            id="cvv"
                            placeholder="***"
                            type="password"
                            maxLength={3}
                            className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl focus:ring-emerald-500 text-white font-bold"
                            required
                        />
                    </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-3xl mt-6">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-zinc-400">Ödenmesi Gereken:</span>
                        <span className="text-lg font-black text-white">₺0,00</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-medium">İlk 7 gün ücretsiz. Bugün ödeme alınmayacaktır. İstediğin an ayarlar kısmından iptal edebilirsin.</p>
                </div>

                <Button
                    disabled={loading}
                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-black shadow-xl shadow-emerald-500/30 mt-4 transition-all active:scale-95"
                >
                    {loading ? <Loader2 className="size-6 animate-spin" /> : 'Aboneliği Başlat'}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-6 text-zinc-500">
                    <Lock className="size-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">256-bit SSL Koruma</span>
                </div>
            </form>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden selection:bg-emerald-500/30">

            {/* Background Effect */}
            <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-emerald-500/20 via-zinc-900 to-zinc-950 pointer-events-none" />

            <header className="p-6 z-10 flex items-center justify-between">
                <button onClick={() => step === 'checkout' ? setStep('plans') : navigate(-1)} className="p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-2xl transition-all active:scale-90 border border-zinc-700/50 backdrop-blur-sm">
                    <ArrowLeft className="size-6 text-zinc-400" />
                </button>
                <div className="flex flex-col items-center">
                    <Logo size={28} variant="dark" />
                    <span className="font-black text-[10px] tracking-[0.2em] text-zinc-500 mt-1 uppercase">KaloScope PRO</span>
                </div>
                <div className="w-12"></div>
            </header>

            <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-24 z-10">
                <AnimatePresence mode="wait">
                    {step === 'plans' ? renderPlans() : renderCheckout()}
                </AnimatePresence>
            </main>
        </div>
    );
}
