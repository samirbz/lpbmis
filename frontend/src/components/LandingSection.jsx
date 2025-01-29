import React from "react";
import classnames from "classnames/bind";
import styles from "./LandingSection.module.scss";
import Button from "./material3/Button";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectSummary } from "../apis/fetchProjectSummary";

function LandingSection() {
  const navigate = useNavigate();
  const {
    data: projectSummary,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projectSummary"],
    queryFn: () => fetchProjectSummary(),
  });

  return (
    <section className={"landing-section bg-blue-fair-50  min-h-dvh"}>
      <header className={"header py-4 px-3"}>
        <h2 className="m3-title-large">
          PROJECT BANK INFORMATION MANAGEMENT SYSTEM
        </h2>
      </header>
      <main className={"main flex items-center justify-between gap-6 px-3"}>
        <section className=" flex flex-col gap-3 ">
          <p className="text-xl text-gray-700">
            Data inventory for government funded projects
          </p>
          <p className="m3-body-medium text-gray-700">
            The project bank information management system is a platform that
            provides a comprehensive inventory of government funded projects. It
            provides a detailed overview of the projects, their status, and the
            progress of the projects. The system is designed to provide a
            transparent and efficient way to manage government funded projects.
          </p>
        </section>
        <section className="flex items-center gap-5 flex-wrap shrink-0 basis-1/2">
          <div className="flex items-center justify-center p-4 bg-blue-gray-500 rounded-2xl w-min-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-white">
                {projectSummary?.totalProjects}
              </span>
              <span className="m3-label-large uppercase text-white opacity-70">
                Total Projects
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center  p-4 bg-blue-gray-500 rounded-2xl w-min-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-white">
                {projectSummary?.ongoingProjects}
              </span>
              <span className="m3-label-large uppercase text-white opacity-70">
                Ongoing projects
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-blue-fair-300 rounded-2xl w-min-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-white">
                {projectSummary?.futureProjects}
              </span>
              <span className="m3-label-large uppercase text-white opacity-70">
                Future Projects
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className={"activities hidden py-10 px-3"}>
        <Button
          className={"gray"}
          variant="filled"
          style={{
            "--md-filled-button-container-color": "var(--blue-fair-500)",
          }}
          onClick={() => navigate("/login")}
        >
          <div className="flex items-center gap-2">
            Log into system
            <span className="material-symbols-outlined">add</span>
          </div>
        </Button>
      </footer>
    </section>
  );
}

export default LandingSection;
