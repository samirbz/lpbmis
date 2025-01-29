import React, { memo, useState } from "react";
import ModalOverlay from "./ModalOverlay";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Button from "../material3/Button";
import Textfield from "../material3/Textfield";
import { useRecoilValue } from "recoil";
import { jwtTokenState, palikaState } from "@/store/states";
import { toast } from "react-toastify";
import { updateDepartment } from "@/apis/admin/updateDepartment";

function ModalEditDepartments(props) {
  return (
    <ModalOverlay closeOnOverlay={true}>
      <ModalContent {...props} />
    </ModalOverlay>
  );
}

const ModalContent = () => {
  const modal = useModal();
  const methods = useForm({ mode: "onBlur" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const jwtToken = useRecoilValue(jwtTokenState);
  const palika = useRecoilValue(palikaState);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const closeModal = () => {
    modal.remove();
    modal.hide();
  };

  const handleNameEdit = (id) => {
    setIsEditing(() => true);
    setEditingDepartment(id);
  };
  const departmentMutation = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      toast.success("Project rejected successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error during project rejection:", error);
    },
  });

  const onConfirm = async (data) => {
    try {
      const { name } = data;

      const payload = {
        name,
      };

      // Trigger the mutation
      await departmentMutation.mutateAsync({
        payload,
        id: editingDepartment,
        jwtToken,
      });

      queryClient.invalidateQueries({
        queryKey: [["palika"], ["departments"]],
      });

      // Close the modal
      // closeModal();
    } catch (error) {
      console.error("Error during project rejection:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-[28px] overflow-clip ">
      <h1 className="m3-title-medium p-4 border-b-[1px]">
        Change Name & Address
      </h1>
      <form
        className="relative flex flex-col rounded-t-xl flex-1 overflow-auto"
        onSubmit={methods.handleSubmit(onConfirm)}
      >
        <FormProvider {...methods}>
          <div className="p-4 border-b-[1px]">
            <main className="px-2">
              <div className="flex flex-col justify-start items-start gap-2 flex-wrap">
                <table>
                  <thead>
                    <th className="px-3">ID</th>
                    <th className="px-3">Name</th>
                    <th className="px-3">Updated At</th>
                    <th className="px-3">Created At</th>
                    <th className="px-3">Change Name</th>
                  </thead>
                  <tbody>
                    {palika?.Departments?.map((department) => (
                      <tr className="px-2" key={department?.name}>
                        <td className=" py-1 px-3">{department?.id}</td>
                        <td className=" py-1 px-3">{department?.name}</td>
                        <td className=" py-1 px-3">{department?.updatedAt}</td>
                        <td className=" py-1 px-3">{department?.createdAt}</td>
                        <td>
                          {isEditing && editingDepartment == department.id ? (
                            <div className="flex items-center justify-start gap-1">
                              <input
                                type="text"
                                name="name"
                                className="border-slate-700 border rounded-xl px-2 py-1"
                                {...methods.register("name")}
                              />
                              <Button
                                variant="filled"
                                color="green-fair"
                                type="submit"
                              >
                                <span>Save</span>
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="filled"
                              color="green-fair"
                              onClick={() => handleNameEdit(department?.id)}
                              type="button"
                            >
                              <span className="material-symbols-outlined">
                                edit
                              </span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </FormProvider>
        <footer className="flex justify-end items-center gap-4 p-4">
          <Button type="button" variant="text" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="filled">
            Save
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default NiceModal.create(memo(ModalEditDepartments));
