import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Lightbulb, Info, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useDietAI } from '@/hooks/useDietAI';
import type { HealthLog } from '@/hooks/useHealthLogs';

interface DietAIWidgetProps {
    profile: {
        diet_preference: string;
        daily_carb_goal: number;
        daily_protein_goal: number;
        daily_calorie_goal: number
    };
    dailyTotals: {
        calories: number;
        carbs: number;
        protein: number;
        fat: number;
        sugar?: number
    };
    healthLogs?: HealthLog[];
}

export const DietAIWidget = ({ profile, dailyTotals, healthLogs = [] }: DietAIWidgetProps) => {
    const feedback = useDietAI(profile, dailyTotals, healthLogs);

    if (!feedback) return null;

    const config = {
        warning: {
            bg: 'bg-red-500/10 dark:bg-red-500/20',
            border: 'border-red-500/30 dark:border-red-500/50',
            text: 'text-red-600 dark:text-red-400',
            icon: <AlertCircle className="size-5" />
        },
        tip: {
            bg: 'bg-amber-500/10 dark:bg-amber-500/20',
            border: 'border-amber-500/30 dark:border-amber-500/50',
            text: 'text-amber-600 dark:text-amber-400',
            icon: <Lightbulb className="size-5" />
        },
        info: {
            bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
            border: 'border-emerald-500/30 dark:border-emerald-500/50',
            text: 'text-emerald-600 dark:text-emerald-400',
            icon: <Info className="size-5" />
        }
    };

    const style = config[feedback.type];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Card className={`p-5 rounded-[2rem] border-2 shadow-sm relative overflow-hidden ${style.bg} ${style.border}`}>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                        <Sparkles className="size-12" />
                    </div>

                    <div className="flex gap-4 items-start relative z-10">
                        <div className={`p-3 rounded-2xl bg-white/50 dark:bg-zinc-900/50 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 ${style.text}`}>
                            {style.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${style.text}`}>
                                    KaloScope AI
                                </span>
                            </div>
                            <p className="font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                                {feedback.message}
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
};
