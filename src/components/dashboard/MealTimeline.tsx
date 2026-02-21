import { Plus, Coffee, Sun, Moon, Apple, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMeals } from '@/hooks/useMeals';
import type { DetectedFood } from '@/types/food';
import { useNavigate } from 'react-router-dom';

export const MealTimeline = ({ dateStr }: { dateStr?: string }) => {
    const navigate = useNavigate();
    const { meals, deleteMeal } = useMeals(dateStr);

    // Group meals by type
    const grouped = {
        kahvalti: { label: 'KAHVALTI', icon: <Coffee className="size-5 text-amber-500" />, items: [] as (DetectedFood & { meal_id: string })[], total: 0 },
        ogle: { label: 'ÖĞLE', icon: <Sun className="size-5 text-amber-500" />, items: [] as (DetectedFood & { meal_id: string })[], total: 0 },
        aksam: { label: 'AKŞAM', icon: <Moon className="size-5 text-indigo-400" />, items: [] as (DetectedFood & { meal_id: string })[], total: 0 },
        ara: { label: 'ARA ÖĞÜN', icon: <Apple className="size-5 text-emerald-500" />, items: [] as (DetectedFood & { meal_id: string })[], total: 0 },
    };

    meals.forEach(m => {
        const type = (m.meal_type || 'ogle') as keyof typeof grouped;
        if (grouped[type]) {
            const mappedFoods = m.foods.map(f => ({ ...f, meal_id: m.id }));
            grouped[type].items.push(...mappedFoods);
            grouped[type].total += m.total_calories;
        }
    });

    const mealList = [grouped.kahvalti, grouped.ogle, grouped.aksam, grouped.ara];

    return (
        <div className="space-y-6">
            {mealList.map((meal, idx) => (
                <div key={idx} className="relative pl-6">
                    {/* Timeline Line */}
                    {idx !== mealList.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-zinc-200 dark:bg-zinc-800" />
                    )}

                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="absolute left-[-4px] bg-white dark:bg-zinc-950 p-1 rounded-full border-2 border-zinc-200 dark:border-zinc-800">
                                {meal.icon}
                            </div>
                            <h3 className="font-bold text-sm tracking-widest text-zinc-800 dark:text-zinc-200">{meal.label}</h3>
                        </div>
                        {meal.total > 0 && (
                            <span className="text-xs font-bold text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full">
                                {meal.total} kcal
                            </span>
                        )}
                    </div>

                    {/* Items */}
                    <div className="space-y-2 ml-4">
                        {meal.items.length > 0 ? (
                            meal.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                    <div className="flex flex-col flex-1">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name_tr}</span>
                                        <span className="text-xs text-zinc-500">{item.estimated_grams}g porsiyon</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                                            {item.calories_total} <span className="text-xs text-zinc-400">kcal</span>
                                        </span>
                                        <button onClick={() => deleteMeal(item.meal_id)} className="p-1 text-zinc-300 hover:text-red-500 bg-zinc-50 dark:bg-zinc-800 rounded-md">
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-emerald-600 dark:text-emerald-400 border-dashed border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-medium h-10 rounded-xl"
                                onClick={() => navigate('/app/scan')}
                            >
                                <Plus className="mr-2 size-4" /> Yemek Ekle
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
