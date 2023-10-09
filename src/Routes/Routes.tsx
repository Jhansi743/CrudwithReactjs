import * as React from "react";
import Home from "../components/Home";
import Header from "../components/Header";
const routes: any = [
  {
    path: "",
    element: <Header />,
    children: [
      {
        path: "home/list",
        element: <Home />,
      },
      {
        path: "home/list/:id",
        element: <Home />,
      },
    ],
  },
];

export { routes };
