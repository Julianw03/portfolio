import {NavLink, useNavigation} from "react-router";
import {useTranslation} from "react-i18next";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import useTheme from "@/hooks/useTheme.tsx";
import {cn} from "@/lib/utils.ts";
import FadeInOutlet from "@/components/FadeInOutlet.tsx";
import externalLinks from "@/data/externalLinks.json"
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import MobileModal from "@/components/MobileModal.tsx";

interface SimpleLink {
    to: string
    label: string
}

const links: SimpleLink[] = [
    {to: "/", label: "nav.home"},
    {to: "/skills", label: "nav.skills"},
    {to: "/projects", label: "nav.projects"},
    // {to: "/career", label: "nav.career"},
    // {to: "/about", label: "nav.about"},
];

const languages = [
    {code: 'en', flagCode: 'gb', label: 'languages.en'},
    {code: 'de', flagCode: 'de', label: 'languages.de'}
];

const Root = () => {
    const {t, i18n} = useTranslation(["common", "root"]);

    const [theme, setTheme] = useTheme();

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    const langCode = i18n.language.split('-')[0];

    const handleNavLinkClick = (e: MouseEvent) => {
        if (isNavigating) e.preventDefault();
    }

    return (
        <>
            <header className={"w-full fixed grid z-10 top-0 bg-primary-foreground overflow-hidden text-primary"}>
                <div className={"flex h-[80px] w-full"}>
                    <div className={"ml-4 flex justify-center items-center h-full aspect-square hidden md:flex"}>
                        {/*<NavLink to={"/"} className={"overflow-hidden flex justify-center items-center h-3/5 w-3/5"}*/}
                        {/*         tabIndex={-1}>*/}
                        {/*    <img className={"object-cover object-center"}*/}
                        {/*         src={"https://picsum.photos/300/300"}*/}
                        {/*    />*/}
                        {/*</NavLink>*/}
                    </div>
                    <div className={"w-full h-full box-border pl-5 hidden md:flex"}>
                        {
                            links.map((link) => {
                                return (
                                    <div key={link.to} className={"inline-flex h-full"}>
                                        <div className={"static px-4 flex justify-center items-center"}>
                                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                            {/*@ts-expect-error*/}
                                            <NavLink to={link.to} tabIndex={-1} onClick={handleNavLinkClick}>
                                                <p className={cn(!isNavigating && "cool-underline hover:scale-105", "transition-all")}
                                                   tabIndex={0}>{t(link.label, {ns: "root"})}</p>
                                            </NavLink>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex md:hidden items-center text-lg ml-4 w-full text-primary">
                        {
                            //TODO: // Implement a mobile menu toggle here
                        }
                        <button>☰</button>
                    </div>
                    <div className={"mx-2 w-min-1/5 flex justify-center items-center h-full shrink-0"}>
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
                    <div className={"mx-2 w-min-1/5 flex justify-center items-center h-full shrink-0"}>
                        <Select value={langCode} onValueChange={(val) => {
                            i18n.changeLanguage(val)
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("languages.choose")}></SelectValue>
                            </SelectTrigger>
                            <SelectContent className={"z-50 text-primary bg-background"}>
                                {
                                    languages.map((lang) => {
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
                    <div className={"mr-4 flex justify-center items-center h-full aspect-square hidden md:flex"}/>
                </div>
            </header>
            <main className="min-h-[100dvh] w-full bg-background pt-[80px] border-box overflow-hidden relative">
                <FadeInOutlet/>
            </main>
            <footer>
                <div
                    className={"w-full min-h-40 flex flex-row items-center justify-evenly relative bg-primary-foreground text-primary"}>
                    <div className={"flex flex-col items-start justify-center"}>
                        <div className={"text-2xl mb-4"}>
                            {t("footer.legal.title", {ns: "root"})}
                        </div>
                        <div>
                            <NavLink to={"/imprint"} target={"_blank"}>
                                <p className={"cool-underline text-lg"}>{t("footer.legal.imprint", {ns: "root"})}</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to={"mailto:woelkjulian+applications@gmail.com"} target={"_blank"}>
                                <p className={"cool-underline text-lg"}>{t("footer.legal.contact", {ns: "root"})}</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className={"flex flex-col items-start justify-center h-full gap-1"}>
                        <div className={"text-2xl mb-4"}>
                            {t("footer.links.title", {ns: "root"})}
                        </div>
                        {
                            externalLinks.map((link) => {
                                return (
                                    <div key={link.id} className={""}>
                                        <NavLink to={link.url} target={"_blank"} className={"flex items-center gap-2  grayscale-100 hover:grayscale-0 transition-grayscale duration-250 ease-in-out cool-underline pr-1"}>
                                            <GenericLogo logoId={link.id as ID<unknown>} className={"h-[1.125rem] w-[1.125rem]"} />
                                            <p className={"text-lg"}>{link.name}</p>
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </footer>
            <MobileModal/>
        </>
    )
}

export default Root;