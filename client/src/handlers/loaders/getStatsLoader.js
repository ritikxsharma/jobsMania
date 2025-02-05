import jobApi from "../../api/jobApi"

export const statsQuery = {
    queryKey: ['stats'],
    queryFn: async() => (await jobApi.getStats()).data
}

export const getStatsLoader = (queryClient) => async() => {
    await queryClient.ensureQueryData(statsQuery)
    return null    
}