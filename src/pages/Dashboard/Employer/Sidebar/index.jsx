import { useContext, useState } from "react";
import s from "./index.module.scss";
import {
  CiUser,
  ChangeProfilePicture,
  MyProfile,
  Dashboard,
  MdOutlineEdit,
  Help,
  Settings,
  Logout,
  Password,
  Terms,
  Privacy,
  Wallet,
  Notification,
  JobPosts,
  PostJobs,
  Services,
  Contract,
  Applicants,
  Interviews,
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
  const editProfile = () => {
    // update role and other fields
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
        <p onClick={editProfile}>
          Edit profile <MdOutlineEdit />
        </p>
      </div>
      <ul className={s.list}>
        <h2>Engagements</h2>
        <div className={s.Engagements}>
          <NavLink end to="/dashboard" className={`${s.dashboardItem} `}>
            <Dashboard />
            Dashboard
          </NavLink>
          <NavLink end to="notifications" className={`${s.dashboardItem} `}>
            <Notification />
            Notifications
          </NavLink>
          <NavLink end to="wallet" className={`${s.dashboardItem} `}>
            <Wallet />
            Wallet
          </NavLink>
        </div>
        <h2>Manage Hiring</h2>
        <div className={s.Engagements}>
          <NavLink end to="posts/create" className={`${s.dashboardItem} `}>
            <PostJobs />
            Post Jobs
          </NavLink>
          <NavLink end to="posts" className={`${s.dashboardItem} `}>
            <JobPosts />
            Job Posts
          </NavLink>
          <NavLink end to="applicants" className={`${s.dashboardItem} `}>
            <Applicants />
            Job Applicants
          </NavLink>
          <NavLink end to="interviews" className={`${s.dashboardItem} `}>
            <Interviews />
            Interviews
          </NavLink>
          <NavLink end to="services" className={`${s.dashboardItem} `}>
            <Services fill="white" /> My Company Services
          </NavLink>
        </div>
        <h2>Settings</h2>
        <div className={s.Settings}>
          <NavLink end to="profile" className={`${s.dashboardItem} `}>
            <MyProfile />
            My Profile
          </NavLink>
          <NavLink end to="contract" className={`${s.dashboardItem} `}>
            <Contract />
            Contract
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
          <NavLink end to="help" className={`${s.dashboardItem} `}>
            <Help />
            Help
          </NavLink>
            </ul>
          </li>
        </div>
      </ul>
          <li
            className={`${s.dashboardItem} ${s.Logout}  `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Logout />
            Logout
          </li>
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
