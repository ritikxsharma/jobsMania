import React from 'react'
import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import { FormRow, FormSelect } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants'
import { Wrapper } from '../assets/wrappers/DashboardFormPage'

const AddJob = () => {

  const { user } = useOutletContext()
  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'> add job </h4>
        <div className="form-center">
          <FormRow type='text' name='position'/>
          <FormRow type='text' name='company'/>
          <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={user.location} />
          <FormSelect labelText='job status' name='jobStatus' defaultValue={JOB_STATUS.PENDING} options={Object.values(JOB_STATUS)} />
          <FormSelect labelText='job type' name='jobType' defaultValue={JOB_TYPE.FULL_TIME} options={Object.values(JOB_TYPE)} />
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob