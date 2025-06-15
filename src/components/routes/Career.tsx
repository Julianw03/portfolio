import CareerItem from "@/components/routes/Career/CareerItem.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

const renderExamples = (count: number) => {
    const heights = ['h-20', 'h-30', 'h-40', 'h-50', 'h-100']; // Tailwind-safe
    const examples = [];
    for (let i = 0; i < Math.max(0, count); i++) {
        examples.push(
            <CareerItem key={i} containerClass={heights[i % heights.length]} active={i === 0}>
                <Avatar className={"h-10"}>
                    <AvatarImage/>
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </CareerItem>
        )
    }
    return examples;
};

const Career = () => {
    return (
        <div className={"w-full h-full flex items-center justify-center relative my-6"}>
            <div className="w-19/20 flex flex-col items-center justify-end gap-0  border-box">
                {renderExamples(10)}
            </div>
        </div>
    );
};

export default Career;