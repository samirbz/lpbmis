import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Nepali from "nepalify-react";
import Button from "./material3/Button";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { jwtTokenState, sectorsState, userState } from "../store/states";
import { useNavigate } from "react-router-dom";
import { saveDraftProject } from "../apis/saveDraftProject";
import { submitProject } from "../apis/submitProject";
import { prepareProject } from "../apis/prepareProject";
import { SDG_OBJECT } from "../assets/constants/sdg";

const ProjectEditDetails = ({ project }) => {
  const jwtToken = useRecoilValue(jwtTokenState);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const sectors = useRecoilValue(sectorsState);
  const [subSectors, setSubSectors] = useState([]); // State for sub-sectors
  const [selectedSDG, setSelectedSDG] = useState("");

  // Update sub-sectors dynamically when the sector changes
  const handleSectorChange = (event) => {
    const sectorId = event.target.value;
    const selectedSector = sectors?.find(
      (sector) => sector.id === parseInt(sectorId, 10)
    );
    setSubSectors(selectedSector ? selectedSector.SubSectors : []);
  };

  const handleSDGChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedSDG(selectedCode);
    console.log("code changed");
    if (SDG_OBJECT[selectedCode]) {
      setValue("sdg_code", selectedCode); // Set the SDG Code
      setValue("sdg_name", SDG_OBJECT[selectedCode].name); // Set the SDG Name
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project?.name || "",
      nepali_name: project?.nepali_name || "",
      description: project?.description || "",
      status: project?.status || "",
      sector_id: project?.sector_id || "",
      implementation_area: project?.implementation_area || "",
      budget_total_cost: project?.budget_total_cost || "",
      budget_annual_allocation: project?.budget_annual_allocation || "",
      time_period: project?.time_period || "",
      beneficiaries: project?.beneficiaries || "",
      objectives: project?.objectives || "",
      expected_outcomes: project?.expected_outcomes || "",
      responsible_officer_name: project?.responsible_officer_name || "",
      responsible_officer_contact: project?.responsible_officer_contact || "",
      responsible_officer_email: project?.responsible_officer_email || "",
      priority_code: project?.priority_code || "",
      prepared_by: project?.prepared_by || "",
      submitted_by: project?.submitted_by || "",
      approved_by: project?.approved_by || "",
      entry_by: project?.entry_by || "",
      requested_by: project?.requested_by || "",
      sdg_code: project?.sdg_code || "",
      sdg_name: project?.sdg_name || "",
      gender_code: project?.gender_code || "",
      climate_code: project?.climate_code || "",
      strategic_code: project?.strategic_code || "",
      project_nature: project?.project_nature || "",
      budget_code: project?.budget_code || "",
      implementation_method: project?.implementation_method || "",
      inception_status: project?.inception_status || "",
      project_id: project?.project_id || null,
    },
  });

  const nepaliName = watch("nepali_name");

  const selectedSectorId = watch("sector_id");

  // Load initial sub-sectors when the component mounts or when `sector_id` changes
  useEffect(() => {
    if (selectedSectorId) {
      const selectedSector = sectors.find(
        (sector) => sector.id === parseInt(selectedSectorId, 10)
      );
      setSubSectors(selectedSector ? selectedSector.SubSectors : []);
    }
  }, [selectedSectorId, sectors]);

  useEffect(() => {
    if (project?.sdg_code) {
      setSelectedSDG(project.sdg_code); // Set the selected SDG
      setValue("sdg_code", project.sdg_code); // Set the sdg_code in form
      setValue("sdg_name", SDG_OBJECT[project.sdg_code]?.name || ""); // Set the sdg_name in form
    }
  }, [project, setValue]);

  const onSave = (data) => {
    const payload = data; // Here, data is already prepared from form input
    saveDraftProject({ payload, jwtToken })
      .then(() => {
        toast.success("Draft saved successfully!");
      })
      .catch((error) => {
        toast.error(`Error saving draft: ${error.message}`);
      });
  };

  const onSubmit = (data) => {
    const { project_id } = data;
    const payload = { projectId: project_id };
    prepareProject({ payload, jwtToken })
      .then(() => {
        toast.success("Project prepared successfully!");
        navigate("../requests"); // Navigate to a different page on success if needed
      })
      .catch((error) => {
        toast.error(`Error preparing project: ${error.message}`);
      });
  };

  return (
    <div className="max-w-4xl  p-4">
      <header className="flex px-3 py-3">
        <span
          className="material-symbols-outlined"
          onClick={() => navigate("../requests")}
        >
          arrow_back
        </span>
      </header>{" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-start items-center gap-4">
          {/* Project Name */}
          <div className="basis-1/2">
            <label className="block font-medium">Project Name</label>
            <input
              type="text"
              {...register("name", { required: "Project name is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Nepali Name */}
          <div className="basis-1/2">
            <label className="block font-medium">Nepali Name</label>
            <Nepali
              placeholder="परियोजना नाम (नेपाली)"
              funcname="unicodify"
              inputType="text"
              initialValue={nepaliName}
              className="w-full border border-gray-300 rounded-md p-2"
              id="projectNameNepali"
              name="nepali_name"
              onChange={(value) =>
                setValue("nepali_name", value, { shouldValidate: true })
              }
            />
            {errors.nepali_name && (
              <p className="text-error text-sm">{errors.nepali_name.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Status</option>
            <option value="NEW_OR_UPCOMING">New or Upcoming</option>
            <option value="ONGOING">Ongoing</option>
          </select>
          {errors.status && (
            <p className="text-error text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Sector */}
        <div>
          <label className="block font-medium">Sector</label>
          <select
            {...register("sector_id", { required: "Sector is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleSectorChange}
          >
            <option value="">Select Sector</option>
            {/* Map over sectors and create options dynamically */}
            {sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
          {errors.sector && (
            <p className="text-error text-sm">{errors.sector.message}</p>
          )}
        </div>

        {/* Sub-Sector Select */}
        <div className="mt-4">
          <label className="block font-medium">Sub-Sector</label>
          <select
            {...register("sub_sector_id", {
              required: "Sub-Sector is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Sub-Sector</option>
            {subSectors?.map((subSector) => (
              <option key={subSector.id} value={subSector.id}>
                {subSector.name}
              </option>
            ))}
          </select>
          {errors.sub_sector_id && (
            <p className="text-error text-sm">{errors.sub_sector_id.message}</p>
          )}
        </div>

        {/* Implementation Area */}
        <div>
          <label className="block font-medium">Implementation Area</label>
          <input
            type="text"
            {...register("implementation_area", {
              required: "Implementation area is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.implementation_area && (
            <p className="text-error text-sm">
              {errors.implementation_area.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Budget Total Cost */}
          <div>
            <label className="block font-medium">Budget Total Cost</label>
            <input
              type="number"
              {...register("budget_total_cost", {
                required: "Budget total cost is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.budget_total_cost && (
              <p className="text-error text-sm">
                {errors.budget_total_cost.message}
              </p>
            )}
          </div>

          {/* Budget Annual Allocation */}
          <div>
            <label className="block font-medium">
              Budget Annual Allocation
            </label>
            <input
              type="number"
              {...register("budget_annual_allocation", {
                required: "Annual allocation is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.budget_annual_allocation && (
              <p className="text-error text-sm">
                {errors.budget_annual_allocation.message}
              </p>
            )}
          </div>

          {/* Time Period */}
          <div>
            <label className="block font-medium">Time Period</label>
            <input
              type="text"
              {...register("time_period", {
                required: "Time period is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.time_period && (
              <p className="text-error text-sm">{errors.time_period.message}</p>
            )}
          </div>
        </div>
        {/* Beneficiaries */}
        <div>
          <label className="block font-medium">Beneficiaries</label>
          <textarea
            {...register("beneficiaries", {
              required: "Beneficiaries are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.beneficiaries && (
            <p className="text-error text-sm">{errors.beneficiaries.message}</p>
          )}
        </div>

        {/* Objectives */}
        <div>
          <label className="block font-medium">Objectives</label>
          <textarea
            {...register("objectives", {
              required: "Objectives are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.objectives && (
            <p className="text-error text-sm">{errors.objectives.message}</p>
          )}
        </div>

        {/* Expected Outcomes */}
        <div>
          <label className="block font-medium">Expected Outcomes</label>
          <textarea
            {...register("expected_outcomes", {
              required: "Expected outcomes are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.expected_outcomes && (
            <p className="text-error text-sm">
              {errors.expected_outcomes.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-start items-center">
          {/* Responsible Officer Name */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Name
            </label>
            <input
              type="text"
              {...register("responsible_officer_name", {
                required: "Responsible officer name is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_name && (
              <p className="text-error text-sm">
                {errors.responsible_officer_name.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Contact */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Contact
            </label>
            <input
              type="text"
              {...register("responsible_officer_contact", {
                required: "Responsible officer contact is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_contact && (
              <p className="text-error text-sm">
                {errors.responsible_officer_contact.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Email */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Email
            </label>
            <input
              type="email"
              {...register("responsible_officer_email", {
                required: "Responsible officer email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_email && (
              <p className="text-error text-sm">
                {errors.responsible_officer_email.message}
              </p>
            )}
          </div>
        </div>

        {/* Priority Code */}
        <div>
          <label className="block font-medium">Priority Code</label>
          <select
            {...register("priority_code", {
              required: "Priority code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Priority</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          {errors.priority_code && (
            <p className="text-error text-sm">{errors.priority_code.message}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Requested By */}
          <div>
            <label className="block font-medium">Requested By</label>
            <input
              {...register("requested_by", {
                required: "Requested by is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.requested_by && (
              <p className="text-red-500 text-sm">
                {errors.requested_by.message}
              </p>
            )}
          </div>
        </div>

        {/* SDG Code and Name */}
        <div>
          <label className="block font-medium">Select SDG</label>
          <select
            value={selectedSDG}
            onChange={handleSDGChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select SDG</option>
            {Object.keys(SDG_OBJECT).map((code) => (
              <option key={code} value={code}>
                {SDG_OBJECT[code].name}
              </option>
            ))}
          </select>
          {errors.sdg_name && (
            <p className="text-red-500 text-sm">{errors.sdg_name.message}</p>
          )}
        </div>

        {/* Gender Code */}
        <div>
          <label className="block font-medium">Gender Code</label>
          <input
            {...register("gender_code", {
              required: "Gender Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.gender_code && (
            <p className="text-red-500 text-sm">{errors.gender_code.message}</p>
          )}
        </div>

        {/* Climate Code */}
        <div>
          <label className="block font-medium">Climate Code</label>
          <input
            {...register("climate_code", {
              required: "Climate Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.climate_code && (
            <p className="text-red-500 text-sm">
              {errors.climate_code.message}
            </p>
          )}
        </div>

        {/* Strategic Code */}
        <div>
          <label className="block font-medium">Strategic Code</label>
          <input
            {...register("strategic_code", {
              required: "Strategic Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.strategic_code && (
            <p className="text-red-500 text-sm">
              {errors.strategic_code.message}
            </p>
          )}
        </div>

        {/* Project Nature */}
        <div>
          <label className="block font-medium">Project Nature</label>
          <select
            {...register("project_nature", {
              required: "Project Nature is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Project Nature
            </option>
            <option value="LOCAL_LEVEL_PRIDE_PROJECT">
              Local Level Pride Project
            </option>
            <option value="GAME_CHANGER_PROJECT">Game Changer Project</option>
            <option value="GENERAL">General</option>
          </select>
          {errors.project_nature && (
            <p className="text-red-500 text-sm">
              {errors.project_nature.message}
            </p>
          )}
        </div>

        {/* Budget Code */}
        <div>
          <label className="block font-medium">Budget Code</label>
          <input
            {...register("budget_code", {
              required: "Budget Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.budget_code && (
            <p className="text-red-500 text-sm">{errors.budget_code.message}</p>
          )}
        </div>

        {/* Implementation Method */}
        <div>
          <label className="block font-medium">Implementation Method</label>
          <input
            {...register("implementation_method", {
              required: "Implementation Method is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.implementation_method && (
            <p className="text-red-500 text-sm">
              {errors.implementation_method.message}
            </p>
          )}
        </div>
        {/* <div>
          <label className="block font-medium">Implementation Status</label>
          <select
            {...register("implementation_status", {
              required: "Implementation Status is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Implementation Status
            </option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          {errors.implementation_status && (
            <p className="text-red-500 text-sm">
              {errors.implementation_status.message}
            </p>
          )}
        </div> */}

        {/* Inception Status */}
        <div>
          <label className="block font-medium">Inception Status</label>
          <select
            {...register("inception_status", {
              required: "Inception Status is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Inception Status
            </option>
            <option value="IDENTIFICATION">Identification</option>
            <option value="EVALUATION">Evaluation</option>
          </select>
          {errors.inception_status && (
            <p className="text-red-500 text-sm">
              {errors.inception_status.message}
            </p>
          )}
        </div>

        <div className="flex justify-end items-center gap-3">
          {user.role === "DATA_PREPARE" && (
            <Button
              variant="outlined"
              type="button"
              onClick={handleSubmit(onSave)}
            >
              Save
            </Button>
          )}
          <Button variant="filled" color="primary" type="submit">
            {/* {submitMutation.isLoading ? "Submitting..." : "Submit"} */}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditDetails;
