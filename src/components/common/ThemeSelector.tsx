import useTheme from "@/hooks/useTheme.tsx";
import {cn} from "@/lib/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useTranslation} from "react-i18next";

interface ThemeSelectorProps {
    className?: string;
}

const ThemeSelector = (
    {
        className = "",
    }: ThemeSelectorProps
) => {

    const [theme, setTheme] = useTheme();
    const {t} = useTranslation("common");

    return (
        <div className={cn(className)}>
            <Select value={theme as string} onValueChange={(val) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setTheme(val);
            }}>
                <SelectTrigger>
                    <SelectValue placeholder={t("languages.choose")}></SelectValue>
                </SelectTrigger>
                <SelectContent className={"z-50 text-primary bg-background"}>
                    <SelectItem value={'system'} className="w-full">
                        {t("themes.system")}
                    </SelectItem>
                    <SelectItem value={'light'} className="w-full">
                        {t("themes.light")}
                    </SelectItem>
                    <SelectItem value={'dark'} className="w-full">
                        {t("themes.dark")}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default ThemeSelector;