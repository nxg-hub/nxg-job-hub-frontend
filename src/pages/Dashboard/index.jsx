import Sidebar from "../../components/DashboardComponents/Sidebar";
import s from "./index.module.scss";
import pic from "../../static/images/Sarah.png";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
const Dashboard = () => {
  const UserContext = createContext(null);
  const auth = window.localStorage.getItem("NXGJOBHUBLOGINKEYV1");
  const user = axios
    .get("https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user", {
      headers: { authorization: auth },
    })
    .then((res) => console.log(res));
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
