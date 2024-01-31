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
import { PiCaretDown, PiSubtitlesBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../..";
import { Dialog } from "@headlessui/react";
import logo from "../../../../static/images/nxg-logo.png";
const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <Dashboard />
    },
    {
      path: "notifications",
      name: "Notifications",
      icon: <Notification />
    },
    {
      path: "profile",
      name: " My Profile",
      icon: <MyProfile />
    },
    {
      path: "applications",
      name: "Applications",
      icon: <Applications />
    },
    {
      path: "saved",
      name: "Saved Jobs",
      icon: <SavedJobs fill="white" />
    },
    {
      path: "analytics",
      name: "Analytics",
      icon: <Analytics />
    },
    {
      path: "subscription",
      name: "Subscription",
      icon: <PiSubtitlesBold />
    },
  ]

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
    <div  className={s.Sidebar}>
      <div className={s.menuIcon}>
        <img src={logo} alt="logo" />
      </div>
      
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
        {menuItem.map((item, index) => (
          <NavLink end to={item.path} key={index} className={`${s.dashboardItem} `}>
            <div>{item.icon}</div>
            <p>{item.name}</p>
        </NavLink>
        ))}
        <li className={`${s.dashboardItem} `}>
          <div className={s.dropdownTitle}>
            <div><Settings /></div>
            <span>
             <p> Settings</p>
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
              <Password /> <p>Password Settings</p>
            </NavLink>
            <NavLink end to="privacy" className={`${s.dashboardItem} `}>
              {" "}
              <Privacy /> <p>Privacy</p>

            </NavLink>
            <NavLink
              end
              to="terms-and-conditions"
              className={`${s.dashboardItem} `}
            >
              {" "}
              <Terms /> <p>Terms and conditions</p>
            </NavLink>
          </ul>
        </li>
        <NavLink end to="help" className={`${s.dashboardItem} `}>
          <div><Help /></div>
         <p> Help </p>
        </NavLink>
      </ul>
      <NavLink
        className={`${s.dashboardItem} ${s.Logout}  `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div><Logout /></div>
        <p> Logout </p>
      </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            border: "none",
            borderRadius: "24px",
            padding:"2rem 1rem",
            zIndex: "100"
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
