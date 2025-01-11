import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";

const Login = () => {
  const fields = [
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
        <h4>Login</h4>
        {fields.map((field, index) => {
          return (
            <FormRow
              key={index}
              type={field.type}
              name={field.name}
              defaultValue={field.defaultValue}
              labelText={field.labelText}
            />
          );
        })}
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="submit" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className="member-btn">
            register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
