import axiosInstance from "./axiosInstance";

export const fetchProjectSummary = async () => {
  try {
    const response = await axiosInstance.get(`/common/summary`, {});

    if (response.status !== 200) {
      throw new Error("Error fetching assigned projects");
    }
    return response.data.data || null;
  } catch (error) {
    console.error(
      "Error during fetchAssignedProjects:",
      error.response?.data || error.message
    );
    throw error;
  }
};
