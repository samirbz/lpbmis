import axiosInstance from "./axiosInstance";

export const fetchRoleNotifications = async ({ jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }
    const response = await axiosInstance.get("/notifications/tasks", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Error fetching notifications!");
    }
    return response.data.data; // Return the response data if the request is successful
  } catch (error) {
    console.error(
      "Error during fetchRoleNotifications.",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
