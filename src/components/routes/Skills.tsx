import {groupBy} from "@/lib/utils.ts";
import type {Skill, SkillType} from "@/types/Skill.ts";
import {useTranslation} from "react-i18next";
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import Collapsible from "@/components/Collapsible.tsx";
import skills from "@/data/skills.json";
import {SkillDisplay} from "@/components/SkillDisplay.tsx";

const Skills = () => {

    const skillsByType: Map<SkillType, Skill[]> = groupBy(skills as Skill[], (skill) => skill.type);
    const {t} = useTranslation("skills");

    return (
        <div className={"w-full"}>
            <div className={"mx-6 my-4 lg:mx-[20%] lg:my-6"}>
                <h1 className={"text-3xl mb-4"}>
                    {t("skills.title")}
                </h1>
                <p className={"text-l mb-4"}>
                    {t("skills.intro")}
                </p>
                <div className={"w-full flex flex-col"}>
                    {
                        Array.from(skillsByType)
                            .map(([skillType, skills]) => {
                                return (
                                    <div key={skillType} className={"text-xl w-full"}>
                                        <Collapsible
                                            initialCollapsed={ skillType !== ("language" as SkillType)}
                                            header={
                                                <h2>
                                                    {t(`skills.category.${skillType}`)}
                                                </h2>
                                            }>
                                            <div
                                                className={"flex flex-col flex-nowrap lg:flex-row lg:flex-wrap h-full w-full items-center justify-start"}>
                                                {skills
                                                    // Reverse order
                                                    .sort((b, a) => a.knowledgeLevel - b.knowledgeLevel)
                                                    .map((skill: Skill) => {
                                                        return (
                                                            <div
                                                                className={"flex flex-row items-center justify-start lg:w-1/2 w-full gap-2"}
                                                                key={skill.id}>
                                                                <GenericLogo
                                                                    logoId={skill.id}
                                                                    onClick={() => {
                                                                        if (skill.linkUrl) {
                                                                            window.open(skill.linkUrl, "_blank");
                                                                        }
                                                                    }}
                                                                    className="h-25 border-2 rounded-full box-border transition-all hover:scale-105 m-4 cursor-pointer"
                                                                />
                                                                <SkillDisplay
                                                                    skillName={skill.name}
                                                                    skillPoints={skill.knowledgeLevel}
                                                                    maxSkillPoints={5}
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </Collapsible>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default Skills;