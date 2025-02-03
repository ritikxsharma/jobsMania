import React from "react";
import { useSubmit } from "react-router-dom";

const FormRow = ({ type, name, labelText, defaultValue, disabled, required=true, onChange}) => {    
  
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
        onChange={onChange}
        autoComplete=""
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;