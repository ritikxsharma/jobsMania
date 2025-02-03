import React from 'react'
import { Form, Link, useSubmit } from 'react-router-dom'
import { Wrapper } from '../assets/wrappers/DashboardFormPage'
import FormRow from './FormRow'
import { useAllJobsContext } from '../pages/AllJobs'

const SearchContainer = () => {
  const { searchValue } = useAllJobsContext()  
  const submit = useSubmit()

  return (
    <Wrapper>
      <Form className='form'>
        <div className="form-center">
          <FormRow type='search' name='search' defaultValue={searchValue || ''} required={false} onChange={(e) => submit(e.currentTarget.form)}></FormRow>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer