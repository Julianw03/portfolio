import {useEffect, useState} from "react";

export type Theme = 'dark' | 'light' | 'system';

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>("system");

    const element = document.documentElement;
    const preferresDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (theme: string) => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark');
                break;
            case 'light':
                element.classList.remove('dark');
                break;
            case 'system':
                if (preferresDarkMode) {
                    if (!element.classList.contains('dark')) {
                        element.classList.add('dark');
                    }
                } else {
                    element.classList.remove('dark');
                }
                break;
            default:
                applyTheme('light');
                break;
        }
    }

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        applyTheme(preferresDarkMode ? 'dark' : 'light');
    }, []);

    return [theme, setTheme]
}

export default useTheme;