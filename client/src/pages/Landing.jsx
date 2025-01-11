import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            Jobs <span>Finding</span> App
          </h1>
          <p>
            Find your next opportunity with ease! Explore thousands of job
            listings tailored to your skills and interests. Whether you're
            starting your career or seeking a new challenge, we've got the
            perfect role for you. Start your journey today and land the job you
            deserve!
          </p>
          <Link to="register" className="btn register-link">
            Register
          </Link>
          <Link to="login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="jobs finder" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
