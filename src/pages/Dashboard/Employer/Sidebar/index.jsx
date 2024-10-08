import { useContext, useEffect, useState } from "react";
import s from "./index.module.scss";
import {
  Applicants,
  ChangeProfilePicture,
  CiUser,
  Contract,
  Dashboard,
  Help,
  Interviews,
  JobPosts,
  Logout,
  MyProfile,
  Notification,
  Password,
  PostJobs,
  Privacy,
  Services,
  Settings,
  Terms,
} from "./SidebarIcons";
import { PiCaretDown, PiSubtitlesBold, PiShieldCheck } from "react-icons/pi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../..";
import { Dialog } from "@headlessui/react";
import logo from "../../../../static/images/nxg-logo.png";
import useFetchNotifications from "../../../../utils/hooks/useFetchNotifications";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import Notice from "../../../../components/Notice";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";

const Sidebar = ({ profilePic, ...props }) => {
  const user = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(profilePic || null);
  // console.log(profilePicture);
  const [isOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const navigate = useNavigate();
  const notifications = useFetchNotifications();
  const [viewedNotification, setViewedNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const moveToDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  const { data: loggedInUser } = useApiRequest("/api/employers/get-employer");
  const userID = loggedInUser.employerID;
  const logOutUser = async () => {
    setLoading(true);
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
        localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
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
        const loginKey =
          window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
          window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
        if (!loginKey) {
          console.error("Authentication key not available.");
          return;
        }

        let parsedLoginKey;
        try {
          parsedLoginKey = JSON.parse(loginKey);
        } catch (error) {
          console.error("Error parsing authentication key:", error);
          return;
        }

        const { authKey, id } = parsedLoginKey;

        if (!authKey) {
          console.error("Auth key not available.");
          return;
        }

        if (!id) {
          // Fetch user data to get the id if not available
          const response = await axios.get(
            `${API_HOST_URL}/api/v1/auth/get-user`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: authKey,
              },
            }
          );

          const userData = response.data;

          // Update the id in parsedLoginKey

          parsedLoginKey.id = userData.id;

          // Update the login key in local or session storage
          const updatedLoginKey = JSON.stringify(parsedLoginKey);
          console.log("New Key:", updatedLoginKey);
          window.localStorage.setItem("NXGJOBHUBLOGINKEYV1", updatedLoginKey);
        }

        // Proceed with fetching the employer data
        const response = await axios.get(
          `${API_HOST_URL}/api/employers/get-employer`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: authKey,
            },
          }
        );

        const userData = response.data;
        setCompanyName(userData.companyName || ""); // Update state with company name
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Invoke the fetchUserData function
  }, []);
  const handleLogout = () => {
    // localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    // navigate("/login");
    logOutUser();
  };
  const editProfile = () => navigate("/dashboard/profile");

  const uploadProfilePicture = async (e) => {
    try {
      setMessage({
        type: "info",
        content: "Updating company logo...",
      });
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      // formData.append("upload_preset", "tin4r1lt");
      const { authKey } =
        JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
        JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"));
      const res = await axios.post(
        "https://nxg-job-hub-8758c68a4346.herokuapp.com/api/v1/auth/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: authKey,
          },
        }
      );
      setProfilePicture(res.data.secure_url);
      setMessage({
        type: "info",
        content: "Company logo updated.",
      });
      // setTimeout(() => setMessage(null), 5000);
      // const response = await axios.get(
      //     `${API_HOST_URL}/api/v1/auth/get-user`,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         authorization: authKey,
      //       },
      //     }
      // );
      // const employerId = response.data.id;
      // await axios.put(
      //     `${API_HOST_URL}/api/v1/auth/get-user${employerId}`,
      //     { profilePicture: `${res.data.secure_url}` },
      //     {
      //       headers: {
      //         Authorization: authKey,
      //         "Content-Type": "application/json",
      //       },
      //     }
      // );
      // const uploadedPictureUrl = (res.data.secure_url)
      // console.log("picture updated", uploadedPictureUrl);
    } catch (err) {
      console.log(err);
    }
  };

  // const uploadToNXG = async () => {
  //   const authKey =
  //     JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  //     JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  //
  //   if (!authKey || !authKey.authKey) {
  //     throw new Error(
  //       "Invalid or missing authentication key. Please log in again."
  //     );
  //   }
  //   try {
  //     const response = await fetch(
  //       "https://nxg-job-hub-8758c68a4346.herokuapp.com/api/v1/auth/upload-photo",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: authKey.authKey,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ link: `${profilePicture}` }),
  //       }
  //     );
  //
  //     console.log(response.status);
  //
  //     if (response && response.status === 200) {
  //       console.log("Profile picture successfully updated");
  //       setUploadError(null);
  //     } else {
  //       throw new Error("Failed to update profile picture. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading profile picture:", error);
  //     setUploadError(
  //       "An error occurred while updating the profile picture. Please try again."
  //     );
  //   }
  // };
  // useEffect(() => {
  //   if (profilePicture) {
  //     uploadToNXG();
  //   }
  // }, [profilePicture]);
  //
  // const uploadProfilePicture = async (e) => {
  //   try {
  //     setMessage({
  //       type: "info",
  //       content: "Updating profile picture...",
  //     });
  //
  //     const formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     formData.append("upload_preset", "tin4r1lt");
  //
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //
  //     setProfilePicture(res.data.secure_url);
  //
  //     setMessage({
  //       type: "info",
  //       content: "Profile picture updated.",
  //     });
  //     setTimeout(() => setMessage(null), 5000);
  //   } catch (err) {
  //     console.log(err);
  //     setUploadError(
  //       "An error occurred while updating the profile picture. Please try again."
  //     );
  //   }
  // };
  return (
    <div className={s.Sidebar}>
      <Link>
        <img src={logo} alt="logo" />
      </Link>
      <div className={s.Profile}>
        <div>
          <div
            className={s.displayPic}
            style={profilePicture && { padding: 0 }}>
            {profilePicture ? <img src={profilePicture} alt="" /> : <CiUser />}
          </div>
          <label className="flex flex-col" htmlFor="profilepic">
            <span className="absolute right-7">
              <ChangeProfilePicture title="upload company logo" />
            </span>
            <span className="relative">Company Logo </span>
          </label>

          <input
            id="profilepic"
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            onChange={uploadProfilePicture}
            placeholder="Company Logo"
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
          }}>
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
            <div>
              <Dashboard />
            </div>
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            onClick={() => {
              setViewedNotification(true);
            }}
            end
            data-count={viewedNotification ? 0 : notifications.length} // Update data-count based on viewedNotification
            to="notifications"
            className={
              notifications.length > 0 && !viewedNotification // Ensure red sign is removed when viewed
                ? `${s.dashboardItem} ${s.Bell}`
                : `${s.dashboardItem}`
            }>
            <div>
              <Notification />
            </div>
            <p>Notifications</p>
          </NavLink>

          {/*<NavLink*/}
          {/*  onClick={() => {*/}
          {/*    setViewedNotification(true);*/}
          {/*  }}*/}
          {/*  end*/}
          {/*  data-count={viewedNotification ? [] : notifications.length}*/}
          {/*  to="notifications"*/}
          {/*  className={*/}
          {/*    notifications.length > 0*/}
          {/*      ? `${s.dashboardItem} ${s.Bell} `*/}
          {/*      : `${s.dashboardItem}`*/}
          {/*      ? viewedNotification*/}
          {/*      : `!hidden !bg-transparent`*/}
          {/*  }>*/}
          {/*  <div>*/}
          {/*    <Notification />*/}
          {/*  </div>*/}
          {/*  <p> Notifications</p>*/}
          {/*</NavLink>*/}
          {/* <NavLink end to="wallet" className={`${s.dashboardItem} `}>
          <div><Wallet /></div>
            <p>Wallet</p>
          </NavLink> */}
          <NavLink end to="subscription" className={`${s.dashboardItem} `}>
            <div>
              <PiSubtitlesBold />
            </div>
            <p>Subscription</p>
          </NavLink>
          <NavLink end to="featuredTalent" className={`${s.dashboardItem} `}>
            <div>
              <PiShieldCheck />
            </div>
            <p>Featured Talent </p>
          </NavLink>
        </div>
        <h2>Manage Hiring</h2>
        <div className={s.Engagements}>
          <NavLink end to="posts/create" className={`${s.dashboardItem} `}>
            <div>
              <PostJobs />
            </div>
            <p>Post Jobs</p>
          </NavLink>
          <NavLink end to="posts" className={`${s.dashboardItem} `}>
            <div>
              <JobPosts />
            </div>
            <p>Job Posts</p>
          </NavLink>
          {/* <NavLink end to="applicants" className={`${s.dashboardItem} `}>
            <div>
              <Applicants />
            </div>
            <p>Job Applicants</p>
          </NavLink> */}
          <NavLink end to="interviews" className={`${s.dashboardItem} `}>
            <div>
              <Interviews />
            </div>
            <p>Interviews</p>
          </NavLink>
          {/* <NavLink end to="services" className={`${s.dashboardItem} `}>
            <div>
              <Services fill="white" />
            </div>{" "}
            <p>My Company Services</p>
          </NavLink> */}
        </div>
        <h2>Settings</h2>
        <div className={s.Settings}>
          <NavLink end to="profile" className={`${s.dashboardItem} `}>
            <div>
              <MyProfile />
            </div>
            <p>My Profile</p>
          </NavLink>
          <NavLink end to="terms" className={`${s.dashboardItem} `}>
            <div>
              <Contract />
            </div>
            <p>Contract</p>
          </NavLink>
          <li className={`${s.dashboardItem} `}>
            <div className={s.dropdownTitle}>
              <div>
                <Settings />
              </div>
              <span>
                <p>Settings</p>
                <PiCaretDown />
              </span>
            </div>
            <ul>
              <NavLink
                end
                to="password-settings"
                className={`${s.dashboardItem} `}>
                {" "}
                <div>
                  <Password />{" "}
                </div>
                <p>Password Settings</p>
              </NavLink>
              <NavLink end to="privacy" className={`${s.dashboardItem} `}>
                {" "}
                <div>
                  <Privacy />
                </div>
                <p>Privacy</p>
              </NavLink>
              <NavLink end to="terms" className={`${s.dashboardItem} `}>
                {" "}
                <div>
                  <Terms />
                </div>{" "}
                <p>Terms and conditions</p>
              </NavLink>
              <NavLink end to="help" className={`${s.dashboardItem} `}>
                <div>
                  <Help />
                </div>
                <p>Help</p>
              </NavLink>
            </ul>
          </li>
        </div>
      </ul>
      <NavLink
        className={`${s.dashboardItem} ${s.Logout}  `}
        onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Logout />
        </div>
        <p>Logout</p>
      </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[60%] flex justify-center items-center bg-white border-none rounded-[24px] py-8 px-4 z-[100]"
          open={isOpen}
          onClose={() => setIsOpen(false)}>
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
                    className="w-[80%]  p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px] my-10">
                    Back To Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-[80%]  p-[8px] bg-[#006A90] border-none rounded-[10px] text-white text-[14px] sm:text-[24px] font-[500px] my-10">
                    {loading ? "Logging out..." : "Continue To Logout"}
                  </button>
                </div>
              </Dialog.Title>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      {message && <Notice type={message.type} message={message.content} />}
    </div>
  );
};
export default Sidebar;
