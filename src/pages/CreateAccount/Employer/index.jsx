import EmployerRegistration from "./EmployerRegistration";
import s from "./index.module.scss"
import logo from "../../../static/images/logo_colored.png"
const Employer = () => {
  return <div className={s.page}>
    <img src={logo} alt="" className={s.logo} />
    <div>
    <EmployerRegistration />
   </div>
  </div>
}
export default Employer