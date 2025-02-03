import React from "react";
import { useSubmit } from "react-router-dom";

const FormRow = ({ type, name, labelText, defaultValue, disabled, required=true, onChange}) => {    
  
  const submit = useSubmit()

  const debounce = (onChange) => {
    let timeout = 2000    
    return (e) => {
      const form = e.target.form
      clearTimeout(timeout)
      timeout = setTimeout(()=>{
        onChange(form)
      }, timeout)
    }
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`form-input ${disabled ? 'disabled-input' : ''}`}
        defaultValue={defaultValue || ""}
        required={required}
        onChange={debounce((form) => {
          submit(form)
        })}
        autoComplete=""
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;