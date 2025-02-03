import jobApi from "../../api/jobApi"
import { toast } from 'react-toastify'

export const allJobsLoader = async({ request }) => {
    try {
        const params = Object.fromEntries(new URL(request.url).searchParams.entries());
        
        const { data } = await jobApi.getAllJobs(params)
        return { data, searchValue: params.search }
    } catch (error) {
        console.log(error);
        
        toast.error('Error in fetching all jobs')
    }
}