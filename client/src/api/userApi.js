import apiClient from "./apiClient"

const userApi = {
    currentUser: () => apiClient.get('/user/current-user')
}

export default userApi