import { jobApi } from "../../api/jobApi"
import{ toast } from 'react-toastify'

export const editJobLoader = async({ params }) => {
    try {
        const { data } = await jobApi.getJobById(params.id)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return redirect('/dashboard/all-jobs')
    }
}