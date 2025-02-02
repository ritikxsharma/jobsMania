import apiClient from "./apiClient"

const userApi = {
    currentUser: () => apiClient.get('/user/current-user'),
    adminAppStats: () => apiClient.get('/user/admin/stats'),
    updateProfile: (data) => apiClient.patch('/user/update-user', data)
}

export default userApi