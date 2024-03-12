import Sidebar from "./Sidebar";
import s from "../index.module.scss";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "..";

const Employer = () => {
  const user = useContext(UserContext)
  return (
    <div className={s.Dashboard}>
      <div className={`${s.Sidebad} ${""}`}>
        <Sidebar className={s.leftSide} profilePic={user.profilePicture} />
      </div>
      {/* Mainpage or <Outlet/> */}
      <div className={s.Sidemain}>
        {/* Work on the various employer routes / pages in the routes folder  */}
        <Outlet />
      </div>
    </div>
  );
};

export default Employer;
