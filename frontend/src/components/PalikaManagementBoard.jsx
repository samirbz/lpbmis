import React, { memo, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isOnMobileState,
  jwtTokenState,
  palikaState,
  sectorsState,
  userState,
} from "../store/states";
import { fetchSectors } from "../apis/fetchSectors";
import { useQuery } from "@tanstack/react-query";
import { fetchPalika } from "@/apis/fetchPalika";
const tabItems = [
  {
    name: "Manage",
    to: "/manage",
  },
  // {
  //   name: "Drafts",
  //   to: "/details",
  // },
  // {
  //   name: "Requests",
  //   to: "/requests",
  // },
];

function PalikaManagementBoard() {
  const isOnMobile = useRecoilValue(isOnMobileState);
  const jwtToken = useRecoilValue(jwtTokenState);
  const user = useRecoilValue(userState);
  const [palika, setPalika] = useRecoilState(palikaState);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["palika", jwtToken],
    queryFn: () => fetchPalika(jwtToken),
    enabled: true,
    placeholderData: [],
  });

  useEffect(() => {
    if (data) {
      setPalika(data);
    }
  }, [data, setPalika]);

  return (
    <section className="_board flex flex-col w-full h-full md:flex-col border-s-[1px]">
      <header className="_board-header flex flex-col items-start justify-between border-b sticky top-0 bg-white">
        <div className="px-3 py-3 flex justify-between items-center">
          <h1 className="m3-title-large w-full">Overview</h1>
          <div className="flex items-center justify-start text-on-surface"></div>
        </div>
        <div className="flex items-center overflow-x-auto max-w-full">
          <div className="flex items-center overflow-x-auto w-full">
            {tabItems?.map((tab) => {
              return (
                <NavLink
                  key={tab.to}
                  className="h-[48px] px-4 flex items-center text-nowrap hover:text-primary"
                  to={`.${tab.to}`}
                  end={tab.to === "/"}
                >
                  {({ isActive }) => (
                    <div className="flex flex-col align-middle justify-stretch">
                      <p
                        className={`m3-title-small ${
                          isActive ? "text-primary" : ""
                        } `}
                      >
                        {tab.name}
                      </p>
                      <span
                        className={`rounded-ss-full rounded-se-full h-[3px] w-full block ${
                          isActive ? "border-t-[3px] border-primary" : ""
                        }`}
                      ></span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
          <div className="h-12 w-12 flex items-center justify-center">
            <span className="material-symbols-outlined hidden cursor-pointer">
              more_vert
            </span>
          </div>
        </div>
      </header>
      <main className="_board-outlet w-full h-full max-w-full overflow-y-auto ">
        <Outlet />
      </main>
    </section>
  );
}

PalikaManagementBoard.displayName = "PalikaManagementBoard";
export default PalikaManagementBoard;
