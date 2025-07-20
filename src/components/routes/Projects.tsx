import type {Project} from "@/types/Project.ts";
import Collapsible, {ClickListenerLocation} from "@/components/Collapsible.tsx";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper/modules";
import {cn} from "@/lib/utils.ts";
import projects from "@/data/projects.json";
import type {Skill} from "@/types/Skill.ts";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import type {TFunction} from "i18next";


const renderImages = (project: Project) => {
    if (project?.previewImages === undefined || project.previewImages.length === 0) {
        return <></>;
    }

    return (
        <>
            <Swiper
                modules={[Pagination, Navigation, Keyboard]}
                pagination={
                    {
                        clickable: true,
                        dynamicBullets: false
                    }}
                loop={true}
                spaceBetween={20}
                grabCursor={true}
                navigation={true}
                keyboard={{
                    enabled: true,
                    onlyInViewport: false
                }}
                className={"w-full h-fit"}
            >
                {project.previewImages.map((image) => {


                    return (
                        <SwiperSlide key={image}>
                            <div className={"swiper-zoom-container"}>
                                <img
                                    className={"object-cover object-center w-full h-full"}
                                    src={`./media/projects/${project.id}/${image}`}
                                    alt={``}
                                />
                            </div>
                        </SwiperSlide>
                    )
                })
                }
            </Swiper>
        </>

    )
}

const renderSkills = (technologies: ID<Skill>[]) => {
    if (technologies === undefined || technologies.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className={"flex flex-row flex-wrap gap-4 mt-4 justify-center"}>
                {technologies.map((tech) => {
                    return (
                        <span key={tech} className={"h-20 w-20 flex items-center justify-center"}>
                            <GenericLogo logoId={tech} className={"h-full w-full border-1 rounded-full"}/>
                        </span>
                    )
                })}
            </div>
        </>
    )
}

const renderFeatures = (project: Project, t: TFunction) => {
    const features = project.features;

    if (features === undefined || features.length === 0) {
        return <></>;
    }

    return (
        <>
            <h3 className={"text-lg mb-2"}>
                {t(`keys.features`)}
            </h3>
            <ul className={"list-disc pl-8"}>
                {features.map((feature) => {
                    return (
                        <li key={feature}>
                            {t(`projects.${project.id}.features.${feature}`)}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const renderDisclaimer = (project: Project, t: TFunction) => {
    if (!project.hasDisclaimer) {
        return <></>;
    }

    return (
        <p className={"text-lg mb-2 italic underline"}>
            {t(`projects.${project.id}.disclaimer`)}
        </p>
    )
}

const renderPlannedFeatures = (project: Project, t: TFunction) => {
    const plannedFeatures = project.plannedFeatures;

    if (plannedFeatures === undefined || plannedFeatures.length === 0) {
        return <></>;
    }

    return (
        <>
            <h3 className={"text-lg mb-2"}>
                {t("keys.plannedFeatures")}
            </h3>
            <ul className={"list-disc pl-8"}>
                {plannedFeatures.map((feature) => {
                    return (
                        <li key={feature}>
                            {t(`projects.${project.id}.plannedFeatures.${feature}`)}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


const Projects = () => {

    const {t} = useTranslation("projects");

    return (
        <div className={"w-full"}>
            <div className={"mx-6 my-4 lg:mx-[20%] lg:my-6"}>
                <h1 className={"text-3xl mb-4"}>
                    {t("keys.title")}
                </h1>
                <p className={"text-l"}>
                    {t("keys.intro")}
                </p>
                <div className={"w-full flex flex-col mt-4"}>
                    {projects.map((project, index) => {

                        return (
                            <Collapsible
                                key={project.id}
                                initialCollapsed={index > 0}
                                className={"w-full"}
                                clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                header={
                                    <div className={"mb-2"}>
                                        <a className={cn("text-2xl", project.githubLink ? "external-link" : "")}
                                           href={project.githubLink} target={"_blank"} rel="noopener noreferrer">
                                            {project.title} {project.workInProgress ? <span
                                            className={"text-muted-foreground"}>({t("keys.workInProgress")})</span> : ""}
                                        </a>
                                    </div>
                                }
                            >
                                <div className={"mb-4"} >
                                    {t(`projects.${project.id}.description`)}
                                </div>
                                <div>
                                    {
                                        renderDisclaimer(project as Project, t)
                                    }
                                </div>
                                <div className={"mb-4"}>
                                    {
                                        renderFeatures(project as Project, t)
                                    }
                                </div>
                                <div className={"mb-4"}>
                                    {renderPlannedFeatures(project as Project, t)}
                                </div>
                                <div className={"mb-6"}>
                                    {renderImages(project as Project)}
                                </div>
                                <div className={"mb-4"}>
                                    {renderSkills(project.skills as ID<Skill>[])}
                                </div>
                            </Collapsible>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Projects;