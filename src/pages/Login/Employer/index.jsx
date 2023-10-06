import EmployerLoginForm from "./EmployerLoginForm";
import s from "./index.module.scss";
import logo from "../../../static/images/logo_colored.png";

const EmployerLogin = () => {
  return (
    <div className={s.EmployerLogin}>
      <div className={s.LoginWrapper}>
        <div>
          <img src={logo} alt="" />
        </div>
        <EmployerLoginForm />
      </div>
    </div>
  );
};

export default EmployerLogin;
