import { redirect } from "react-router-dom";
import userApi from "../../api/userApi"

export const dashboardLoader = async() => {
    try {       
        const res = await userApi.currentUser()        
        return res.data
    } catch (error) {
        return redirect('/')
    }
}