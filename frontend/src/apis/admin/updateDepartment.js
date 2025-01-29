import axiosInstance from "../axiosInstance";

export const updateDepartment = async ({ id, payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Include payload in the request body
    const response = await axiosInstance.patch(
      `/admin/department/one/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Error adding project: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during addProjects:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
