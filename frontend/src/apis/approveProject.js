import axiosInstance from "./axiosInstance";

/**
 * Submits a project with the given payload.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.payload - The payload for the request.
 * @param {string} params.payload.project_id - The project ID.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const approveProject = async ({ payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Include payload in the request body
    const response = await axiosInstance.post(
      "/projects/one/approve",
      payload,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error submitting project");
    }

    return response.data.data;
  } catch (error) {
    console.error(
      "Error during submitProject:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
