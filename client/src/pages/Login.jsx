import React from "react";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";
import { loginDemoUser } from "../handlers/actions/authActions";

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Login</h4>

        <FormRow type="text" name="email" labelText="Email" defaultValue="" />
        <FormRow type="password" name="password" labelText="Password" defaultValue="" />
        
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button type="button" className="btn btn-block" onClick={() => loginDemoUser(navigate)}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
