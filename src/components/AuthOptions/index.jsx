import s from "./index.module.scss";
import { ReactComponent as GoogleIcon } from "../../static/icons/flat-color-icons_google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as LinkedInIcon } from "../../static/icons/devicon_linkedin.svg";
import { useNavigate } from "react-router-dom";

const AuthOptions = ({ login, register }) => {
  const navigate = useNavigate();
  const handleSuccess = (tokenResponse) => {
    if (tokenResponse.access_token) {
      let store = {
        ...tokenResponse, authKey: tokenResponse.access_token
      }
      window.localStorage.setItem(
        "NXGJOBHUBLOGINKEYV1", store
      );
      navigate("/register/create");
    }
    console.log(tokenResponse);
  };
  const handleError = (error) => {
    console.log(error);
  };
  const GoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });
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
          onClick={() => GoogleLogin()}
          className={s.optionButton}
        >
          <GoogleIcon />
          {login && "Sign in"}
          {register && "Sign up"} with Google
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
