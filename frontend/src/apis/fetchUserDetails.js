import axiosInstance from "./axiosInstance";

/**
 * Fetches user details for the currently logged-in user.
 * @param {Object} params - The parameters for the function.
 * @param {string} params.jwtToken - The JWT token for authorization.
 * @returns {Promise<Object>} The response data containing user details.
 * @throws Will throw an error if the request fails.
 */
export const fetchUserDetails = async ({ jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send GET request to fetch user details
    const response = await axiosInstance.get("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching user details: ${response.status}`);
    }

    return response.data.data;
  } catch (error) {
    console.error(
      "Error during fetchUserDetails:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
export default fetchUserDetails;