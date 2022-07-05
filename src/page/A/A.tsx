import React, { useState } from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import { Button } from "antd";

const A = (props: any) => {
  const _props: any = props;
  console.log("A-------->", props);
  return (
    <div>
      <p>A</p>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default A;
