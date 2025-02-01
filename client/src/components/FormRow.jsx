import React from "react";

const FormRow = ({ type, name, labelText, defaultValue, disabled}) => {    
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
        required
        autoComplete=""
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;