import axios from "axios";
import { useEffect, useState } from "react";
const posts_url =
  "https://job-hub-591ace1cfc95.herokuapp.com/api/job-postings/all";

const useFetchJobs = () => {
  const [posts, setPosts] = useState([]);
  const [popup, showpopUp] = useState(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(posts_url);
        const posts_array = res.data;
        setPosts(posts_array);
        console.log(posts_array);
      } catch (err) {
        showpopUp({
          type: "danger",
          message: "Failed to load resources. Please try again.",
        });
        setTimeout(() => showpopUp(undefined));
      }
    };
    fetchPosts();
  }, []);
  return { posts, popup };
};

export default useFetchJobs;
