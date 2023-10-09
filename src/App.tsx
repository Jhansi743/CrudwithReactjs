import { createHashRouter, RouterProvider, useParams } from "react-router-dom";
import { routes } from "./Routes/Routes";

const router = createHashRouter(routes);

export default function App() {
return <RouterProvider router={router} />;
}
