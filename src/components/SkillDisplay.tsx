import {useTranslation} from "react-i18next";
import type {TFunction} from "i18next";

export interface SkillDisplayProps {
    skillName: string;
    skillPoints: number;
    maxSkillPoints: number;
}

const skillLevels = [
    'learning',
    'competent',
    'proficient',
    'advanced',
    'expert'
];

const getSkillLevel = (skillPoints: number, maxSkillPoints: number, t: TFunction): string => {
    const clampedPoints = Math.max(0, Math.min(skillPoints, maxSkillPoints));
    const levelIndex = Math.floor((clampedPoints / maxSkillPoints) * skillLevels.length) - 1;

    return t(`level.${skillLevels[Math.min(levelIndex, skillLevels.length - 1)]}`);
};

export const SkillDisplay = ({ skillName, skillPoints, maxSkillPoints }: SkillDisplayProps) => {
    const { t } = useTranslation("skills");

    const cleanSkillPoints = Math.max(0, Math.min(maxSkillPoints, skillPoints));
    const segments = Array.from({ length: maxSkillPoints });

    return (
        <div className={"w-3/5 h-full flex flex-col items-center justify-center"}>
            <div>
                {skillName}
            </div>
            <div className="flex overflow-hidden rounded-md border border-transparent w-full h-6 my-2">
                {segments.map((_, i) => {
                    const isFilled = i < cleanSkillPoints;
                    return (
                        <div
                            key={i}
                            className={`h-full flex-1 ${isFilled ? 'bg-primary' : 'bg-secondary'}`}
                            style={{
                                clipPath: i === 0
                                    ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' // start segment
                                    : i === maxSkillPoints - 1
                                        ? 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' // end segment
                                        : 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)', // middle segments
                            }}
                        />
                    );
                })}
            </div>
            <div className="h-content flex items-center justify-center text-sm text-primary">
                {getSkillLevel(cleanSkillPoints, maxSkillPoints, t )}
            </div>
        </div>
    );
};