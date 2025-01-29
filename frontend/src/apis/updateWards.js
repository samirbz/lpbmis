import axiosInstance from "./axiosInstance";


export const updateWards = async ({ payload, jwtToken }) => {
  try {
    if (!jwtToken) {
      throw new Error("jwtToken is required");
    }

    // Send POST request with user data
    const response = await axiosInstance.post("/admin/palika/wards", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status >= 400) {
      const error = new Error("Failed to change wards");
      error.status = response.status;
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during updateWards:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
  }
};
