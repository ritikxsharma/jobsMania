import React from "react";
import FormRow from "./FormRow";
import { Link } from "react-router-dom";

const RegisterationForm = ({ formData, handleInputChange, handleSubmit}) => {
  return (
    <form method="post" className="form" onSubmit={handleSubmit}>
      <h4>Register</h4>
      {Object.keys(formData).map((key, index) => {
        return (
          <FormRow
            key={index}
            name={key}
            type={key === "email" ? "email" : "text"}
            value={formData[key]}
            labelText={key.replace(/(A-Z)/g, " $1").toUpperCase()}
            onChange={handleInputChange}
          />
        );
      })}

      <button type="submit" className="btn btn-block">
        Submit
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

export default RegisterationForm;
