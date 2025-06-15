import {Outlet, ScrollRestoration, useLocation} from "react-router";

const FadeInOutlet = () => {

    const location = useLocation();

    return (
        <>
            <ScrollRestoration/>
            <div className={"fade-in"} key={location.pathname}>
                <Outlet/>
            </div>
        </>
    )
}

export default FadeInOutlet