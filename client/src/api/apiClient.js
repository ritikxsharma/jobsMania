import axios from "axios";
import Cookies from "js-cookie";
import authApi from "./authApi";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authApi.refreshToken();
        return apiClient(originalRequest);
      } catch (error) {
        await forceLogout();
        return Promise.reject(error);
      }
    } else if (error?.response?.status === 404) {
      await forceLogout();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const forceLogout = async () => {
  try {
    await authApi.logout();
  } catch (error) {
  } finally {
    Cookies.remove("token");
    Cookies.remove("refreshToken");

    toast.info("Session expired. Please login again!", { autoClose: 1200 });
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }
};

export default apiClient;
