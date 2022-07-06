import * as React from "react";
import Main from "../page/main/main";
import Home from "../page/home/home";
import { useRoutes } from "react-router-dom";
import Time from "../page/time";

let getRoute = () => {
  return [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/time",
          element: <Time />,
        },
      ],
    },
  ];
};

const Route = () => useRoutes(getRoute());

export default Route;
