import React, { useState } from "react";

const Inputs = ({ title, type, value, onChange, errorMessage, pattern, placeholder }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className="inputs">
      <label>{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <p>{errorMessage}</p>
    </div>
  );
};

export default Inputs;
