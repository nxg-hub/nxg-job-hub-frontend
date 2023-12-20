import { useContext } from "react";
import s from "./index.module.scss";
import Statistics from "./statistics/Statistics";
import CompanyProfile, {
  CompanyServices,
} from "./companyProfile/CompanyProfile";
import { UserContext } from "../../..";
import { Link } from "react-router-dom";
import EngagementCard from "../../EngagementCard";
import { Applicants, JobPosts } from "../../Sidebar/SidebarIcons";
const EmployerOverview = () => {
  const user = useContext(UserContext);

  return (
    <div className={s.EmployerOverview}>
        <div className={s.Header}>
          <h2>{user.firstName || "User"}'s Dashboard</h2>
          <Link to="posts/create">Post Jobs</Link>
        </div>
      <div className={s.Summary}>
        <div className={s.Engagements}>
          <EngagementCard logo={<JobPosts fill="#006A90"/>}  title={"Jobs Posted"} value={0} />
          <EngagementCard logo={<Applicants fill="#006A90"/>}  title={"Applicants"} value={0} />
          <EngagementCard logo={<JobPosts fill="#006A90"/>}  title={"Reviewed"} value={0} />
          <EngagementCard logo={<JobPosts fill="#006A90"/>}  title={"Shortlisted"} value={0} />
        </div>
        <div className={s.Tasks}>
        
        </div>
        <div className={s.Interviews}></div>
      </div>
      <div className="employer-stats">
        <Statistics />
        <CompanyProfile /> 
        <CompanyServices />
      </div>
    </div>
  );
};

export default EmployerOverview;
