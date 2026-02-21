import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './providers';

export function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="kaloscope-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
