import React from 'react'
import Job from './Job'
import { useAllJobsContext } from '../pages/AllJobs'
import { Wrapper } from '../assets/wrappers/JobsContainer'
import PaginationConatiner from './PaginationConatiner'

const JobsContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs, totalJobs, totalPages } = data
  
  if(jobs.length === 0){
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{totalJobs > 1  && 's'} found</h5>
      <div className="jobs">
        {
          jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))
        }
      </div>
      { totalPages > 1 && <PaginationConatiner /> }
    </Wrapper>
  )
}

export default JobsContainer