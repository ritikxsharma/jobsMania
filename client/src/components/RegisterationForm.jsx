import React from "react";
import FormRow from "./FormRow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterationForm = ({ formData, handleInputChange }) => {

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      
      const res = await axios.post('/api/auth/register', formData)
      if(res.status === 201){
        toast.success('Registeration successfull!')
        navigate('/login')
      }else{
        console.log(res);
      }
    } catch (error) {    
      console.log(error.response.data);
        
      toast.error(error.response.data.message)
    }
  };

  return (
    <form method="post" className="form" onSubmit={handleSubmit}>
      <h4>Register</h4>
      {Object.keys(formData).map((key, index) => {
        return (
          <FormRow
            key={index}
            name={key}
            type={key === "email" ? "email" : key === 'password' ? 'password' : "text"}
            value={formData[key]}
            labelText={key.replace(/(A-Z)/g, " $1").toUpperCase()}
            onChange={handleInputChange}
            disabled={key === "email"}
          />
        );
      })}

      <button type="submit" className="btn btn-block">
        Submit
      </button>
    </form>
  );
};

export default RegisterationForm;
