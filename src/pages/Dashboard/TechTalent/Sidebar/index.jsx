import { useContext, useState } from "react";
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
  Wallet,
  Logout,
  Password,
  Terms,
  Privacy,
} from "./SidebarIcons";
import { PiCaretDown } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../";

// Add a LogoutModal component for the confirmation modal
const LogoutModal = ({ onLogout, onCancel }) => (
  <div className={s.logoutModal}>
    <p>Are you sure you want to logout?</p>
    <div className={s.modalButtons}>
      <button onClick={onLogout}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  </div>
);

const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  const hideLogoutConfirmation = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    // Clear user authentication information
    localStorage.removeItem("NXGJOBHUBLOGINKEYV1");

    // Navigate to the home page
    navigate("/");
    // After performing the logout, hide the modal
    hideLogoutConfirmation();
  };
  
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
        <NavLink end to="wallet" className={`${s.dashboardItem} `}>
          <Wallet /> My Wallet
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
      <NavLink end to="logout" className={`${s.dashboardItem} ${s.Logout}  `} onClick={showLogoutConfirmation}>
        <Logout />
        Logout
      </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {showLogoutModal && (
        <LogoutModal onLogout={handleLogout} onCancel={hideLogoutConfirmation} />
      )}
    </div>
  );
};

export default Sidebar;
