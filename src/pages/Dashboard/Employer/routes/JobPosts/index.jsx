import { useEffect, useState } from "react";
import s from "./index.module.scss";
import axios from "axios";
import Notice from "../../../../../components/Notice";
import RecommendationCard from "../../../TechTalent/RecommendationCard";
const JobPosts = () => {
  const [posts, setPosts] = useState([]);
  const [popup, showpopUp] = useState(undefined);
  const posts_url =
    "https://job-hub-591ace1cfc95.herokuapp.com/api/job-postings/all";
  const data = {};
  const fetchPosts = async () => {
    try {
      const res = await axios.get(posts_url, data);
      const posts_array = res.data;
      setPosts(posts_array);
    } catch (err) {
      showpopUp({
        type: "danger",
        message: "Failed to load resources. Please try again.",
      });
      setTimeout(() => showpopUp(undefined));
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className={s.JobPosts}>
      <h2>JobPosts</h2>
      <div>
        {posts.map((post) => {
          // const description = JSON.parse(post.description.split("/").join()[0]);

          return (
            <RecommendationCard
              key={post.jobID}
              company_name={"Google"}
              applicants={0}
              views={0}
              company_logo={null}
              company_location={post.location}
              type={[post.jobType]}
              role={post.title}
              description={post.description}
              salary_range={post.salary}
            />
          );
        })}
      </div>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
};

export default JobPosts;
