import s from "./index.module.scss";
import logo from "../../../static/images/nxg-logo.png";
import {
  ChangeProfilePicture,
  EditProfile,
  MyProfile,
  Dashboard,
  Applications,
  Analytics,
  Help,
  Settings,
  Messages,
  SavedJobs,
  Logout,
} from "./SidebarIcons";
import { useEffect, useState } from "react";
const Sidebar = ({ profilePic, ...props }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const selectMenuItem = (e) => {
    const optionName = e.target.innerText;
    console.log(e.target, optionName);
    e.target.draggable = true
    setSelectedMenuItem(optionName);
    // selection()
  };
 
    const selection = (optionName) => {
      return selectedMenuItem === optionName ? s.Selected : "";
    };

  return (
    <div className={s.Sidebar}>
      <img src={logo} alt="nxg-logo" />
      <div className={s.Profile}>
        <span>
          <img src={profilePic} alt="" />
          <ChangeProfilePicture title="Change profile picture" />
        </span>
        <strong>Sarah</strong>
        <p>Product Designer</p>
        <p>
          <EditProfile />
          Edit Profile
        </p>
      </div>
      <ul className={s.list}>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Dashboard")}`}
        >
          <Dashboard />
          Dashboard
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Messages")}`}
        >
          <Messages />
          Messages
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("My Profile")}`}
        >
          <MyProfile />
          My Profile
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("My Applications")}`}
        >
          <Applications />
          My Applications
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Saved Jobs")}`}
        >
          <SavedJobs fill="white" /> Saved Jobs
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Analytics")}`}
        >
          <Analytics />
          Analytics
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Settings")}`}
        >
          <Settings />
          Settings
        </li>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Help")}`}
        >
          <Help />
          Help
        </li>
      </ul>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${s.Logout}  ${selection("Logout")}`}
        >
          <Logout />
          Logout
        </li>
    </div>
  );
};

export default Sidebar;
