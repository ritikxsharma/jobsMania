import apiClient from "./apiClient";

const authApi = {
  preRegister: (data) => apiClient.post("/auth/pre-register", data),
  validateEmail: (token) => apiClient.post("/auth/validate-email", { token }),
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.get("/auth/logout"),
  refreshToken: () => apiClient.get("/auth/refresh-token"),
};


export default authApi;
