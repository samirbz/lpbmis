import React, { memo, useState } from "react";
import ModalOverlay from "./ModalOverlay";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Button from "../material3/Button";
import Textfield from "../material3/Textfield";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "@/store/states";
import { toast } from "react-toastify";
import { updateWards } from "@/apis/updateWards";

function ModalEditPalikaWards(props) {
  return (
    <ModalOverlay closeOnOverlay={true}>
      <ModalContent {...props} />
    </ModalOverlay>
  );
}

const ModalContent = ({ initialWards }) => {
  const modal = useModal();
  const methods = useForm({ mode: "onBlur" });
  const queryClient = useQueryClient();
  const jwtToken = useRecoilValue(jwtTokenState);
  const navigate = useNavigate();
  const [wards, setWards] = useState(initialWards || []); // State for ward list
  const [newWard, setNewWard] = useState(""); // State for new ward input
  // Function to remove a ward by clicking
  const removeWard = (ward) => {
    setWards(wards.filter((w) => w !== ward));
  };

  const wardUpdateMutation = useMutation({
    mutationFn: () => updateWards({ payload: { wards }, jwtToken }),
    onSuccess: () => {
      toast.success("Wards updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Function to add a new ward
  const addWard = () => {
    const newWardNumber = parseInt(newWard);
    if (!isNaN(newWardNumber) && !wards.includes(newWardNumber)) {
      setWards([...wards, newWardNumber]);
    }
    setNewWard(""); // Clear the input field
  };

  const closeModal = () => {
    modal.remove();
    modal.hide();
  };

  const onConfirm = async () => {
    await wardUpdateMutation.mutateAsync();
    queryClient.invalidateQueries("palika");
    closeModal();
  };

  return (
    <div className="flex flex-col bg-white rounded-[28px] overflow-clip w-[600px]">
      <h1 className="m3-title-medium p-4 border-b-[1px]">
        Change Palika Wards
      </h1>
      <form
        className="relative flex flex-col rounded-t-xl flex-1 overflow-auto"
        onSubmit={methods.handleSubmit(onConfirm)}
      >
        <FormProvider {...methods}>
          <div className="p-4 border-b-[1px]">
            <div className="space-y-3"></div>
            <div className="flex flex-wrap gap-2">
              {wards.map((ward) => (
                <span
                  key={ward}
                  onClick={() => removeWard(ward)}
                  className="p-2 border-[1px] border-solid border-slate-400 cursor-pointer rounded-lg hover:bg-surface"
                >
                  {ward} ❌
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter ward number"
              value={newWard}
              className="p-2 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setNewWard(e.target.value)}
            />
            <Button type="button" onClick={addWard}>
              Add Ward
            </Button>
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

export default NiceModal.create(memo(ModalEditPalikaWards));
