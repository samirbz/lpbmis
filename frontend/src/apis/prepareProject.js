import axiosInstance from "./axiosInstance";

export const prepareProject = async ({ payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Include payload in the request body
    const response = await axiosInstance.post(
      "/projects/one/prepare",
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
