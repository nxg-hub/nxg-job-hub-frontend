import { BsEye, BsEyeSlash } from "react-icons/bs";

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
        data-name="password"
        onClick={showPassword}
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
