import React from "react";
import Button from "./material3/Button";

function ProjectOverviewCard({ project, onClick, forEdit }) {
  return (
    <div className="flex justify-between bg-white p-6 rounded-lg border-[1px] border-gray-100 duration-300">
      <div className="">
        <h3 className="m3-title-medium text-on-surface">{project.name}</h3>
        <p className="m3-body-medium ">
          <span className=" text-gray-500">Project id:</span>{" "}
          {project.project_id}
        </p>
        <p className="m3-body-medium ">
          <span className="text-gray-500">Sector:</span>
          {project.sector_name}
        </p>
        <p className="m3-body-medium ">
          <span className="text-gray-500">Status:</span>
          {project.approval_status}
        </p>
      </div>
      <div className="">
        <Button variant="outlined" onClick={onClick}>
          {forEdit ? "Edit" : "View"}
        </Button>
      </div>
    </div>
  );
}

export default ProjectOverviewCard;
