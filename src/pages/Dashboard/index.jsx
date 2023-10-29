import s from "./index.module.scss"
const Dashboard = () => {
  return (
    <div className={s.Dashboard}>
      
      <div className={s.Sidebad}>
        {/* Sidebar goes here */}
        sidebar
      </div>

      <div>
        {/* Mainpage or <Outlet/> */}
        main
      </div>
    </div>
  )
}

export default Dashboard