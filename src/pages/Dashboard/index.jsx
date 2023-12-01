import Sidebar from "./TechTalent/Sidebar";
import s from "./index.module.scss";
import pic from "../../static/images/Sarah.png";
import { Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export const UserContext = createContext({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
});
const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
  });

  const [error, setErr] = useState("");
  const { authKey } = JSON.parse(
    window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
  );

  const navigate = useNavigate();
  useEffect(() => {
    authKey
      ? axios
          .get(
            "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
            {
              headers: { authorization: authKey },
            }
          )
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => setErr(err.message))
      : navigate("/login");
  }, [authKey, navigate]);

  return authKey ? (
    <>
      <UserContext.Provider value={user}>
        <div className={s.Dashboard}>
          <div className={s.Sidebad}>
            <Sidebar profilePic={pic} />
          </div>

          {/* Mainpage or <Outlet/> */}
          <div className={s.Sidemain}>
            <Outlet />
          </div>
        </div>
      </UserContext.Provider>
      <div className={s.error}>{error}</div>
    </>
  ) : null;
};

export default Dashboard;
