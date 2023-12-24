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

import Swiper, { Swiper2 } from "./Swiper";

const EmployerOverview = () => {
  const user = useContext(UserContext);
  return (
    <div className={s.EmployerOverview}>
      <div className={s.Header}>
        <h2>{user.firstName || "User"}'s Dashboard</h2>
        <Link to="posts/create">Post Jobs</Link>
      </div>
      <div className={s.Summary}>
        <div>
          <h3>Engagements</h3>
        <span className={s.Engagements}>
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
        </span>
     </div>
        <div>
          <h3>Tasks</h3>
        <span className={s.Tasks}>
          <Swiper />
        </span>
       </div>
        <div>
          <h3>Interviews</h3>
        <span className={s.Interviews}>
          <Swiper2 />
        </span>
        </div>
      </div>
      <div className={s.Recently}>
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
