import React from 'react'
import Job from './Job'
import { useAllJobsContext } from '../pages/AllJobs'
import { Wrapper } from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs } = data
  
  if(jobs.length === 0){
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="jobs">
        {
          jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))
        }
      </div>
    </Wrapper>
  )
}

export default JobsContainer