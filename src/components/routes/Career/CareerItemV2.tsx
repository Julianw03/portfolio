import {cn} from "@/lib/utils.ts";
import type {CareerDataEntry} from "@/types/Career.ts";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import {useTranslation} from "react-i18next";
import type {TFunction} from "i18next";
import type {JSX} from "react";

export interface CareerItemV2Props {
    containerClass?: string
    careerData: CareerDataEntry
    active?: boolean
    display?: "left" | "right"
    mobileBreakpointReached?: boolean
}

const renderTimelineDot = (active: boolean) => {
    return (
        <div className="timeline-dot-wrapper relative">
            {active ? <div className={"timeline-dot animate-ping absolute"}/> : null}
            <div className="timeline-dot absolute"/>
        </div>
    )
}

const renderDateRange = (startDate: Date, endDate: Date | null, t: TFunction) => {
    const startDateString = startDate.toLocaleString(undefined, {
        month: "2-digit",
        year: "numeric"
    });

    const endDateString = (endDate !== null) ? endDate.toLocaleString(undefined, {
        month: "2-digit",
        year: "numeric"
    }) : t("dateToday");

    return `${startDateString} - ${endDateString}`;
}

const renderLogo = (careerData: CareerDataEntry) => {
    return (
        <div
            className={"flex-shrink-0 aspect-square h-full overflow-hidden flex items-center justify-center"}>
            <a href={careerData.linkUrl ?? ""} className={"h-full w-full"} target="_blank" rel="noopener noreferrer">
                <GenericLogo logoId={careerData.companyLogoId ?? undefined}/>
            </a>
        </div>
    )
}

const renderDescription = (data: CareerDataEntry, t: TFunction) => {
    return (
        <h3 className={"text-lg font-semibold"}>
            {t(`entries.${data.id}.position`)}
        </h3>
    )
}

// TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderResponsibilities = (data: CareerDataEntry, t: TFunction) => {

    if (!data.responsibilities || data.responsibilities.length === 0) {
        return null;
    }

    return (
        <ul className={"list-disc pl-4"}>
            {
                data.responsibilities.map((responsibility, index) => {
                    return (
                        <li key={index}>
                            {t(`entries.${data.id}.responsibilities.${responsibility}`)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

const CareerItemV2 = (
    {
        containerClass,
        careerData,
        active = false,
        display = "left",
        mobileBreakpointReached = false
    }: CareerItemV2Props
): JSX.Element => {

    const {t} = useTranslation("career");

    const startDate = new Date(careerData.startDate);
    const endDate = careerData.endDate ? new Date(careerData.endDate) : null;

    if (mobileBreakpointReached) {
        return (
            <div className={cn("timeline-entry", containerClass)}>
                {
                    renderTimelineDot(active)
                }
                <div className="flex-1 h-full">
                    <div className={"h-full w-full flex items-center justify-center py-4"}>
                        <div className={"h-full w-full border-rounded-lg border-2 border-secondary flex flex-row"}>
                            {
                                renderLogo(careerData)
                            }
                            <div className={"flex-1 bg-secondary w-full h-full px-4 py-2 overflow-hidden"}>
                                <div className={"flex flex-col h-full"}>
                                    {
                                        renderDescription(careerData, t)
                                    }
                                    <p className={"text-sm text-secondary-foreground"}>
                                        {
                                            careerData.company
                                        }
                                    </p>
                                    <p className={"text-sm text-secondary-foreground"}>
                                        {
                                            renderDateRange(startDate, endDate, t)
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (display === "left") {
        return (
            <div className={cn("timeline-entry", containerClass)}>
                <div className={"flex-1 h-full"}>
                    <div className={"h-full w-full flex items-center justify-center py-4"}>
                        <div
                            className={"h-full w-full border-rounded-lg border-2 border-secondary flex flex-row-reverse"}>
                            {
                                renderLogo(careerData)
                            }
                            <div className={"flex-1 bg-secondary w-full h-full px-4 py-2 overflow-hidden"}>
                                <div className={"flex flex-col h-full"}>
                                    {
                                        renderDescription(careerData, t)
                                    }
                                    <p className={"text-sm text-secondary-foreground"}>
                                        {
                                            careerData.company
                                        }
                                    </p>
                                    <p className={"text-sm text-secondary-foreground"}>
                                        {
                                            renderDateRange(startDate, endDate, t)
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {renderTimelineDot(active)}
                <div className="flex-1 h-full"/>
            </div>
        )
    }

    return (
        <div className={cn("timeline-entry", containerClass)}>
            <div className="flex-1 h-full"/>
            {renderTimelineDot(active)}
            <div className={"flex-1 h-full"}>
                <div className={"h-full w-full flex items-center justify-center py-4"}>
                    <div className={"h-full w-full border-rounded-lg border-2 border-secondary flex flex-row"}>
                        {
                            renderLogo(careerData)
                        }
                        <div className={"flex-1 bg-secondary w-full px-4 py-2 overflow-hidden"}>
                            <div className={"flex flex-col h-full"}>
                                {
                                    renderDescription(careerData, t)
                                }
                                <p className={"text-sm text-primary"}>
                                    {
                                        careerData.company
                                    }
                                </p>
                                <p className={"text-sm text-secondary-foreground"}>
                                    {
                                        renderDateRange(startDate, endDate, t)
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CareerItemV2;