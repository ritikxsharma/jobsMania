import apiClient from "./apiClient";

const authApi = {
    preRegister: (data) => apiClient.post('/auth/pre-register', data),
    validateEmail: () => apiClient.post('/auth/validate-email'),
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: () => apiClient.get('/auth/logout'),
}

export default authApi