import * as React from "react";
import Main from "../page/main/main";
import { Route, Routes } from "react-router-dom";
import List from "../page/list";
import Insert from "../page/insert";
const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/insert",
        element: <Insert />,
      },
    ],
  },
];

const randerRouter = (routes: any[]) => {
  const rander =
    routes &&
    routes.map((e: any) => {
      return (
        <Route key={e.path} path={e.path} element={e.element}>
          {e.children ? randerRouter(e.children) : <></>}
        </Route>
      );
    });
  return rander;
};

const Router = () => {
  return <Routes>{randerRouter(routes)}</Routes>;
};

export { Router };
