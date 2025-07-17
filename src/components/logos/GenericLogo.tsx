import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import type {ID} from "@/types/Shared.ts";
import {LogoProvider} from "@/systems/LogoProvider.ts";


export interface Logo {
    getBrandColor: () => string;
    getTitle: () => string;
    renderComponent: () => ReactNode;
}

export interface GenericLogoProps {
    logoId: ID<unknown> | null | undefined,
    className?: string,
    onClick?: () => void,
}

const provider = LogoProvider.getInstance();

const GenericLogo = (
    props: GenericLogoProps
) => {

    const logo = provider.getLogo(props.logoId);

    if (!logo) {
        console.warn(`Logo with ID ${props.logoId} not found.`);
        return <></>
    }

    const brandColor = logo.getBrandColor();
    const title = logo.getTitle();

    return (
        <div
            onClick={props.onClick}
            className={cn(props.className, "flex", "items-center", "justify-center", "aspect-square", "border-solid", "box-border")}
            style={{borderColor: `${brandColor}`}}
            title={title}
            draggable={false}
        >
            {logo.renderComponent()}
        </div>
    )
}

export default GenericLogo;