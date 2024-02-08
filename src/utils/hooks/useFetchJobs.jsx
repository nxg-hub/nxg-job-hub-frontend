import axios from "axios";
import { useEffect, useState } from "react";
import { API_HOST_URL } from "../api/API_HOST";

const useFetchJobs = (id) => {
  const posts_url =
    `${API_HOST_URL}/api/employers/postings/${id}`;
  const [posts, setPosts] = useState([]);
  const [popup, showpopUp] = useState(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(posts_url);
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
    fetchPosts();
  }, []);
  return { posts, popup };
};

export default useFetchJobs;
