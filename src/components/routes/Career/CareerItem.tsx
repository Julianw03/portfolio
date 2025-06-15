import {cn} from "@/lib/utils.ts";

export interface CareerItemProps {
    containerClass?: string;
    children?: React.ReactNode;
    active?: boolean
}


const CareerItem = (
    {
        containerClass,
        children,
        active
    }: CareerItemProps
) => {

    const content = children ?? undefined;

    return (
        <div className={cn("timeline-entry", containerClass)}>
            <div className="timeline-dot-wrapper relative">
                { active ? <div className={"timeline-dot animate-ping absolute"}/> : null }
                <div className="timeline-dot absolute"/>
            </div>
            <div className="flex-1 h-full">
                <div className={"h-full w-full flex items-center justify-center py-4"}>
                    {
                        content
                    }
                </div>
            </div>
        </div>
    )
}

export default CareerItem;