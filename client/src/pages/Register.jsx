import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";

const Register = () => {
  const fields = [
    {
      name: "firstName",
      type: "text",
      defaultValue: "john",
      labelText: "first name",
    },
    {
      name: "lastName",
      type: "text",
      defaultValue: "doe",
      labelText: "last name",
    },
    {
      name: "location",
      type: "text",
      defaultValue: "earth",
      labelText: "location",
    },
    {
      name: "email",
      type: "email",
      defaultValue: "john@mail.com",
      labelText: "email",
    },
    {
      name: "password",
      type: "password",
      defaultValue: "johndoe",
      labelText: "password",
    },
  ];

  return (
    <Wrapper>
      <form className="form">
        <h4>Register</h4>
        {fields.map((field, index) => {          
          return <FormRow
            key={index}
            name={field.name}
            type={field.type}
            defaultValue={field.defaultValue}
            labelText={field.labelText}
          />;
        })}
        {/* <FormRow
          name="firstName"
          type="text"
          defaultValue="john"
          labelText="first name"
        />
        <FormRow
          name="lastName"
          type="text"
          defaultValue="doe"
          labelText="last name"
        />
        <FormRow
          name="location"
          type="text"
          labelText="location"
          defaultValue="earth"
        />
        <FormRow
          name="email"
          type="email"
          labelText="email"
          defaultValue="john@mail.com"
        />
        <FormRow
          name="password"
          type="password"
          defaultValue="johndoe"
          labelText="password"
        /> */}
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
    </Wrapper>
  );
};

export default Register;
