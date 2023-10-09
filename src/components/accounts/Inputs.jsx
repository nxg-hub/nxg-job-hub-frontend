import React, { useState } from "react";

const Inputs = ({ title, type, value, onChange, errormessage, pattern, placeholder, ...props }) => {
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
        {...props}
      />
      <p>{errormessage}</p>
    </div>
  );
};

export default Inputs;
