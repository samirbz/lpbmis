import axiosInstance from "./axiosInstance";

/**
 * Adds a new project with the given data.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.projectData - The project data to be submitted.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const addProjects = async ({ projectData, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Include projectData in the request body
    const response = await axiosInstance.post(
      "/projects",
      projectData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Error adding project: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during addProjects:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
