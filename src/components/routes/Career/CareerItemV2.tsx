import {cn} from "@/lib/utils.ts";
import type {CareerDataEntry} from "@/types/Career.ts";
import GenericLogo, {type Logo} from "@/components/logos/GenericLogo.tsx";
import {useTranslation} from "react-i18next";
import type {TFunction} from "i18next";
import type {JSX} from "react";
import Collapsible, {ClickListenerLocation} from "@/components/common/Collapsible.tsx";
import {getLocalizedArray, getLocalizedContent} from "@/lib/sanity";
import type {ID, Resolved} from "@/types/Shared.ts";

export interface CareerItemV2Props {
    careerData: Resolved<CareerDataEntry>
    active?: boolean
    display?: "left" | "right"
    mobileBreakpointReached?: boolean,
    collapsed?: boolean
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

const renderLogo = (careerData: Resolved<CareerDataEntry>) => {
    return (
        <div
            className={"flex-shrink-0 aspect-square lg:h-full h-4/5 overflow-hidden flex items-center justify-center"}>
            <a href={careerData.company.linkUrl ?? ""} className={"h-full w-full"} target="_blank"
               rel="noopener noreferrer">
                <GenericLogo logoId={careerData.company.companyLogoId as ID<Logo>}/>
            </a>
        </div>
    )
}

const renderDescription = (data: Resolved<CareerDataEntry>, locale: string) => {
    const position = getLocalizedContent(data.position, locale);

    return (
        <h3 className={"text-lg font-semibold"}>
            {position}
        </h3>
    )
}

const renderResponsibilities = (data: Resolved<CareerDataEntry>, locale: string) => {
    if (!data.responsibilities || data.responsibilities.length === 0) {
        return null;
    }

    const responsibilities = getLocalizedArray(data.responsibilities, locale);

    return (
        <ul className={"list-disc pl-8 select-text"}>
            {
                responsibilities.map((responsibility, index) => {
                    return (
                        <li key={index}>{responsibility}</li>
                    )
                })
            }
        </ul>
    )
}

const renderSpecialAchievements = (data: Resolved<CareerDataEntry>, t: TFunction, locale: string) => {
    if (!data.special_achievements || data.special_achievements.length === 0) {
        return null;
    }

    return (
        <>
            <div className={"collapsibleMarker py-1"}/>
            <p className={"pl-2"}>
                <b>
                    {
                        t("specialAchievements")
                    }
                </b>
            </p>
            <ul className={"list-disc pl-8 select-text"}>
                {
                    data.special_achievements.map((achievement, index) => {

                        const title = getLocalizedContent(achievement.title, locale);
                        const content = getLocalizedContent(achievement.description, locale);

                        return (
                            <li key={index}>{title}: {content}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}

const renderContent = (careerData: Resolved<CareerDataEntry>, t: TFunction, locale: string, initialCollapsed: boolean = true) => {

    const startDate = new Date(careerData.startDate);
    const endDate = careerData.endDate ? new Date(careerData.endDate) : null;

    return (
        <Collapsible
            bottomBorder={false}
            className={"w-full"}
            clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
            initialCollapsed={initialCollapsed}
            header={
                <div className={"h-28 w-full flex flex-row items-center"}>
                    {
                        renderLogo(careerData)
                    }
                    <div
                        className={"flex-1 w-full lg:px-4 pl-2 py-2 overflow-hidden flex items-center justify-start select-text"}>
                        <div className={"flex flex-col h-fit"}>
                            {
                                renderDescription(careerData, locale)
                            }
                            <p className={"text-sm text-primary"}>
                                {
                                    careerData.company.name
                                }
                            </p>
                            <p className={"text-sm text-primary"}>
                                {
                                    renderDateRange(startDate, endDate, t)
                                }
                            </p>
                        </div>
                    </div>
                </div>
            }>
            <div className={cn("px-4 flex flex-col gap-4 mt-2")}>
                {
                    renderResponsibilities(careerData, locale)
                }
            </div>
            <div className={cn("px-4 flex flex-col gap-4 mt-2")}>
                {
                    renderSpecialAchievements(careerData, t, locale)
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
        mobileBreakpointReached = false,
        collapsed = true
    }: CareerItemV2Props
): JSX.Element => {

    const {t, i18n} = useTranslation("career");
    const locale = i18n.language.split('-')[0];

    if (mobileBreakpointReached) {
        return (
            <div className={"timeline-entry grid-cols-[0fr_minmax(0,_1fr)] grid"}>
                {
                    renderTimelineDot(active)
                }
                <div className={"h-full w-full flex items-center justify-center bg-secondary mb-4"}>
                    {
                        renderContent(careerData, t, locale, collapsed)
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
                        renderContent(careerData, t, locale, collapsed)
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
                    renderContent(careerData, t, locale, collapsed)
                }
            </div>
        </div>
    )
}

export default CareerItemV2;