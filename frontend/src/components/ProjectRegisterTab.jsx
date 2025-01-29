import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Nepali from "nepalify-react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

import { isOnMobileState, jwtTokenState } from "../store/states";

import ProjectForm from "./ProjectForm";
import { Navigate, useNavigate } from "react-router-dom";

const strategicCodes = [
  { code: 1, name: "One" },
  { code: 2, name: "Two" },
  { code: 3, name: "Three" },
];

const ProjectRegisterTab = () => {
  const jwtToken = useRecoilValue(jwtTokenState);
  const navigate = useNavigate();
  const isOnMobile = useRecoilValue(isOnMobileState);
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

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      console.log("Data:", data);
      data.implementation_wards = data?.implementation_wards?.map((ward) =>
        parseInt(ward, 10)
      );
      await mutation.mutateAsync(data);
      toast.success("Project successfully registered!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("../drafts");
    } catch (error) {
      toast.error("Error adding project!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error adding project:", error);
    }
  };

  return (
    <section className="w-full h-full flex flex-col">
      <header className="bg-white px-3 flex justify-between items-center border-b">
        <h1 className="m3-title-large py-2">Add New Project</h1>
      </header>
      <main className="bg-white px-3 flex gap-2 h-full overflow-auto">
        <ProjectForm primaryActionFunction={onSubmit} />
        {isOnMobile ? null : (
          <section className="_info-division  basis-[200px] shrink-0 sticky top-0 border-s">
            Information
          </section>
        )}
      </main>
    </section>
  );
};

export default ProjectRegisterTab;
