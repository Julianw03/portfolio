import type {Logo} from "@/components/logos/GenericLogo.tsx";

const brandColor = "#0a66c2";

const getBrandColor = () => {
    return brandColor;
}

const getTitle = () => {
    return "LinkedIn";
}

const LinkedInLogo: Logo = {
    getBrandColor,
    getTitle,
    renderComponent: () => {
        return (
            <svg className={"svg-logo"} role="img" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <path fill={brandColor}
                      d="m25.9 0h-23.8c-1.2 0-2.1 0.9-2.1 2v24c0 1.1 0.9 2 2.1 2h23.9c1.1 0 2.1-0.9 2.1-2v-24c-0.1-1.1-1-2-2.2-2zm-17.6 23.9h-4.1v-13.4h4.2v13.4zm-2.1-15.2c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1 2.4-2.4 2.4zm17.7 15.2h-4.1v-6.5c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4v6.6h-4.1v-13.4h4v1.8h0.1c0.6-1 1.9-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4v7.4z"></path>
            </svg>
        )
            ;

    }
}

export default LinkedInLogo;
