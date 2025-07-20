import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import type {ID} from "@/types/Shared.ts";
import {Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip.tsx";
import {LogoProvider} from "@/systems/LogoProvider.ts";


export interface Logo {
    getBrandColor: () => string;
    getTitle: () => string;
    renderComponent: () => ReactNode;
}

export interface GenericLogoProps {
    logoId: ID<unknown> | null | undefined,
    className?: string,
    showTooltip?: boolean,
    onClick?: () => void,
}

const provider = LogoProvider.getInstance();

const GenericLogo = (
    {
        logoId,
        className,
        showTooltip = false,
        onClick = () => {
        },
    }: GenericLogoProps
) => {

    const logo = provider.getLogo(logoId);

    if (!logo) {
        console.warn(`Logo with ID ${logoId} not found.`);
        return <></>
    }

    const brandColor = logo.getBrandColor();
    const title = logo.getTitle();

    const content = (
        <div
            onClick={onClick}
            className={cn(className, "flex", "items-center", "justify-center", "aspect-square", "border-solid", "box-border")}
            style={{borderColor: `${brandColor}`}}
            draggable={false}
        >
            {logo.renderComponent()}
        </div>
    );

    if (!showTooltip) {
        return content;
    }

    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger>
                {
                    content
                }
            </TooltipTrigger>
            <TooltipContent>
                <p className={"my-1"}>{title}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default GenericLogo;