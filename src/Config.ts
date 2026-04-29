import type {LanguageKey} from "@/types/Shared.ts";

export const EMAIL_ADDRESS_APPLICATIONS = "woelkjulian+applications@gmail.com";
export const EMAIL_ADDRESS_LEGAL = "woelkjulian+legal@gmail.com";


export interface SimpleLink {
    to: string
    label: string
}

export const HEADER_LINKS = {
    "HOME": {
        to: "/",
        label: "nav.home"
    },
    "SKILLS": {
        to: "/skills",
        label: "nav.skills"
    },
    "CAREER": {
        to: "/career",
        label: "nav.career"
    },
    "PROJECTS": {
        to: "/projects",
        label: "nav.projects"
    }
}

export interface SupportedLanguage {
    code: string
    flagCode: string
    label: LanguageKey<unknown>
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    {code: 'en', flagCode: 'gb', label: 'languages.en' as LanguageKey<"root">},
    {code: 'de', flagCode: 'de', label: 'languages.de' as LanguageKey<"root">},
];