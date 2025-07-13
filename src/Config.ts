import type {LanguageKey} from "@/types/Shared.ts";

export const COMPONENT_LOADER_MINIMUM_LOAD_TIME = 250;

export const EMAIL_ADDRESS_APPLICATIONS = "woelkjulian+applications@gmail.com";
export const EMAIL_ADDRESS_LEGAL = "woelkjulian+legal@gmail.com";


export interface SimpleLink {
    to: string
    label: string
}

export const HEADER_LINKS: SimpleLink[] = [
    {to: "/", label: "nav.home"},
    {to: "/skills", label: "nav.skills"},
    {to: "/career", label: "nav.career"},
    {to: "/projects", label: "nav.projects"},
    // TODO
    // {to: "/about", label: "nav.about"},
];

export interface SupportedLanguage {
    code: string
    flagCode: string
    label: LanguageKey<unknown>
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    {code: 'en', flagCode: 'gb', label: 'languages.en' as LanguageKey<"root">},
    {code: 'de', flagCode: 'de', label: 'languages.de' as LanguageKey<"root">},
];