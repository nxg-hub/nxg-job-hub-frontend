import s from "./index.module.scss";
import logo from "../../static/images/nxg-logo.png";
const SplashScreen = () => {
  return (
    <div className={s.Page}>
      <div className={s.ClipWrapper}>
        <img src={logo} alt="NXG-LOGO" />
      </div>
    </div>
  );
};

export default SplashScreen;
