import { useContext, useState, useEffect } from "react";
import s from "./index.module.scss";
import {
  CiUser,
  ChangeProfilePicture,
  MyProfile,
  Dashboard,
  Applications,
  Analytics,
  Help,
  Settings,
  Notification,
  Wallet,
  SavedJobs,
  Logout,
  Password,
  Terms,
  Privacy,
  JobListings,
} from "./SidebarIcons";
import { PiCaretDown, PiSubtitlesBold } from "react-icons/pi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../..";
import { Dialog } from "@headlessui/react";
import logo from "../../../../static/images/nxg-logo.png";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import Notice from "../../../../components/Notice";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";

const Sidebar = () => {
  const user = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [jobInterest, setJobInterest] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <Dashboard />,
    },
    {
      path: "notifications",
      name: "Notifications",
      icon: <Notification />,
    },
    {
      path: "job-listings",
      name: "Job Listings",
      icon: <JobListings />,
    },
    // {
    //   path: "wallet",
    //   name: "Wallet",
    //   icon: <Wallet />,
    // },
    {
      path: "profile",
      name: " My Profile",
      icon: <MyProfile />,
    },
    {
      path: "applications",
      name: "Applications",
      icon: <Applications />,
    },
    {
      path: "saved",
      name: "Saved Jobs",
      icon: <SavedJobs fill="white" />,
    },
    // {
    //   path: "analytics",
    //   name: "Analytics",
    //   icon: <Analytics />,
    // },
    {
      path: "subscription",
      name: "Subscription",
      icon: <PiSubtitlesBold />,
    },
  ];

  const { data: loggedInUser } = useApiRequest("/api/v1/auth/get-user");
  const userID = loggedInUser.id;

  const logOutUser = async () => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/v1/auth/logout?userId=${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );
      // console.log(response);
      if (response.ok) {
        // Clear user authentication information
        localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
        // Navigate to the login page
        navigate("/login");
        setLoading(false);
      } else if (response.status === 500) {
        setLoginError("Database error, please try again");
        setLoading(false);
      } else {
        console.error("Logout failed", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        const loginKey =
          window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
          window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
        // console.log('Stored loginKey:', loginKey);
        if (!loginKey) {
          console.error("Authentication key not available.");
          return;
        }

        // Parse the login key to get the initial values
        let parsedLoginKey = JSON.parse(loginKey);
        const authKey = parsedLoginKey.authKey;
        // let id = parsedLoginKey.id;

        // console.log("Auth Key:", authKey);
        // console.log("User ID:", id);

        // console.log("Parsed loginKey:", parsedLoginKey);

        // Fetch user data to get the techId
        const response = await axios.get(
          `${API_HOST_URL}/api/v1/tech-talent/get-user`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: authKey,
            },
          }
        );
        const talentData = response.data; // Assuming the response is an object with techId

        // Update the id with the fetched techId
        parsedLoginKey.id = talentData.techId; // Assuming techId is in the response data

        // Update the login key with the updated id
        const updatedLoginKey = JSON.stringify(parsedLoginKey);

        // console.log(updatedLoginKey);

        window.localStorage.setItem("NXGJOBHUBLOGINKEYV1", updatedLoginKey); // Or sessionStorage

        // Now you can use the updated id
        if (!authKey || !parsedLoginKey.id) {
          console.error("Auth key or user id not available.");
          return;
        }

        const response1 = await axios.get(
          `${API_HOST_URL}/api/v1/tech-talent/get-user`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: authKey,
            },
          }
        );
        const talentData1 = response1.data; // Assuming the response is an object with employer data

        // Update state with fetched data
        setJobInterest(talentData1.jobInterest || "");
        setProfilePicture(talentData1.profilePicture || "");
      } catch (error) {
        console.error("Error fetching talent data:", error);
      }
    };

    fetchTalentData(); // Invoke the fetchUserData function
  }, []);

  const moveToDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  const handleLogout = () => {
    // // Clear user authentication information
    // localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    // // Navigate to the login page
    // navigate("/login");
    logOutUser();
  };

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  };

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
      setProfilePicture(res.data.secure_url);
      setMessage({
        type: "info",
        content: "Profile picture updated.",
      });
      setTimeout(() => setMessage(null), 5000);
      const response = await axios.get(
        `${API_HOST_URL}/api/v1/tech-talent/get-user`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );
      const techId = response.data.techId;
      await axios.put(
        `${API_HOST_URL}/api/v1/tech-talent/${techId}`,
        { profilePicture: `${res.data.secure_url}` },
        {
          headers: {
            Authorization: authKey,
            "Content-Type": "application/json",
          },
        }
      );
      // updateProfilePicture = (res.data.secure_url);
      // const uploadedPictureUrl = updateProfilePicture
      // console.log("picture updated", uploadedPictureUrl);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={s.Sidebar}>
      <Link to="/" className={s.menuIcon}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={s.Profile}>
        <div>
          <div className={s.displayPic} style={{ padding: 0 }}>
            {profilePicture ? <img src={profilePicture} alt="" /> : <CiUser />}
          </div>
          <label htmlFor="profilePicture">
            <ChangeProfilePicture title="upload profile picture" />
          </label>
          <input
            id="profilePicture"
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            onChange={uploadProfilePicture}
            style={{ display: "none" }}
          />
        </div>
        <strong>{user.firstName}</strong>
        <p>{jobInterest ? capitalizeWords(jobInterest) : "User's Job Role"}</p>
      </div>
      <ul className={s.list}>
        {menuItem.map((item, index) => (
          <NavLink
            end
            to={item.path}
            key={index}
            className={`${s.dashboardItem} `}>
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </NavLink>
        ))}
        <li className={`${s.dashboardItem} `}>
          <div className={s.dropdownTitle}>
            <div>
              <Settings />
            </div>
            <span>
              <p> Settings</p>
              <PiCaretDown />
            </span>
          </div>
          <ul>
            <NavLink
              end
              to="password-settings"
              className={`${s.dashboardItem} `}>
              {" "}
              <Password /> <p>Password Settings</p>
            </NavLink>
            <NavLink end to="privacy" className={`${s.dashboardItem} `}>
              {" "}
              <Privacy /> <p>Privacy</p>
            </NavLink>
            <NavLink end to="terms" className={`${s.dashboardItem} `}>
              {" "}
              <Terms /> <p>Terms and conditions</p>
            </NavLink>
          </ul>
        </li>
        <NavLink end to="help" className={`${s.dashboardItem} `}>
          <div>
            <Help />
          </div>
          <p> Help </p>
        </NavLink>
      </ul>
      <NavLink
        className={`${s.dashboardItem} ${s.Logout}  `}
        onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Logout />
        </div>
        <p> Logout </p>
      </NavLink>
      {message && <Notice type={message.type} message={message.content} />}
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          className="fixed left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%] w-[60%] flex justify-center items-center bg-white border-none rounded-[24px] py-8 px-4 z-[100]"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={
            {
              // position: "fixed",
              // left: "50%",
              // top: "50%",
              // transform: "translate(-50%, -50%)",
              // width: "100%",
              // maxWidth: "800px",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // background: "#ffffff",
              // border: "none",
              // borderRadius: "24px",
              // padding: "2rem 1rem",
              // zIndex: "100",
            }
          }>
          <Dialog.Backdrop className="fixed inset-0 bg-black/30" />
          <div className="w-full">
            <Dialog.Panel>
              <Dialog.Title style={{ textAlign: "center" }}>
                <p
                  className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-extrabold text-center"
                  style={
                    {
                      // fontSize: "40px",
                      // fontWeight: "600",
                      // textAlign: "center",
                    }
                  }>
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
                  }}>
                  <button
                    onClick={moveToDashboard}
                    className="w-[80%]  p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px] my-10"
                    style={
                      {
                        // width: "100%",
                        // maxWidth: "580px",
                        // padding: "8px",
                        // background: "#006A90",
                        // border: "none",
                        // borderRadius: "10px",
                        // color: "#fff",
                        // fontSize: "25px",
                        // fontWeight: "500",
                        // margin: "2.5rem 0",
                      }
                    }>
                    Back To Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-[80%]  p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px] my-10"
                    style={
                      {
                        // width: "100%",
                        // maxWidth: "580px",
                        // padding: "8px",
                        // background: "#006A90",
                        // border: "none",
                        // borderRadius: "10px",
                        // color: "#fff",
                        // fontSize: "25px",
                        // fontWeight: "500",
                      }
                    }>
                    Continue To Logout
                  </button>
                </div>
              </Dialog.Title>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};
export default Sidebar;
