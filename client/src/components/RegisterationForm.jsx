import React from "react";
import FormRow from "./FormRow";
import { Form } from "react-router-dom";

const RegisterationForm = ({ verifiedEmail }) => {
  
  const registerFields = [
    "firstName",
    "lastName",
    "email",
    "location",
    "password",
  ];

  return (
    <Form method="post" className="form">
      <h4>Register</h4>
      {registerFields.map((key, index) => {
        return (
          <FormRow
            key={index}
            name={key}
            type={key === 'password' ? 'password' : 'text'}
            defaultValue={key === 'email' ? verifiedEmail : ''}
            labelText={key.replace(/(A-Z)/g, " $1").toUpperCase()}
            // disabled={key === "email"}
          />
        );
      })}

      <button type="submit" className="btn btn-block">
        Submit
      </button>
    </Form>
  );
};

export default RegisterationForm;
