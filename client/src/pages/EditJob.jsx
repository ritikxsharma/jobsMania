import React from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { FormRow, FormSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
const EditJob = () => {
  const { job } = useLoaderData();
  const isSubmitting = useNavigation().state === "submitting";
  return (
    <>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            options={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            options={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditJob;
