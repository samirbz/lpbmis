import axiosInstance from "./axiosInstance";

export const fetchAssignedProjects = async (jwtToken) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }
    const response = await axiosInstance.get("/projects/assigned", {
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
