import axiosInstance from "./axiosInstance";

/**
 * Adds a new user with the provided user data.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.userData - The data of the user to be added.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const addUser = async ({ userData, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send POST request with user data
    const response = await axiosInstance.post("/users", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      const error = new Error("Failed to add user");
      error.status = response.status;
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during addUser:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
