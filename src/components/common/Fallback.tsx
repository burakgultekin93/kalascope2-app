import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="size-10 text-emerald-500 animate-spin" />
                <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">Yükleniyor...</p>
            </div>
        </div>
    );
};

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 text-center">
            <div className="size-20 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Bir Sorun Oluştu</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">{error.message || 'Beklenmeyen bir hata meydana geldi.'}</p>
            <button
                onClick={resetErrorBoundary}
                className="h-12 px-8 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-xl font-bold transition-all active:scale-95"
            >
                Tekrar Dene
            </button>
        </div>
    );
};
