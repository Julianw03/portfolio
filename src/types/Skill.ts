import type {ExternalLink, ID} from "@/types/Shared.ts";

export type SkillType =
    | "language"
    | "framework"
    | "build"
    | "version-control"
    | "containerization"
    | "cloud"
    | "other";

export interface Skill {
    id: ID<Skill>;
    name: string;
    linkUrl?: ExternalLink
    type: SkillType;
    knowledgeLevel: number; // 0 - 5
}