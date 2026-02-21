import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, Droplets, FlaskConical, Pill, Plus, History, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { useHealthLogs } from '@/hooks/useHealthLogs';
import type { HealthLogType } from '@/hooks/useHealthLogs';
import { toast } from 'sonner';

export const HealthLogger = ({ dietPreference }: { dietPreference: string }) => {
    const { t } = useTranslation();
    const { logs, addHealthLog, loading } = useHealthLogs();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedType, setSelectedType] = useState<HealthLogType | null>(null);
    const [value, setValue] = useState('');
    const [notes, setNotes] = useState('');

    const types: { id: HealthLogType, label: string, icon: React.ReactNode, unit: string, color: string }[] = [
        { id: 'insulin', label: t('health_log_insulin'), icon: <Syringe className="size-5" />, unit: 'units', color: 'text-indigo-500 bg-indigo-500/10' },
        { id: 'blood_sugar', label: t('health_log_sugar'), icon: <Droplets className="size-5" />, unit: 'mg/dL', color: 'text-red-500 bg-red-500/10' },
        { id: 'ketones', label: t('health_log_ketones'), icon: <FlaskConical className="size-5" />, unit: 'mmol/L', color: 'text-purple-500 bg-purple-500/10' },
        { id: 'medication', label: t('health_log_medication'), icon: <Pill className="size-5" />, unit: 'dose', color: 'text-emerald-500 bg-emerald-500/10' },
    ];

    // Filter types based on diet
    const filteredTypes = dietPreference === 'diabetic'
        ? types.filter(t => ['insulin', 'blood_sugar', 'medication'].includes(t.id))
        : dietPreference === 'ketogenic'
            ? types.filter(t => ['ketones', 'blood_sugar'].includes(t.id))
            : types;

    const handleSave = async () => {
        if (!selectedType || !value) return;
        try {
            const typeConfig = types.find(t => t.id === selectedType);
            await addHealthLog({
                type: selectedType,
                value: parseFloat(value),
                unit: typeConfig?.unit || '',
                notes
            });
            toast.success(t('Kaydedildi'));
            setSelectedType(null);
            setValue('');
            setNotes('');
        } catch {
            toast.error(t('Bir hata oluştu'));
        }
    };

    return (
        <Card className="p-4 rounded-[2rem] border-2 shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2">
                    <History className="size-5 text-zinc-400" />
                    <h3 className="font-black uppercase tracking-widest text-[11px] text-zinc-500">{t('health_title')}</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <X className="size-4" /> : <Plus className="size-4" />}
                </Button>
            </div>

            <div className="flex gap-2 p-2 overflow-x-auto no-scrollbar">
                {filteredTypes.map(type => (
                    <button
                        key={type.id}
                        onClick={() => {
                            setSelectedType(type.id);
                            setIsExpanded(true);
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-3xl min-w-[80px] transition-all border-2 ${selectedType === type.id ? 'border-zinc-900 bg-zinc-50 dark:bg-zinc-800' : 'border-zinc-100 dark:border-zinc-800'}`}
                    >
                        <div className={`p-3 rounded-2xl ${type.color}`}>
                            {type.icon}
                        </div>
                        <span className="text-[10px] font-bold text-center leading-tight">{type.label.split(' ')[0]}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {isExpanded && selectedType && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 space-y-4 px-2"
                    >
                        <div className="flex gap-3">
                            <Input
                                type="number"
                                placeholder={types.find(t => t.id === selectedType)?.unit}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="rounded-2xl h-12 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 font-bold"
                            />
                            <Button
                                onClick={handleSave}
                                disabled={loading || !value}
                                className="h-12 rounded-2xl px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold"
                            >
                                {t('health_add_button')}
                            </Button>
                        </div>
                        <Input
                            placeholder={t('health_notes_placeholder')}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recent Logs Summary */}
            {logs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                    {logs.slice(0, 3).map(log => (
                        <div key={log.id} className="flex items-center justify-between text-xs px-2">
                            <div className="flex items-center gap-2">
                                <div className={`p-1 rounded-lg ${types.find(t => t.id === log.type)?.color}`}>
                                    {types.find(t => t.id === log.type)?.icon}
                                </div>
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">{log.value} {log.unit}</span>
                                {log.notes && <span className="text-zinc-400 font-medium truncate max-w-[100px]">- {log.notes}</span>}
                            </div>
                            <span className="text-zinc-400 font-mono">
                                {new Date(log.logged_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
