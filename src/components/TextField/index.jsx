import { useState } from "react";
import s from "./index.module.scss";
import { Eye } from "../../utils/functions/PasswordEye";
import focusParent from "../../utils/functions/focusParent";
import blurParent from "../../utils/functions/blurParent";
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

  return (
    <div className={s.TextFieldWrapper}>
      {label && (
        <label className={s.FieldLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <span className={`${s.InputFieldWrapper} ${err && s.hasErr}`}>
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
