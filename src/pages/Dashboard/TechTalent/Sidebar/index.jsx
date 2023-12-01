import { useContext } from "react";
import s from "./index.module.scss";
import logo from "../../../../static/images/nxg-logo.png";
import {
  ChangeProfilePicture,
  MyProfile,
  Dashboard,
  Applications,
  Analytics,
  Help,
  Settings,
  Messages,
  SavedJobs,
  Logout,
  Password,
  Terms,
  Privacy,
} from "./SidebarIcons";
import { PiCaretDown } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../";
const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);
  return (
    <div className={s.Sidebar}>
      <img src={logo} alt="nxg-logo" />
      <div className={s.Profile}>
        <span>
          <img src={profilePic} alt="" />
          <ChangeProfilePicture title="Change profile picture" />
        </span>
        <strong>{user.firstName}</strong>
        <p>Product Designer</p>
      </div>
      <ul className={s.list}>
        <NavLink end to="/dashboard" className={`${s.dashboardItem} `}>
          <Dashboard />
          Dashboard
        </NavLink>
        <NavLink end to="messages" className={`${s.dashboardItem} `}>
          <Messages />
          Messages
        </NavLink>
        <NavLink end to="profile" className={`${s.dashboardItem} `}>
          <MyProfile />
          My Profile
        </NavLink>
        <NavLink end to="applications" className={`${s.dashboardItem} `}>
          <Applications />
          My Applications
        </NavLink>
        <NavLink end to="saved" className={`${s.dashboardItem} `}>
          <SavedJobs fill="white" /> Saved Jobs
        </NavLink>
        <NavLink end to="analytics" className={`${s.dashboardItem} `}>
          <Analytics />
          Analytics
        </NavLink>
        <li className={`${s.dashboardItem} `}>
          <div className={s.dropdownTitle}>
            <Settings />
            <span>
              Settings
              <PiCaretDown />
            </span>
          </div>
          <ul>
            <NavLink
              end
              to="password-settings"
              className={`${s.dashboardItem} `}
            >
              {" "}
              <Password /> Password Settings
            </NavLink>
            <NavLink end to="privacy" className={`${s.dashboardItem} `}>
              {" "}
              <Privacy /> Privacy
            </NavLink>
            <NavLink
              end
              to="terms-and-conditions"
              className={`${s.dashboardItem} `}
            >
              {" "}
              <Terms /> Terms and conditions
            </NavLink>
          </ul>
        </li>
        <NavLink end to="help" className={`${s.dashboardItem} `}>
          <Help />
          Help
        </NavLink>
      </ul>
      <NavLink end to="logout" className={`${s.dashboardItem} ${s.Logout}  `}>
        <Logout />
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;
