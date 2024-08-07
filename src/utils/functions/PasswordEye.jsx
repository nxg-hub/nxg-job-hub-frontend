import { BsEye, BsEyeSlash } from "react-icons/bs";
/**
 * @param {String} name The name of the text Field
 * @param {FormData} state
 * @param {SetStateAction} setState
 * @return {React.JSX}
 */
export const Eye = (name, state, setState) => {
  const showPassword = (e) => {
    const alias = e.currentTarget.getAttribute("data-name");
    setState({
      ...state,
      [alias]: !state[`${alias}`],
    });
  };

  if (name === "password") {
    return state.password ? (
      <BsEyeSlash
        title="hide password"
        onClick={showPassword}
        data-name="password"
      />
    ) : (
      <BsEye
        title="show password"
        onClick={showPassword}
        data-name="password"
      />
    );
  } else if (name === "confirmPassword") {
    return state.confirmPassword ? (
      <BsEyeSlash data-name="confirmPassword" onClick={showPassword} />
    ) : (
      <BsEye data-name="confirmPassword" onClick={showPassword} />
    );
  } else {
    return <></>;
  }
};
