import axiosInstance from "./axiosInstance";

/**
 * Refreshes the user's JWT token.
 * @param {Object} params - The parameters for the function.
 * @param {string} params.jwtToken - The current JWT token for authorization.
 * @returns {Promise<Object>} The response data containing the refreshed token.
 * @throws Will throw an error if the token refresh fails.
 */
export const refreshToken = async ({ jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send GET request to refresh the token
    const response = await axiosInstance.get("/auth/verifyandrefreshtoken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to refresh token: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during refreshToken:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};

export default refreshToken;
