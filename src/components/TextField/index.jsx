import { useState } from "react";
import s from "./index.module.scss";
import { Eye } from "../../utils/functions/PasswordEye";
const TextField = ({
  type,
  value,
  name,
  onchange,
  required,
  id,
  autoFocus,
  disabled,
  placeholder,
  label,
  err,
}) => {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <div className={s.TextField}>
      {label && (
        <label className={s.TextLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <span className={s.inputWrapper}>
        <input
          className={s.inputField}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={onchange}
          value={value}
          id={id}
          name={name}
          type={type === "password" && visibility[`${name}`] ? "text" : type}
          required={required ? true : false}
        />
        {Eye(name, visibility, setVisibility)}
      </span>
      {err && <h5>{err}</h5>}
    </div>
  );
};

export default TextField;
