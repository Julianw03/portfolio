import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router";
import Root from "./components/Root.tsx";
import './i18n';
import Home, {loader as HomeLoader} from "@/routes/Home.tsx";
import NotFound from "@/routes/NotFound.tsx";
import Skills, {loader as SkillsLoader} from "@/routes/Skills.tsx";
import Imprint from "@/components/Imprint.tsx";
import Projects, {loader as ProjectsLoader} from "@/routes/Projects.tsx";
import CareerV2, {loader as CareerV2Loader} from "@/routes/CareerV2.tsx";

const router = createHashRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                Component: Home,
                loader: HomeLoader,
            },
            {
                path: "/skills",
                Component: Skills,
                loader: SkillsLoader
            },
            {
                path: "/projects",
                Component: Projects,
                loader: ProjectsLoader
            },
            {
                path: "/career",
                Component: CareerV2,
                loader: CareerV2Loader
            },
            // {
            //     path:  "/about",
            //     Component: About
            // }
        ]
    },
    {
        path: "/imprint",
        Component: Imprint
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
