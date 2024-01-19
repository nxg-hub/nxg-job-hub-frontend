import { useContext, useState } from "react";
import s from "./index.module.scss";
import {
  CiUser,
  MdOutlineEdit,
  ChangeProfilePicture,
  MyProfile,
  Dashboard,
  Applications,
  Analytics,
  Help,
  Settings,
  Notification,
  SavedJobs,
  Logout,
  Password,
  Terms,
  Privacy,
} from "./SidebarIcons";
import { PiCaretDown } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../..";
import { Dialog } from "@headlessui/react";
import logo from "../../../../static/images/nxg-logo.png";
const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const moveToDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear user authentication information
    localStorage.removeItem("NXGJOBHUBLOGINKEYV1");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className={s.Sidebar}>
      <img src={logo} alt="logo" />
      <div className={s.Profile}>
        <div>
          <div className={s.displayPic}>
            <CiUser />
          </div>
          <ChangeProfilePicture title="Change profile picture" />
        </div>
        <strong>{user.firstName}</strong>
        <p>Add role <MdOutlineEdit /></p>
      </div>
      <ul className={s.list}>
        <NavLink end to="/dashboard" className={`${s.dashboardItem} `}>
          <Dashboard />
          Dashboard
        </NavLink>
        <NavLink end to="notifications" className={`${s.dashboardItem} `}>
          <Notification />
          Notifications
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
        <NavLink end to="subscription" className={`${s.dashboardItem} `}>
          <Analytics />
          Subscription
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
      <NavLink
        className={`${s.dashboardItem} ${s.Logout}  `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Logout />
        Logout
      </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{
            position: "absolute",
            left: "30%",
            top: "30%",
            transform: "translate(-50% -50%)",
            width: "100%",
            maxWidth: "800px",
            height: "584px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            border: "none",
            borderRadius: "24px",
          }}
        >
          <Dialog.Panel>
            <Dialog.Title style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Are you sure you want to logout?
              </p>
              <div
                style={{
                  width: "100%",
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  margin: "3rem auto",
                }}
              >
                <button
                  onClick={moveToDashboard}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    padding: "8px",
                    background: "#006A90",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "500",
                    margin: "2.5rem 0",
                  }}
                >
                  Back To Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    padding: "8px",
                    background: "#006A90",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  Continue To Logout
                </button>
              </div>
            </Dialog.Title>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
};
export default Sidebar;
