import axiosInstance from "./axiosInstance";

/**
 * Resets the user's password.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.payload - The payload containing the user ID.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the password reset fails.
 */
export const resetPassword = async ({ payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send POST request with payload
    const response = await axiosInstance.post(
      "/admin/resetpassword",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status !== 200) {
      const error = new Error("Failed to reset password");
      if (response.data?.message) error.message = response.data.message;
      error.status = response.status;
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during resetPassword:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default resetPassword;
