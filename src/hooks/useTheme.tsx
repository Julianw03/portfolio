import {useEffect, useState} from "react";

export type Theme = 'dark' | 'light' | 'system';

const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") as Theme | null;
            return savedTheme || "system";
        }
        return "system";
    });

    const element = typeof document !== "undefined" ? document.documentElement : null;
    const prefersDarkMode = typeof window !== "undefined" && window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const applyTheme = (theme: Theme) => {
        if (!element) return;

        switch (theme) {
            case "dark":
                element.classList.add("dark");
                break;
            case "light":
                element.classList.remove("dark");
                break;
            case "system":
                if (prefersDarkMode) {
                    element.classList.add("dark");
                } else {
                    element.classList.remove("dark");
                }
                break;
        }
    };

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem("theme", newTheme);
        setThemeState(newTheme);
    };

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        applyTheme(theme);
    }, []);

    return [theme, setTheme];
};

export default useTheme;