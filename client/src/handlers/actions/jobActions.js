import { toast } from "react-toastify"
import { jobApi } from "../../api/jobApi"


export const createJobAction = async({ request }) => {
    try {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        await jobApi.createJob(data)
        toast.success('job created successfully.')
        return null
    } catch (error) {
        console.log(error);
        
        toast.error('Error occured in creating a job. Please try again.')
    }
}