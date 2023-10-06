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
