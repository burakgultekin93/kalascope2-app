import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MealTimeline } from '@/components/dashboard/MealTimeline';
import { useState, useMemo } from 'react';

export default function Diary() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Generate last 5 days
    const pastDays = useMemo(() => {
        const days = [];
        const today = new Date();
        const daysOfWeek = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

        for (let i = 4; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            days.push({
                dayStr: dateStr,
                dayName: i === 0 ? 'Bgn' : daysOfWeek[d.getDay()],
                dateNum: d.getDate().toString()
            });
        }
        return days;
    }, []);
    return (
        <div className="flex flex-col min-h-screen px-4 pt-12 pb-24 dark:bg-zinc-950">
            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white">Günlüğüm</h1>
                    <p className="text-zinc-500 mt-1 text-sm">Geçmiş kayıtlarını incele</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <Filter className="size-4 text-zinc-600 dark:text-zinc-400" />
                </Button>
            </header>

            {/* Date Picker */}
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
                {pastDays.map(d => (
                    <div
                        key={d.dayStr}
                        onClick={() => setSelectedDate(d.dayStr)}
                        className={`flex flex-col items-center justify-center rounded-2xl cursor-pointer min-w-[3.5rem] py-3 border transition-colors ${selectedDate === d.dayStr ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}
                    >
                        <span className={`text-[10px] font-bold ${selectedDate === d.dayStr ? 'opacity-80' : ''}`}>{d.dayName}</span>
                        <span className={`text-lg font-bold ${selectedDate === d.dayStr ? '' : 'text-zinc-900 dark:text-zinc-100'}`}>{d.dateNum}</span>
                    </div>
                ))}
            </div>

            {/* Timeline Component Embedded */}
            <section className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <MealTimeline dateStr={selectedDate} />
            </section>

        </div>
    );
}
