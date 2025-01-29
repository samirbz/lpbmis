import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API_ROUTE from "../assets/baseRoute";
import { fetchAssignedProjects } from "../apis/fetchAssignedProjects";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";
import ProjectCard from "./ProjectCard";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Project from "./Project";
import ProjectRequestDetail from "./ProjectRequestDetail";
import ProjectEditDetails from "./ProjectEditDetails";
import ProjectDraftView from "./ProjectDraftView";

function ProjectDraftsTab() {
  const jwtToken = useRecoilValue(jwtTokenState);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["projects", "assigned"],
    queryFn: () => fetchAssignedProjects(jwtToken),
  });

  useEffect(() => {
    const projects = data?.filter(
      (project) => project.approval_status === "DRAFT"
    );

    setProjects(projects);
  }, [data]);

  const selectProject = (projectId) => {
    return projects?.find(
      (project) => project.project_id === parseInt(projectId)
    ); // Ensure matching type
  };

  const handleView = (project) => {
    return <Project project={project} />;
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
    return <ProjectDraftView project={project} />;
  }

  // Render the projects
  return (
    <div>
      <ul className="flex flex-col gap-3 px-4 pt-4">
        {projects?.length == 0 ? (
          <div className="text-center">No projects found</div>
        ) : null}
        {projects?.map((project) => (
          <li key={project.project_id}>
            <ProjectCard
              project={project}
              onClick={() =>
                navigate(`/dashboard/projects/drafts/${project.project_id}`)
              }
              forEdit={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDraftsTab;
