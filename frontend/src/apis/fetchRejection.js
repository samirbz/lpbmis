import axiosInstance from "./axiosInstance";

export const fetchRejection = async ({ projectId, jwtToken }) => {
  try {
    if (!jwtToken || !projectId) {
      throw new Error("jwtToken and projectId is required");
    }
    const response = await axiosInstance.get("/rejections/get", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        projectId,
      },
    });

    if (response.status !== 200) {
      throw new Error("Error fetching rejection!");
    }
    return response.data.data; // Return the response data if the request is successful
  } catch (error) {
    console.error(
      "Error during fetchRejection:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
