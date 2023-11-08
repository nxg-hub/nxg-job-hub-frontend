import Sidebar from "../../components/DashboardComponents/Sidebar"
import DashboardMainSide from "./DashboardMainSide"
import s from "./index.module.scss"
import pic from "../../static/images/Sarah.png"
const Dashboard = () => {
  return (
    <div className={s.Dashboard}>
      
      <div className={s.Sidebad}>
        <Sidebar  profilePic={pic}/>
      </div>
      
      {/* Mainpage or <Outlet/> */}
      <div className={s.Sidemain}>
        <DashboardMainSide />
      </div>
    </div>
  )
}

export default Dashboard