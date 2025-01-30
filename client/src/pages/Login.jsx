import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const res = await axios.post('/api/auth/login', formData)
      if(res.status === 200){
        toast.success('Login successfull!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Login</h4>
        {Object.keys(formData).map((key, index) => {
          return (
            <FormRow
              key={key}
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key]}
              labelText={key.replace(/(A-Z)/g, " $1").toUpperCase()}
              onChange={handleInputChange}
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
