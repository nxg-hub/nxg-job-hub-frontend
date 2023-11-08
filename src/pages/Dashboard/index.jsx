import DashboardMainSide from "./DashboardMainSide"
import s from "./index.module.scss"
const Dashboard = () => {
  return (
    <div className={s.Dashboard}>
      
      <div className={s.Sidebad}>
        {/* Sidebar goes here */}
        sidebar
      </div>
      
      {/* Mainpage or <Outlet/> */}
      <div className={s.Sidemain}>
        <DashboardMainSide />
      </div>
    </div>
  )
}

export default Dashboard