import { redirect } from "react-router-dom"
import userApi from "../../api/userApi"
import { toast } from 'react-toastify'

export const adminLoader = async() => {
    try {
        const { data } = await userApi.adminAppStats()
        return data
    } catch (error) {
        console.log(error);
        
        toast.error('You are not authorized to access this page!')
        return redirect('/dashboard/all-jobs')
    }
}