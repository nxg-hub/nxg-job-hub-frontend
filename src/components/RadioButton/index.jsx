import s from "./index.module.scss";

const RadioButton = ({ id, onchange, label, ...props }) => {
  return (
    <div className={s.RadioButtonWrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        className={s.RadioButton}
        type={"radio"}
        onChange={onchange}
        id={id}
        {...props}
      />
    </div>
  );
};

export default RadioButton;
