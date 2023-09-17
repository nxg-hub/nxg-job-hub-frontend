import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import s from "./index.module.scss";
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
}) => {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const showPassword = () => {
    // setShow({ ...show, [eye]: !show[eye] });
  };
  const Eye = () => {
    if (type === "password") {
      return (
        <button onClick={showPassword} type="button">
          {visibility.password ? <BsEyeSlash /> : <BsEye />}
        </button>
      );
    } else if (type === "password") {
      return (
        <button onClick={showPassword} type="button">
          {visibility.password ? <BsEyeSlash /> : <BsEye />}
        </button>
      );
    }
  };
  return (
    <div className={s.TextField}>
      {label && (
        <label className={s.TextLabel} htmlFor={id}>
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
          required={required ? "true" : "false"}
        />
        {}
      </span>
    </div>
  );
};

export default TextField;
