import { CalorieRings } from '@/components/dashboard/CalorieRings';
import { MacroCards } from '@/components/dashboard/MacroCards';
import { MealTimeline } from '@/components/dashboard/MealTimeline';
import { WaterTracker } from '@/components/dashboard/WaterTracker';
import { StreakWidget } from '@/components/dashboard/StreakWidget';
import { useProfile } from '@/hooks/useProfile';
import { useMeals } from '@/hooks/useMeals';
import { Logo } from '@/components/brand';
import { DietAIWidget } from '@/components/dashboard/DietAIWidget';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function Dashboard() {
    const { profile } = useProfile();
    const { dailyTotals } = useMeals();
    const { t } = useTranslation();

    const dietKey = `diet_status_${profile?.diet_preference || 'standard'}`;
    const formattedDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }).format(new Date());

    const macros = {
        protein: { current: Math.round(dailyTotals.protein), target: profile?.daily_protein_goal || 120 },
        carbs: { current: Math.round(dailyTotals.carbs), target: profile?.daily_carb_goal || 250 },
        fat: { current: Math.round(dailyTotals.fat), target: profile?.daily_fat_goal || 65 },
    };

    const currentCalories = Math.round(dailyTotals.calories);
    const targetCalories = profile?.daily_calorie_goal || 2000;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="px-4 pt-6 pb-2 flex justify-between items-center sticky top-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl z-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <Logo size={40} variant="light" className="dark:hidden" />
                    <Logo size={40} variant="dark" className="hidden dark:block" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-black tracking-tight">{t('Dashboard')}</h1>
                            {profile?.diet_preference && profile.diet_preference !== 'standard' && (
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-2 py-0 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles className="size-2.5" />
                                    {t(dietKey)}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{formattedDate}</p>
                    </div>
                </div>
                <StreakWidget />
            </header>


            <div className="px-4 py-4 space-y-6 overflow-x-hidden">
                {/* Rings */}
                <section className="flex flex-col items-center bg-white dark:bg-zinc-900 rounded-[2.5rem] pt-2 pb-6 px-4 shadow-sm border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                    <CalorieRings current={currentCalories} target={targetCalories} />
                </section>

                {/* AI Advisor */}
                <DietAIWidget profile={profile} dailyTotals={dailyTotals} />

                {/* Macros */}
                <section>
                    <MacroCards macros={macros} />
                </section>

                {/* Water */}
                <section>
                    <WaterTracker />
                </section>

                {/* Timeline */}
                <section className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
                    <MealTimeline />
                </section>
            </div>
        </div >
    );
}
