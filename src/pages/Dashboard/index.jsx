import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TechTalent from "./TechTalent";
import Employer from "./Employer";
import Notice from "../../components/Notice";

export const UserContext = createContext({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phoneNumber:"",
  userType: "",
});

const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber:""
  });
  const [authKey, setAuth] = useState(undefined);
  const [loading, setLoading] = useState({
    type: "info",
    message: "Fetching resources...",
  });
  const navigate = useNavigate();
  const DashboardTypes = {
    TECHTALENT: (
      <UserContext.Provider value={user}>
        <TechTalent authKey={authKey} />
      </UserContext.Provider>
    ),
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
    const localdata =
      JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
      JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
      {};

    setAuth(localdata.authKey);

    if (localdata.authKey) {
      axios
        .get(
          "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
          {
            headers: { authorization: localdata.authKey },
          }
        )
        .then((res) => {
          setUser(res.data);
          setLoading(undefined);
        })
        .catch((err) =>
          setLoading({
            type: "danger",
            message:
              "Failed to fetch user resources. Please try logging in again.",
          })
        );
    } else {
      navigate("/login");
    }
  }, [navigate, authKey]);

  return loading ? (
    <Notice type={loading.type} message={loading.message} />
  ) : (
    DashboardTypes[user.userType]
  );
};

export default Dashboard;
