import s from "./index.module.scss";
import AccountChoiceModular from "../../components/AccountChoiceModular";
import Logo from "../../static/images/logo_colored.png";
const CreateAccount = () => {
  return (
    <div className={s.page}>
      <nav className={s.navBar}>
        <img src={Logo} alt="" />
      </nav>
      <div className={s.main}>
      <AccountChoiceModular />
      </div>
    </div>
  );
};

export default CreateAccount;
