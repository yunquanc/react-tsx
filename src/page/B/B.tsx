import React, { useState } from "react";
import {
  Outlet,
  Link,
  useRoutes,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import qs from "query-string";

const B = (props: any) => {
  const params = useParams();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id"));

  const _props: any = props;
  console.log("B-------->", params, qs.parse(search));
  return (
    <div>
      <p>B</p>
      <p>search:{params.id}</p>
    </div>
  );
};

export default B;
