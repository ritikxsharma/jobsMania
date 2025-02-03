import apiClient from "./apiClient";


 const jobApi = {
    createJob: (data) => apiClient.post('/jobs/create', data),
    getAllJobs: (params) => apiClient.get('/jobs', { params }),
    getJobById: (id) => apiClient.get(`/jobs/${id}`),
    updateJob: (id, data) => apiClient.patch(`/jobs/${id}`, data),
    deleteJob: (id) => apiClient.delete(`/jobs/${id}`),
    getStats: () => apiClient.get('jobs/stats')
}

export default jobApi