import React from "react";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Project from "./Project";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProjects } from "../apis/fetchAllProjects";
import { fetchAProject } from "../apis/fetchAProject";
import Button from "./material3/Button";
import { useForm } from "react-hook-form";
import { prepareProject } from "../apis/prepareProject";
import { toast } from "react-toastify";

function ProjectDraftView({ project }) {
  const jwtToken = useRecoilValue(jwtTokenState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projectData = project;
  console.log(projectData.nepali_name);

  const {
    register,
    handleSubmit,
    trigger, // Manually trigger validation
    getValues, // Get form values,
    formState: { isValid }, // Tracks if all fields are valid
  } = useForm({
    mode: "onChange", // Validate on every change
    defaultValues: {
      project_id: projectData?.project_id || null,
      name: projectData?.name || "",
      nepali_name: projectData?.nepali_name || "",
      description: projectData?.description || null,
      approval_status: projectData?.approval_status || "DRAFT", // Default value: "DRAFT"
      status: projectData?.status || "NEW_OR_UPCOMING",
      sector_id: projectData?.sector_id || null,
      sub_sector_id: projectData?.sub_sector_id || null,
      implementation_area: projectData?.implementation_area || "",
      implementation_wards: projectData?.implementation_wards || [], // Array of integers
      budget: projectData?.budget || null,
      annual_allocation: projectData?.annual_allocation || null,
      budget_cycle_type: projectData?.budget_cycle_type || "ANNUAL", // Default enum: ["ANNUAL", "TERM_BASED"]
      budget_term_period: projectData?.budget_term_period || null, // Conditional based on budget_cycle_type
      beneficiaries_total_houses: projectData?.beneficiaries_total_houses || 0, // Non-negative integer
      beneficiaries_population: projectData?.beneficiaries_population || 0, // Non-negative integer
      beneficiaries_dalit: projectData?.beneficiaries_dalit || 0, // Non-negative integer
      beneficiaries_indigenous: projectData?.beneficiaries_indigenous || 0, // Non-negative integer
      beneficiaries_janajati: projectData?.beneficiaries_janajati || 0, // Non-negative integer
      beneficiaries_male: projectData?.beneficiaries_male || 0, // Non-negative integer
      beneficiaries_female: projectData?.beneficiaries_female || 0, // Non-negative integer
      beneficiaries_diff_abled: projectData?.beneficiaries_diff_abled || 0, // Non-negative integer
      objectives: projectData?.objectives || "",
      expected_outcomes: projectData?.expected_outcomes || "",
      responsible_officer_name: projectData?.responsible_officer_name || "",
      responsible_officer_contact:
        projectData?.responsible_officer_contact || "",
      responsible_officer_email: projectData?.responsible_officer_email || "",
      implementation_method: projectData?.implementation_method || "",
      prepared_by: projectData?.prepared_by || null, // Foreign key
      submitted_by: projectData?.submitted_by || null, // Foreign key
      approved_by: projectData?.approved_by || null, // Foreign key
      entry_by: projectData?.entry_by || null, // foreign key
      associated_documents: projectData?.associated_documents || null, // Optional
      requested_by: projectData?.requested_by || "",
      sdg_code: projectData?.sdg_code || null, // integer
      sdg_name: projectData?.sdg_name || "",
      gender_code: projectData?.gender_code || 3, // Default integer: [1, 2, 3]
      climate_code: projectData?.climate_code || 3, // Default integer: [1, 2, 3]
      strategic_code: projectData?.strategic_code || "",
      priority_code: projectData?.priority_code || "P2", // Default enum: ["P1", "P2"]
      project_nature: projectData?.project_nature || "GENERAL", // Default enum
      inception_status: projectData?.inception_status || null, // Conditional based on `status`
      priority: projectData?.priority || null,
      selection_status: String(projectData?.selection_status) || "false", // Default: false
      selected_date: projectData?.selected_date || null, // Conditional based on `selection_status`
      selected_by: projectData?.selected_by || null, // Conditional based on `selection_status`
      selection_document: projectData?.selection_document || null,
      funding_source: projectData?.funding_source || "SELF", // Default enum
      funding_policy: projectData?.funding_policy || null, // Conditional based on `funding_source`
      start_date: projectData?.start_date || null, // Conditional based on `funding_source`
      end_date: projectData?.end_date || null, // Conditional based on `funding_source`
    },
  });

  const onSubmit = () => {
    const payload = { projectId: projectData.project_id };
    prepareProject({ payload, jwtToken })
      .then(() => {
        queryClient.invalidateQueries(["projects", "assigned"]);
        toast.success("Project prepared successfully!");
        navigate("./"); // Navigate to a different page on success if needed
      })
      .catch((error) => {
        toast.error(`Error preparing project: ${error.message}`);
      });
  };

  if (!project) {
    return <div>Choose a project. Project not found</div>;
  }

  return (
    <section className="_project-details relative h-full overflow-auto">
      <header className="flex items-center justify-between px-3 py-3 bg-white border-b-[1px] sticky top-0">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined hover:text-primary cursor-pointer"
            onClick={() => navigate("./")}
          >
            arrow_back
          </span>
          <span className="m3-label-large">{"Project Details"}</span>
        </div>
        <div className="flex items-center gap-2">
          {<Button variant="outlined">Edit</Button>}
          {isValid ? (
            <Button variant="filled" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          ) : null}
        </div>
      </header>
      <div className="wrapper">
        <Project project={project} />
      </div>
    </section>
  );
}

export default ProjectDraftView;
