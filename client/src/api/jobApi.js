import apiClient from "./apiClient";


export const jobApi = {
    createJob: (data) => apiClient.post('/jobs/create', data),
    getAllJobs: () => apiClient.get('/jobs'),
    getJobById: (id) => apiClient.get(`/jobs/${id}`),
    updateJob: (id, data) => apiClient.patch(`/jobs/${id}`, data),
    deleteJob: (id) => apiClient.delete(`/jobs/${id}`)
}