import s from "./index.module.scss";
import { ReactComponent as GoogleIcon } from "../../static/icons/flat-color-icons_google.svg";
import { ReactComponent as LinkedInIcon } from "../../static/icons/devicon_linkedin.svg";

const AuthOptions = ({ login, register }) => {
  return (
    <div className={s.AuthOptions}>
      <div className={s.formDivider}>
        <p className={s.line}></p>
        <p>or</p>
        <p className={s.line}></p>
      </div>
      <div>
        <button type={"button"} className={s.optionButton}>
          <GoogleIcon />
          {login && "Sign in"} 
          {register && "Sign up"} 
          {" "}
           with Google
        </button>
        <button type={"button"} className={s.optionButton}>
          <LinkedInIcon />
          {login && "Sign in"} 
          {register && "Sign up"} 
          {" "}
           with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
