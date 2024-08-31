import s from "./index.module.scss";
import Notice from "../../../../../components/Notice";
import JobCard from "../../../../../components/JobCard";
import { Link } from "react-router-dom";
import useFetchJobs from "../../../../../utils/hooks/useFetchJobs";
import { UserContext } from "../.././..";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPageTrue } from "../../../../../redux/FilterSlice";
import ReactPaginate from "react-paginate";
const JobPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);
  const { accountTypeID } = useContext(UserContext);
  const { posts, popup, loading } = useFetchJobs(accountTypeID);
  const dispatch = useDispatch();
  const postPage = useSelector((state) => state.FilterSlice.postPage);
  // Get current posts
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  useEffect(() => {
    dispatch(postPageTrue());
  }, []);

  return (
    <div className="">
      <div className={s.JobPosts}>
        <div>
          {loading ? (
            <div>
              <h2>Loading Jobs.....</h2>
            </div>
          ) : currentJobPost.length > 0 ? (
            currentJobPost.map((post, i) => {
              // const description = JSON.parse(post.description.split("/").join()[0]);
              return <JobCard key={i} {...post} postPage={postPage} />;
            })
          ) : (
            <div className={s.NoPostsFallbackUI}>
              <h3> You have not made any posts yet</h3>
              <Link to="../posts/create">Create a Job Post</Link>
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
        {popup && <Notice type={popup.type} message={popup.message} />}
      </div>
    </div>
  );
};

export default JobPosts;
