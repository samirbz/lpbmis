import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Nepali from "nepalify-react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

import { jwtTokenState, sectorsState } from "../store/states";
import { SDG_OBJECT } from "../assets/constants/sdg";
import Button from "./material3/Button";

const strategicCodes = [
  { code: 1, name: "One" },
  { code: 2, name: "Two" },
  { code: 3, name: "Three" },
];

const ProjectForm = ({
  primaryActionFunction,
  primaryActionLabel,
  secondaryActionFunction,
  secondaryActionLabel,
  projectData,
}) => {
  const jwtToken = useRecoilValue(jwtTokenState);
  const sectors = useRecoilValue(sectorsState);
  const [subSectors, setSubSectors] = useState([]); // State for sub-sectors
  const [selectedSDG, setSelectedSDG] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
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

  const handlePrimaryAction = async () => {
    try {
      await handleSubmit((data) => {
        // Manipulate form data here
        // Convert `implementation_wards` to an array of integers
        data.implementation_wards = data?.implementation_wards?.map((ward) =>
          parseInt(ward, 10)
        );
        const manipulatedData = {
          ...data,
          selection_status: data.selection_status === "true", // Convert 'true'/'false' string to boolean
          implementation_wards: data?.implementation_wards?.map((ward) =>
            parseInt(ward, 10)
          ),
        };

        // Pass manipulated data to the primary action function
        return primaryActionFunction(manipulatedData);
      })();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleSectorChange = (event) => {
    const sectorId = event.target.value;
    const selectedSector = sectors.find(
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

  // Mutation for submitting the form
  const mutation = useMutation({
    mutationFn: (projectData) => {
      const token = jwtToken;
      return axios.post("http://localhost:3000/api/v1/projects", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const nepaliName = watch("nepali_name", "");
  const budgetCycleType = watch("budget_cycle_type");
  const selectedSectorId = watch("sector_id");
  const selectedStatus = watch("selection_status") === "true";
  const fundingSource = watch("funding_source");
  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const implementationWards = watch("implementation_wards");

  // Load initial sub-sectors when the component mounts or when `sector_id` changes
  useEffect(() => {
    if (selectedSectorId) {
      const selectedSector = sectors.find(
        (sector) => sector.id === parseInt(selectedSectorId, 10)
      );
      setSubSectors(selectedSector ? selectedSector.SubSectors : []);
    }
  }, [selectedSectorId, sectors]);

  // Automatically update `budget_term_period` when `start_date` or `end_date` changes
  useEffect(() => {
    if (startDate && endDate) {
      setValue("budget_term_period", `${startDate} - ${endDate}`);
    }
  }, [startDate, endDate, setValue]);

  useEffect(() => {}, [implementationWards]);

  return (
    <form
      onSubmit={handleSubmit(primaryActionFunction)}
      className="space-y-4 py-1"
    >
      <div className="flex justify-start items-center gap-4">
        {/* Project Name */}
        <div className="basis-1/2">
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            {...register("name", { required: "Project name is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors?.name && (
            <p className="text-error text-sm">{errors?.name?.message}</p>
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
            <p className="text-error text-sm">{errors?.nepali_name?.message}</p>
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
        {errors?.status && (
          <p className="text-error text-sm">{errors?.status?.message}</p>
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
        {errors?.sector && (
          <p className="text-error text-sm">{errors?.sector?.message}</p>
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
        {errors?.sub_sector_id && (
          <p className="text-error text-sm">{errors?.sub_sector_id?.message}</p>
        )}
      </div>

      <div className="_budget border-[1px] rounded-sm p-2 ">
        <p className="m3-title-medium mb-2">Project Implementation Areas</p>
        <div className="flex gap-4 justify-start flex-wrap items-start">
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
            {errors?.implementation_area && (
              <p className="text-error text-sm">
                {errors?.implementation_area?.message}
              </p>
            )}
          </div>
          {/* Implementation Wards */}
          <div>
            <label className="block font-medium mb-2">
              Implementation Wards
            </label>
            <select //TODO 1. Implement the multiple select for wards as array
              {...register("implementation_wards", {
                required: "At least one ward must be selected",
              })}
              multiple={true}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {Array.from({ length: 35 }, (_, i) => i + 1).map((ward) => (
                <option key={ward} value={ward}>
                  Ward {ward}
                </option>
              ))}
            </select>

            {/* help message */}
            <span className="m3-body-small opacity-70">
              Hold down CTRL to select multiple
            </span>
            {/* Error Message */}
            {errors?.implementation_wards && (
              <p className="text-red-500 text-sm mt-2">
                {errors?.implementation_wards?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="_budget border-[1px] rounded-sm p-2 ">
        <p className="m3-title-medium">Budget</p>
        <div className="flex gap-4 justify-start flex-wrap items-center">
          {/* Budget */}
          <div>
            <label className="block font-medium">Budget (Total Cost</label>
            <input
              type="number"
              {...register("budget", {
                required: "Budget is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors?.budget && (
              <p className="text-error text-sm">
                {errors?.budget_total_cost?.message}
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
              {...register("annual_allocation", {
                required: "Annual allocation is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors?.annual_allocation && (
              <p className="text-error text-sm">
                {errors?.annual_allocation?.message}
              </p>
            )}
          </div>

          {/* Budget Cycle  */}
          <div>
            <label className="block font-medium mb-2">Budget Cycle Type</label>
            <div className="flex gap-4">
              {/* Radio Button: ANNUAL */}
              <label className="flex items-center">
                <input
                  type="radio"
                  value="ANNUAL"
                  {...register("budget_cycle_type", {
                    required: "This field is required",
                  })}
                  className="mr-2"
                />
                Annual
              </label>

              {/* Radio Button: TERM_BASED */}
              <label className="flex items-center">
                <input
                  type="radio"
                  value="TERM_BASED"
                  {...register("budget_cycle_type", {
                    required: "This field is required",
                  })}
                  className="mr-2"
                />
                Term-Based
              </label>
            </div>
            {errors?.budget_cycle_type && (
              <p className="text-red-500 text-sm mt-2">
                {errors?.budget_cycle_type?.message}
              </p>
            )}
          </div>

          {/* Term-Based Inputs */}
          {budgetCycleType === "TERM_BASED" && (
            <div className=" flex items-center gap-3">
              {/* Start Date */}
              <div>
                <label className="block font-medium">Start Fiscal Year</label>
                <input
                  type="text"
                  placeholder="YYYY/YYYY"
                  {...register("start_date", {
                    required: "Start date is required",
                    pattern: {
                      value: /^\d{4}\/\d{4}$/,
                      message: "Start date must be in format YYYY/YYYY",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors?.start_date && (
                  <p className="text-red-500 text-sm">
                    {errors?.start_date?.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block font-medium">End Fiscal Year</label>
                <input
                  type="text"
                  placeholder="YYYY/YYYY"
                  {...register("end_date", {
                    required: "End date is required",
                    pattern: {
                      value: /^\d{4}\/\d{4}$/,
                      message: "End date must be in format YYYY/YYYY",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors?.end_date && (
                  <p className="text-red-500 text-sm">
                    {errors?.end_date?.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="_beneficiaries  border-[1px] rounded-sm p-2 ">
        <p className="m3-title-medium">Beneficiaries</p>
        <div className="flex gap-4 justify-start flex-wrap items-center">
          {/* Beneficiaries Total Population */}
          <div>
            <label className="block font-medium">Total Population</label>
            <input
              type="number"
              {...register("beneficiaries_population", {
                required: "Total population is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_population && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_population?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Total Houses */}
          <div>
            <label className="block font-medium">Total Houses</label>
            <input
              type="number"
              {...register("beneficiaries_total_houses", {
                required: "Total houses is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_total_houses && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_total_houses?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Dalit */}
          <div>
            <label className="block font-medium">Dalit</label>
            <input
              type="number"
              {...register("beneficiaries_dalit", {
                required: "Dalit beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_dalit && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_dalit?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Indigenous */}
          <div>
            <label className="block font-medium">Indigenous</label>
            <input
              type="number"
              {...register("beneficiaries_indigenous", {
                required: "Indigenous beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_indigenous && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_indigenous?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Janajati */}
          <div>
            <label className="block font-medium">Janajati</label>
            <input
              type="number"
              {...register("beneficiaries_janajati", {
                required: "Janajati beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_janajati && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_janajati?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Male */}
          <div>
            <label className="block font-medium">Male</label>
            <input
              type="number"
              {...register("beneficiaries_male", {
                required: "Male beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_male && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_male?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Female */}
          <div>
            <label className="block font-medium">Female</label>
            <input
              type="number"
              {...register("beneficiaries_female", {
                required: "Female beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_female && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_female?.message}
              </p>
            )}
          </div>

          {/* Beneficiaries Differently Abled */}
          <div>
            <label className="block font-medium">Differently Abled</label>
            <input
              type="number"
              {...register("beneficiaries_diff_abled", {
                required: "Differently abled beneficiaries is required",
              })}
              className="w-full border min-w-[300px] basis-[400px] border-gray-300 rounded-md p-2"
            />
            {errors?.beneficiaries_diff_abled && (
              <p className="text-error text-sm">
                {errors?.beneficiaries_diff_abled?.message}
              </p>
            )}
          </div>
        </div>
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
        {errors?.expected_outcomes && (
          <p className="text-error text-sm">
            {errors?.expected_outcomes?.message}
          </p>
        )}
      </div>

      <div className="_responsible-official  border-[1px] rounded-sm p-2">
        <p className="m3-title-medium">Responsible Official</p>
        {/* Responsible Officer Name */}
        <div className="flex gap-4 justify-start items-center">
          <div className="grow">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              {...register("responsible_officer_name", {
                required: "Responsible officer name is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors?.responsible_officer_name && (
              <p className="text-error text-sm">
                {errors?.responsible_officer_name?.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Contact */}
          <div className="grow">
            <label className="block font-medium">Contact</label>
            <input
              type="text"
              {...register("responsible_officer_contact", {
                required: "Responsible officer contact is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors?.responsible_officer_contact && (
              <p className="text-error text-sm">
                {errors?.responsible_officer_contact?.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Email */}
          <div className="grow">
            <label className="block font-medium">Email</label>
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
            {errors?.responsible_officer_email && (
              <p className="text-error text-sm">
                {errors?.responsible_officer_email?.message}
              </p>
            )}
          </div>
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
        {errors?.priority_code && (
          <p className="text-error text-sm">{errors?.priority_code?.message}</p>
        )}
      </div>

      {/* Requested By */}
      <div>
        <label className="block font-medium">Requested By</label>
        <input
          {...register("requested_by", {
            required: "Requested by is required",
          })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors?.requested_by && (
          <p className="text-red-500 text-sm">
            {errors?.requested_by?.message}
          </p>
        )}
      </div>

      {/* SDG Code and Name */}
      <div className="relative">
        <label className="block font-medium">Select SDG</label>
        <select
          value={selectedSDG}
          onChange={handleSDGChange}
          className="w-full border border-gray-300 rounded-md p-2 relative max-h-[200px] overflow-y-scroll "
        >
          <option value="">Select SDG</option>
          {Object.keys(SDG_OBJECT).map((code) => (
            <option key={code} value={code}>
              {`${SDG_OBJECT[code].code} ${SDG_OBJECT[code].name}`}
            </option>
          ))}
        </select>
        {errors?.sdg_name && (
          <p className="text-red-500 text-sm">{errors?.sdg_name?.message}</p>
        )}
      </div>

      {/* Gender Code */}
      <div>
        <label className="block font-medium mb-2">Gender Code</label>
        <div className="flex items-center gap-4">
          {/* Radio Button 1 */}
          <label className="flex items-center">
            <input
              type="radio"
              value="1"
              {...register("gender_code", {
                required: "Gender Code is required",
              })}
              className="mr-2"
            />
            निर्धारित
          </label>

          {/* Radio Button 2 */}
          <label className="flex items-center">
            <input
              type="radio"
              value="2"
              {...register("gender_code", {
                required: "Gender Code is required",
              })}
              className="mr-2"
            />
            प्रत्यक्ष
          </label>

          {/* Radio Button 3 */}
          <label className="flex items-center">
            <input
              type="radio"
              value="3"
              {...register("gender_code", {
                required: "Gender Code is required",
              })}
              className="mr-2"
            />
            तटस्थ
          </label>
        </div>

        {/* Error Message */}
        {errors.gender_code && (
          <p className="text-red-500 text-sm mt-2">
            {errors?.gender_code?.message}
          </p>
        )}
      </div>

      {/* Climate Code */}
      <div className="mt-4">
        <label className="block font-medium mb-2">Climate Code</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="1"
              {...register("climate_code", {
                required: "Climate Code is required",
              })}
              className="mr-2"
            />
            अति सन्दर्भिक
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="2"
              {...register("climate_code", {
                required: "Climate Code is required",
              })}
              className="mr-2"
            />
            सन्दर्भिक
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="3"
              {...register("climate_code", {
                required: "Climate Code is required",
              })}
              className="mr-2"
            />
            तटस्थ
          </label>
        </div>
        {errors?.climate_code && (
          <p className="text-red-500 text-sm mt-2">
            {errors?.climate_code?.message}
          </p>
        )}
      </div>

      {/* Strategic Code */}
      <div>
        <label className="block font-medium mb-2">Strategic Code</label>
        <div className="flex flex-wrap gap-4">
          {strategicCodes?.map((item) => (
            <label key={item.code} className="flex items-center">
              <input
                type="radio"
                value={item.code} // Use item.code as the value
                {...register("strategic_code", {
                  required: "Strategic Code is required",
                })}
                className="mr-2"
              />
              {item.name}
            </label>
          ))}
        </div>

        {/* Error Message */}
        {errors?.strategic_code && (
          <p className="text-red-500 text-sm mt-2">
            {errors?.strategic_code?.message}
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
        {errors?.project_nature && (
          <p className="text-red-500 text-sm">
            {errors?.project_nature?.message}
          </p>
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
        {errors?.implementation_method && (
          <p className="text-red-500 text-sm">
            {errors?.implementation_method?.message}
          </p>
        )}
      </div>
      <div>
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
        {errors?.implementation_status && (
          <p className="text-red-500 text-sm">
            {errors?.implementation_status?.message}
          </p>
        )}
      </div>

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
        {errors?.inception_status && (
          <p className="text-red-500 text-sm">
            {errors?.inception_status?.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">Selection Status</label>
        <div className="flex gap-4">
          {/* Radio Button: TRUE */}
          <label className="flex items-center">
            <input
              type="radio"
              value="true"
              {...register("selection_status", {
                required: "This field is required",
              })}
              className="mr-2"
            />
            Selected
          </label>

          {/* Radio Button: FALSE */}
          <label className="flex items-center">
            <input
              type="radio"
              value="false"
              {...register("selection_status", {
                required: "This field is required",
              })}
              className="mr-2"
            />
            Not Selected
          </label>
        </div>
        {errors?.selection_status && (
          <p className="text-red-500 text-sm mt-2">
            {errors?.selection_status?.message}
          </p>
        )}

        {/* Conditional Fields: If Selected */}
        {selectedStatus && (
          <div className="mt-4 space-y-4">
            {/* Selected Date */}
            <div>
              <label className="block font-medium">Selected Date</label>
              <input
                type="text"
                placeholder="YYYY/MM/DD"
                {...register("selected_date", {
                  required: "Selected date is required",
                  pattern: {
                    value: /^\d{4}\/\d{2}\/\d{2}$/,
                    message: "Date must be in the format YYYY/MM/DD",
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors?.selected_date && (
                <p className="text-red-500 text-sm">
                  {errors?.selected_date?.message}
                </p>
              )}
            </div>

            {/* Selected By */}
            <div>
              <label className="block font-medium">Selected By</label>
              <div className="flex gap-4">
                {/* Radio Button: MUNICIPAL_EXECUTIVE */}
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="MUNICIPAL_EXECUTIVE"
                    {...register("selected_by", {
                      required: "Selection by is required",
                    })}
                    className="mr-2"
                  />
                  Municipal Executive
                </label>

                {/* Radio Button: WARD_COMMITTEE */}
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="WARD_COMMITTEE"
                    {...register("selected_by", {
                      required: "Selection by is required",
                    })}
                    className="mr-2"
                  />
                  Ward Committee
                </label>
              </div>
              {errors?.selected_by && (
                <p className="text-red-500 text-sm">
                  {errors?.selected_by?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Funding Source */}
      <div>
        <label className="block font-medium">Funding Source</label>
        <select
          {...register("funding_source", {
            required: "Funding Source is required",
          })}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled>
            Select Funding Source
          </option>
          <option value="SELF">Self</option>
          <option value="PROVINCE_GOVERNMENT">Province Government</option>
          <option value="CENTRAL_GOVERNMENT">Central Government</option>
        </select>
        {errors?.funding_source && (
          <p className="text-red-500 text-sm">
            {errors?.funding_source?.message}
          </p>
        )}
      </div>

      {/* Funding Policy - Displayed Conditionally */}
      {fundingSource && fundingSource !== "SELF" && (
        <div>
          <label className="block font-medium">Funding Policy</label>
          <select
            {...register("funding_policy", {
              required:
                "Funding Policy is required when funding source is not SELF",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Funding Policy
            </option>
            <option value="CO-FINANCING">Co-Financing</option>
            <option value="SPECIAL_GRANT">Special Grant</option>
            <option value="CONDITIONAL_GRANT">Conditional Grant</option>
            <option value="OTHER">Other</option>
          </select>
          {errors?.funding_policy && (
            <p className="text-red-500 text-sm">
              {errors?.funding_policy?.message}
            </p>
          )}
        </div>
      )}

      <footer className="flex items-center justify-end gap-4">
        <Button variant="filled" type="button" onClick={handlePrimaryAction}>
          {primaryActionLabel || "Submit"}
        </Button>

        {secondaryActionFunction && (
          <Button
            variant="outlined"
            type="button"
            onClick={handleSubmit(secondaryActionFunction)}
          >
            {secondaryActionLabel || "Secondary Action"}
          </Button>
        )}
      </footer>
    </form>
  );
};

export default ProjectForm;
