import {groupBy} from "@/lib/utils.ts";
import type {Skill, SkillType} from "@/types/Skill.ts";
import {useTranslation} from "react-i18next";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import Collapsible, {ClickListenerLocation} from "@/components/common/Collapsible.tsx";
import {SkillDisplay} from "@/components/SkillDisplay.tsx";
import {getSanityData} from "@/lib/sanity.ts";
import {Await, useLoaderData} from "react-router";
import DefaultFallbackWrapper from "@/components/DefaultFallbackWrapper.tsx";
import Loader from "@/components/Loader.tsx";
import {Suspense} from "react";

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc, knowledgeLevel desc) {
  "id": id.current,
  name,
  linkUrl,
  type,
  knowledgeLevel
}`;

interface LoaderData {
    skills: Promise<Skill[]>;
}

export const loader = () => {
    const sanityPromise = (async () => {
        const now = Date.now();
        const data = await getSanityData<Skill[]>(SKILLS_QUERY)
        const elapsed = Date.now() - now;
        console.debug("[Projects] Sanity data fetched in", elapsed, "ms");
        return data;
    })();
    return ({
        skills: sanityPromise
    }) as LoaderData;
}

const Skills = () => {
    const skillData = useLoaderData<LoaderData>();
    const {t} = useTranslation("skills");

    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={skillData.skills}>
                {(skills) => (
                    <div className="w-full">
                        <div className="mx-6 my-4 lg:mx-[20%] lg:my-6">
                            <h1 className="text-3xl mb-4">{t("skills.title")}</h1>
                            <p className="text-l mb-4">{t("skills.intro")}</p>
                            <div className="w-full flex flex-col">
                                {Array.from(groupBy(skills, (skill) => skill.type)).map(([skillType, skills]) => {
                                    return (
                                        <div key={skillType} className="text-xl w-full">
                                            <Collapsible
                                                initialCollapsed={skillType !== ("language" as SkillType)}
                                                clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                                header={<h2>{t(`skills.category.${skillType}`)}</h2>}
                                            >
                                                <div
                                                    className="flex flex-col flex-nowrap lg:flex-row lg:flex-wrap h-full w-full items-center justify-start">
                                                    {skills
                                                        .sort((b, a) => a.knowledgeLevel - b.knowledgeLevel)
                                                        .map((skill: Skill) => {
                                                            return (
                                                                <div
                                                                    className="flex flex-row items-center justify-start lg:w-1/2 w-full gap-2"
                                                                    key={skill.id}
                                                                >
                                                                    <GenericLogo
                                                                        logoId={skill.id}
                                                                        onClick={() => {
                                                                            if (skill.linkUrl) {
                                                                                window.open(skill.linkUrl, "_blank");
                                                                            }
                                                                        }}
                                                                        className="lg:h-25 h-20 border-2 rounded-full box-border transition-all hover:scale-105 m-4 cursor-pointer"
                                                                    />
                                                                    <SkillDisplay
                                                                        skillName={skill.name}
                                                                        skillPoints={skill.knowledgeLevel}
                                                                        maxSkillPoints={5}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </Collapsible>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )
                }
            </Await>
        </Suspense>
    );
};


export default Skills;