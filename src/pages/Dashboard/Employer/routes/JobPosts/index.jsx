import { useEffect, useState } from "react";
import s from "./index.module.scss";
import axios from "axios";
import Notice from "../../../../../components/Notice";
import RecommendationCard from "../../../TechTalent/RecommendationCard";
import JobCard from "../../../../../components/JobCard";
const JobPosts = () => {
  const [posts, setPosts] = useState([]);
  // const [popup, showpopUp] = useState(undefined);
  // const posts_url =
  //   "https://job-hub-591ace1cfc95.herokuapp.com/api/job-postings/all";
  // const data = {};
  // const fetchPosts = async () => {
  //   try {
  //     const res = await axios.get(posts_url, data);
  //     const posts_array = res.data;
  //     setPosts(posts_array);
  //   } catch (err) {
  //     showpopUp({
  //       type: "danger",
  //       message: "Failed to load resources. Please try again.",
  //     });
  //     setTimeout(() => showpopUp(undefined));
  //   }
  // };
  // useEffect(() => {
  //   fetchPosts();
  // }, []);
  // console.log(posts);
  return (
    <div className={s.JobPosts}>
      <h2>JobPosts</h2>
      <div>
      <JobCard
              title={"Frontend Developer"}
              applicants={0}
              deadline={"1-04-2024"}
              description={
                " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam molestias dolorem repellat odio nostrum ipsa ipsum laudantium libero illo! Iusto reprehenderit vero aut libero"
              }
            />
        {posts.map((post) => {
          // const description = JSON.parse(post.description.split("/").join()[0]);

          return (
            <JobCard
              title={"Frontend Developer"}
              applicants={0}
              deadline={"1-04-2024"}
              description={
                " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam molestias dolorem repellat odio nostrum ipsa ipsum laudantium libero illo! Iusto reprehenderit vero aut libero"
              }
            />
          );
        })}
      </div>
       {/* {popup && <Notice type={popup.type} message={popup.message} />} */}
    </div>
  );
};

export default JobPosts;
