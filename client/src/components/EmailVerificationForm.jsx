import React from "react";
import FormRow from "./FormRow";
import { Form, Link, useNavigation } from "react-router-dom";

const EmailVerificationForm = () => {  

  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <Form  method="post" className="form">
      <h4>Email Verification</h4>
      <input type="text" name="formType" defaultValue='email verification' hidden />
      <FormRow
        name="email"
        type="email"
        defaultValue=''
        labelText="Email"
      />
      <button type="submit" className="btn btn-block" disabled={isSubmitting}>
        { isSubmitting ? 'Verifying...' : 'Verify'}
      </button>
      <p>
        Already a member?{" "}
        <Link to="/login" className="member-btn">
          login or explore
        </Link>
      </p>
    </Form>
  );
};

export default EmailVerificationForm;
