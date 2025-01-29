import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRecoilValue, useRecoilState } from "recoil";

import classNames from "classnames/bind";
import AuthContext from "../context/AuthContext";
import {
  isOnMobileState,
  jwtTokenState,
  mobileNavOpenState,
  navOpenState,
  userState,
} from "../store/states";

function LayoutPage() {
  const user = useRecoilValue(userState);
  const [navOpen, setNavOpen] = useRecoilState(navOpenState);
  const isOnMobile = useRecoilValue(isOnMobileState);
  const [mobileNavOpen, setMobileNavOpen] = useRecoilState(mobileNavOpenState);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [sidebarStatus, setSidebarStatus] = useState("opened"); // closed, opened ,minimized
  const jwtToken = useRecoilValue(jwtTokenState); // Get persisted token
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  const toggleSidebar = (newStatus) => {
    if (
      newStatus === "closed" ||
      newStatus === "opened" ||
      newStatus === "minimized"
    ) {
      setSidebarStatus(newStatus);
    } else {
      setSidebarStatus((prev) => (prev === "opened" ? "minimized" : "opened"));
    }
  };

  // Guard against unauthenticated users
  if (!jwtToken) {
    return null;
  }

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="flex h-dvh">
      {/* Overlay */}
      {isOnMobile && mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={closeMobileNav}
        ></div>
      )}

      <Sidebar />

      <main className="_layout-outlet flex-1 flex w-full h-dvh justify-start align-top">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutPage;
