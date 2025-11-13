import {type Project, ProjectStatus} from "@/types/Project.ts";
import Collapsible, {ClickListenerLocation} from "@/components/common/Collapsible.tsx";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {cn} from "@/lib/utils.ts";
import type {Skill} from "@/types/Skill.ts";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import type {ID, Reference} from "@/types/Shared.ts";
import {getLocalizedArray, getLocalizedContent, getSanityData} from "@/lib/sanity";
import Loader from "@/components/Loader";
import type {TFunction} from "i18next";
import {Await, useLoaderData} from "react-router";
import DefaultFallbackWrapper from "@/components/DefaultFallbackWrapper.tsx";
import {Suspense} from "react";

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  "id": id.current,
  title,
  description,
  features,
  plannedFeatures,
  "skills": skills[]->id.current,
  status,
  hasDisclaimer,
  disclaimer,
  githubLink,
  "previewImages": previewImages[].asset->url,
  order
}`;

interface LoaderData {
    projects: Promise<Project[]>;
}

export const loader = (): LoaderData => {
    const sanityPromise = (async () => {
        const now = Date.now();
        const data = await getSanityData<Project[]>(PROJECTS_QUERY)
        const elapsed = Date.now() - now;
        console.debug("[Projects] Sanity data fetched in", elapsed, "ms");
        return data;
    })();
    return ({
        projects: sanityPromise
    });
}

const renderImages = (project: Project) => {
    if (!project?.previewImages || project.previewImages.length === 0) {
        return null;
    }

    return (
        <Swiper
            modules={[Pagination, Navigation, Keyboard]}
            pagination={{
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
            {project.previewImages.map((image, index) => {

                return (
                    <SwiperSlide key={index}>
                        <div className={"swiper-zoom-container"}>
                            <img
                                loading={"lazy"}
                                className={"object-cover object-center w-full h-full"}
                                src={image}
                                alt={`${project.title} preview ${index + 1}`}
                            />
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

const renderSkills = (technologies: Reference<Skill>[] | undefined) => {
    if (!technologies || technologies.length === 0) {
        return null;
    }

    return (
        <div className={"flex flex-row flex-wrap gap-4 mt-4 justify-center"}>
            {technologies.map((techRef) => {

                const id = techRef as unknown as ID<unknown>;

                return (
                    <span key={id} className={"h-20 w-20 flex items-center justify-center"}>
                        <GenericLogo logoId={id} showTooltip={true}
                                     className={"h-full w-full border-1 rounded-full"}/>
                    </span>
                )
            })}
        </div>
    )
}

const renderFeatures = (features: string[] | undefined, t: TFunction) => {
    if (!features || features.length === 0) {
        return null;
    }

    return (
        <>
            <h3 className={"text-lg mb-2"}>
                {t(`keys.features`)}
            </h3>
            <ul className={"list-disc pl-8"}>
                {features.map((feature, index) => {
                    return (
                        <li key={index}>
                            {feature}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const renderDisclaimer = (disclaimer: string | undefined) => {
    if (!disclaimer) {
        return null;
    }

    return (
        <p className={"text-lg mb-2 italic underline"}>
            {disclaimer}
        </p>
    )
}

const renderPlannedFeatures = (plannedFeatures: string[] | undefined, workInProgress: boolean | undefined, t: TFunction) => {
    if (!plannedFeatures || plannedFeatures.length === 0 || !workInProgress) {
        return null;
    }

    return (
        <>
            <h3 className={"text-lg mb-2"}>
                {t("keys.plannedFeatures")}
            </h3>
            <ul className={"list-disc pl-8"}>
                {plannedFeatures.map((feature, index) => {
                    return (
                        <li key={index}>
                            {feature}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const Projects = () => {
    const {t, i18n} = useTranslation("projects");
    const projectData = useLoaderData<LoaderData>();
    const locale = i18n.language.split('-')[0];

    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={projectData.projects}>
                {(data) => (
                    <div className={"w-full"}>
                        <div className={"mx-6 my-4 lg:mx-[20%] lg:my-6"}>
                            <h1 className={"text-3xl mb-4"}>
                                {t("keys.title")}
                            </h1>
                            <p className={"text-l"}>
                                {t("keys.intro")}
                            </p>
                            <div className={"w-full flex flex-col mt-4"}>
                                {
                                    data.sort((a, b) => b.order - a.order)
                                        .map((project: Project, index: number) => {
                                            const title = project.title;
                                            const description = getLocalizedContent(project.description, locale);
                                            const disclaimer = getLocalizedContent(project.disclaimer, locale);
                                            const features = getLocalizedArray(project.features, locale);
                                            const plannedFeatures = getLocalizedArray(project.plannedFeatures, locale);

                                            return (
                                                <Collapsible
                                                    key={project.id}
                                                    initialCollapsed={index > 0}
                                                    className={"w-full"}
                                                    clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                                    header={
                                                        <div className={"mb-2"}>
                                                            <a className={cn("text-2xl", project.githubLink ? "external-link" : "")}
                                                               href={project.githubLink} target={"_blank"}
                                                               rel="noopener noreferrer">
                                                                {title} {project.status === ProjectStatus.WORK_IN_PROGRESS ?
                                                                <span
                                                                    className={"text-muted-foreground"}>({t("keys.workInProgress")})</span> : ""}
                                                            </a>
                                                        </div>
                                                    }
                                                >
                                                    {description && (
                                                        <div className={"mb-4"}>
                                                            {description}
                                                        </div>
                                                    )}
                                                    {disclaimer && (
                                                        <div className={"mb-4"}>
                                                            {renderDisclaimer(disclaimer)}
                                                        </div>
                                                    )}
                                                    {features.length > 0 && (
                                                        <div className={"mb-4"}>
                                                            {renderFeatures(features, t)}
                                                        </div>
                                                    )}
                                                    {plannedFeatures.length > 0 && (
                                                        <div className={"mb-4"}>
                                                            {renderPlannedFeatures(plannedFeatures, project.status === ProjectStatus.WORK_IN_PROGRESS, t)}
                                                        </div>
                                                    )}
                                                    <div className={"mb-6"}>
                                                        {renderImages(project)}
                                                    </div>
                                                    <div className={"mb-4"}>
                                                        {renderSkills(project.skills)}
                                                    </div>
                                                </Collapsible>
                                            )
                                        })}
                            </div>
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    )
}

export default Projects;