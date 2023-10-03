
import EmployerLoginForm from "./EmployerLoginForm"
import s from "./index.module.scss"


const EmployerLogin = () => {
  return (
    <div className={s.EmployerLogin} >
      <div className={s.banner}></div>
      <EmployerLoginForm />
    </div>
  )
}

export default EmployerLogin