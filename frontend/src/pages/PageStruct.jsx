import React from "react";
import { Outlet } from "react-router-dom";
import NavBarHome from "../components/NavBarHome";

function PageStruct() {
  return (
    <>
      <NavBarHome />
      <Outlet />;
    </>
  );
}

export default PageStruct;
