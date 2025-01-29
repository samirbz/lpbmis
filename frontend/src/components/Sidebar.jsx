import React, { memo, useContext, useState } from "react";
import classNames from "classnames/bind";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import sidebarItems from "../assets/data/sidebar.json";
import sidebarBottomItems from "../assets/data/sidebarBottom.json";
import AuthContext from "../context/AuthContext";

import LocaleContext from "../context/LocaleContext";
import clsx from "clsx";
import {
  isOnMobileState,
  mobileNavOpenState,
  navOpenState,
  userState,
} from "../store/states";
import { Link, NavLink } from "react-router-dom";
import Button from "./material3/Button";

function Sidebar({ toggleSidebar }) {
  const user = useRecoilValue(userState);
  const [navOpen, setNavOpen] = useRecoilState(navOpenState);
  const isOnMobile = useRecoilValue(isOnMobileState);
  const [mobileNavOpen, setMobileNavOpen] = useRecoilState(mobileNavOpenState);
  const [expanded, setExpanded] = useState(null);
  const { userRole } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);

  const handleToggle = (newStatus) => {
    toggleSidebar(newStatus);
  };

  const handleExpand = (id) => {
    if (id === expanded) {
      setExpanded("nothing");
    } else {
      setExpanded(id);
    }
  };

  const toggleNav = () => setNavOpen((b) => !b);

  return (
    <nav
      className={clsx(
        "_sidebar sticky top-0 min-h-dvh h-fit bg-white min-w-[72px] border-e-[1px] duration-300 md:w-[250px] md:absolute md:z-50 md:h-full overflow-auto flex justify-start flex-col",
        navOpen ? "w-[240px] shrink-0" : "w-[74px] md:w-full",
        mobileNavOpen ? "w-[240px] shrink-0" : "md:-translate-x-[250px]"
      )}
    >
      <div
        className={clsx("relative w-auto flex flex-col md:w-full", {
          "w-auto": !navOpen,
        })}
      >
        <div
          className={clsx("flex justify-between items-center duration-300", {
            "w-auto md:w-full": !navOpen,
          })}
        >
          <Link
            className={clsx(
              "flex justify-start items-center mx-auto py-3 gap-3 mr-auto"
            )}
            to="/"
          >
            LPBMIS
          </Link>
          <Button
            variant="text"
            className="hidden items-center px-0 py-0 me-3 justify-center md:flex"
            onClick={() => setMobileNavOpen(false)}
          >
            <span className="material-symbols-outlined py-0 pt-1 px-3 cursor-pointer text-[#1C1B1F]">
              close
            </span>
          </Button>
        </div>

        {!mobileNavOpen && (
          <div className="py-2 px-3 flex flex-row justify-start">
            <Button className="px-0 py-0" variant="text" onClick={toggleNav}>
              <span className="material-symbols-outlined py-2 px-3 cursor-pointer">
                menu
              </span>
            </Button>
          </div>
        )}
        <ul className="overflow-auto">
          {sidebarItems.map((item, index) => {
            return (
              <li key={`${item.name}${index}`}>
                <Tab item={item} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="_bottom-menu grow flex flex-col justify-end">
        <ul className="overflow-auto">
          {sidebarBottomItems.map((item, index) => {
            return (
              <li key={`${item.name}${index}`}>
                <Tab item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const Tab = memo(({ item }) => {
  const navOpen = useRecoilValue(navOpenState);
  const setMobileNavOpen = useSetRecoilState(mobileNavOpenState);

  const onClick = () => {
    setMobileNavOpen(false);
  };

  return (
    <NavLink
      onClick={onClick}
      className={({ isActive }) =>
        clsx(" inline-flex items-center justify-stretch px-3 py-2 h-[60px]", {
          "w-full": navOpen,
        })
      }
      to={item.to}
      end={item.to === "/dashboard"}
    >
      {({ isActive }) => (
        <Button
          className={clsx("px-5", {
            "px-3 py-2 w-[48px]": !navOpen,
            "cursor-auto ": isActive,
          })}
          variant={isActive ? "tonal" : "text"}
          style={
            isActive
              ? { "--md-filled-tonal-button-label-text-color": "#6464E6" }
              : { "--md-text-button-label-text-color": "#1C1B1F" }
          }
        >
          <div
            className={clsx("flex flex-row items-center gap-1 duration-300", {
              "px-0 py-0 block": navOpen,
            })}
          >
            <span
              className={clsx("material-symbols-outlined", {
                "px-0": !navOpen,
              })}
              style={
                isActive
                  ? {
                      fontVariationSettings: "'FILL' 1",
                    }
                  : {}
              }
            >
              {item.icon}
            </span>

            {navOpen && <span className="capitalize">{item.name}</span>}
          </div>
        </Button>
      )}
    </NavLink>
  );
});

Tab.displayName = "Tab";

export default Sidebar;
