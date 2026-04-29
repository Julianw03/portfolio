import {useTranslation} from "react-i18next";

const NotFound = () => {

    const {t} = useTranslation("not-found");

    return (
        <div className={"h-dvh w-dvw flex justify-center items-center flex-col"}>
            <p className={"text-6xl"}>404</p>
            <p className={"text-4xl"}>{t("notfound.title")}</p>
            <p className={"text-xl mt-4 text-center"}>{t("notfound.description")}</p>
        </div>
    )
}

export default NotFound;