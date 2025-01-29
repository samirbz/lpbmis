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

import AdminSidebar from "../components/AdminSidebar";
import clsx from "clsx";

function AdminLayoutPage() {
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
    <div className="flex h-dvh w-dvw justify-start align-top">
      {/* Overlay */}
      {isOnMobile && mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={closeMobileNav}
        ></div>
      )}

      <AdminSidebar
        // sidebarWidth={sidebarWidth}
        // setSidebarWidth={setSidebarWidth}
        toggleSidebar={toggleSidebar}
      />

      <main
        className={clsx(
          "_layout-outlet flex-1 flex h-dvh justify-start align-top"
        )}
        style={{
          width: navOpen ? `calc(100% - 240px)` : `calc(100% - 74px)`, // Subtract sidebar width from screen width
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayoutPage;
