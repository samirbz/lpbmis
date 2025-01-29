import axiosInstance from "./axiosInstance";

/**
 * Changes the user's password.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.payload - The payload containing the old and new passwords.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const changePassword = async ({ payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send POST request with payload
    const response = await axiosInstance.post(
      "/users/changepassword",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status !== 200) {
      const error = new Error("Failed to change password");
      error.status = response.status;
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during changePassword:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
