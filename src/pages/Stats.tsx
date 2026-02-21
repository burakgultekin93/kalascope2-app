import { TrendingDown, Target } from 'lucide-react';

export default function Stats() {
    return (
        <div className="flex flex-col min-h-screen px-4 pt-12 pb-24 dark:bg-zinc-950">
            <header className="mb-6">
                <h1 className="text-2xl font-bold dark:text-white">İstatistikler</h1>
                <p className="text-zinc-500 mt-1 text-sm">Son 7 günlük özetin</p>
            </header>

            <div className="space-y-6">

                {/* Highlight Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-500 text-white rounded-3xl p-5 shadow-sm">
                        <TrendingDown className="size-6 mb-3 opacity-80" />
                        <div className="font-bold text-2xl">-1.2 <span className="text-sm font-normal">kg</span></div>
                        <p className="text-xs font-medium text-emerald-100 mt-1">Bu ayki değişim</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm text-zinc-900 dark:text-white">
                        <Target className="size-6 mb-3 text-emerald-500" />
                        <div className="font-bold text-2xl">85%</div>
                        <p className="text-xs font-medium text-zinc-500 mt-1">Hedefe uyum oranı</p>
                    </div>
                </div>

                {/* Charts Mockups */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-sm mb-4">Kalori Trendi</h3>
                    <div className="h-40 w-full flex items-end justify-between items-baseline gap-2 mt-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        {[60, 80, 50, 95, 70, 85, 100].map((h, i) => (
                            <div key={i} className="w-full relative group">
                                <div className={`w-full rounded-t-lg transition-all ${h > 90 ? 'bg-red-400' : 'bg-emerald-500'}`} style={{ height: `${h}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-2 font-mono">
                        <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cts</span><span>Paz</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
