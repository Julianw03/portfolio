import {cn} from "@/lib/utils.ts";
import type {CareerDataEntry} from "@/types/Career.ts";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import {useTranslation} from "react-i18next";
import type {TFunction} from "i18next";
import type {JSX} from "react";
import Collapsible, {ClickListenerLocation} from "@/components/Collapsible.tsx";

export interface CareerItemV2Props {
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

const renderResponsibilities = (data: CareerDataEntry, t: TFunction) => {

    if (!data.responsibilities || data.responsibilities.length === 0) {
        return null;
    }

    return (
        <ul className={"list-disc pl-8 select-text"}>
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

const renderContent = (careerData: CareerDataEntry, t: TFunction) => {

    const startDate = new Date(careerData.startDate);
    const endDate = careerData.endDate ? new Date(careerData.endDate) : null;

    return (
        <Collapsible
            bottomBorder={false}
            className={"w-full"}
            clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
            header={
                <div className={"h-28 w-full flex flex-row"}>
                    {
                        renderLogo(careerData)
                    }
                    <div className={"flex-1 w-full px-4 py-2 overflow-hidden flex items-center justify-start select-text"}>
                        <div className={"flex flex-col h-fit"}>
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
            }>
            <div className={cn("px-4 flex flex-col gap-4")}>
                {
                    renderResponsibilities(careerData, t)
                }
            </div>
        </Collapsible>
    )
}

const CareerItemV2 = (
    {
        careerData,
        active = false,
        display = "left",
        mobileBreakpointReached = false
    }: CareerItemV2Props
): JSX.Element => {

    const {t} = useTranslation("career");

    if (mobileBreakpointReached) {
        return (
            <div className={"timeline-entry grid-cols-[0fr_minmax(0,_1fr)] grid"}>
                {
                    renderTimelineDot(active)
                }
                <div className={"h-full w-full flex items-center justify-center bg-secondary mb-4"}>
                    {
                        renderContent(careerData, t)
                    }
                </div>
            </div>
        )
    }

    if (display === "left") {
        return (
            <div className={"timeline-entry"}>
                <div className={"h-full w-full flex items-center justify-center pb-4 border-rounded-lg bg-secondary"}>
                    {
                        renderContent(careerData, t)
                    }
                </div>
                {
                    renderTimelineDot(active)
                }
                <div/>
            </div>
        )
    }

    return (
        <div className={"timeline-entry"}>
            <div/>
            {
                renderTimelineDot(active)
            }
            <div className={"h-full w-full flex items-center justify-center pb-4 border-rounded-lg bg-secondary"}>
                {
                    renderContent(careerData, t)
                }
            </div>
        </div>
    )
}

export default CareerItemV2;