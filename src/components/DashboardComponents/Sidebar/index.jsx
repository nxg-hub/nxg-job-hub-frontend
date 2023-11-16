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
  Password,
  Terms,
  Privacy, AccountDetails
} from "./SidebarIcons";
import { PiCaretDown } from "react-icons/pi";
import {  useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/dashboard"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Dashboard")}`}
        >
          <Dashboard />
          Dashboard
        </Link>
        <Link to="messages"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Messages")}`}
        >
          <Messages />
          Messages
        </Link>
        <Link to="profile"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("My Profile")}`}
        >
          <MyProfile />
          My Profile
        </Link>
        <Link to="applications"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("My Applications")}`}
        >
          <Applications />
          My Applications
        </Link>
        <Link to="saved"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Saved Jobs")}`}
        >
          <SavedJobs fill="white" /> Saved Jobs
        </Link>
        <Link to="analytics"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Analytics")}`}
        >
          <Analytics />
          Analytics
        </Link>
        <li
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Settings")}`}
        >
          <div className={s.dropdownTitle}>
          <Settings />
          <span>Settings<PiCaretDown /></span>
         </div>
          <ul>
          <Link to="profile-details"   onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Profile Details")}`}> <AccountDetails/> Profile Details</Link>
          <Link to="password-settings"   onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Password Settings")}`}> <Password/> Password Settings</Link>
          <Link to="privacy"   onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Privacy")}`}> <Privacy/> Privacy</Link>
          <Link to="terms-and-conditions"   onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Terms and conditions")}`}> <Terms/> Terms and conditions</Link>
          </ul>
        </li>
        <Link to="help"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${selection("Help")}`}
        >
          <Help />
          Help
        </Link>
      </ul>
        <Link to="logout"
          onClick={selectMenuItem}
          className={`${s.dashboardItem} ${s.Logout}  ${selection("Logout")}`}
        >
          <Logout />
          Logout
        </Link>
    </div>
  );
};

export default Sidebar;
