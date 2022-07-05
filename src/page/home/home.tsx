import React, { useState } from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";

const Home = (props: any) => {
  const _props: any = props;
  console.log("home-------->", props);
  return (
    <div>
      <p>Home</p>
      <div>{JSON.stringify(_props)}</div>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
