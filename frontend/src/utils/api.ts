import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApi = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const postApi = async (endpoint: string, data?: object) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error("Failed to post data");
  }
};
