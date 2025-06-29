import {useEffect, useState} from "react";

export const Breakpoint = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
} as const;

export type Breakpoint = (typeof Breakpoint)[keyof typeof Breakpoint];

const BreakpointMap: Record<Breakpoint, string> = {
    [Breakpoint.SM]: '(min-width: 640px)',
    [Breakpoint.MD]: '(min-width: 768px)',
    [Breakpoint.LG]: '(min-width: 1024px)',
    [Breakpoint.XL]: '(min-width: 1280px)',
    [Breakpoint.XXL]: '(min-width: 1536px)',
}

const breakpointMatches = (breakpoint: Breakpoint): boolean => {
    const mediaQuery = BreakpointMap[breakpoint];
    if (mediaQuery === undefined) return false;
    return window.matchMedia(mediaQuery).matches;
}

const useCssBreakpointOrUp = (
    breakpoint: Breakpoint = Breakpoint.MD
) => {
    const [isBreakpoint, setIsBreakpoint] = useState(() => breakpointMatches(breakpoint));

    useEffect(() => {
        const query = BreakpointMap[breakpoint];
        if (!query) {
            console.warn(`Invalid breakpoint: ${breakpoint}`);
            return;
        }

        const mediaQuery = window.matchMedia(query);

        const handleChange = () => setIsBreakpoint(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [
        breakpoint
    ]);

    return isBreakpoint;
};

export const isCssBreakpointOrUp = (breakpoint: Breakpoint) => {
    if (typeof window === 'undefined') {
        return false;
    }
    return breakpointMatches(breakpoint);
}

export default useCssBreakpointOrUp;