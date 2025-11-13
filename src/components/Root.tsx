import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import FadeInOutlet from "@/components/common/FadeInOutlet.tsx";
import externalLinks from "@/data/externalLinks.json"
import GenericLogo from "@/components/logos/GenericLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import MobileModal from "@/components/MobileModal.tsx";
import * as Config from "@/Config.ts";


import useTheme from "@/hooks/useTheme.tsx";
import Header from "@/components/Header.tsx";


const Root = () => {

    // Force theme load
    useTheme();

    const {t} = useTranslation(["common", "root"]);

    return (
        <>
            <Header/>
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