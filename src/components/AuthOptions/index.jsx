import s from "./index.module.scss";
import GoogleIcon from "../../static/icons/flat-color-icons_google.svg?react";
import LinkedInIcon from "../../static/icons/devicon_linkedin.svg?react";


const AuthOptions = ({ login, register }) => {

 
  const googleOAuth = async () => {
   window.location.href ="https://nxg-job-hub-8758c68a4346.herokuapp.com/oauth2/authorization/google"
  }
  return (
    <div className={s.AuthOptions}>
      <div className={s.formDivider}>
        <p className={s.line}></p>
        <p>or</p>
        <p className={s.line}></p>
      </div>
      <div>
        <button
          type={"button"}
          onClick={() => googleOAuth()}
          className={s.optionButton}
        >
          <GoogleIcon />
          {login && "Log in"}
          {register && "Sign up"} with Google
        </button>
        <button type={"button"} className={s.optionButton}>
          <LinkedInIcon />
          {login && "Log in"}
          {register && "Sign up"} with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
