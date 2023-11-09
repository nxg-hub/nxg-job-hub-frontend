import Sidebar from "../../components/DashboardComponents/Sidebar"
import s from "./index.module.scss"
import pic from "../../static/images/Sarah.png"
import { Outlet } from "react-router-dom"
const Dashboard = () => {
  return (
    <div className={s.Dashboard}>
      
      <div className={s.Sidebad}>
        <Sidebar  profilePic={pic}/>
      </div>
      
      {/* Mainpage or <Outlet/> */}
      <div className={s.Sidemain}>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard