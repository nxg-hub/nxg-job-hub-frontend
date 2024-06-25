import s from "./index.module.scss";

const TextArea = ({
  name,
  id,
  label,
  cols,
  rows,
  placeholder,
  value,
  onchange,
  onblur,
  err,
  textAreaProps,
  FieldWrapperProps,
  ...props
}) => {
  return (
    <div {...FieldWrapperProps} {...props} className={s.TextAreaWrapper}>
      <label className={s.FieldLabel} htmlFor={id}>{label}</label>
      <textarea
        {...textAreaProps}
        name={name}
        id={id}
        label={label}
        cols={cols}
        rows={rows}
        value={value}
        onChange={onchange}
        onBlur={onblur}
        className={s.TextArea}
        placeholder={placeholder}
      />
            
      {err && <h5 className={s.inputErr}>{err}</h5>}
    </div>
  );
};

export default TextArea;
