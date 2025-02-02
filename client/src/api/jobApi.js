import apiClient from "./apiClient";


 const jobApi = {
    createJob: (data) => apiClient.post('/jobs/create', data),
    getAllJobs: () => apiClient.get('/jobs'),
    getJobById: (id) => apiClient.get(`/jobs/${id}`),
    updateJob: (id, data) => apiClient.patch(`/jobs/${id}`, data),
    deleteJob: (id) => apiClient.delete(`/jobs/${id}`)
}

export default jobApi