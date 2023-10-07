import s from "./index.module.scss";

const Checkbox = ({ id, onchange, label, ...props }) => {
  return (
    <div className={s.CheckboxWrapper}>
      <input
        className={s.Checkbox}
        type={"checkbox"}
        onChange={onchange}
        id={id}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
