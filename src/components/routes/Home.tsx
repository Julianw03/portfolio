import whoami from "@/data/whoami.json"
import {useTranslation} from "react-i18next";
import TextRotation from "@/components/TextRotation.tsx";
import Threads from "@/components/jsrepo/Threads/Threads.tsx";

const Home = () => {

    const [t] = useTranslation("home");
    const iterTexts = whoami.map((key) => t(`whoami.keys.${key}`));


    return (
        <>
            <div className={"w-full h-[calc(100dvh-80px)] flex items-center justify-center relative"}>
                <div className={"h-full w-full absolute translate-y-1/4"}>
                    <Threads amplitude={0.5} distance={0}/>
                </div>
                <div className={"h-full w-full flex flex-col items-center justify-center z-1"}>
                    <div className={"flex flex-col items-center justify-center h-fit absolute"}>
                        <p className={"text-xl text-center max-w-md h-fit"}>
                            {
                                t("whoami.description-intro")
                            }
                        </p>
                        <TextRotation texts={iterTexts} duration={5_000}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;