import React, { useState } from "react";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user } = useOutletContext();
  const isSubmitting = useNavigation().state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Update Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Choose Image (max: 1 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="firstName" defaultValue={user.firstName} />
          <FormRow type="text" name="lastName" defaultValue={user.lastName} />
          <FormRow type="email" name="email" defaultValue={user.email} />
          <FormRow type="text" name="location" defaultValue={user.location} />

          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            { isSubmitting ? 'Updating...' : 'Update' }
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
