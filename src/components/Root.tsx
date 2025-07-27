import {NavLink, useNavigation} from "react-router";
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

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    const handleNavLinkClick = (e: MouseEvent) => {
        if (isNavigating) e.preventDefault();
    }

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
                                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                                {/*@ts-expect-error*/}
                                                <NavLink to={link.to} tabIndex={-1} onClick={handleNavLinkClick}>
                                                        <span
                                                            className={cn(!isNavigating && "cool-underline", "transition-all")}
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
                    <div className={"mr-4 flex justify-center items-center h-full aspect-square hidden lg:flex"}/>
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
                            <NavLink to={`mailto:${Config.EMAIL_ADDRESS_LEGAL}`} target={"_blank"}>
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
                                        <NavLink to={link.url} target={"_blank"}
                                                 className={"flex items-center gap-2  grayscale-100 hover:grayscale-0 transition-grayscale duration-250 ease-in-out cool-underline"}>
                                            <GenericLogo logoId={link.id as ID<unknown>}
                                                         className={"h-[1.125rem] w-[1.125rem]"}/>
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