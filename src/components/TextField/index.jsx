import { useState } from "react";
import s from "./index.module.scss";
import { Eye } from "../../utils/functions/PasswordEye";
const TextField = ({
  type,
  value,
  name,
  onchange,
  id,
  label,
  err,
  onblur,
  ...props
}) => {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const focusParent = (e) => {
    const parent = e.target.parentNode;
    parent.style.borderColor = "#000000";
    parent.style.borderWidth = "2px";
  };
  const blurParent = (e) => {
    const parent = e.target.parentNode;
    parent.style.borderColor = "rgb(194, 192, 192)";
    parent.style.borderWidth = ".5px";
  };

  return (
    
    <div className={s.TextField}>
      {label && (
        <label className={s.TextLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <span className={s.inputWrapper}>
        <input
          onFocus={focusParent}
          onBlur={(e) => {
            blurParent(e);
            onblur && onblur();
          }}
          className={s.inputField}
          onChange={onchange}
          value={value}
          id={id}
          name={name}
          err={err && err.length > 0 ? "true" : "false"}
          type={type === "password" && visibility[`${name}`] ? "text" : type}
          {...props}
        />
        {Eye(name, visibility, setVisibility)}
      </span>
      {err && <h5 className={s.inputErr}>{err}</h5>}
    </div>
  );
};

export default TextField;
