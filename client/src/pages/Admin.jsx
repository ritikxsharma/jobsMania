import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { StatItem } from '../components'
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import { Wrapper } from '../assets/wrappers/StatsContainer'

const Admin = () => {
  const { users, jobs } = useLoaderData()
  return (
    <Wrapper>
      <StatItem title='current users' count={users} color='#e9b949' bcg='#fcefc7' icon={<FaSuitcaseRolling/>} /> 
      <StatItem title='total jobs' count={jobs} color='#647acb' bcg='#e0e8f9' icon={<FaCalendarCheck/>} /> 
    </Wrapper>
  )
}

export default Admin