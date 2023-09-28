import EmployerRegistration from "./EmployerRegistration";
import s from "./index.module.scss"

const Employer = () => {
  return <div className={s.page}>
    <h2>Create Account as Employer</h2>
    <EmployerRegistration />
  </div>
}
export default Employer