import React from "react";
import Button from "./material3/Button";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";

function PublicLayoutPage() {
  const navigate = useNavigate();
  const match = useMatch("/login");

  return (
    <section className={"flex flex-col bg-blue-fair-50  min-h-dvh"}>
      <nav className="_navbar sticky top-0 flex items-center justify-between shadow-md p-2">
        <div className="_brand flex items-center justify-start">
          <figure onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src="/images/emblem.png"
              alt="Project Bank Information Management System"
            />
          </figure>
          <h1 className="m3-title-large">LPBMIS</h1>
        </div>
        <div className="flex items-center justify-evenly gap-4">
          <div className="">
            <Link to="/login" className="">
              User manual
            </Link>
          </div>
          <div className="flex">
            {match ? null : (
              <Button
                className="gray"
                variant="filled"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </section>
  );
}

export default PublicLayoutPage;
