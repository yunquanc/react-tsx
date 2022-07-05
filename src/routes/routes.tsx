import * as React from "react";
import Main from "../page/main/main";
import Home from "../page/home/home";
import { useRoutes } from "react-router-dom";
import A from "../page/A/A";
import B from "../page/B/B";

let getRoute = () => {
  return [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/home",
          element: <Home />,
          children: [
            { path: "/home/:id/a", element: <A /> },
            { path: "/home/:id/b", element: <B /> },
          ],
        },
      ],
    },
  ];
};

const Route = () => useRoutes(getRoute());

export default Route;
