import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const AppShell = () => {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <main className="flex-1 pb-24">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};
