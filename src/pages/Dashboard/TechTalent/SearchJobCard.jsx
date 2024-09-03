import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getJobTitle,
  searchJob,
} from "../../../redux/SearchJobSlice";
import { closeOptions } from "../../../redux/NearbyJobSlice";
import { useNavigate } from "react-router-dom";

function SearchJobCard({ job, currentPage }) {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchNearbyJob = () => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    dispatch(getJobTitle(job.job_title));
    dispatch(getCurrentPage(currentPage));
    dispatch(closeOptions());
    dispatch(
      searchJob(
        `/api/job-postings/search-nearby-jobs?userCity=${job.job_location}`
      )
    );
  };

  return (
    <div
      onClick={fetchNearbyJob}
      className={`job-card-body cursor-pointer w-[95%] m-auto`}>
      <div className="job-card-title">
        <p>{job.job_title}</p> - <p>{job.job_location}</p>
      </div>
    </div>
  );
}

export default SearchJobCard;
