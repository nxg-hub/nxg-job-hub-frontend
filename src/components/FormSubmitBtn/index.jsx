import s from "./index.module.scss";
/**
 *
 *
 * @param {String} value
 * @param {Props} props
 * @return {HTMLButtonElement|JSX}
 */
const FormSubmitBtn = ({
  value,
  formData,
  fieldDependency,
  login,
  register,
  ...props
}) => {
  return (
    <>
      register &&{" "}
      <button
        className={s.FormSubmitBtn}
        title={
          formData[`${fieldDependency}`]
            ? `Click to create your employer account`
            : `Please check the box to proceed`
        }
        disabled={formData[`${fieldDependency}`] ? false : true}
        type="submit"
      >
        Register
      </button>
      {/* For login forms */}
      login &&{" "}
      <button
        className={s.FormSubmitBtn}
        title={
          formData[`${fieldDependency}`]
            ? `Click to create your employer account`
            : `Please check the box to proceed`
        }
        disabled={formData.acceptedPrivacy ? false : true}
        type="submit"
      >
        Register
      </button>
    </>
  );
};

export default FormSubmitBtn;
