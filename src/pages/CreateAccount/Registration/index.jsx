import RegistrationForm from "./RegistrationForm";
import s from "./index.module.scss";
import logo from "../../../static/images/logo_colored.png";
import { useLocation } from "react-router-dom";
const Registration = () => {
  const userType = useLocation().pathname.split("/")[2].toUpperCase()
  return (
    <div className={s.page}>
      <img src={logo} alt="" className={s.logo} />
      <div>
        <RegistrationForm userType={userType} />
      </div>
    </div>
  );
};
export default Registration;
