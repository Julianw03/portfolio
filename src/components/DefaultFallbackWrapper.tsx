import type {ReactNode} from "react";

export interface DefaultFallbackWrapperProps {
    children: ReactNode;
}

const DefaultFallbackWrapper = (
    {
        children
    }: DefaultFallbackWrapperProps
) => {
    return (
        <div className={"w-full h-[calc(100dvh-80px)] flex items-center justify-center"}>
            {children}
        </div>
    )
}

export default DefaultFallbackWrapper;