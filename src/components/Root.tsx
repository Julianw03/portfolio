import {NavLink, Link} from "react-router";
import {useTranslation} from "react-i18next";
import {cn} from "@/lib/utils.ts";
import FadeInOutlet from "@/components/FadeInOutlet.tsx";
import externalLinks from "@/data/externalLinks.json"
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import MobileModal from "@/components/MobileModal.tsx";
import * as Config from "@/Config.ts";


import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import ThemeSelector from "@/components/common/ThemeSelector.tsx";
import LanguageSelector from "@/components/common/LanguageSelector.tsx";
import useTheme from "@/hooks/useTheme.tsx";


const Root = () => {
    const {t} = useTranslation(["common", "root"]);

    // Force theme load
    useTheme();

    return (
        <>
            <header className={"w-full fixed grid z-10 top-0 bg-primary-foreground overflow-hidden text-primary"}>
                <div className={"flex h-[80px] w-full"}>
                    <div className={"ml-4 justify-center items-center h-full aspect-square hidden lg:flex"}>
                        {/*<NavLink to={"/"} className={"overflow-hidden flex justify-center items-center h-3/5 w-3/5"}*/}
                        {/*         tabIndex={-1}>*/}
                        {/*    <img className={"object-cover object-center"}*/}
                        {/*         src={"https://picsum.photos/300/300"}*/}
                        {/*    />*/}
                        {/*</NavLink>*/}
                    </div>
                    <div className={"w-full h-full box-border hidden lg:flex"}>
                        {
                            Config.HEADER_LINKS.map((link) => {
                                return (
                                    <div key={link.to} className={"inline-flex h-full"}>
                                        <div className={"static px-4 flex justify-center items-center"}>
                                            <NavLink to={link.to} tabIndex={-1}>
                                                <p className={cn("cool-underline hover-scale")}
                                                   tabIndex={0}>{t(link.label, {ns: "root"})}</p>
                                            </NavLink>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex lg:hidden items-center text-lg ml-[5%] w-full text-primary">
                        <Sheet>
                            <SheetTrigger>
                                <p className={"text-2xl"}>☰</p>
                            </SheetTrigger>
                            <SheetContent side={"left"} className="w-max-[100dvw] w-full">
                                <SheetHeader>
                                    <SheetTitle className={"text-3xl"}>
                                        {t("nav.title", {ns: "root"})}
                                    </SheetTitle>
                                </SheetHeader>
                                {Config.HEADER_LINKS.map((link) => (
                                    <div key={link.to} className="pl-4">
                                        <div className={"w-fit text-xl"}>
                                            <SheetClose asChild>
                                                <NavLink to={link.to} tabIndex={-1}>
                                                        <span
                                                            className={cn("cool-underline dummy-transition")}
                                                            tabIndex={0}>{t(link.label, {ns: "root"})}</span>
                                                </NavLink>
                                            </SheetClose>
                                        </div>
                                    </div>
                                ))}
                                <SheetFooter className={"flex flex-row items-center justify-between"}>
                                    <ThemeSelector className={"w-min-1/5 mx-2 flex-1 flex justify-center"}/>
                                    <LanguageSelector className={"w-min-1/5 mx-2 flex-1 flex justify-center"}/>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <ThemeSelector
                        className={"mx-2 w-min-1/5 justify-center items-center h-full shrink-0 hidden lg:flex"}/>
                    <LanguageSelector
                        className={"mx-2 w-min-1/5 justify-center items-center h-full shrink-0 hidden lg:flex"}/>
                    <div className={"mr-4 justify-center items-center h-full aspect-square hidden lg:flex"}/>
                </div>
            </header>
            <main className="min-h-[100dvh] w-full bg-background pt-[80px] border-box overflow-hidden relative">
                <FadeInOutlet/>
            </main>
            <footer>
                <div
                    className={"w-full h-40 grid grid-rows-[0fr_1fr] grid-flow-col justify-around bg-primary-foreground pt-4"}>
                    <div className={"text-2xl mb-2"}>
                        {t("footer.legal.title", {ns: "root"})}
                    </div>
                    <div>
                        <div className={"w-fit flex items-center"}>
                                <Link to={"/imprint"} target={"_blank"}>
                                    <p className={"cool-underline dummy-transition text-lg"}>{t("footer.legal.imprint", {ns: "root"})}</p>
                                </Link>
                        </div>
                        <div className={"w-fit flex items-center"}>
                            <Link to={`mailto:${Config.EMAIL_ADDRESS_LEGAL}`} target={"_blank"}>
                                <p className={"cool-underline dummy-transition text-lg"}>{t("footer.legal.contact", {ns: "root"})}</p>
                            </Link>
                        </div>
                    </div>
                    <div className={"text-2xl mb-2"}>
                        {t("footer.links.title", {ns: "root"})}
                    </div>
                    <div>
                        {
                            externalLinks.map((link) => {
                                return (
                                    <div key={link.id}>
                                        <div className={"flex items-center flex-row gap-2"}>
                                            <GenericLogo logoId={link.id as ID<unknown>}
                                                         className={"h-[1.125rem] w-[1.125rem]"}/>
                                            <Link to={link.url} target={"_blank"}>
                                                <p className={"cool-underline dummy-transition text-lg"}
                                                   tabIndex={0}>{link.name}</p>
                                            </Link>
                                        </div>
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