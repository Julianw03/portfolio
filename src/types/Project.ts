import type {ExternalLink, ID, LanguageKey, LocalLink} from "@/types/Shared.ts";
import type {Skill} from "@/types/Skill.ts";

export type ProjectMediaLink = LocalLink & {__type: "ProjectMediaLink"};

export interface Project {
    id: ID<Project>
    title: string;
    features: LanguageKey<unknown>[];
    plannedFeatures?: LanguageKey<unknown>[];
    skills?: ID<Skill>[];
    workInProgress?: boolean;
    hasDisclaimer?: boolean;
    githubLink: ExternalLink;
    previewImages?: ProjectMediaLink[];
}