import {cn} from "@/lib/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useTranslation} from "react-i18next";
import {SUPPORTED_LANGUAGES} from "@/Config.ts";


interface LanguageSelectorProps {
    className?: string;
}

const LanguageSelector = (
    {
        className = ""
    }: LanguageSelectorProps) => {


    const {t, i18n} = useTranslation(["common"]);

    const langCode = i18n.language.split('-')[0];

    return (
        <div className={cn( className)}>
            <Select value={langCode} onValueChange={(val) => {
                i18n.changeLanguage(val)
            }}>
                <SelectTrigger>
                    <SelectValue placeholder={t("languages.choose")}></SelectValue>
                </SelectTrigger>
                <SelectContent className={"z-50 text-primary bg-background"}>
                    {
                        SUPPORTED_LANGUAGES.map((lang) => {
                            return (
                                <SelectItem key={lang.code} value={lang.code} className="flex items-center">
                                    <div className="flex items-center gap-2 w-full">
                                        <img
                                            src={`https://flagcdn.com/${lang.flagCode}.svg`}
                                            alt={""}
                                            className="w-5 h-5 rounded-full object-cover"
                                        />
                                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {t(lang.label)}
                                                    </span>
                                    </div>
                                </SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguageSelector;