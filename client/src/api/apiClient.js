import axios from "axios";
import { toast } from "react-toastify";
import authApi from "./authApi";

const apiClient = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        await authApi.logout();
      } catch (error) {
        console.log(error);
      } finally {
        toast.error("Session expired. Please log in again!");
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
