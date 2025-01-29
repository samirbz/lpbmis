import React from "react";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../apis/fetchAllProjects";
import ProjectCard from "./ProjectCard";
import ProjectOverviewCard from "./ProjectOverviewCard";

function ProjectOverviewTab() {
  const jwtToken = useRecoilValue(jwtTokenState);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    data: projects,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allProjects", jwtToken],
    queryFn: () => fetchAllProjects(jwtToken),
  });
  return (
    <section className="max-w-4xl p-4">
      <header></header>
      <main>
        {
          <ul className="flex flex-col gap-3 px-4 pt-4">
            {projects?.map((project) => (
              <li key={project.project_id}>
                <ProjectOverviewCard
                  project={project}
                  onClick={() => navigate(`./one/${project.project_id}`)}
                />
              </li>
            ))}
          </ul>
        }
      </main>
    </section>
  );
}

export default ProjectOverviewTab;
