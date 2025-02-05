import { redirect } from "react-router-dom";
import userApi from "../../api/userApi"

export const userQuery = {
    queryKey: ['user'],
    queryFn: async() => (await userApi.currentUser()).data
}

export const dashboardLoader = (queryClient) => async() => {
    try {       
        await queryClient.ensureQueryData(userQuery)      
        return null
    } catch (error) {
        return redirect('/')
    }
}