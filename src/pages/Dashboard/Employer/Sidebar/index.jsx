import { useContext, useState, useEffect } from "react";
import s from "./index.module.scss";
import {
  CiUser,
  ChangeProfilePicture,
  MyProfile,
  Dashboard,
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
import { PiCaretDown, PiSubtitlesBold } from "react-icons/pi";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../..";
import { Dialog } from "@headlessui/react";
import logo from "../../../../static/images/nxg-logo.png";
import useFetchNotifications from "../../../../utils/hooks/useFetchNotifications";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import Notice from "../../../../components/Notice";
const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(profilePic || null);
  const [isOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const notifications = useFetchNotifications();

  const moveToDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const loginKey =
  //         window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
  //         window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
  //       if (!loginKey) {
  //         console.error("Authentication key not available.");
  //         return;
  //       }
  //       const { authKey, id } = JSON.parse(loginKey);
  //       if (!authKey || !id) {
  //         console.error("Auth key or user id not available.");
  //         return;
  //       }
  //
  //       const response = await axios.get(
  //         `${API_HOST_URL}/api/employers/get-employer`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             authorization: authKey,
  //           },
  //         }
  //       );
  //       const userData = response.data;
  //       setCompanyName(userData.companyName);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData(); // Invoke the fetchUserData function
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve login key from local or session storage
        const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem('NXGJOBHUBLOGINKEYV1');
        if (!loginKey) {
          console.error('Authentication key not available.');
          return;
        }

        let parsedLoginKey;
        try {
          parsedLoginKey = JSON.parse(loginKey);
        } catch (error) {
          console.error('Error parsing authentication key:', error);
          return;
        }

        const { authKey, id } = parsedLoginKey;

        if (!authKey) {
          console.error('Auth key not available.');
          return;
        }

        if (!id) {
          // Fetch user data to get the id if not available
          const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
            headers: {
              'Content-Type': 'application/json',
              authorization: authKey,
            },
          });

          const userData = response.data;

          // Update the id in parsedLoginKey
          parsedLoginKey.id = userData.id;

          // Update the login key in local or session storage
          const updatedLoginKey = JSON.stringify(parsedLoginKey);
          console.log('New Key:', updatedLoginKey);
          window.localStorage.setItem('NXGJOBHUBLOGINKEYV1', updatedLoginKey);
        }

        // Proceed with fetching the employer data
        const response = await axios.get(`${API_HOST_URL}/api/employers/get-employer`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: authKey,
          },
        });

        const userData = response.data;
        setCompanyName(userData.companyName || ''); // Update state with company name
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Invoke the fetchUserData function
  }, []); // Dependency array is empty, so this effect runs once after initial render


  const handleLogout = () => {
    localStorage.removeItem("NXGJOBHUBLOGINKEYV1");

    navigate("/login");
  };
  const editProfile = () => navigate("/dashboard/profile");
  const uploadProfilePicture = async (e) => {
    try {
      setMessage({
        type: "info",
        content: "Updating profile picture...",
      });
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "tin4r1lt");
      const { authKey } =
        JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
        JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"));
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePicture(res.data.secure_url)
      setMessage({
        type: "info",
        content: "Profile picture updated.",
      });
      setTimeout(() => setMessage(null), 5000);
     await axios.post(
        "https://nxg-job-hub-8758c68a4346.herokuapp.com/api/v1/auth/upload-photo",
        { link: `${res.data.secure_url}` },
        {
          headers: {
            Authorization: authKey,
            "Content-Type": "application/json",
          },
        }
        );
       
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={s.Sidebar}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className={s.Profile}>
        <div>
          <div className={s.displayPic} style={profilePicture && { padding: 0 }}>
            {profilePicture ? <img src={profilePicture} alt="" /> : <CiUser />}
          </div>
          <label htmlFor="profilepic">
            <ChangeProfilePicture title="upload profile picture" />
          </label>

          <input
            id="profilepic"
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            onChange={uploadProfilePicture}
            style={{ display: "none" }}
          />
        </div>
        <strong>{user.firstName}</strong>
        <p
          onClick={editProfile}
          style={{
            background: "#fff",
            border: "none",
            borderRadius: "8.33px",
            width: "100%",
            maxWidth: "128px",
            color: "#000",
            margin: "0.6rem auto",
          }}
        >
          Edit Profile
        </p>
        <div className={s.employerFirm}>
          <h4>{companyName ? companyName : "Recruiter's Name"}</h4>
        </div>
      </div>
      <ul className={s.list}>
        <h2>Engagements</h2>
        <div className={s.Engagements}>
          <NavLink end to="/dashboard" className={`${s.dashboardItem} `}>
            <div><Dashboard /></div>
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            end
            data-count={notifications.length}
            to="notifications"
            className={
              notifications.length > 0
                ? `${s.dashboardItem} ${s.Bell}`
                : s.dashboardItem
            }
          >
            <div><Notification /></div>
           <p> Notifications</p>
          </NavLink>
          {/* <NavLink end to="wallet" className={`${s.dashboardItem} `}>
          <div><Wallet /></div>
            <p>Wallet</p>
          </NavLink> */}
          <NavLink end to="subscription" className={`${s.dashboardItem} `}>
          <div><PiSubtitlesBold /></div>
            <p>Subscription</p>
          </NavLink>
        </div>
        <h2>Manage Hiring</h2>
        <div className={s.Engagements}>
          <NavLink end to="posts/create" className={`${s.dashboardItem} `}>
          <div><PostJobs /></div>
            <p>Post Jobs</p>
          </NavLink>
          <NavLink end to="posts" className={`${s.dashboardItem} `}>
          <div><JobPosts /></div>
            <p>Job Posts</p>
          </NavLink>
          <NavLink end to="applicants" className={`${s.dashboardItem} `}>
          <div><Applicants /></div>
            <p>Job Applicants</p>
          </NavLink>
          <NavLink end to="interviews" className={`${s.dashboardItem} `}>
          <div><Interviews /></div>
            <p>Interviews</p>
          </NavLink>
          <NavLink end to="services" className={`${s.dashboardItem} `}>
          <div><Services fill="white" /></div> <p>My Company Services</p>
          </NavLink>
        </div>
        <h2>Settings</h2>
        <div className={s.Settings}>
          <NavLink end to="profile" className={`${s.dashboardItem} `}>
          <div><MyProfile /></div>
            <p>My Profile</p>
          </NavLink>
          <NavLink end to="contract" className={`${s.dashboardItem} `}>
          <div><Contract /></div>
            <p>Contract</p>
          </NavLink>
          <li className={`${s.dashboardItem} `}>
            <div className={s.dropdownTitle}>
            <div><Settings /></div>
              <span>
                <p>Settings</p>
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
                <div><Password /> </div><p>Password Settings</p>
              </NavLink>
              <NavLink end to="privacy" className={`${s.dashboardItem} `}>
                {" "}
                <div><Privacy /></div><p>Privacy</p> 
              </NavLink>
              <NavLink
                end
                to="terms-and-conditions"
                className={`${s.dashboardItem} `}
              >
                {" "}
                <div><Terms /></div> <p>Terms and conditions</p>
              </NavLink>
              <NavLink end to="help" className={`${s.dashboardItem} `}>
              <div><Help /></div>
                <p>Help</p>
              </NavLink>
            </ul>
          </li>
        </div>
      </ul>
      <NavLink
        className={`${s.dashboardItem} ${s.Logout}  `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div><Logout /></div>
        <p>Logout</p>
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
            padding: "2rem 1rem",
            zIndex: "100",
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
       {message && <Notice type={message.type} message={message.content} />}
    </div>
  );
};
export default Sidebar;