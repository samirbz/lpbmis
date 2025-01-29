import axiosInstance from "./axiosInstance";

export const rejectProject = async ({ projectId, message, jwtToken }) => {
  if (!projectId || !jwtToken) {
    throw new Error("Both projectId and jwtToken are required");
  }

  try {
    const response = await axiosInstance.post(
      "/projects/one/reject",
      { projectId, message },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    // If successful, return the data
    if (response.status === 200) {
      return response.data;
    }

    // If response status is not 200, throw error with message
    throw new Error(response.data?.message || "Error rejecting project");
  } catch (error) {
    // Catch the error and check if it's an Axios error with a response
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("Error during project rejection:", errorMessage);
    throw new Error(errorMessage); // Rethrow the error with the appropriate message
  }
};
