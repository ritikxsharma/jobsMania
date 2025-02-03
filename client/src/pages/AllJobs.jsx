import React, { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { SearchContainer, JobsContainer } from '../components'

const AllJobsContext = createContext()


const AllJobs = () => {

  const { data, searchValue } = useLoaderData()
  

  return (
    <AllJobsContext.Provider value={{ data, searchValue }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => {
  return useContext(AllJobsContext)
}

export default AllJobs