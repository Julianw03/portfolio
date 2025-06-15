import type {ISO8601Date, LanguageKey} from "@/types/Shared.ts";


export interface Education {
    facility?: LanguageKey<"Facility">;
    additional?: LanguageKey<"Additional">[];
}

export interface Experience {
    position: LanguageKey<"Position">
    company: string;
    startData: ISO8601Date
    endDate?: ISO8601Date
    responsibilities: LanguageKey<"Responsibilities">[];
}


export interface Career {
    edcucation: Education[];
    experience: Experience[];
}