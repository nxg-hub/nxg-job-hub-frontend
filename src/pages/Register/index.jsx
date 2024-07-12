import RegistrationForm from "./RegistrationForm";
import s from "./index.module.scss";
import logo from "../../static/images/logo_colored.png";

const Register = () => {
  return (
    <div className={s.page}>
      <img src={logo} alt="" className={s.logo} />
      <div>
        <RegistrationForm />
      </div>
      
    </div>
  );
};
export default Register;
