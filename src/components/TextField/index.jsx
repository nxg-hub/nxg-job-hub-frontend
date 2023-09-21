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
  const showPassword = (e) => {
    const alias = e.currentTarget.getAttribute("data-name")

    setVisibility({
      ...visibility,
      [alias]: !visibility[`${alias}`],
    });
    console.log(visibility);
  };
  const Eye = () => {
    if (name === "password") {
      return visibility.password ? (
        <BsEyeSlash title="hide password" onClick={showPassword} data-name="password" />
      ) : (
        <BsEye title="show password" data-name="password" onClick={showPassword} />
      );
    } else if (name === "confirmPassword") {
      return visibility.confirmPassword ? (
        <BsEyeSlash data-name="confirmPassword" onClick={showPassword} />
      ) : (
        <BsEye data-name="confirmPassword" onClick={showPassword} />
      );
    } else {
      return <></>;
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
          type={type === "password" && visibility[`${name}`] ? "text" : type}
          required={required ? true : false}
        />
        {Eye()}
      </span>
    </div>
  );
};

export default TextField;
