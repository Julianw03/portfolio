import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface TextRotationProps {
    duration?: number;
    texts: string[];
}

const TextRotation = ({
                          texts = [""],
                          duration = 3000
                      }: TextRotationProps) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, duration);

        return () => clearInterval(intervalId);
    }, [texts.length, duration]);

    return (
        <div className={"w-100 mt-6 h-content relative flex justify-center items-center text-2xl"}>
            <AnimatePresence>
                <motion.div
                    key={currentTextIndex}
                    className={"absolute h-content w-full text-center"}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{
                        y: {duration: 0.5, ease: "easeInOut"},
                        opacity: {duration: 0.45}
                    }}
                >
                    {texts[currentTextIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TextRotation;