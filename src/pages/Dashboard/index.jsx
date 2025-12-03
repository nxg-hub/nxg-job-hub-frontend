import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
// import TechTalent from "./TechTalent";
import Employer from "./Employer";
import Notice from "../../components/Notice";
import { API_HOST_URL } from "../../utils/api/API_HOST";

export const UserContext = createContext({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phoneNumber: "",
  residentialAddress: "",
  profilePicture: "",
  userType: "",
});

const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    residentialAddress: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [authKey, setAuth] = useState(undefined);
  const [loading, setLoading] = useState({
    type: "info",
    message: "Fetching resources...",
  });
  const navigate = useNavigate();
  const DashboardTypes = {
    // TECHTALENT: (
    //   <UserContext.Provider value={user}>
    //     <TechTalent authKey={authKey} />
    //   </UserContext.Provider>
    // ),
    EMPLOYER: (
      <UserContext.Provider value={user}>
        <Employer />
      </UserContext.Provider>
    ),
    AGENT: (
      <UserContext.Provider value={user}>
        <h2>Agent Dashboard</h2>
      </UserContext.Provider>
    ),
  };

  useEffect(() => {
    const getUser = async () => {
      // Endpoint for fetching acount type instance
      const getAccountTypeDetails = {
        EMPLOYER: `${API_HOST_URL}/api/employers/get-employer`,
        TECHTALENT: `${API_HOST_URL}/api/v1/tech-talent/get-user`,
        AGENT: "",
      };

      // fecth JWT from store
      const localdata =
        JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
        JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
        {};
      // get authkey if null, redirect to login

      if (localdata.authKey) {
        setAuth(localdata.authKey);
        try {
          // get usertype  redirect to appropriate dashboard
          const { data } = await axios.get(
            `${API_HOST_URL}/api/v1/auth/get-user`,
            {
              headers: { authorization: localdata.authKey },
            }
          );
          const accountTypeDetails = await axios.get(
            getAccountTypeDetails[data.userType],
            {
              headers: { authorization: localdata.authKey },
            }
          );
          let accountTypeID;
          if (data.userType === "EMPLOYER") {
            accountTypeID = accountTypeDetails.data.employerID;
          } else if (data.userType === "TECHTALENT") {
            accountTypeID = accountTypeDetails.data.techId;
          } else if (data.userType === "AGENT") {
            accountTypeID = accountTypeDetails.agentID;
          } else {
            return;
          }
          setUser({ ...data, accountTypeID });

          setLoading(undefined);
        } catch (err) {
          setLoading({
            type: "danger",
            message:
              "Failed to fetch user resources. Please try logging in again.",
          });
          err.response.data === "Expired JWT token!"
            ? navigate("/login")
            : null;
        }
      } else {
        navigate("/login");
      }
    };
    getUser();
  }, [navigate, authKey]);

  return loading ? (
    <Notice type={loading.type} message={loading.message} />
  ) : (
    DashboardTypes[user.userType]
  );
};

export default Dashboard;
