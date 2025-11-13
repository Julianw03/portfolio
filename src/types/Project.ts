import type {ExternalLink, ID, LocalizedString, LocalizedText, Reference} from "@/types/Shared.ts";
import type {Skill} from "@/types/Skill.ts";

export const ProjectStatus = {
    WORK_IN_PROGRESS: 'wip',
    ARCHIVED: 'archived',
    COMPLETED: 'completed',
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export interface Project {
    id: ID<Project>;
    title: string;
    description?: LocalizedText;
    features?: Array<LocalizedString>;
    plannedFeatures?: Array<LocalizedString>;
    disclaimer?: LocalizedText;
    skills?: Reference<Skill>[];
    status: ProjectStatus;
    hasDisclaimer?: boolean;
    githubLink?: ExternalLink;
    previewImages?: any[];
    order: number;
}