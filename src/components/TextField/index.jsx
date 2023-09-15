import React, { useState } from "react";
import s from "./index.module.scss";
const TextField = ({
  type,
  value,
  name,
  onchange,
  id,
  autoFocus,
  disabled,
  placeholder,
  label,
  eye,
}) => {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const showPassword = () => {
    setShow({ ...show, [eye]: !show[eye] });
  };
  return (
    <div>
      {label && (
        <label className={s.TextField} htmlFor={id}>
          {" "}
          {label}
        </label>
      )}
      <span>
        <input
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={onchange}
          value={value}
          id={id}
          name={name}
          type={type}
        />
        {eye && (
          <button onClick={showPassword} type="button">
            show
          </button>
        )}
      </span>
    </div>
  );
};

export default TextField;
