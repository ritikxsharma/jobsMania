import React from "react";

const FormRow = ({ type, name, labelText, value, onChange, disabled}) => {  
  
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || text}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`form-input ${disabled ? 'disabled-input' : ''}`}
        value={value || ""}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;