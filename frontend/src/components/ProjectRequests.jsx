import React from "react";
import { useQuery } from "@tanstack/react-query";
import API_ROUTE from "../assets/baseRoute";
import { fetchAssignedProjects } from "../apis/fetchAssignedProjects";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";
import ProjectCard from "./ProjectCard";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Project from "./Project";
import ProjectRequestDetail from "./ProjectRequestDetail";

function ProjectRequests() {
  const jwtToken = useRecoilValue(jwtTokenState);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["assignedProjects", jwtToken],
    queryFn: () => fetchAssignedProjects(jwtToken),
  });

  const projects = data?.filter(
    (project) => project.approval_status != "DRAFT"
  );

  const selectProject = (projectId) => {
    return projects?.find(
      (project) => project.project_id === parseInt(projectId)
    ); 
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (projectId) {
    const project = selectProject(projectId);
    if (!project) {
      return <div>Project not found!</div>;
    }
    return <ProjectRequestDetail project={project} />;
  }

  // Render the projects
  return (
    <div className="_project-requests">
      <ul className="flex flex-col gap-3 px-4 pt-4">
        {projects?.map((project) => (
          <li key={project.project_id}>
            <ProjectCard
              project={project}
              onClick={() => navigate(`./${project.project_id}`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectRequests;
