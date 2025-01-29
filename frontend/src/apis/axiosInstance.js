import axios from "axios";
import process from "process";

const API_URI = process.env.API_URI || "http://localhost:3000/api/v1";
//
const axiosInstance = axios.create({
  baseURL: API_URI,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
