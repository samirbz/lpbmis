import axiosInstance from "./axiosInstance";

export const fetchAProject = async ({ projectId, jwtToken }) => {
  try {
    if (!jwtToken || !projectId) {
      throw new Error("jwtToken and projectId both are required");
    }
    const response = await axiosInstance.get(`/projects/one/${projectId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Error fetching assigned projects");
    }
    return response.data.data; // Return the response data if the request is successful
  } catch (error) {
    console.error(
      "Error during fetchAssignedProjects:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
