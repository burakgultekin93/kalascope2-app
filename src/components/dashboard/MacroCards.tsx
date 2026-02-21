import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface MacroCardsProps {
    macros: {
        protein: { current: number; target: number };
        carbs: { current: number; target: number };
        fat: { current: number; target: number };
    };
}

export const MacroCards = ({ macros }: MacroCardsProps) => {
    const cards = [
        { label: 'Protein', key: 'protein' as const, color: 'bg-blue-500', bgClass: 'bg-blue-100 dark:bg-blue-950', textClass: 'text-blue-600 dark:text-blue-400' },
        { label: 'Karb.', key: 'carbs' as const, color: 'bg-amber-500', bgClass: 'bg-amber-100 dark:bg-amber-950', textClass: 'text-amber-600 dark:text-amber-400' },
        { label: 'Yağ', key: 'fat' as const, color: 'bg-rose-500', bgClass: 'bg-rose-100 dark:bg-rose-950', textClass: 'text-rose-600 dark:text-rose-400' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            {cards.map((card, i) => {
                const { current, target } = macros[card.key];
                const percentage = Math.min((current / target) * 100 || 0, 100);

                return (
                    <Card key={card.key} className="p-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center">
                        <span className={`text-xs font-bold mb-1 ${card.textClass}`}>{card.label}</span>
                        <div className="font-mono font-semibold text-lg leading-none mb-2">
                            {current}<span className="text-xs text-zinc-500 font-sans">g</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full rounded-full ${card.color}`}
                            />
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-1.5 font-medium">{target}g</div>
                    </Card>
                );
            })}
        </div>
    );
};
