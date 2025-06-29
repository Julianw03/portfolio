import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Breakpoint, isCssBreakpointOrUp} from "@/hooks/useCssBreakpointOrUp.tsx";

const MobileModal = () => {

    const { t } = useTranslation("mobile");

    const [showModal, setShowModal] = useState(() => !isCssBreakpointOrUp(Breakpoint.LG));

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 z-50">
            <div className="bg-background p-6 rounded-xl shadow-xl max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">
                    {t("title")}
                </h2>
                <p className="text-primary mb-4">
                    {t("message")}
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    className="bg-blue-600 text-primary px-4 py-2 rounded hover:bg-blue-700"
                >
                    {t("continue")}
                </button>
            </div>
        </div>
    )
}

export default MobileModal;