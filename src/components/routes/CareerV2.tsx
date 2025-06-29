import useCssBreakpointOrUp, {Breakpoint} from "@/hooks/useCssBreakpointOrUp.tsx";
import CareerItemV2 from "@/components/routes/Career/CareerItemV2.tsx";
import career from "@/data/career.json";
import type {CareerDataEntry} from "@/types/Career.ts";

const CareerV2 = () => {

    const isLgUp = useCssBreakpointOrUp(Breakpoint.LG);

    return (
        <div className={"w-full h-full flex items-center justify-center relative my-6"}>
            <div className="w-19/20 flex flex-col items-center justify-end gap-0  border-box">
                {
                    [...career]
                        .reverse()
                        .map((careerData, index) => (
                            <CareerItemV2 key={index}
                                          careerData={careerData as unknown as CareerDataEntry}
                                          display={(index % 2 === 1) ? "left" : "right"}
                                          active={careerData.endDate === null}
                                          mobileBreakpointReached={!isLgUp}
                                          containerClass={"h-36"}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default CareerV2;