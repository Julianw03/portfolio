import type {ID, LocalizedString, LocalizedText, Reference} from "@/types/Shared.ts";
import type {Company} from "@/types/Company.ts";

export interface SpecialAchievement {
    title: LocalizedString;
    description: LocalizedText;
}

export interface CareerDataEntry {
    id: ID<CareerDataEntry>;
    position: LocalizedString;
    company: Reference<Company>;
    startDate: string;
    endDate?: string | null;
    responsibilities?: Array<LocalizedText>;
    special_achievements?: Array<SpecialAchievement>;
}