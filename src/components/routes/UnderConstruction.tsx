import {useTranslation} from "react-i18next";

const UnderConstruction = () => {

    const {t} = useTranslation("under-construction");

    return (
        <div className={"w-full h-[calc(100dvh-80px)] w-full flex items-center justify-center relative"}>
            <p>
                {
                    t("message")
                }
            </p>
        </div>
    )
}

export default UnderConstruction;