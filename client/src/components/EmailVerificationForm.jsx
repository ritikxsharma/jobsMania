import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FormRow from "./FormRow";
import { Link } from "react-router-dom";

const EmailVerificationForm = ({ formData, handleInputChange }) => {  
    const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/pre-register", {email: formData.email});

      console.log(res);

      if (res.status === 200) {
        toast.success(
          "Please check your email and click on the link to verify."
        );
      } else {
        toast.error(
          "Unable to send verification link. Please try again later!"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
        window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <form className="form" onSubmit={handleEmailSubmit}>
      <h4>Email Verification</h4>
      <FormRow
        name="email"
        type="email"
        value={formData.email}
        labelText="Email"
        onChange={handleInputChange}
      />
      <button type="submit" className="btn btn-block">
        Verify
      </button>
      <p>
        Already a member?{" "}
        <Link to="/login" className="member-btn">
          login
        </Link>
      </p>
    </form>
  );
};

export default EmailVerificationForm;
