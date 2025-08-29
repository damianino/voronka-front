import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import Index from "./pages/Index.tsx";
import CasinoPage from "./pages/CasinoPage/index.tsx";
import StreamPage from "./pages/StreamPage/index.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
    {
        path: "/kazik",
        element: <CasinoPage/>,
    },
    {
        path: "/stream",
        element: <StreamPage/>,
    },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
    <RouterProvider router={router} />
);
