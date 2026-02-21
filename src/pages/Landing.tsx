import { motion } from 'framer-motion';
import { Camera, SlidersHorizontal, Mic, BarChart3, Trophy, ArrowRight, CheckCircle2, ShieldCheck, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Landing() {
    const features = [
        { icon: <Camera />, title: "Fotoğraf Çek, Sonucu Gör", desc: "Sadece tabağının fotoğrafını çek, AI kalorisini çıkarsın." },
        { icon: <SlidersHorizontal />, title: "Anında Düzelt", desc: "Porsiyon yanlış mı? Magic slider ile saniyeler içinde düzelt." },
        { icon: <Mic />, title: "Sesle Söyle", desc: "Fotoğraf çekemiyorsan 'Yarım lahmacun yedim' demen yeterli." },
        { icon: <Utensils />, title: "Türk Mutfağı Uzmanı", desc: "Karnıyarıktan baklavaya, 500+ yöresel yemeğimizi tanır." },
        { icon: <BarChart3 />, title: "Trendlerini Takip Et", desc: "Kilo ve kalori hedeflerini haftalık raporlarla gör." },
        { icon: <Trophy />, title: "Hedefine Ulaş", desc: "Gamification ve streak sistemiyle motivasyonunu yüksek tut." },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <Camera className="text-white size-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">KaloScope</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium hover:text-emerald-500 transition-colors">
                            Giriş
                        </Link>
                        <Link to="/register">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                                Ücretsiz Başla
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-4 pt-16 pb-20 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        KaloScope v1.0 Yayında
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Fotoğrafını Çek.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                            Kalorisini Bil.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10"
                    >
                        Türk mutfağını anlayan yapay zeka ile yediklerini saniyeler içinde analiz et. Can sıkıcı diyet listelerine son.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/register" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-500/25">
                                Ücretsiz Başla <ArrowRight className="ml-2 size-5" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400"
                    >
                        <span className="flex items-center gap-2"><Utensils className="size-4 text-amber-500" /> 500+ Türk Yemeği</span>
                        <span className="flex items-center gap-2"><div className="text-amber-500">⚡</div> 3 Saniye Analiz Hızı</span>
                        <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-500" /> Gizli Ücret Yok</span>
                    </motion.div>
                </section>

                {/* User Flow Mockup */}
                <section className="max-w-4xl mx-auto px-4 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent z-0" />
                        <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center gap-8 p-8">
                            <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-xl transform -rotate-6">
                                <Camera className="size-12 text-zinc-400" />
                            </div>
                            <ArrowRight className="size-8 text-emerald-500 hidden md:block" />
                            <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-xl animate-pulse">
                                <div className="text-emerald-400 font-mono text-xl">🚀 Analiz...</div>
                            </div>
                            <ArrowRight className="size-8 text-emerald-500 hidden md:block" />
                            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 shadow-xl transform rotate-3">
                                <div className="flex justify-between items-center gap-4">
                                    <span className="font-bold text-white">İskender Kebap</span>
                                    <span className="text-emerald-400 font-mono font-bold">850 kcal</span>
                                </div>
                                <div className="mt-4 h-2 bg-zinc-700 rounded-full w-48 overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[70%]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Bento */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden KaloScope?</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Piyasadaki en yetenekli yemek analiz ve kalori takip aracı.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex flex-col items-start text-left h-full">
                                        <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 flex-1">{feature.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Pricing */}
                <section className="max-w-5xl mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Şeffaf Fiyatlandırma</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Sürpriz yok, gizli ücret yok. Kullanıcı dostu planlar.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                        {/* Free */}
                        <Card className="border-zinc-200 dark:border-zinc-800">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-2">Başlangıç</h3>
                                <div className="text-4xl font-extrabold mb-6">Ücretsiz</div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Günde 3 AI Tarama</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Temel Kalori Takibi</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Manuel Yemek Ekleme</li>
                                </ul>
                                <Link to="/register"><Button variant="outline" className="w-full h-12 rounded-xl">Hemen Başla</Button></Link>
                            </CardContent>
                        </Card>

                        {/* Pro */}
                        <Card className="border-emerald-500 shadow-xl shadow-emerald-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                EN ÇOK TERCİH EDİLEN
                            </div>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold border-b border-transparent mb-2">Pro</h3>
                                <div className="text-4xl font-extrabold mb-2">₺149<span className="text-lg text-zinc-500">.99 / ay</span></div>
                                <p className="text-sm text-zinc-500 mb-6">veya Yıllık planda %50 indirimli</p>
                                <ul className="space-y-4 mb-8 font-medium">
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Sınırsız AI Tarama</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Gelişmiş Makro Analizi</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> AI Diyet Asistanı</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="size-5 text-emerald-500" /> Öncelikli Destek</li>
                                </ul>
                                <Link to="/register"><Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white">7 Gün Ücretsiz Dene</Button></Link>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 text-center text-zinc-500">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Camera className="size-5 text-emerald-500" />
                    <span className="font-bold text-lg text-zinc-900 dark:text-white">KaloScope</span>
                </div>
                <p className="max-w-md mx-auto mb-6 text-sm">
                    Türk mutfağını anlayan akıllı beslenme asistanınız.
                </p>
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} KaloScope. Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    );
}
