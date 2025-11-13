import type {Logo} from "@/components/logos/GenericLogo.tsx";
import type {ExternalLink, ID, LocalizedText} from "@/types/Shared.ts";

export interface Company {
    name: string,
    companyLogoId?: ID<Logo>,
    linkUrl: ExternalLink,
    shortDescription?: LocalizedText,
}