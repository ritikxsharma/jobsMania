import jobApi from "../../api/jobApi"
import{ toast } from 'react-toastify'

export const editJobQuery = (id) => {
    return {
        queryKey: ['job', id],
        queryFn: async() => (await jobApi.getJobById(id)).data
    }
}

export const editJobLoader = (queryClient) => async({ params }) => {
    try {
        await queryClient.ensureQueryData(editJobQuery(params.id))        
        return null
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return redirect('/dashboard/all-jobs')
    }
}