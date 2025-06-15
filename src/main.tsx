import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider} from "react-router";
import Root from "./components/Root.tsx";
import './i18n';
import Home from "@/components/routes/Home.tsx";
import NotFound from "@/components/routes/NotFound.tsx";
import Skills from "@/components/routes/Skills.tsx";
import UnderConstruction from "@/components/routes/UnderConstruction.tsx";
import Imprint from "@/components/Imprint.tsx";
import Projects from "@/components/routes/Projects.tsx";

const router = createHashRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/skills",
                Component: Skills
            },
            {
                path: "/projects",
                Component: Projects
            },
            {
                path: "/career",
                Component: UnderConstruction
            },
            {
                path:  "/about",
                Component: UnderConstruction
            }
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
