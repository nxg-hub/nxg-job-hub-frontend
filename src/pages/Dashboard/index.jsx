
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TechTalent from "./TechTalent";
import Employer from "./Employer";

export const UserContext = createContext({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  userType:""
});

const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
  });

  const [authKey, setAuth] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    const localdata = JSON.parse(
      window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
    ) || { authKey: undefined };

    setAuth(localdata.authKey);

    localdata.authKey
      ? axios
          .get(
            "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
            {
              headers: { authorization: localdata.authKey },
            }
          )
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => err)
      : navigate("/login");
  }, [navigate]);

  if (user.userType === "TECHTALENT") {
    return (
      <UserContext.Provider value={user}>
     <TechTalent authKey={authKey}/>
      </UserContext.Provider>
   )
  } else if (user.userType === "EMPLOYER") {
    return (
      <UserContext.Provider value={user}>
        <Employer authKey={authKey} />
        </UserContext.Provider>
    )
  } else {
    return (
      <div>Employer</div>
    )
 }
};

export default Dashboard;
