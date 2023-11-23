import Sidebar from "../../components/DashboardComponents/Sidebar";
import s from "./index.module.scss";
import pic from "../../static/images/Sarah.png";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export const UserContext = createContext({});
const Dashboard = () => {
  const [user, setUser] = useState({});
  const auth = window.localStorage.getItem("NXGJOBHUBLOGINKEYV1");
  useEffect(() => {
    axios
      .get("https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user", {
        headers: { authorization: auth },
      })
      .then((res) => setUser(res.data));
  }, [auth]);
  return (
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
  );
};

export default Dashboard;
