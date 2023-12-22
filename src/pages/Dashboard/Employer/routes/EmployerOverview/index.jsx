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
import JobCard from "../../../../../components/JobCard";
const EmployerOverview = () => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <div className={s.EmployerOverview}>
      <div className={s.Header}>
        <h2>{user.firstName || "User"}'s Dashboard</h2>
        <Link to="posts/create">Post Jobs</Link>
      </div>
      <div className={s.Summary}>
        <div className={s.Engagements}>
          <EngagementCard
            logo={<JobPosts fill="#006A90" />}
            title={"Jobs Posted"}
            value={0}
          />
          <EngagementCard
            logo={<Applicants fill="#006A90" />}
            title={"Applicants"}
            value={0}
          />
          <EngagementCard
            logo={<JobPosts fill="#006A90" />}
            title={"Reviewed"}
            value={0}
          />
          <EngagementCard
            logo={<JobPosts fill="#006A90" />}
            title={"Shortlisted"}
            value={0}
          />
        </div>
        <div className={s.Tasks}></div>
        <div className={s.Interviews}></div>
      </div>
      <h2>Recently Posted Jobs:</h2>
      <JobCard
        title={"Frontend Developer"}
        applicants={0}
        deadline={"1-04-2024"}
        description={
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam molestias dolorem repellat odio nostrum ipsa ipsum laudantium libero illo! Iusto reprehenderit vero aut libero"
        }
      />{" "}
      <JobCard
        title={"Frontend Developer"}
        applicants={0}
        deadline={"1-04-2024"}
        description={
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam molestias dolorem repellat odio nostrum ipsa ipsum laudantium libero illo! Iusto reprehenderit vero aut libero"
        }
      />{" "}
      <JobCard
        title={"Frontend Developer"}
        applicants={0}
        deadline={"1-04-2024"}
        description={
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam molestias dolorem repellat odio nostrum ipsa ipsum laudantium libero illo! Iusto reprehenderit vero aut libero"
        }
      />
      <div className="employer-stats">
        <Statistics />
        <CompanyProfile />
        <CompanyServices />
      </div>
    </div>
  );
};

export default EmployerOverview;
