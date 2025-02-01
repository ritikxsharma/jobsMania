import apiClient from "./apiClient";


export const jobApi = {
    createJob: (data) => apiClient.post('/jobs/create', data),
    getAllJobs: () => apiClient.get('/jobs'),
}