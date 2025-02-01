import { jobApi } from "../../api/jobApi"
import { toast } from 'react-toastify'

export const allJobsLoader = async() => {
    try {
        const { data } = await jobApi.getAllJobs()
        return { data }
    } catch (error) {
        toast.error('Error in fetching all jobs')
    }
}