import apiClient from "./apiClient"

const userApi = {
    currentUser: () => apiClient.get('/user/current-user'),
    adminAppStats: () => apiClient.get('/user/admin/stats')
}

export default userApi