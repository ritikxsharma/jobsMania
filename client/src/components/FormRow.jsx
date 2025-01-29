import React from "react";

const FormRow = ({ type, name, labelText, value, onChange}) => {  
  
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || text}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-input"
        value={value || ""}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;