import * as Config from "@/Config.ts";
import {NavLink, useNavigation} from "react-router";
import {cn} from "@/lib/utils.ts";
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
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t} = useTranslation(["common", "root"]);

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    const handleNavLinkClick = (e: MouseEvent) => {
        if (isNavigating) e.preventDefault();
    }

    return (
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
                                            <p className={cn(!isNavigating && "cool-underline hover-scale")}
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
                                                            className={cn(!isNavigating && "cool-underline")}
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
    )
}

export default Header;