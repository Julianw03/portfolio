import type {ExternalLink, ID, ISO8601Date, LanguageKey} from "@/types/Shared.ts";

export interface CareerDataEntry {
    id: ID<CareerDataEntry>;
    company: string;
    companyLogoId: ID<unknown> | null
    linkUrl?: ExternalLink | null
    startDate: ISO8601Date
    endDate?: ISO8601Date | null
    responsibilities: LanguageKey<unknown>[];
}