import { CheckCircle2, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Paywall() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden">

            {/* Background Effect */}
            <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-emerald-500/20 via-zinc-900 to-zinc-950 pointer-events-none" />

            <header className="p-4 z-10 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="size-6 text-zinc-400" />
                </button>
                <span className="font-bold text-sm tracking-widest text-zinc-500">PRO PLAN</span>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center px-6 pt-8 pb-24 z-10 text-center">
                <div className="size-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <Crown className="size-10" />
                </div>
                <h1 className="text-3xl font-extrabold mb-4 font-[Plus_Jakarta_Sans]">KaloScope Limitlerini Kaldır</h1>
                <p className="text-zinc-400 text-lg mb-10 max-w-sm">Daha hızlı hedefe ulaşmak için premium özellikleri kilidini aç.</p>

                <div className="w-full max-w-sm space-y-4 mb-10 text-left">
                    {[
                        'Sınırsız günlük AI fotoğraf taraması',
                        'Gelişmiş makro analizi ve detaylı grafikler',
                        'Sese dayalı yemek ekleme özelliği',
                        'Diyetisyen formatında PDF raporları',
                        'Öncelikli müşteri desteği'
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="size-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="size-4 text-emerald-500" />
                            </div>
                            <span className="font-medium text-zinc-200">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-sm p-1 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[1px]">
                    <div className="bg-zinc-950 rounded-[23px] p-6 relative">
                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Yıllık %50 Avantajlı
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-xl">KaloScope Pro</h3>
                            <div className="text-right">
                                <div className="text-3xl font-extrabold">₺899<span className="text-sm text-zinc-500 font-medium">.99</span></div>
                                <div className="text-xs text-zinc-500">/ yıl</div>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 mt-4 mb-6 line-clamp-2">Tek seferlik çekim. İstediğin zaman iptal et.</p>

                        <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/20">
                            7 Gün Ücretsiz Dene
                        </Button>
                    </div>
                </div>

                <button className="mt-8 text-sm font-medium text-zinc-500 hover:text-white transition-colors underline underline-offset-4">
                    Tüm planları gör
                </button>
            </main>
        </div>
    );
}
