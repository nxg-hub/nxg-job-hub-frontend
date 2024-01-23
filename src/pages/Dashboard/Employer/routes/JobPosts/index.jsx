import s from "./index.module.scss";
import Notice from "../../../../../components/Notice";
import JobCard from "../../../../../components/JobCard";
import { Link } from "react-router-dom";
import useFetchJobs from "../../../../../utils/hooks/useFetchJobs";
import {UserContext} from "../.././.."
import { useContext } from "react";
const JobPosts = () => {
  const {accountTypeID} = useContext(UserContext)
  const { posts, popup } = useFetchJobs(accountTypeID);
  return (
    <div className={s.JobPosts}>
      <div>
        {posts.length > 0 ? (
          posts.map((post, i) => {
            // const description = JSON.parse(post.description.split("/").join()[0]);
            return (
              <JobCard
                key={i}
                title={post.job_title}
                applicants={0}
                deadline={post.deadline}
                description={post.job_description}
                created_at={post.created_at}
              />
            );
          })
        ) : (
          <div>
            <h2> You haven't created any job posts yet</h2>
            <Link to="./create">Create a Job Post</Link>
          </div>
        )}
      </div>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
};

export default JobPosts;
