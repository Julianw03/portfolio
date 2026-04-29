import {useTranslation} from "react-i18next";
import TextRotation from "@/components/TextRotation.tsx";
import Threads from "@/components/jsrepo/Threads/Threads.tsx";
import {getLocalizedArray, getSanityData} from "@/lib/sanity.ts";
import {Await, useLoaderData} from "react-router";
import type {Whoami} from "@/types/Whoami.ts";
import DefaultFallbackWrapper from "@/components/DefaultFallbackWrapper.tsx";
import Loader from "@/components/Loader.tsx";
import {Suspense} from "react";

const WHOAMI_QUERY = `*[_type == "whoami"]{
  _id,
  "id": id.current,
  title {
    en,
    de
  }
}`;

interface LoaderData {
    whoami: Promise<Whoami[]>;
}

export const loader = async () => {
    const sanityPromise = (async () => {
        const now = Date.now();
        const data = await getSanityData<Whoami[]>(WHOAMI_QUERY)
        const elapsed = Date.now() - now;
        console.debug("[Home] Sanity data fetched in", elapsed, "ms");
        return data;
    })();
    return ({
        whoami: sanityPromise
    }) as LoaderData;
}

const Home = () => {

    const {t, i18n} = useTranslation("home");
    const homeData = useLoaderData<LoaderData>();
    const locale = i18n.language.split('-')[0];


    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={homeData.whoami}>
                {(whoami) => (
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
                                {whoami &&
                                    <TextRotation texts={getLocalizedArray(whoami.slice().map(f => f.title), locale)}
                                                  duration={5_000}/>}
                            </div>
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    )
}

export default Home;