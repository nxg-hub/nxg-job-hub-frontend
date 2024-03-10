import Sidebar from "./Sidebar";
import s from "../index.module.scss";
import { Outlet } from "react-router-dom";
import { UserContext } from "..";
import { useContext } from "react";

const TechTalent = () => {
  const user = useContext(UserContext)
  return (
    <div className={s.Dashboard}>
      <div className={`${s.Sidebad} ${""}`}>
        <Sidebar className={s.leftSide} profilePic={user.profilePicture} />
      </div>
      {/* Mainpage or <Outlet/> */}
      <div className={s.Sidemain} >
        <Outlet />
      </div>
    </div>
  );
};

export default TechTalent;
