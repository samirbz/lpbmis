import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { sectorsState } from "../store/states";

function Project({ project }) {
  const { sectors } = useRecoilValue(sectorsState);

  const [projectSector, setProjectSector] = useState(null);
  const [projectSubSector, setProjectSubSector] = useState(null);

  console.log(projectSubSector);
  useEffect(() => {
    if (sectors) {
      setProjectSector(sectors[project?.sector_id]);
      setProjectSubSector(sectors[project?.sub_sector_id]);
    }
  }, [sectors]);
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900">{project.name}</h2>

      {/* General Information */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          General Information
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Project ID:</strong>{" "}
            {project.project_id}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Nepali Name:</strong>{" "}
            {project.nepali_name}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Description:</strong>{" "}
            {project.description}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Approval Status:
            </strong>{" "}
            {project.approval_status}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Status:</strong>{" "}
            {project.status}
          </p>
        </div>
      </div>

      {/* Sector Information */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Sector Information
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Sector:</strong>{" "}
            {project.sector_name || project.sector_id}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Sub-Sector:</strong>{" "}
            {projectSubSector || project.sub_sector_id}
          </p>
        </div>
      </div>

      {/* Implementation Details */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Implementation Details
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">
              Implementation Area:
            </strong>{" "}
            {project.implementation_area}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Implementation Wards:
            </strong>{" "}
            {project.implementation_wards?.join(", ")}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Implementation Method:
            </strong>{" "}
            {project.implementation_method}
          </p>
        </div>
      </div>

      {/* Budget Details */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">Budget Details</p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Total Budget:</strong>{" "}
            {project.budget}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Annual Allocation:
            </strong>{" "}
            {project.annual_allocation}
          </p>
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">Beneficiaries</p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Total Houses:</strong>{" "}
            {project.beneficiaries_total_houses}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Total Population:
            </strong>{" "}
            {project.beneficiaries_population}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Dalit:</strong>{" "}
            {project.beneficiaries_dalit}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Indigenous:</strong>{" "}
            {project.beneficiaries_indigenous}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Janajati:</strong>{" "}
            {project.beneficiaries_janajati}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Male:</strong>{" "}
            {project.beneficiaries_male}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Female:</strong>{" "}
            {project.beneficiaries_female}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Differently Abled:
            </strong>{" "}
            {project.beneficiaries_diff_abled}
          </p>
        </div>
      </div>

      {/* Responsible Officer */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Responsible Officer
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Name:</strong>{" "}
            {project.responsible_officer_name}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Contact:</strong>{" "}
            {project.responsible_officer_contact}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Email:</strong>{" "}
            {project.responsible_officer_email}
          </p>
        </div>
      </div>

      {/* Objectives and Outcomes */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Objectives and Outcomes
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">Objectives:</strong>{" "}
            {project.objectives}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Expected Outcomes:
            </strong>{" "}
            {project.expected_outcomes}
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Additional Information
        </p>
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-gray-700">
              Priority Code:
            </strong>{" "}
            {project.priority_code}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Project Nature:
            </strong>{" "}
            {project.project_nature}
          </p>
          <p>
            <strong className="font-medium text-gray-700">SDG Code:</strong>{" "}
            {project.sdg_code}
          </p>
          <p>
            <strong className="font-medium text-gray-700">SDG Name:</strong>{" "}
            {project.sdg_name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Project;
