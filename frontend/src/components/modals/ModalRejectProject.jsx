import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ModalOverlay from "./ModalOverlay.jsx";
import Textfield from "../material3/Textfield.jsx";
import Button from "../material3/Button.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { rejectProject } from "../../apis/rejectProject.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../../store/states.js";

const ModalRejectProject = (props) => (
  <ModalOverlay closeOnOverlay={true}>
    <ModalContent {...props} />
  </ModalOverlay>
);

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
    mutationFn: rejectProject,
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
      <h1 className="m3-title-medium p-4 border-b-[1px]">Reject project</h1>
      <form
        className="relative flex flex-col rounded-t-xl flex-1 overflow-auto"
        onSubmit={methods.handleSubmit(onConfirm)}
      >
        <FormProvider {...methods}>
          <div className="p-4 border-b-[1px]">
            <div className="space-y-3">
              <Textfield
                variant="outlined"
                label="Message"
                defaultValue=""
                supporting-text="Rejection message"
                aria-required
                className="w-full max-w-full"
                {...methods.register("message")}
              />
            </div>
          </div>
        </FormProvider>
        <footer className="flex justify-end items-center gap-4 p-4">
          <Button type="button" variant="text" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="filled">
            Reject
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default NiceModal.create(memo(ModalRejectProject));
