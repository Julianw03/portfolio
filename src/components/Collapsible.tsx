import {type Dispatch, type SetStateAction, useState} from "react";
import {cn} from "@/lib/utils.ts";

export interface CollapsibleProps {
    injectedHooks?: [collapsed: boolean, setCollapsed: Dispatch<SetStateAction<boolean>>];
    header: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    initialCollapsed?: boolean;
    bottomBorder?: boolean;
}


const DEFAULT_COLLAPSED = true;
const DEFAULT_BOTTOM_BORDER = true;

export default function Collapsible(
    {
        injectedHooks,
        header,
        children,
        className,
        initialCollapsed,
        bottomBorder
    }: CollapsibleProps) {
    const [internalCollapsed, setInternalCollapsed] = useState(initialCollapsed ?? DEFAULT_COLLAPSED);
    const [showBottomBorder] = useState(bottomBorder ?? DEFAULT_BOTTOM_BORDER);

    const collapsed = injectedHooks ? injectedHooks[0] : internalCollapsed;
    const setCollapsed = injectedHooks ? injectedHooks[1] : setInternalCollapsed;


    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    }

    const handleKeyDown = (event: React.KeyboardEvent<SVGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleCollapsed();
        }
    }

    return (
        <div className={className ?? ""}>
            <div className={"collapsibleHeaderSection"}>
                <div className={"collapsibleHeaderContent"}>
                    {header}
                </div>
                <div className={"collapsibleHeaderCollapseControl"}>
                    <svg
                        onClick={toggleCollapsed}
                        role={"button"}
                        aria-label={"Toggle collapsible content"}
                        aria-description={collapsed ? "Expand" : "Collapse"}
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className={
                            cn(
                                "collapsibleHeaderCollapseIcon",
                                collapsed ? "" : "collapsibleIconCollapsed"
                            )}
                        viewBox="0 0 100 100"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polyline
                            points={"10 30 50 70 90 30"}
                            fill={"none"}
                            strokeWidth={"10"}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                        />
                    </svg>
                </div>
            </div>
            <div
                className={
                    cn(
                        "collapsible",
                        collapsed ? "collapsed" : ""
                    )}>
                <div
                    aria-label={"Collapsible content"}
                    aria-hidden={collapsed}
                    className={"collapsibleContentWrapper"}>
                    {
                        children
                    }
                </div>
            </div>

            {showBottomBorder && (
                <div className={"collapsibleMarker"}/>)
            }
        </div>
    )
}