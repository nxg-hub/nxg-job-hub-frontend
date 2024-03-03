import s from "./index.module.scss";
import { ReactComponent as GoogleIcon } from "../../static/icons/flat-color-icons_google.svg";
import {  useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as LinkedInIcon } from "../../static/icons/devicon_linkedin.svg";

const AuthOptions = ({ login, register }) => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const GoogleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
  });
  return (
    <div className={s.AuthOptions}>
      <div className={s.formDivider}>
        <p className={s.line}></p>
        <p>or</p>
        <p className={s.line}></p>
      </div>
      <div>
        <button type={"button"} onClick={()=> GoogleLogin()} className={s.optionButton}>
          <GoogleIcon />
          {login && "Sign in"} 
          {register && "Sign up"} 
          {" "}
           with Google
        </button>
        <button type={"button"} className={s.optionButton}>
          <LinkedInIcon />
          {login && "Sign in"}
          {register && "Sign up"} with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
