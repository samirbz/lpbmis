import React, { memo } from "react";
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

function ModalEditPalikaNameAddress(props) {
  return (
    <ModalOverlay closeOnOverlay={true}>
      <ModalContent {...props} />
    </ModalOverlay>
  );
}

const ModalContent = ({ projectId }) => {
  const modal = useModal();
  const methods = useForm({ mode: "onBlur" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const jwtToken = useRecoilValue(jwtTokenState);

  const closeModal = () => {
    modal.remove();
    modal.hide();
  };

  const rejectMutation = useMutation({
    mutationFn: () => {
      console.log("ss");
    },
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
      const { message } = data;

      // Ensure all necessary data is available
      if (!projectId || !jwtToken || !message) {
        console.log(
          "Missing required fields: projectId, jwtToken, or message."
        );
        toast.info('Missing required fields: "message","projectId", "jwtToken');
        return;
      }

      // Trigger the mutation
      await rejectMutation.mutateAsync({
        projectId,
        jwtToken,
        message,
      });

      queryClient.invalidateQueries({ queryKey: ["project"] });

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error during project rejection:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-[28px] overflow-clip w-[600px]">
      <h1 className="m3-title-medium p-4 border-b-[1px]">
        Change Name & Address
      </h1>
      <form
        className="relative flex flex-col rounded-t-xl flex-1 overflow-auto"
        onSubmit={methods.handleSubmit(onConfirm)}
      >
        <FormProvider {...methods}>
          <div className="p-4 border-b-[1px]">
            <div className="space-y-3">
              <Textfield
                variant="outlined"
                label="Name"
                defaultValue=""
                supporting-text="Palika's name"
                aria-required
                className="w-full max-w-full"
                {...methods.register("name")}
              />
              <Textfield
                variant="outlined"
                label="Address"
                defaultValue=""
                supporting-text="Palika's address"
                aria-required
                className="w-full max-w-full"
                {...methods.register("address")}
              />
            </div>
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

export default NiceModal.create(memo(ModalEditPalikaNameAddress));
