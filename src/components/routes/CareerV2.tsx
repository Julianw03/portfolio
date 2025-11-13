import useCssBreakpointOrUp, {Breakpoint} from "@/hooks/useCssBreakpointOrUp.tsx";
import CareerItemV2 from "@/components/routes/Career/CareerItemV2.tsx";
import {getSanityData} from "@/lib/sanity.ts";
import type {CareerDataEntry} from "@/types/Career.ts";
import {Await, useLoaderData} from "react-router";
import {Suspense} from "react";
import Loader from "@/components/Loader.tsx";
import DefaultFallbackWrapper from "@/components/DefaultFallbackWrapper.tsx";
import type {Resolved} from "@/types/Shared.ts";

const CAREER_QUERY = `*[_type == "careerEntry"] | order(startDate desc) {
  "id": id.current,
  position,
  company->,
  startDate,
  endDate,
  responsibilities,
  special_achievements
}`;

interface LoaderData {
    career: Promise<Resolved<CareerDataEntry>[]>;
}

export const loader = (): LoaderData => {
    const sanityPromise = (async () => {
        const now = Date.now();
        const data = await getSanityData<Resolved<CareerDataEntry>[]>(CAREER_QUERY);
        const elapsed = Date.now() - now;
        console.debug("[CareerV2] Sanity data fetched in", elapsed, "ms");
        return data;
    })();
    return {career: sanityPromise};
};


const CareerV2 = () => {
    const careerData = useLoaderData<LoaderData>();
    const isLgUp = useCssBreakpointOrUp(Breakpoint.LG);

    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={careerData.career}>
                {(data) => (
                    <div className="w-full h-full flex items-center justify-center relative fade-in">
                        <div
                            className="w-full flex h-fit flex-col items-center justify-end gap-0 border-box mx-4 my-6 lg:mx-[10%] lg:my-6">
                            {
                                data.map((careerData, index) => (
                                    <CareerItemV2
                                        key={careerData.id}
                                        careerData={careerData}
                                        display={index % 2 === 1 ? "left" : "right"}
                                        active={careerData.endDate === null}
                                        collapsed={index === data.length - 1}
                                        mobileBreakpointReached={!isLgUp}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    )
}

export default CareerV2;