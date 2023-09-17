import React from "react";

const Inputs = ({ title, type, value, onChange, placeholder }) => {
  return (
    <div className="inputs">
      <label>{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Inputs;
