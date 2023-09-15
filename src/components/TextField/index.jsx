import React from "react";
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
        {eye && <button>show</button>}
      </span>
    </div>
  );
};

export default TextField;
