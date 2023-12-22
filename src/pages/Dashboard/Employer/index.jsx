import Sidebar from "./Sidebar";
import pic from "../../../static/images/Sarah.png";
import s from "../index.module.scss";
import { Outlet } from "react-router-dom";

const Employer = () => {
  return (
    <div className={s.Dashboard}>
      <div className={`${s.Sidebad} ${""}`}>
        <Sidebar className={s.leftSide} profilePic={pic} />
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
