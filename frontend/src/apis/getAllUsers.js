import axiosInstance from "./axiosInstance";

/**
 * Retrieves all users.
 * @param {Object} params - The parameters for the function.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data containing all users.
 * @throws Will throw an error if the request fails.
 */
export const getAllUsers = async ({ jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send GET request to retrieve all users
    const response = await axiosInstance.get("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error retrieving users: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during getAllUsers:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
