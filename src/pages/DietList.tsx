import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCcw, Sparkles, ChefHat, Info, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { useTranslation } from '@/hooks/useTranslation';
import { generateDietPlan } from '@/lib/dietPlan';
import type { DietPlan, DietMeal } from '@/lib/dietPlan';
import { toast } from 'sonner';

export default function DietList() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { profile, loading: profileLoading } = useProfile();
    const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchDietPlan = async () => {
        if (!profile) return;
        setLoading(true);
        try {
            const plan = await generateDietPlan({
                calories: profile.daily_calorie_goal,
                protein: profile.daily_protein_goal,
                carbs: profile.daily_carb_goal,
                fat: profile.daily_fat_goal,
                diet_preference: profile.diet_preference || 'standard'
            });
            setDietPlan(plan);
        } catch (error) {
            console.error(error);
            toast.error(t('diet_list_error') || 'Diyet listesi oluşturulamadı.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profile && !dietPlan && !loading) {
            fetchDietPlan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile, dietPlan, loading]);

    const MealCard = ({ meal, type, icon, delay }: { meal: DietMeal, type: string, icon: React.ReactNode, delay: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className="p-5 rounded-[2rem] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden relative group">
                <div className="flex items-start gap-4">
                    <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {t(`diet_list_${type}`)}
                            </span>
                            <span className="text-xs font-bold text-zinc-500">{meal.grams}g</span>
                        </div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight mb-3">
                            {t(`lang`) === 'en' ? meal.name_en : meal.name_tr}
                        </h3>

                        <div className="grid grid-cols-4 gap-2">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl text-center">
                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">kcal</div>
                                <div className="text-sm font-black text-emerald-500">{meal.calories}</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl text-center">
                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">P</div>
                                <div className="text-sm font-black text-blue-500">{meal.protein}g</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl text-center">
                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">C</div>
                                <div className="text-sm font-black text-amber-500">{meal.carbs}g</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl text-center">
                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">F</div>
                                <div className="text-sm font-black text-rose-500">{meal.fat}g</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-32">
            <header className="p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <ArrowLeft className="size-6" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{t('diet_list_title')}</h1>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{profile?.diet_preference || 'Standard'} Plan</p>
                    </div>
                </div>
                <Button
                    onClick={fetchDietPlan}
                    disabled={loading || profileLoading}
                    variant="ghost"
                    className="size-10 p-0 rounded-full hover:bg-emerald-500/10 text-emerald-500"
                >
                    <RefreshCcw className={`size-5 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            </header>

            <main className="max-w-2xl mx-auto p-6 space-y-6">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                        >
                            <div className="relative">
                                <div className="size-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                <Sparkles className="size-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">{t('diet_list_loading')}</h3>
                                <p className="text-sm text-zinc-500 max-w-[240px] mx-auto">Gemini AI beslenme hedeflerinize en uygun öğünleri seçiyor...</p>
                            </div>
                        </motion.div>
                    ) : dietPlan ? (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* Smart Tip */}
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-3xl flex gap-4">
                                <div className="size-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                                    <ChefHat className="size-6" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{t('diet_list_smart_tip')}</h4>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed italic">
                                        "{dietPlan.smart_tip}"
                                    </p>
                                </div>
                            </div>

                            {/* Meals List */}
                            <div className="space-y-4">
                                <MealCard
                                    meal={dietPlan.meals.breakfast}
                                    type="morning"
                                    icon={<Sparkles className="size-6" />}
                                    delay={0.1}
                                />
                                <MealCard
                                    meal={dietPlan.meals.lunch}
                                    type="afternoon"
                                    icon={<Footprints className="size-6" />}
                                    delay={0.2}
                                />
                                <MealCard
                                    meal={dietPlan.meals.dinner}
                                    type="evening"
                                    icon={<Info className="size-6" />}
                                    delay={0.3}
                                />
                                <MealCard
                                    meal={dietPlan.meals.snack}
                                    type="snack"
                                    icon={<Sparkles className="size-6" />}
                                    delay={0.4}
                                />
                            </div>

                            {/* Total Calorie Check */}
                            <div className="pt-4 text-center">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-4">Günlük Toplam Hedefiniz</p>
                                <div className="flex justify-center items-end gap-2">
                                    <span className="text-4xl font-black text-zinc-900 dark:text-white leading-none">
                                        {profile?.daily_calorie_goal}
                                    </span>
                                    <span className="text-sm font-bold text-zinc-500 mb-1">kcal</span>
                                </div>
                            </div>

                            <Button
                                onClick={fetchDietPlan}
                                className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold shadow-xl transition-all active:scale-95"
                            >
                                <RefreshCcw className="size-4 mr-2" /> {t('diet_list_regenerate')}
                            </Button>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </main>
        </div>
    );
}
