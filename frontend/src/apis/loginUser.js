import axiosInstance from "./axiosInstance";

/**
 * Logs in a user with the provided credentials.
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.payload - The login payload containing user credentials.
 * @returns {Promise<Object>} The response data containing user authentication details.
 * @throws Will throw an error if the login fails.
 */
export const loginUser = async ({ payload }) => {
  try {
    // Send POST request with the login payload
    const response = await axiosInstance.post("/auth/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      const error = new Error("Failed to login");
      if (response.data?.message) error.message = response.data.message;
      error.status = response.status;
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during loginUser:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
