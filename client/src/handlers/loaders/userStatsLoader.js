import jobApi from "../../api/jobApi"

export const userStatsLoader = async() => {
    try {        
        return (await jobApi.getStats()).data
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Error in fetching stats. Please try again later.')
    }
}