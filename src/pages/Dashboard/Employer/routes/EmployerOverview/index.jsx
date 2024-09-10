import { useContext, useState } from "react";
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
import useFetchJobs from "../../../../../utils/hooks/useFetchJobs";
import ReactPaginate from "react-paginate";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
const EmployerOverview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);
  const user = useContext(UserContext);
  const { posts, loading } = useFetchJobs(user.accountTypeID);
  const { data } = useApiRequest(`/api/v1/admin/${user.accountTypeID}/stats
`);
  // Get current posts
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
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
              value={posts.length}
            />
            <EngagementCard
              logo={<Applicants fill="#006A90" />}
              title={"Applicants"}
              value={data.applicantCount}
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
          <span className={`${s.Tasks} swiperr`}>
            <Swiper />
          </span>
        </div>
        <div>
          <h3>Interviews</h3>
          <span className={`${s.Interviews} swiperr`}>
            <Swiper2 />
          </span>
        </div>
      </div>
      <div className={s.Recently}>
        <h2>Recently Posted Jobs:</h2>
        {loading ? (
          <div>
            <h2>Loading Jobs....</h2>
          </div>
        ) : currentJobPost.length > 0 ? (
          currentJobPost.map((post, o) => <JobCard key={o} {...post} />)
        ) : (
          <div className={s.NoPostsFallbackUI}>
            <h3> You have not made any posts yet</h3>
            <Link to="./posts/create">Create a Job Post</Link>
          </div>
        )}
      </div>
      <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(posts.length / jobsPerPage)}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeLinkClassName="active bg-[#2596BE] px-3 rounded-xl"
        className="flex w-[90%] m-auto justify-between pt-4"
      />
      <div className="employer-stats">
        <Statistics />
        <CompanyProfile />
        {/* <CompanyServices /> */}
      </div>
    </div>
  );
};

export default EmployerOverview;
