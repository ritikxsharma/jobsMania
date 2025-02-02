import jobApi from "../../api/jobApi"
import { toast } from 'react-toastify'

export const allJobsLoader = async() => {
    try {
        const { data } = await jobApi.getAllJobs()
        return { data }
    } catch (error) {
        console.log(error);
        
        toast.error('Error in fetching all jobs')
    }
}